"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { featuredMedia, homeMedia, youtubeChannelUrl, type MediaEntry } from "@/content/home-media";
import styles from "./media-spotlight.module.css";

const filters = ["All", "Videos", "Podcasts", "Blogs"] as const;
const typeIcon = { Videos: "play", Podcasts: "audio", Blogs: "file" };

function MediaIcon({ type }: { type: MediaEntry["type"] }) {
  if (type !== "Podcasts") return <Icon name={typeIcon[type]} />;
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" /></svg>;
}

export default function MediaSpotlight() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState(featuredMedia);
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLDivElement>(null);
  const visible = homeMedia.filter(item => filter === "All" || item.type === filter);

  function playEntry(item: MediaEntry) {
    setSelected(item);
    setPlaying(true);
    player.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
    player.current?.focus({ preventScroll: true });
  }

  return (
    <section className={styles.section} aria-labelledby="home-media-title" id="watch-listen-read">
      <div className="container">
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>ASTRONIS IN CONVERSATION</span><h2 id="home-media-title">Watch. Listen. <em>Discover.</em></h2></div>
          <p>Fresh thinking, meaningful conversations and practical perspectives. Find your next idea here.</p>
        </header>

        <div className={styles.spotlight}>
          <div className={styles.intro}>
            <span className={styles.lightEyebrow}><span /> PERSPECTIVES THAT MATTER</span>
            <h3>Great conversations.<br /><em>Greater clarity.</em></h3>
            <p>Go beyond the headlines. Discover the people, ideas and insights shaping the world of business.</p>
            <div className={styles.formats}><span><Icon name="play" /> Watch</span><span><MediaIcon type="Podcasts" /> Listen</span><span><Icon name="file" /> Read</span></div>
            {youtubeChannelUrl && <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className={styles.channelLink}>Visit our YouTube channel <Icon name="arrow" /></a>}
          </div>
          <div className={styles.feature} ref={player} tabIndex={-1} aria-label="Featured media player">
            <div className={styles.screen}>
              {playing && selected.youtubeId ? (
                <iframe key={selected.youtubeId} src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(selected.youtubeId)}?autoplay=1&rel=0`} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
              ) : (
                <>
                  <Image src={selected.image} alt="" fill sizes="(max-width: 850px) 100vw, 60vw" className={styles.cover} />
                  <div className={styles.screenShade} />
                  <div className={styles.screenTop}><span className={styles.brand}>ASTRONIS <small>GLOBAL</small></span><span className={styles.videoBadge}><Icon name="play" /> {selected.youtubeId ? "FEATURED VIDEO" : "VIDEO SERIES"}</span></div>
                  {selected.youtubeId ? <button className={styles.playButton} onClick={() => setPlaying(true)} aria-label={`Play ${selected.title}`}><Icon name="play" /></button> : <div className={styles.comingSoon}><span className={styles.wave} aria-hidden="true">{[18, 30, 44, 27, 54, 36, 22].map((height, i) => <i key={i} style={{ height }} />)}</span><span>NEW CONVERSATIONS, COMING SOON</span></div>}
                  <div className={styles.screenTitle}><h3>{selected.title}</h3><p>{selected.description}</p></div>
                </>
              )}
            </div>
            <div className={styles.caption}><span><MediaIcon type={selected.type} /> {playing ? "Now playing" : "The Astronis perspective"}</span>{playing && selected.youtubeId ? <a href={`https://www.youtube.com/watch?v=${encodeURIComponent(selected.youtubeId)}`} target="_blank" rel="noopener noreferrer">Watch on YouTube <Icon name="arrow" /></a> : <span>Ideas that move you forward</span>}</div>
          </div>
        </div>

        <div className={styles.browseHeader}><div><span className={styles.eyebrow}>MAKE TIME FOR A NEW PERSPECTIVE</span><h3>Explore our media</h3></div><div className={styles.filters} role="group" aria-label="Filter media by format">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} aria-controls="home-media-results">{item}</button>)}</div></div>
        <div id="home-media-results" className={styles.grid}>
          {visible.map(item => <article key={item.id} className={styles.card}>
            <div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" /><span className={styles.typeBadge}><MediaIcon type={item.type} /> {item.type}</span>{!item.youtubeId && !item.href && <span className={styles.soonBadge}>Coming soon</span>}</div>
            <div className={styles.cardBody}><h4>{item.title}</h4><p>{item.description}</p>{item.youtubeId ? <button className={styles.cardLink} onClick={() => playEntry(item)}>{item.type === "Podcasts" ? "Play episode" : "Watch video"}<Icon name="arrow" /></button> : item.href ? <Link className={styles.cardLink} href={item.href}>Read story <Icon name="arrow" /></Link> : <span className={styles.pending}>A new series is on its way <MediaIcon type={item.type} /></span>}</div>
          </article>)}
        </div>
        <p role="status" className={styles.srOnly}>{visible.length} {filter === "All" ? "media items" : filter.toLowerCase()} shown.</p>
      </div>
    </section>
  );
}
