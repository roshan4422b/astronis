"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { practices } from "@/content/site";
import Icon from "../_components/icon";
import EmailOtpVerification from "../_components/email-otp-verification";
import styles from "./testimonial-form.module.css";
export default function TestimonialForm({
  initialFormat = "written",
}: {
  initialFormat?: string;
}) {
  const [format, setFormat] = useState(initialFormat),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [captchaToken, setCaptchaToken] = useState(""),
    [recording, setRecording] = useState(false),
    [video, setVideo] = useState<Blob | null>(null),
    [preview, setPreview] = useState(""),
    [photoSelected, setPhotoSelected] = useState(false),
    [photoName, setPhotoName] = useState(""),
    [videoName, setVideoName] = useState(""),
    [testimonialText, setTestimonialText] = useState("");
  const recorder = useRef<MediaRecorder | null>(null),
    stream = useRef<MediaStream | null>(null),
    live = useRef<HTMLVideoElement>(null),
    submissionInFlight = useRef(false);
  useEffect(
    () => () => stream.current?.getTracks().forEach((t) => t.stop()),
    [],
  );
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  async function start() {
    setStatus("");
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder)
        throw new Error("unsupported");
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const r = new MediaRecorder(stream.current);
      recorder.current = r;
      const chunks: BlobPart[] = [];
      r.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      r.onstop = () => {
        const blob = new Blob(chunks, { type: r.mimeType });
        setVideo(blob);
        setPreview(URL.createObjectURL(blob));
        setRecording(false);
        stream.current?.getTracks().forEach((t) => t.stop());
        if (live.current) live.current.srcObject = null;
      };
      r.start();
      setRecording(true);
      if (live.current) {
        live.current.srcObject = stream.current;
        await live.current.play();
      }
    } catch {
      if (recorder.current?.state === "recording") recorder.current.stop();
      setRecording(false);
      stream.current?.getTracks().forEach((t) => t.stop());
      setStatus(
        "Camera access is unavailable. You can upload an existing video instead.",
      );
    }
  }
  function changeFormat(next: string) {
    if (recorder.current?.state === "recording") recorder.current.stop();
    setFormat(next);
    setPhotoSelected(false);
    setPhotoName("");
    setVideoName("");
    setTestimonialText("");
    setStatus("");
  }
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submissionInFlight.current) return;
    setStatus("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("format", format);
    if (format === "video" && video)
      data.set(
        "video",
        new File(
          [video],
          `testimonial.${video.type.includes("mp4") ? "mp4" : "webm"}`,
          { type: video.type },
        ),
      );
    const upload = data.get("video");
    if (format === "video" && (!(upload instanceof File) || !upload.size)) {
      setStatus("Please record or upload a video first.");
      return;
    }
    if (upload instanceof File && upload.size > 20 * 1024 * 1024) {
      setStatus("Please use a video smaller than 20 MB.");
      return;
    }
    submissionInFlight.current = true;
    setBusy(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setStatus(
        typeof result.message === "string"
          ? result.message
          : "We could not confirm the testimonial submission. Please try again.",
      );
      if (res.ok) {
        form.reset();
        setVideo(null);
        setPreview("");
        setPhotoSelected(false);
        setPhotoName("");
        setVideoName("");
        setTestimonialText("");
      }
    } catch {
      setStatus(
        "Your testimonial could not be sent. Please contact advisory@astronisglobal.com.",
      );
    } finally {
      submissionInFlight.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="section pale" id="write">
      <div className="container narrow">
        <div className="section-heading">
          <h2>Share Your Experience</h2>
          <p style={{ marginTop: 18 }}>
            We value your feedback. Every submission is reviewed before
            publication.
          </p>
        </div>
        <div
          className="filter-tabs"
          role="group"
          aria-label="Testimonial format"
        >
          <button
            className={format === "written" ? "selected" : ""}
            aria-pressed={format === "written"}
            onClick={() => changeFormat("written")}
          >
            Written Testimonial
          </button>
          <button
            className={format === "video" ? "selected" : ""}
            aria-pressed={format === "video"}
            onClick={() => changeFormat("video")}
          >
            Video Testimonial
          </button>
        </div>
        <form className="enquiry-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              Name *
              <input
                name="name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
              />
            </label>
            <label>
              Email *
              <input
                name="email"
                type="email"
                required
                maxLength={180}
                autoComplete="email"
              />
            </label>
            <label>
              Company / Organisation *
              <input
                name="company"
                required
                maxLength={160}
                autoComplete="organization"
              />
            </label>
            <label>
              Designation
              <input
                name="designation"
                maxLength={100}
                autoComplete="organization-title"
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                maxLength={30}
                autoComplete="tel"
              />
            </label>
            <label>
              Service / Matter *
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {practices.map((p) => (
                  <option key={p.slug}>{p.title}</option>
                ))}
              </select>
            </label>
            {format === "written" ? (
              <>
                <label className="full">
                  Your Testimonial *
                  <textarea
                    name="message"
                    rows={5}
                    required
                    minLength={20}
                    maxLength={180}
                    value={testimonialText}
                    onChange={(event) => setTestimonialText(event.target.value)}
                  />
                  <small className={styles.fieldHint}>20–180 characters · {testimonialText.length}/180</small>
                </label>
                <label className="full">
                  Photograph (optional · JPG/PNG · maximum 3 MB)
                  <input
                    name="photo"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) {
                        setPhotoSelected(false);
                        setPhotoName("");
                        return;
                      }
                      if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 3 * 1024 * 1024) {
                        event.target.value = "";
                        setPhotoSelected(false);
                        setPhotoName("");
                        setStatus("Please choose a JPG or PNG photograph up to 3 MB.");
                        return;
                      }
                      setPhotoSelected(true);
                      setPhotoName(file.name);
                      setStatus("");
                    }}
                  />
                  {photoName && <span className={styles.uploadSuccess} role="status">✓ {photoName} selected</span>}
                </label>
                {photoSelected && (
                  <label className="consent full">
                    <input
                      name="photoPublicationConsent"
                      type="checkbox"
                      value="yes"
                      required
                      onInvalid={() => setStatus("Please authorise publication of the submitted photograph or remove the photograph.")}
                    />
                    <span>I authorise publication of the photograph I submitted with my testimonial.</span>
                  </label>
                )}
              </>
            ) : (
              <div className="full">
                <div className="record-controls">
                  <button
                    type="button"
                    className="button"
                    disabled={recording}
                    onClick={start}
                  >
                    <Icon name="play" />
                    Record Now
                  </button>
                  {recording && (
                    <button
                      type="button"
                      className="button secondary"
                      onClick={() => recorder.current?.stop()}
                    >
                      Stop Recording
                    </button>
                  )}
                </div>
                <video
                  className="video-preview"
                  ref={live}
                  muted
                  playsInline
                  autoPlay
                  hidden={!recording}
                  aria-label="Live camera preview"
                />
                {preview && !recording && (
                  <video
                    className="video-preview"
                    src={preview}
                    controls
                    playsInline
                    aria-label="Preview your recorded testimonial"
                  />
                )}
                <label>
                  Or upload an existing video (any duration · maximum 20 MB · MP4, MOV or WebM)
                  <input
                    name="video"
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={(event) => {
                      setVideo(null);
                      setPreview("");
                      const file = event.target.files?.[0];
                      if (!file) {
                        setVideoName("");
                        return;
                      }
                      if (!["video/mp4", "video/webm", "video/quicktime"].includes(file.type) || file.size > 20 * 1024 * 1024) {
                        event.target.value = "";
                        setVideoName("");
                        setStatus("Please choose an MP4, MOV or WebM video up to 20 MB.");
                        return;
                      }
                      setVideoName(file.name);
                      setStatus("");
                    }}
                  />
                  {videoName && <span className={styles.uploadSuccess} role="status">✓ {videoName} selected for submission</span>}
                </label>
              </div>
            )}
            <label className="honey" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="consent full">
              <input
                name="identityPublicationConsent"
                type="checkbox"
                value="yes"
                required
                onInvalid={() => setStatus("Please authorise publication of your name and organisation with your testimonial.")}
              />
              <span>I authorise Astronis Global to publish my name, designation, and organisation with this testimonial on its website.</span>
            </label>
            <p className="full testimonial-terms-link">
              <strong>Terms and Policy:</strong>{" "}
              <Link href="/legal/client-testimonial-consent">
                Read the Client Testimonial Consent &amp; Authorisation Agreement
              </Link>
            </p>
            <label className="consent full">
              <input
                name="consent"
                type="checkbox"
                value="yes"
                required
                onInvalid={() => setStatus("Please accept the Client Testimonial Consent and Authorisation Agreement before submitting.")}
              />
              <span>
                “Yes, I have read and understood the{" "}
                <Link href="/legal/client-testimonial-consent">
                  Client Testimonial, Review, Image &amp; Logo Publication Consent and Authorisation Agreement
                </Link>
                , and I agree to its terms and conditions.”
              </span>
            </label>
          </div>
          <EmailOtpVerification onCaptchaToken={setCaptchaToken} />
          <button className="button" type="submit" disabled={busy || recording || !captchaToken}>
            {busy ? "Submitting…" : "Submit for Review"}
            <Icon name="arrow" />
          </button>
          {status && (
            <div className="form-status" role="status">
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
