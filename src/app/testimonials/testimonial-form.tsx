"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import fixWebmDuration from "fix-webm-duration";
import { practices } from "@/content/site";
import Icon from "../_components/icon";
import EmailOtpVerification from "../_components/email-otp-verification";
import styles from "./testimonial-form.module.css";
import {
  testimonialImageMaxBytes,
  testimonialImageTypes,
  testimonialVideoMaxBytes,
  testimonialVideoTypes,
} from "@/lib/testimonial-media";
export default function TestimonialForm({
  initialFormat = "written",
}: {
  initialFormat?: string;
}) {
  const [format, setFormat] = useState(initialFormat),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [emailVerified, setEmailVerified] = useState(false),
    [formValid, setFormValid] = useState(false),
    [recording, setRecording] = useState(false),
    [recordingPaused, setRecordingPaused] = useState(false),
    [cameraStarting, setCameraStarting] = useState(false),
    [cameraReady, setCameraReady] = useState(false),
    [preparingRecording, setPreparingRecording] = useState(false),
    [recordDialogOpen, setRecordDialogOpen] = useState(false),
    [recordingSeconds, setRecordingSeconds] = useState(0),
    [video, setVideo] = useState<Blob | null>(null),
    [recorded, setRecorded] = useState(false),
    [preview, setPreview] = useState(""),
    [photoSelected, setPhotoSelected] = useState(false),
    [photoName, setPhotoName] = useState(""),
    [videoName, setVideoName] = useState(""),
    [uploadProgress, setUploadProgress] = useState<number | null>(null),
    [testimonialText, setTestimonialText] = useState("");
  const recorder = useRef<MediaRecorder | null>(null),
    stream = useRef<MediaStream | null>(null),
    live = useRef<HTMLVideoElement>(null),
    recordDialog = useRef<HTMLDialogElement>(null),
    recordingStartedAt = useRef(0),
    recordingElapsedBeforePause = useRef(0),
    formElement = useRef<HTMLFormElement>(null),
    photoInput = useRef<HTMLInputElement>(null),
    videoInput = useRef<HTMLInputElement>(null),
    discardRecording = useRef(false),
    recordingAttempt = useRef(0),
    submissionInFlight = useRef(false);
  useEffect(() => {
    const form = formElement.current;
    if (!form) return;
    const updateValidity = () => {
      const hasRequiredMedia = format !== "video" || Boolean(video || videoInput.current?.files?.[0]);
      setFormValid(form.matches(":valid") && hasRequiredMedia);
    };
    const updateValidityAfterReset = () => window.setTimeout(updateValidity, 0);
    form.addEventListener("input", updateValidity);
    form.addEventListener("change", updateValidity);
    form.addEventListener("reset", updateValidityAfterReset);
    updateValidity();
    return () => {
      form.removeEventListener("input", updateValidity);
      form.removeEventListener("change", updateValidity);
      form.removeEventListener("reset", updateValidityAfterReset);
    };
  }, [format, photoSelected, testimonialText, video]);
  useEffect(() => {
    const dialog = recordDialog.current;
    if (!dialog) return;
    if (recordDialogOpen && !dialog.open) dialog.showModal();
    if (!recordDialogOpen && dialog.open) dialog.close();
  }, [recordDialogOpen]);
  useEffect(() => {
    const videoElement = live.current;
    const cameraStream = stream.current;
    if (!recordDialogOpen || !cameraReady || !videoElement || !cameraStream) return;
    videoElement.srcObject = cameraStream;
    void videoElement.play().catch(() => undefined);
    return () => {
      if (videoElement.srcObject === cameraStream) videoElement.srcObject = null;
    };
  }, [recordDialogOpen, cameraReady]);
  useEffect(() => {
    if (!recording || recordingPaused) return;
    const timer = window.setInterval(() => {
      const currentSegment = recordingStartedAt.current ? performance.now() - recordingStartedAt.current : 0;
      setRecordingSeconds(Math.floor((recordingElapsedBeforePause.current + currentSegment) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recording, recordingPaused]);
  useEffect(
    () => () => {
      recordingAttempt.current += 1;
      stream.current?.getTracks().forEach((t) => t.stop());
    },
    [],
  );
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  async function openRecorder() {
    setStatus("");
    setRecordDialogOpen(true);
    setCameraStarting(true);
    setCameraReady(false);
    setRecording(false);
    setRecordingPaused(false);
    setPreparingRecording(false);
    setRecordingSeconds(0);
    recordingElapsedBeforePause.current = 0;
    const attempt = ++recordingAttempt.current;
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder)
        throw new Error("unsupported");
      setVideo(null);
      setRecorded(false);
      discardRecording.current = false;
      setPreview("");
      setVideoName("");
      if (videoInput.current) videoInput.current.value = "";
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (attempt !== recordingAttempt.current) {
        cameraStream.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = cameraStream;
      setCameraReady(true);
      setCameraStarting(false);
    } catch (error) {
      if (attempt !== recordingAttempt.current) return;
      stream.current?.getTracks().forEach((track) => track.stop());
      stream.current = null;
      setCameraReady(false);
      setCameraStarting(false);
      setStatus(
        error instanceof Error && error.message === "unsupported"
          ? "This browser does not support video recording. You can upload an MP4, MOV or WebM video instead."
          : "Camera or microphone access is unavailable. You can upload an existing video instead.",
      );
    }
  }
  function startRecording() {
    const cameraStream = stream.current;
    if (!cameraStream) {
      setStatus("Camera or microphone access is unavailable. Try opening the recorder again.");
      return;
    }
    setStatus("");
    setRecordingSeconds(0);
    recordingElapsedBeforePause.current = 0;
    discardRecording.current = false;
    const attempt = recordingAttempt.current;
    try {
      const preferredType = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/mp4",
      ].find((type) => MediaRecorder.isTypeSupported(type));
      const r = new MediaRecorder(cameraStream, preferredType ? { mimeType: preferredType } : undefined);
      recorder.current = r;
      const chunks: BlobPart[] = [];
      r.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      r.onstop = async () => {
        const activeSegment = recordingStartedAt.current ? performance.now() - recordingStartedAt.current : 0;
        const elapsed = Math.max(1, recordingElapsedBeforePause.current + activeSegment);
        recordingStartedAt.current = 0;
        const firstChunkType = chunks[0] instanceof Blob ? chunks[0].type : "";
        let blob = new Blob(chunks, { type: r.mimeType || firstChunkType });
        setRecording(false);
        setRecordingPaused(false);
        setCameraStarting(false);
        setRecordingSeconds(Math.ceil(elapsed / 1000));
        setPreparingRecording(true);
        stream.current?.getTracks().forEach((t) => t.stop());
        stream.current = null;
        if (live.current) live.current.srcObject = null;
        setCameraReady(false);
        if (discardRecording.current || attempt !== recordingAttempt.current) {
          discardRecording.current = false;
          setPreparingRecording(false);
          return;
        }
        if (!testimonialVideoTypes.has(blob.type.split(";")[0]) || !blob.size || blob.size > testimonialVideoMaxBytes) {
          setStatus("The recording format is unsupported or the video exceeds 20 MB. Please record again or choose an MP4, MOV or WebM file.");
          setPreparingRecording(false);
          return;
        }
        if (blob.type.split(";")[0] === "video/webm") {
          try {
            blob = await fixWebmDuration(blob, elapsed);
          } catch {
            if (attempt === recordingAttempt.current) {
              setStatus("The recording could not be prepared for preview. Please record again or upload an existing video.");
            }
            setPreparingRecording(false);
            return;
          }
        }
        if (attempt !== recordingAttempt.current || discardRecording.current) {
          discardRecording.current = false;
          setPreparingRecording(false);
          return;
        }
        if (blob.size > testimonialVideoMaxBytes) {
          setStatus("The recording exceeds 20 MB. Please record a shorter video or choose an existing video.");
          setPreparingRecording(false);
          return;
        }
        setVideo(blob);
        setRecorded(true);
        setVideoName("Recorded video");
        setPreview(URL.createObjectURL(blob));
        setPreparingRecording(false);
      };
      recordingStartedAt.current = performance.now();
      r.start(1000);
      setRecording(true);
      setRecordingPaused(false);
      setCameraStarting(false);
    } catch {
      const activeRecorder = recorder.current;
      if (activeRecorder?.state === "recording" || activeRecorder?.state === "paused") {
        discardRecording.current = true;
        activeRecorder.stop();
      }
      setRecording(false);
      setRecordingPaused(false);
      setCameraStarting(false);
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
      setCameraReady(false);
      setPreparingRecording(false);
      recordingStartedAt.current = 0;
      setStatus("Video recording could not be started. Please try again or upload an existing video.");
    }
  }
  function pauseRecording() {
    const currentRecorder = recorder.current;
    if (currentRecorder?.state !== "recording") return;
    recordingElapsedBeforePause.current += performance.now() - recordingStartedAt.current;
    recordingStartedAt.current = 0;
    currentRecorder.pause();
    setRecordingSeconds(Math.floor(recordingElapsedBeforePause.current / 1000));
    setRecordingPaused(true);
  }
  function resumeRecording() {
    const currentRecorder = recorder.current;
    if (currentRecorder?.state !== "paused") return;
    currentRecorder.resume();
    recordingStartedAt.current = performance.now();
    setRecordingPaused(false);
  }
  function stopRecording() {
    const currentRecorder = recorder.current;
    if (currentRecorder?.state === "recording" || currentRecorder?.state === "paused") currentRecorder.stop();
  }
  function dismissRecorder() {
    recordingAttempt.current += 1;
    if (recorder.current?.state === "recording" || recorder.current?.state === "paused") {
      discardRecording.current = true;
      recorder.current.stop();
    }
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    setCameraStarting(false);
    setCameraReady(false);
    setRecording(false);
    setRecordingPaused(false);
    setPreparingRecording(false);
    setRecordDialogOpen(false);
  }
  function changeFormat(next: string) {
    if (next === format) return;
    recordingAttempt.current += 1;
    if (recorder.current?.state === "recording" || recorder.current?.state === "paused") discardRecording.current = true;
    if (recorder.current?.state === "recording" || recorder.current?.state === "paused") recorder.current.stop();
    else stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    setFormat(next);
    setRecordDialogOpen(false);
    setCameraStarting(false);
    setCameraReady(false);
    setVideo(null);
    setRecorded(false);
    setPreview("");
    setPhotoSelected(false);
    setPhotoName("");
    setVideoName("");
    setUploadProgress(null);
    if (photoInput.current) photoInput.current.value = "";
    if (videoInput.current) videoInput.current.value = "";
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
    if (!String(data.get("emailVerificationToken") || "").trim()) {
      setStatus("Verify your email address before submitting this form.");
      return;
    }
    if (format === "video" && video)
      data.set("video", new File([video], `testimonial.${video.type.split(";")[0] === "video/mp4" ? "mp4" : video.type.split(";")[0] === "video/quicktime" ? "mov" : "webm"}`, { type: video.type }));
    if (format === "video") data.set("videoSource", recorded ? "recorded" : "uploaded");
    const upload = data.get("video");
    if (format === "video" && (!(upload instanceof File) || !upload.size)) {
      setStatus("Please record or upload a video first.");
      return;
    }
    if (upload instanceof File && (!testimonialVideoTypes.has(upload.type.split(";")[0]) || upload.size > testimonialVideoMaxBytes)) {
      setStatus("Please use a video smaller than 20 MB.");
      return;
    }
    const photo = data.get("photo");
    if (photo instanceof File && photo.size && (!testimonialImageTypes.has(photo.type) || photo.size > testimonialImageMaxBytes)) {
      setStatus("Please choose a supported JPG, PNG, WebP or AVIF photograph up to 3 MB.");
      return;
    }
    submissionInFlight.current = true;
    setBusy(true);
    setUploadProgress(0);
    try {
      const res = await new Promise<Response>((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", new URL("/api/testimonials", window.location.origin).toString());
        request.upload.onprogress = (progress) => {
          if (progress.lengthComputable) setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
        };
        request.onload = () => resolve(new Response(request.responseText, { status: request.status }));
        request.onerror = () => reject(new Error("network"));
        request.send(data);
      });
      const result = await res.json();
      const message = typeof result.message === "string"
        ? result.message
        : "We could not confirm the testimonial submission. Please try again.";
      setStatus(message);
      if (res.ok) {
        form.reset();
        setVideo(null);
        setRecorded(false);
        setPreview("");
        setPhotoSelected(false);
        setPhotoName("");
        setVideoName("");
        setTestimonialText("");
        if (photoInput.current) photoInput.current.value = "";
        if (videoInput.current) videoInput.current.value = "";
      }
    } catch {
      setStatus(
        "Your testimonial could not be sent. Please contact advisory@astronisglobal.com.",
      );
    } finally {
      submissionInFlight.current = false;
      setBusy(false);
      setUploadProgress(null);
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
        <form ref={formElement} className="enquiry-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              <span>Name *</span>
              <input
                name="name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="Your full name"
              />
            </label>
            <label>
              <span>Email *</span>
              <input
                name="email"
                type="email"
                required
                maxLength={180}
                autoComplete="email"
                placeholder="you@company.com"
              />
            </label>
            <label>
              <span>Company / Organisation *</span>
              <input
                name="company"
                required
                maxLength={160}
                autoComplete="organization"
                placeholder="Company / organisation"
              />
            </label>
            <label>
              <span>Designation</span>
              <input
                name="designation"
                maxLength={100}
                autoComplete="organization-title"
                placeholder="Your designation"
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                maxLength={30}
                autoComplete="tel"
                placeholder="Include country code, e.g. +91 98765 43210"
              />
            </label>
            <label>
              <span>Service / Matter *</span>
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {practices.map((p) => (
                  <option key={p.slug}>{p.title}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Your Rating *</span>
              <select name="rating" required defaultValue="5">
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Very good</option>
                <option value="3">3 — Good</option>
                <option value="2">2 — Fair</option>
                <option value="1">1 — Needs improvement</option>
              </select>
            </label>
            {format === "written" ? (
              <>
                <label className="full">
                  <span>Your Testimonial *</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    minLength={20}
                    maxLength={180}
                    value={testimonialText}
                    onChange={(event) => setTestimonialText(event.target.value)}
                    placeholder="Share your experience"
                  />
                  <small className={styles.fieldHint}>20–180 characters · {testimonialText.length}/180</small>
                </label>
              </>
            ) : (
              <div className="full">
                <label className="full">
                  Testimonial Description (optional)
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={5000}
                    value={testimonialText}
                    onChange={(event) => setTestimonialText(event.target.value)}
                  />
                </label>
                <button
                  type="button"
                  className="button"
                  onClick={openRecorder}
                >
                  <Icon name="play" />
                  {recorded ? "Record Again" : "Record Video Testimonial"}
                </button>
                {preview && !recording && !recordDialogOpen && (
                  <video
                    className={styles.videoPreview}
                    src={preview}
                    controls
                    playsInline
                    aria-label={recorded ? "Preview your recorded video testimonial" : "Preview the selected video testimonial"}
                  />
                )}
                {preview && !recording && !recordDialogOpen && (
                  <button type="button" className="button secondary" onClick={() => {
                    setVideo(null);
                    setRecorded(false);
                    setPreview("");
                    setVideoName("");
                    if (videoInput.current) videoInput.current.value = "";
                  }}>Remove video</button>
                )}
                <label>
                  Or upload an existing video (any duration · maximum 20 MB · MP4, MOV or WebM)
                  <input
                    ref={videoInput}
                    name="video"
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={(event) => {
                      setVideo(null);
                      setRecorded(false);
                      setPreview("");
                      const file = event.target.files?.[0];
                      if (!file) {
                        setVideoName("");
                        return;
                      }
                      if (!testimonialVideoTypes.has(file.type) || file.size > testimonialVideoMaxBytes) {
                        event.target.value = "";
                        setVideoName("");
                        setStatus("Please choose an MP4, MOV or WebM video up to 20 MB.");
                        return;
                      }
                      setVideoName(file.name);
                      setPreview(URL.createObjectURL(file));
                      setStatus("");
                    }}
                  />
                  {videoName && <span className={styles.uploadSuccess} role="status">{recorded ? "✓ Recorded video ready to submit" : `✓ ${videoName} selected for submission`}</span>}
                </label>
              </div>
            )}
            <label className="full">
              Profile Photograph (optional · JPG, PNG, WebP or AVIF · maximum 3 MB)
              <input
                ref={photoInput}
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    setPhotoSelected(false);
                    setPhotoName("");
                    return;
                  }
                  if (!testimonialImageTypes.has(file.type) || file.size > testimonialImageMaxBytes) {
                    event.target.value = "";
                    setPhotoSelected(false);
                    setPhotoName("");
                    setStatus("Please choose a supported JPG, PNG, WebP or AVIF photograph up to 3 MB.");
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
          <EmailOtpVerification captchaDisplayOnly onVerificationChange={setEmailVerified} />
          <button className="button" type="submit" disabled={busy || recording || cameraStarting || !emailVerified || !formValid}>
            {busy ? "Submitting…" : "Submit for Review"}
            <Icon name="arrow" />
          </button>
          {uploadProgress !== null ? (
            <p className="form-status" role="status">Uploading testimonial… {uploadProgress}%</p>
          ) : null}
          {status && (
            <div className="form-status" role="status">
              {status}
            </div>
          )}
        </form>
        <dialog
          ref={recordDialog}
          className={styles.recordDialog}
          aria-labelledby="record-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            dismissRecorder();
          }}
          onClose={() => setRecordDialogOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dismissRecorder();
          }}
        >
          <div className={styles.recordDialogContent}>
            <header className={styles.recordDialogHeader}>
              <h2 id="record-dialog-title">Record Video Testimonial</h2>
              <button type="button" className="button secondary" onClick={dismissRecorder}>
                Close
              </button>
            </header>
            {recording ? (
              <p className={styles.recordingStatus} aria-live="polite">
                <span className={recordingPaused ? styles.recordingPaused : undefined} />
                {recordingPaused ? "Paused" : "Recording"} {Math.floor(recordingSeconds / 60)}:{String(recordingSeconds % 60).padStart(2, "0")}
              </p>
            ) : null}
            <video
              className={styles.videoPreview}
              ref={live}
              muted
              playsInline
              autoPlay
              hidden={!cameraReady && !recording}
              aria-label="Live camera preview"
            />
            {preview && !recording ? (
              <video
                key={preview}
                className={styles.videoPreview}
                src={preview}
                controls
                playsInline
                preload="metadata"
                aria-label="Preview your recorded video testimonial"
              />
            ) : null}
            {cameraStarting ? <p role="status">Connecting to your camera and microphone…</p> : null}
            {preparingRecording ? <p role="status">Preparing your recording for preview…</p> : null}
            {!cameraStarting && !cameraReady && !recording && !preview && !status ? (
              <p>Allow camera and microphone access to record your testimonial.</p>
            ) : null}
            {status ? <p className={styles.recordingError} role="alert">{status}</p> : null}
            <div className={styles.recordDialogActions}>
              {cameraReady && !recording && !preparingRecording ? (
                <button type="button" className="button" onClick={startRecording}>
                  Start Recording
                </button>
              ) : null}
              {recording && !recordingPaused ? (
                <button type="button" className="button secondary" onClick={pauseRecording}>
                  Pause Recording
                </button>
              ) : null}
              {recording && recordingPaused ? (
                <button type="button" className="button" onClick={resumeRecording}>
                  Resume Recording
                </button>
              ) : null}
              {recording ? (
                <button type="button" className="button secondary" onClick={stopRecording}>
                  Stop Recording
                </button>
              ) : null}
              {preview && !recording ? (
                <>
                  <button type="button" className="button" onClick={() => setRecordDialogOpen(false)}>
                    Use This Video
                  </button>
                  <button type="button" className="button secondary" onClick={openRecorder}>
                    Record Again
                  </button>
                  <button type="button" className="button secondary" onClick={() => {
                    setVideo(null);
                    setRecorded(false);
                    setPreview("");
                    setVideoName("");
                    if (videoInput.current) videoInput.current.value = "";
                    setRecordDialogOpen(false);
                  }}>
                    Discard Video
                  </button>
                </>
              ) : null}
              {!cameraStarting && !cameraReady && !recording && !preview && !preparingRecording ? (
                <button type="button" className="button" onClick={openRecorder}>
                  Try Again
                </button>
              ) : null}
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
}
