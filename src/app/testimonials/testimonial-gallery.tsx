"use client";
import { useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { Heading } from "../_components/ui";
import Icon from "../_components/icon";
export default function TestimonialGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const approved = testimonials.filter((item) => item.status === "approved" && item.publicationConsent);
  function open(item: Testimonial) { setSelected(item); dialog.current?.showModal(); }
  function close() { player.current?.pause(); dialog.current?.close(); }
  return <section className="section"><div className="container"><Heading title="Voices of Trust. Stories of Impact." text="Hear from the businesses, professionals and organisations we support." /><div className="testimonial-columns">{["Written Testimonials", "Video Testimonials"].map((title, index) => {const items = approved.filter((item) => index ? !!item.videoUrl : !!item.quote);return <div key={title}><h3 className="testimonial-column-title">{title}</h3>{items.length ? items.map(item => <article className="directory-card" key={item.id}><h3>{item.name}</h3><p>{[item.designation,item.company].filter(Boolean).join(" · ")}</p>{index ? <button className="button" onClick={() => open(item)}><Icon name="play"/>Watch Testimonial {item.duration}</button> : <><div className="testimonial-rating" role="img" aria-label={`${item.rating ?? 0} out of 5 stars`}>{"★".repeat(item.rating ?? 0)}<span>{"★".repeat(5 - (item.rating ?? 0))}</span></div><blockquote>{item.quote}</blockquote></>}<span className="eyebrow" style={{marginTop:18}}>{item.service}</span></article>) : <div className="empty-state"><p>Client experiences will appear here after review and publication consent.</p></div>}</div>})}</div><dialog ref={dialog} className="video-dialog" aria-labelledby="video-dialog-title" onClose={() => player.current?.pause()} onClick={(e) => { if(e.target===e.currentTarget) close(); }}><div className="video-dialog-content"><button className="dialog-close" onClick={close} aria-label="Close video">✕</button><h2 id="video-dialog-title">{selected?.name} — Client Testimonial</h2>{selected?.videoUrl && <video ref={player} key={selected.id} src={selected.videoUrl} controls autoPlay playsInline className="video-preview"/>}<p>{selected?.company}</p></div></dialog></div></section>
}
