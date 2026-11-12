"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces, Cat, Code2, Database, Layers3, Lightbulb, Pause, Play, RotateCcw, SkipForward, Sparkles } from "lucide-react";
import { Mascot } from "./mascot";
import chapters from "./chapters.json";
import map from "./map.json";
import "./cinema.css";

let runtime = 0;
const timeline = chapters.map(chapter => {
  const start = runtime;
  runtime += chapter.duration;
  return { ...chapter, start };
});
const last = timeline.length - 1;
const transition = 1.3;
const exit = 0.6;
const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
const ease = value => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const timestamp = seconds => "0:" + String(Math.floor(seconds)).padStart(2, "0");

const [patosX, patosY] = map.patos;
const [portugalX, portugalY] = map.braganca;
const controlX = patosX - 22;
const controlY = portugalY - 43;
const route = `M${patosX} ${patosY} Q${controlX} ${controlY} ${portugalX} ${portugalY}`;

function planePosition(t) {
  const u = 1 - t;
  const x = u * u * patosX + 2 * u * t * controlX + t * t * portugalX;
  const y = u * u * patosY + 2 * u * t * controlY + t * t * portugalY;
  const dx = u * (controlX - patosX) + t * (portugalX - controlX);
  const dy = u * (controlY - patosY) + t * (portugalY - controlY);
  return `translate(${x} ${y}) rotate(${Math.atan2(dy, dx) * 180 / Math.PI})`;
}

function MapArtwork({ flight = false, plane }) {
  const id = flight ? "flight" : "origin";
  return (
    <svg className={"film-map film-map-" + id} viewBox="0 0 640 418" aria-hidden="true">
      <defs>
        <radialGradient id={id + "-water"}>
          <stop stopColor="#49336d" />
          <stop offset="1" stopColor="#1e1537" />
        </radialGradient>
        {!flight && <clipPath id="film-globe"><circle cx="312" cy="208" r="194" /></clipPath>}
        {flight && <mask id="film-route">
          <path className="film-route-mask" d={route} pathLength="1" />
        </mask>}
      </defs>
      {!flight && <>
        <circle className="orbit-ring" cx="312" cy="208" r="205" />
        <circle className="orbit-ring outer" cx="312" cy="208" r="212" />
      </>}
      <g clipPath={flight ? undefined : "url(#film-globe)"}>
        <rect width="640" height="418" fill={`url(#${id}-water)`} />
        <g className="map-camera" style={{ transformOrigin: `${patosX}px ${patosY}px` }}>
          <path className="film-graticule" d={map.grid} />
          <path className="film-land" d={map.land} />
          <path className="film-country" d={map.brazil} />
          {flight && <path className="film-country" d={map.portugal} />}
        </g>
      </g>
      {flight ? <>
        <path className="film-route-ghost" d={route} />
        <path className="film-route-line" d={route} mask="url(#film-route)" />
        <g ref={plane} transform={planePosition(0)} className="film-plane">
          <path d="M-10 -5 11 0 -10 5 -6 0Z" />
        </g>
        <circle className="film-pin" cx={portugalX} cy={portugalY} r="4" />
        <text x={portugalX + 10} y={portugalY + 4}>BRAGANÇA</text>
        <circle className="film-pin" cx={patosX} cy={patosY} r="4" />
        <text x={patosX + 10} y={patosY + 4}>PATOS</text>
      </> : <g className="origin-pin" transform={`translate(${patosX} ${patosY})`}>
        <circle r="17" className="pin-ring" />
        <circle r="9" className="pin-ring" />
        <circle className="film-pin" r="4" />
        <text x="19" y="4">PATOS, PB</text>
      </g>}
    </svg>
  );
}

function CodeWindow({ finished = false }) {
  return <div className={"film-window " + (finished ? "film-window-site" : "film-window-code")}>
    <div className="film-window-bar"><span><i /><i /><i /></span>{finished ? "rayara.vilar" : "interface.jsx"}<Code2 size={15} /></div>
    {finished ? <div className="film-mini-site">
      <div className="film-mini-nav"><Sparkles size={15} /><span /><span /></div>
      <div className="film-mini-content"><b>Interfaces<br />com <em>história.</em></b><i /><i /><span>Ver projetos <ArrowUpRight size={13} /></span></div>
      <div className="film-mini-image"><Sparkles /></div>
    </div> : <div className="film-code">
      <span><i>01</i> <b>import</b> React <b>from</b> <em>"react"</em>;</span>
      <span><i>02</i></span>
      <span><i>03</i> <b>function</b> <strong>MinhaHistoria</strong>() &#123;</span>
      <span><i>04</i> &nbsp;<b>return</b> &lt;Interface /&gt;;</span>
      <span><i>05</i> &#125;</span>
    </div>}
  </div>;
}

/* Adesivo que pode ser arrastado e responde ao clique com um balão. */
function PlayfulSticker({ className, label, message, children }) {
  const [talking, setTalking] = useState(false);
  const moved = useRef(false);
  useEffect(() => {
    if (!talking) return;
    const timer = setTimeout(() => setTalking(false), 2200);
    return () => clearTimeout(timer);
  }, [talking]);
  return <motion.button type="button" className={"sticker film-toy " + className} aria-label={label}
    drag dragSnapToOrigin dragElastic={0.35} whileDrag={{ scale: 1.18, rotate: -10 }} whileHover={{ scale: 1.08 }}
    onPointerDown={() => { moved.current = false; }} onDragStart={() => { moved.current = true; }}
    onClick={() => { if (!moved.current) setTalking(true); }}>
    {children}
    {talking && <span className="film-bubble" role="status">{message}</span>}
  </motion.button>;
}

function FilmArtwork({ layerRefs, plane, scene, greeting, setGreeting }) {
  const layer = index => ({
    ref: element => { layerRefs.current[index] = element; },
    "data-active": scene === index ? "" : undefined,
    inert: scene !== index,
  });
  return <>
    <div className="film-visual film-visual-patos" {...layer(0)}>
      <div className="film-art" aria-hidden="true"><MapArtwork /></div>
      <span className="film-coordinate" aria-hidden="true">07°01′ S &nbsp; 37°16′ W</span>
    </div>
    <div className="film-visual film-visual-codigo" {...layer(1)}>
      <div className="film-art film-code-art">
        <div aria-hidden="true"><CodeWindow /><Mascot active={scene === 1} /></div>
        <PlayfulSticker className="film-duck" label="Patinho de borracha. Arraste ou clique." message="Quack! Meu parceiro de debug.">🦆</PlayfulSticker>
      </div>
    </div>
    <div className="film-visual film-visual-portugal" {...layer(2)}>
      <div className="film-art film-walk">
        <img src="/rayara-viagem.webp" width="850" height="850" alt="" />
        <PlayfulSticker className="film-idea" label="Lâmpada de ideia. Arraste ou clique." message="Ideia na mala!"><Lightbulb size={30} /></PlayfulSticker>
      </div>
      <div className="film-art film-route" aria-hidden="true"><MapArtwork flight plane={plane} /></div>
    </div>
    <div className="film-visual film-visual-interfaces" {...layer(3)}>
      <div className="film-art film-stack" aria-hidden="true">
        <div className="film-stack-card"><Database /><span>Dados</span><i /><i /><i /></div>
        <div className="film-stack-card"><Braces /><span>Código</span><i /><i /><i /></div>
        <div className="film-stack-card"><Layers3 /><span>Interface</span><i /><i /><i /></div>
      </div>
    </div>
    <div className="film-visual film-visual-hoje" {...layer(4)}>
      <div className="film-art film-final-art">
        <div className="film-selection" aria-hidden="true"><span>↔ &nbsp; Interface</span><i /><i /><i /><i /></div>
        <div aria-hidden="true"><CodeWindow finished /><Mascot active={scene === last} /></div>
        <button className="sticker film-cat" type="button" aria-label="Cumprimentar o gatinho"
          aria-pressed={greeting} onClick={() => setGreeting(value => !value)}><Cat size={34} /></button>
        {greeting && <span className="film-cat-message" role="status">Miau! Você encontrou meu easter egg ♡</span>}
      </div>
    </div>
  </>;
}

/* Poeira de estrelas que foge do cursor, liga constelações e explode no clique. */
function Stardust({ burst }) {
  const canvas = useRef(null);
  useEffect(() => {
    const element = canvas.current;
    const hero = element.closest(".cinema");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = element.getContext("2d");
    const colors = ["255,215,170", "226,190,255", "255,240,225"];
    let width = 0, height = 0, ratio = 1, frame = 0, visible = true;
    let stars = [];
    const sparks = [];
    const pointer = { x: -999, y: -999 };

    function resize() {
      ratio = Math.min(devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.round(clamp(width * height / 16000, 35, 110));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
        r: Math.random() * 1.4 + .4, phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    function draw(now) {
      frame = 0;
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const dx = star.x - pointer.x;
        const dy = star.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 130 && distance > 0) {
          const force = (130 - distance) / 130 * .6;
          star.vx += dx / distance * force;
          star.vy += dy / distance * force;
        }
        star.vx *= .94; star.vy *= .94;
        star.x += star.vx + Math.sin(now / 4000 + star.phase) * .08;
        star.y += star.vy + Math.cos(now / 5000 + star.phase) * .08;
        if (star.x < -10) star.x = width + 10; else if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10; else if (star.y > height + 10) star.y = -10;
        const alpha = .35 + Math.sin(now / 700 + star.phase) * .25;
        context.fillStyle = `rgba(${star.color},${alpha})`;
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fill();
        if (distance < 190) {
          context.strokeStyle = `rgba(255,215,170,${(1 - distance / 190) * .35})`;
          context.lineWidth = .7;
          context.beginPath();
          context.moveTo(pointer.x, pointer.y);
          context.lineTo(star.x, star.y);
          context.stroke();
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life -= .018;
        if (spark.life <= 0) { sparks.splice(i, 1); continue; }
        spark.vy += .04;
        spark.x += spark.vx; spark.y += spark.vy;
        context.fillStyle = `rgba(${spark.color},${spark.life})`;
        context.beginPath();
        context.arc(spark.x, spark.y, spark.r * spark.life + .5, 0, Math.PI * 2);
        context.fill();
      }
      if (visible) frame = requestAnimationFrame(draw);
    }

    function move(event) {
      const bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }
    function leave() { pointer.x = pointer.y = -999; }
    burst.current = (x, y) => {
      for (let i = 0; i < 26; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.2,
          r: Math.random() * 2.4 + 1, life: 1, color: colors[i % colors.length] });
      }
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });
    observer.observe(hero);
    const resizer = new ResizeObserver(resize);
    resizer.observe(hero);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      burst.current = null;
    };
  }, [burst]);
  return <canvas ref={canvas} className="film-stardust" aria-hidden="true" />;
}

/* Divide o título em palavras que sobem de uma máscara, em sequência. */
function KineticTitle({ text }) {
  const words = text.split(" ");
  return <h2 aria-label={text}>
    {words.map((word, i) => <span className="kw" key={i} aria-hidden="true">
      <span style={{ "--d": `${.15 + i * .09}s` }}>{i === words.length - 1 ? <em>{word}</em> : word}</span>
    </span>)}
  </h2>;
}

/* A legenda entra frase por frase, ao longo da duração do capítulo. */
function KineticCaption({ text, duration }) {
  const phrases = text.split(/(?<=[,.])\s+/);
  const begin = .9;
  const span = Math.max(duration * .72 - begin, 1) / phrases.length;
  return <p aria-label={text}>
    {phrases.map((phrase, j) => {
      const start = begin + j * span;
      return <span className="film-phrase" key={j} aria-hidden="true"
        style={{ "--next": j < phrases.length - 1 ? `${start + span}s` : "999s" }}>
        {phrase.split(" ").map((word, i) =>
          <span className="cw" key={i} style={{ "--d": `${start + i * .045}s` }}>{word} </span>)}
      </span>;
    })}
  </p>;
}

export function Intro() {
  const section = useRef(null);
  const layerRefs = useRef([]);
  const progressRefs = useRef([]);
  const plane = useRef(null);
  const burst = useRef(null);
  const clock = useRef({ time: 0, chapter: 0, second: 0, start: 0, cut: 0 });
  const reduced = useRef(false);
  const live = useRef({ playing: false, scene: 0, inView: true, autoPaused: false });
  const [scene, setScene] = useState(0);
  const [second, setSecond] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  live.current.playing = playing;
  live.current.scene = scene;

  const renderFrame = useCallback(seconds => {
    const time = clamp(seconds, 0, runtime);
    const index = timeline.findLastIndex(chapter => time >= chapter.start);
    const elapsed = time - timeline[index].start;
    const fade = index === 0 || index === clock.current.cut || reduced.current ? 1 : ease(elapsed / transition);
    for (const [i, chapter] of timeline.entries()) {
      const progress = clamp((time - chapter.start) / chapter.duration);
      const opacity = i === index ? fade : i === index - 1 ? 1 - fade : 0;
      const layer = layerRefs.current[i];
      layer.style.setProperty("--visibility", opacity);
      // Corte de câmera: a cena que sai avança e desfoca, a que entra se aproxima.
      const blending = opacity > 0 && opacity < 1 && !reduced.current;
      layer.style.filter = blending ? `blur(${((1 - opacity) * 9).toFixed(2)}px)` : "";
      layer.style.scale = !blending ? "" : i === index ? (0.94 + opacity * 0.06).toFixed(4) : (1 + (1 - opacity) * 0.1).toFixed(4);
      layer.style.setProperty("--progress", progress);
      progressRefs.current[i].style.setProperty("--chapter-progress", progress);
      if (i === 0) layer.style.setProperty("--zoom", ease((progress - 0.24) / 0.69));
      if (i === 2) {
        const trip = ease((progress - 0.36) / 0.18);
        const distance = ease((progress - 0.47) / 0.47);
        layer.style.setProperty("--trip", trip);
        layer.style.setProperty("--distance", distance);
        plane.current.setAttribute("transform", planePosition(distance));
      }
    }
    if (clock.current.chapter !== index) {
      clock.current.chapter = index;
      setScene(index);
    }
    const leaving = index < last && !reduced.current && elapsed > timeline[index].duration - exit;
    if (clock.current.leaving !== leaving) {
      clock.current.leaving = leaving;
      setLeaving(leaving);
    }
    if (clock.current.second !== Math.floor(time)) {
      clock.current.second = Math.floor(time);
      setSecond(clock.current.second);
    }
    clock.current.time = time;
  }, []);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = preference.matches;
    renderFrame(0);
    if (!preference.matches) {
      clock.current.start = performance.now();
      setPlaying(true);
    }
    function change() {
      reduced.current = preference.matches;
      if (preference.matches) setPlaying(false);
      renderFrame(clock.current.time);
    }
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, [renderFrame]);

  useEffect(() => {
    if (!playing) return;
    let frame;
    function tick(now) {
      renderFrame((now - clock.current.start) / 1000);
      if (clock.current.time < runtime) frame = requestAnimationFrame(tick);
      else setPlaying(false);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, renderFrame]);

  const goTo = useCallback(time => {
    clock.current.start = performance.now() - time * 1000;
    clock.current.cut = timeline.findLastIndex(chapter => time >= chapter.start);
    renderFrame(time);
  }, [renderFrame]);

  const resume = useCallback(() => {
    goTo(clock.current.time >= runtime ? 0 : clock.current.time);
    setPlaying(true);
  }, [goTo]);

  const jump = useCallback(index => {
    goTo(timeline[clamp(index, 0, last)].start);
    if (!reduced.current) setPlaying(true);
  }, [goTo]);

  function togglePlayback() {
    if (playing) setPlaying(false);
    else resume();
  }

  // Parallax, holofote, cursor, rolagem, teclado e pausa fora da tela.
  useEffect(() => {
    const hero = section.current;
    const motionOk = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function animate() {
      frame = 0;
      current.x += (target.x - current.x) * .08;
      current.y += (target.y - current.y) * .08;
      hero.style.setProperty("--mx", current.x.toFixed(4));
      hero.style.setProperty("--my", current.y.toFixed(4));
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .001) frame = requestAnimationFrame(animate);
    }
    function move(event) {
      const bounds = hero.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      hero.style.setProperty("--cx", x + "px");
      hero.style.setProperty("--cy", y + "px");
      if (!motionOk) return;
      target.x = x / bounds.width * 2 - 1;
      target.y = y / bounds.height * 2 - 1;
      if (!frame) frame = requestAnimationFrame(animate);
    }
    function leave() {
      target.x = target.y = 0;
      if (motionOk && !frame) frame = requestAnimationFrame(animate);
    }
    let scrollFrame = 0;
    function scroll() {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        hero.style.setProperty("--scroll", clamp(scrollY / hero.offsetHeight).toFixed(3));
      });
    }
    function key(event) {
      if (!live.current.inView || event.target.closest("input, textarea, select, button, a, [contenteditable]")) return;
      if (event.key === " " || event.key === "k") {
        event.preventDefault();
        if (live.current.playing) setPlaying(false); else resume();
      } else if (event.key === "ArrowRight") jump(live.current.scene + 1);
      else if (event.key === "ArrowLeft") jump(live.current.scene - 1);
    }
    const observer = new IntersectionObserver(([entry]) => {
      live.current.inView = entry.isIntersecting;
      if (!entry.isIntersecting && live.current.playing) {
        live.current.autoPaused = true;
        setPlaying(false);
      } else if (entry.isIntersecting && live.current.autoPaused) {
        live.current.autoPaused = false;
        resume();
      }
    }, { threshold: .25 });
    observer.observe(hero);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      removeEventListener("scroll", scroll);
      removeEventListener("keydown", key);
    };
  }, [jump, resume]);

  // Clique em qualquer área livre do filme avança para o próximo capítulo.
  function handleStageClick(event) {
    if (event.target.closest("a, button, input, .film-controls")) return;
    const bounds = section.current.getBoundingClientRect();
    burst.current?.(event.clientX - bounds.left, event.clientY - bounds.top);
    if (scene < last) jump(scene + 1);
  }

  const chapter = timeline[scene];
  const ended = second >= Math.floor(runtime) && !playing && clock.current.time >= runtime;

  return (
    <section className="cinema" id="topo" ref={section} aria-labelledby="hero-title"
      data-paused={playing ? undefined : ""} data-last={scene === last ? "" : undefined} onClick={handleStageClick}>
      <h1 id="hero-title" className="sr-only">Rayara Vilar — Frontend Developer</h1>
      <div className="film-stage">
        <FilmArtwork layerRefs={layerRefs} plane={plane} scene={scene} greeting={greeting} setGreeting={setGreeting} />
        <div className="film-spotlight" aria-hidden="true" />
        <Stardust burst={burst} />
        <div className="film-grain" aria-hidden="true" />
      </div>
      <div className="film-cursor" aria-hidden="true"><span>Próximo</span><ArrowUpRight size={14} /></div>
      <div className="film-body shell">
        <div className="film-copy" aria-live="polite">
          <div className="film-copy-inner" key={chapter.id} data-leaving={leaving ? "" : undefined}>
            <div className="film-label">{String(scene + 1).padStart(2, "0")} <span /> <b>{chapter.label}</b></div>
            <KineticTitle text={chapter.title} />
            <KineticCaption text={chapter.caption} duration={chapter.duration} />
            {scene === last && <div className="film-actions">
              <a className="film-primary" href="#projetos">Ver projetos <ArrowUpRight size={17} /></a>
              <a className="film-secondary" href="#historia">Minha história <ArrowDown size={16} /></a>
            </div>}
          </div>
        </div>
        <div className="film-controls" role="group" aria-label="Controles da abertura">
          <button className="film-play" type="button" onClick={togglePlayback}
            aria-label={playing ? "Pausar abertura" : ended ? "Repetir abertura" : "Reproduzir abertura"}
            title={playing ? "Pausar" : ended ? "Repetir" : "Reproduzir"}>
            {playing ? <Pause size={18} /> : ended ? <RotateCcw size={17} /> : <Play size={18} />}
          </button>
          <div className="film-timeline" role="group" aria-label="Capítulos">
            {timeline.map(({ id, label, start }, i) => (
              <button key={id} ref={element => { progressRefs.current[i] = element; }}
                type="button" aria-label={`Capítulo ${i + 1} de ${timeline.length}, ${label}`}
                aria-current={scene === i ? "step" : undefined} onClick={() => { goTo(start); if (!reduced.current) setPlaying(true); }}>
                <span />
                <em className="film-tip" aria-hidden="true">{String(i + 1).padStart(2, "0")} · {label}</em>
              </button>
            ))}
          </div>
          <span className="film-time" aria-hidden="true">{timestamp(second)} / {timestamp(runtime)}</span>
          <button className="film-skip" type="button" onClick={() => {
            if (scene === last) {
              goTo(0);
              setPlaying(true);
            } else {
              goTo(runtime);
              setPlaying(false);
            }
          }}>
            {scene === last ? <><RotateCcw size={15} /> <span>Rever</span></> : <><SkipForward size={17} /> <span>Pular</span></>}
          </button>
        </div>
      </div>
      <div className="film-scroll-cue">
        {scene !== last && <small className="film-hint">
          Clique na cena para avançar
          <span>← → para navegar · Espaço para pausar</span>
        </small>}
        <a className="film-scroll" href="#historia" aria-label="Rolar para Minha história"><span /></a>
      </div>
    </section>
  );
}
