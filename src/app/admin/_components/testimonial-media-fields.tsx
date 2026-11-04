"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  isSupportedTestimonialVideoUrl,
  testimonialImageMaxBytes,
  testimonialImageTypes,
  testimonialVideoMaxBytes,
  testimonialVideoTypes,
} from "@/lib/testimonial-media";

export type TestimonialMediaValue = {
  imagePath: string;
  imageUrl: string;
  videoPath: string;
  videoUrl: string;
  videoSource: string;
};

function mediaUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    return new URL(value).protocol === "https:" ? value : "";
  } catch {
    return "";
  }
}

function removeUnusedUpload(path: string) {
  return fetch("/api/admin/assets", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  }).then(async (response) => {
    if (response.ok || response.status === 409) return;
    const result = await response.json();
    throw new Error(result.error || "The unused upload could not be removed.");
  });
}

export function TestimonialMediaFields({
  value,
  onChange,
  onUploadingChange,
  disabled = false,
}: {
  value: TestimonialMediaValue;
  onChange: (value: TestimonialMediaValue) => void;
  onUploadingChange?: (uploading: boolean) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const stagedPaths = useRef(new Set<string>());
  const activeUploads = useRef(new Set<"image" | "video">());
  const [imageProgress, setImageProgress] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number | null>(null);
  const [imageError, setImageError] = useState("");
  const [videoError, setVideoError] = useState("");
  function updateUploading(kind: "image" | "video", active: boolean) {
    if (active) activeUploads.current.add(kind);
    else activeUploads.current.delete(kind);
    onUploadingChange?.(activeUploads.current.size > 0);
  }
  useEffect(() => () => {
    for (const path of stagedPaths.current) {
      void removeUnusedUpload(path).catch(() => {
        console.warn("[admin-testimonials] An unused staged upload could not be cleaned up.");
      });
    }
  }, []);

  function upload(file: File, kind: "image" | "video") {
    const types = kind === "image" ? testimonialImageTypes : testimonialVideoTypes;
    const maxBytes = kind === "image" ? testimonialImageMaxBytes : testimonialVideoMaxBytes;
    const setError = kind === "image" ? setImageError : setVideoError;
    if (!types.has(file.type) || !file.size || file.size > maxBytes) {
      setError(kind === "image"
        ? "Choose a JPG, PNG, WebP or AVIF image up to 3 MB."
        : "Choose an MP4, MOV or WebM video up to 20 MB.");
      if (kind === "image" && imageInput.current) imageInput.current.value = "";
      if (kind === "video" && videoInput.current) videoInput.current.value = "";
      return;
    }
    setError("");
    const setProgress = kind === "image" ? setImageProgress : setVideoProgress;
    setProgress(0);
    updateUploading(kind, true);
    const oldPath = kind === "image" ? value.imagePath : value.videoPath;
    const form = new FormData();
    form.set("file", file);
    form.set("visibility", "private");
    form.set("purpose", "testimonial");
    const request = new XMLHttpRequest();
    request.open("POST", "/api/admin/assets");
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) setProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.onload = () => {
      let result: { error?: string; path?: string; url?: string };
      try {
        result = JSON.parse(request.responseText) as { error?: string; path?: string; url?: string };
      } catch {
        setError("The upload returned an invalid response.");
        setProgress(null);
        updateUploading(kind, false);
        return;
      }
      if (request.status < 200 || request.status >= 300 || !result.path || !result.url) {
        setError(result.error || "Media upload failed.");
        setProgress(null);
        updateUploading(kind, false);
        return;
      }
      if (kind === "image") {
        stagedPaths.current.add(result.path);
        onChange({ ...value, imagePath: result.path, imageUrl: result.url });
        if (imageInput.current) imageInput.current.value = "";
      } else {
        stagedPaths.current.add(result.path);
        onChange({ ...value, videoPath: result.path, videoUrl: result.url, videoSource: "uploaded" });
        if (videoInput.current) videoInput.current.value = "";
      }
      setProgress(null);
      updateUploading(kind, false);
      if (oldPath && oldPath !== result.path && stagedPaths.current.delete(oldPath)) {
        void removeUnusedUpload(oldPath).catch((error: unknown) => {
          setError(error instanceof Error ? error.message : "The replaced upload could not be removed.");
        });
      }
    };
    request.onerror = () => {
      setError("The upload could not be completed. Check your connection and try again.");
      setProgress(null);
      updateUploading(kind, false);
    };
    request.onabort = () => {
      setProgress(null);
      updateUploading(kind, false);
    };
    request.send(form);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>, kind: "image" | "video") {
    const file = event.target.files?.[0];
    if (file) upload(file, kind);
  }

  function removeImage() {
    const path = value.imagePath;
    const staged = path ? stagedPaths.current.delete(path) : false;
    onChange({ ...value, imagePath: "", imageUrl: "" });
    if (imageInput.current) imageInput.current.value = "";
    if (path && staged) void removeUnusedUpload(path).catch((error: unknown) => {
      setImageError(error instanceof Error ? error.message : "The image could not be removed.");
    });
  }

  function removeVideo() {
    const path = value.videoPath;
    const staged = path ? stagedPaths.current.delete(path) : false;
    onChange({ ...value, videoPath: "", videoUrl: "", videoSource: "" });
    if (videoInput.current) videoInput.current.value = "";
    if (path && staged) void removeUnusedUpload(path).catch((error: unknown) => {
      setVideoError(error instanceof Error ? error.message : "The video could not be removed.");
    });
  }

  function updateVideoUrl(url: string) {
    const previousPath = value.videoPath;
    const staged = previousPath ? stagedPaths.current.delete(previousPath) : false;
    onChange({
      ...value,
      videoPath: "",
      videoUrl: url,
      videoSource: url ? "url" : "",
    });
    if (previousPath && staged) void removeUnusedUpload(previousPath).catch((error: unknown) => {
      setVideoError(error instanceof Error ? error.message : "The replaced upload could not be removed.");
    });
  }

  const imagePreview = mediaUrl(value.imageUrl);
  const videoPreview = mediaUrl(value.videoUrl);

  return (
    <>
      <label className="admin-field admin-content-full" htmlFor={`${id}-image`}>
        <span>Customer image (optional · up to 3 MB)</span>
        <input
          ref={imageInput}
          id={`${id}-image`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          disabled={disabled || imageProgress !== null}
          onChange={(event) => handleFileChange(event, "image")}
        />
      </label>
      {imageProgress !== null ? (
        <p className="admin-detail-note admin-content-full" role="status">Uploading image… {imageProgress}%</p>
      ) : null}
      {imageError ? <small className="admin-field-error admin-content-full" role="alert">{imageError}</small> : null}
      {imagePreview ? (
        <div className="admin-content-full">
          <Image src={imagePreview} alt="Testimonial customer image preview" width={96} height={96} unoptimized className="admin-testimonial-image-preview" />
          <button type="button" className="admin-text-action" disabled={disabled || imageProgress !== null} onClick={removeImage}>Remove image</button>
        </div>
      ) : null}
      <label className="admin-field admin-content-full" htmlFor={`${id}-video`}>
        <span>Video file (optional · MP4, MOV or WebM · up to 20 MB)</span>
        <input
          ref={videoInput}
          id={`${id}-video`}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          disabled={disabled || videoProgress !== null}
          onChange={(event) => handleFileChange(event, "video")}
        />
      </label>
      {videoProgress !== null ? (
        <p className="admin-detail-note admin-content-full" role="status">Uploading video… {videoProgress}%</p>
      ) : null}
      {videoError ? <small className="admin-field-error admin-content-full" role="alert">{videoError}</small> : null}
      <label className="admin-field admin-content-full" htmlFor={`${id}-video-url`}>
        <span>Or use a direct HTTPS video URL (MP4, MOV or WebM)</span>
        <input
          id={`${id}-video-url`}
          type="url"
          value={value.videoSource === "url" ? value.videoUrl : ""}
          placeholder="https://example.com/testimonial.mp4"
          disabled={disabled || videoProgress !== null}
          aria-invalid={Boolean(value.videoSource === "url" && value.videoUrl && !isSupportedTestimonialVideoUrl(value.videoUrl))}
          onChange={(event) => {
            setVideoError("");
            updateVideoUrl(event.target.value);
          }}
        />
        {value.videoSource === "url" && value.videoUrl && !isSupportedTestimonialVideoUrl(value.videoUrl)
          ? <small className="admin-field-error" role="alert">Use an HTTPS URL ending in .mp4, .mov or .webm.</small>
          : null}
      </label>
      {videoPreview ? (
        <div className="admin-content-full">
          <video src={videoPreview} controls preload="metadata" playsInline className="video-preview" aria-label="Testimonial video preview" />
          <p className="admin-detail-note">
            {value.videoSource === "recorded" ? "Recorded video" : value.videoSource === "url" ? "Video provided as a URL" : "Uploaded video"}
          </p>
          <button type="button" className="admin-text-action" disabled={disabled || videoProgress !== null} onClick={removeVideo}>Remove video</button>
        </div>
      ) : null}
      <p className="admin-detail-note admin-content-full">Media is stored privately. A customer image is displayed publicly only with recorded image consent and testimonial approval.</p>
    </>
  );
}
