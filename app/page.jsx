"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, MotionConfig, useAnimate, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity, ArrowRight, ArrowUpRight, BookOpen, Box, Braces, Cat, CloudSun,
  Code2, Database, Dumbbell, Globe2, Heart, Layers3, LayoutGrid, Mail, Menu,
  PenTool, Plane, ScanFace, Shield, Sparkles, Trophy, Waves, X, Zap,
  CalendarDays, Clapperboard, FileDown, FileText, Github, GraduationCap, Linkedin, MessageCircle, Send, Wallet,
} from "lucide-react";
import { contact, education, experience, interests, projects, skills, story, strengths } from "./content";
import { Intro } from "./intro";

const icons = {
  Activity, BookOpen, Box, Braces, Cat, CloudSun, Code2, Database, Dumbbell, Globe2,
  Layers3, LayoutGrid, PenTool, Plane, ScanFace, Shield, Sparkles, Trophy, Waves, Zap,
  CalendarDays, Clapperboard, FileText, GraduationCap, Wallet,
};
const navigation = [["Minha história", "historia"], ["Projetos", "projetos"], ["Experiência", "experiencia"]];
const caseFields = [["context", "Contexto"], ["problem", "Desafio"], ["solution", "Solução"],
  ["role", "Meu papel"], ["process", "Processo"], ["result", "Resultado"]];

function Icon({ name, ...props }) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}

function Reveal({ children, className }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={false}
      whileInView={reduced ? undefined : { y: [16, 0] }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(scrollY > 40);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <header className={"site-header" + (scrolled || open ? " scrolled" : "")} id="inicio">
      <a className="skip" href="#principal">Pular para o conteúdo</a>
      <div className="shell nav">
        <a className="brand" href="#topo"><span><Sparkles size={19} /></span> rayara<span className="brand-period">.</span>vilar</a>
        <button className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="site-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
          {navigation.map(([label, id]) => <a key={id} href={"#" + id} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contato" onClick={() => setOpen(false)}>Vamos conversar <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ label, title, children }) {
  return <div className="section-heading"><div className="eyebrow">{label}</div><h2>{title}</h2>{children}</div>;
}

/* Cada palavra acende conforme a rolagem, da esquerda para a direita. */
function ScrollWord({ word, index, total, progress, range }) {
  const [from, to] = range;
  const step = (to - from) / total;
  const start = from + index * step;
  const end = Math.min(start + step * 2.5, to);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);
  const blur = useTransform(progress, [start, end], ["blur(4px)", "blur(0px)"]);
  return <motion.span className="scroll-word" style={{ opacity, y, filter: blur }}>{word}</motion.span>;
}

function ScrollReveal({ lines, progress, range, accent }) {
  let index = 0;
  const total = countWords(lines);
  return lines.map((line, l) => <span className="scroll-line" key={l}>
    {line.split(" ").map((word, w, words) => {
      const isLast = accent && l === lines.length - 1 && w === words.length - 1;
      return [w > 0 && " ", <ScrollWord key={w} index={index++} total={total} progress={progress} range={range}
        word={isLast ? <>{word}<span>{accent}</span></> : word} />];
    })}
  </span>);
}

/* Texto revelado com uma varredura suave da esquerda para a direita ao entrar na tela. */
function Wipe({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5, margin: "0px 0px -38% 0px" });
  return <div ref={ref} className={"wipe " + (inView ? "in " : "") + className} style={{ animationDelay: delay + "s" }}>{children}</div>;
}

const storyTitle = ["Foi a curiosidade", "que me trouxe até aqui"];
const storyIntro = ["Sou brasileira e tenho 25 anos. Minha história com interfaces começou bem antes de eu decidir trabalhar com front-end."];
const countWords = lines => lines.join(" ").split(" ").length;

function Story() {
  const section = useRef(null);
  const list = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 92%", "start 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const { scrollYProgress: lineScroll } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const line = useSpring(lineScroll, { stiffness: 120, damping: 28 });
  const still = useMotionValue(1);
  const source = reduced ? still : progress;
  return (
    <section id="historia" className="section story" ref={section}>
      <div className="shell story-grid">
        <div className="story-intro">
          <div className="section-heading">
            <div className="eyebrow">MINHA HISTÓRIA</div>
            <h2 aria-label="Foi a curiosidade que me trouxe até aqui.">
              <span aria-hidden="true"><ScrollReveal lines={storyTitle} progress={source} range={[0, 0.55]} accent="." /></span>
            </h2>
            <p aria-label={storyIntro[0]}>
              <span aria-hidden="true"><ScrollReveal lines={storyIntro} progress={source} range={[0.5, 0.95]} /></span>
            </p>
          </div>
        </div>
        <ol className="timeline" ref={list}>
          <motion.span className="timeline-progress" aria-hidden="true" style={{ scaleY: reduced ? 1 : line }} />
          {story.map(([icon, detail, title, description]) => (
            <li key={title} tabIndex={0}>
              <span className="timeline-icon"><Icon name={icon} size={20} /></span>
              <div className="timeline-card">
                <Wipe><div className="eyebrow">{detail}</div></Wipe>
                <Wipe delay={0.15}><h3>{title}</h3></Wipe>
                <Wipe delay={0.3}><p>{description}</p></Wipe>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Sequência fixa na tela: cada card sobe até um ponto de destaque e desliza até o seu lugar na fileira. */
const clamp01 = value => Math.min(1, Math.max(0, value));
const smooth = t => t * t * (3 - 2 * t);
const outCubic = t => 1 - Math.pow(1 - t, 3);
const usableEnd = 0.92;
const localStep = (value, index, total) => clamp01((value / usableEnd - index / total) * total);

function StrengthCard({ index, total, progress, offset, icon, title, text }) {
  const enter = useTransform(progress, value => outCubic(clamp01((localStep(value, index, total) - 0.05) / 0.4)));
  const move = useTransform(progress, value => smooth(clamp01((localStep(value, index, total) - 0.55) / 0.4)));
  const opacity = useTransform(enter, value => Math.min(1, value * 1.4));
  const filter = useTransform(enter, value => `blur(${((1 - value) * 10).toFixed(2)}px)`);
  const x = useTransform(move, value => offset.x * (1 - value));
  const y = useTransform([enter, move], ([e, m]) => offset.y * (1 - m) + (1 - e) * 220 - Math.sin(Math.PI * m) * 34);
  const scale = useTransform([enter, move], ([e, m]) => (0.85 + e * 0.3) * (1 - m) + m);
  const rotate = useTransform([enter, move], ([e, m]) => ((1 - e) * 7 + Math.sin(Math.PI * m) * -3) * (index % 2 ? -1 : 1));
  const shadow = useTransform(move, value => `0 ${6 + 26 * (1 - value)}px ${16 + 44 * (1 - value)}px #2a175026`);
  return <motion.div className="strength" style={{ opacity, x, y, scale, rotate, filter, boxShadow: shadow, zIndex: 10 + index }}>
    <span className="strength-badge" aria-hidden="true">{index + 1}º</span>
    <Icon name={icon} size={25} /><h3>{title}</h3><p>{text}</p>
  </motion.div>;
}

function StrengthStep({ index, total, progress }) {
  const fill = useTransform(progress, value => localStep(value, index, total));
  const width = useTransform(fill, value => `${value * 100}%`);
  const color = useTransform(fill, value => value > 0.05 ? "#5834bb" : "#b8a6d4");
  return <span className="strength-step"><motion.b style={{ color }}>{String(index + 1).padStart(2, "0")}</motion.b><i><motion.em style={{ width }} /></i></span>;
}

function Strengths() {
  const section = useRef(null);
  const stage = useRef(null);
  const cards = useRef(null);
  const headingRef = useRef(null);
  const reduced = useReducedMotion();
  const [animated, setAnimated] = useState(false);
  const [offsets, setOffsets] = useState(strengths.map(() => ({ x: 0, y: 0 })));
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.4 });

  useEffect(() => {
    const query = matchMedia("(min-width: 721px) and (prefers-reduced-motion: no-preference)");
    const update = () => setAnimated(query.matches && !reduced);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduced]);

  useLayoutEffect(() => {
    if (!animated) return;
    function measure() {
      // Ponto de destaque: centralizado na horizontal, no espaço livre entre o título e a fileira de cards.
      // offsetLeft/offsetTop ignoram transformações e são relativos ao palco (sticky).
      const list = [...cards.current.children];
      const head = headingRef.current;
      const headingBottom = head.offsetTop + head.offsetHeight;
      const gridTop = Math.min(...list.map(card => card.offsetTop));
      const cardHeight = Math.max(...list.map(card => card.offsetHeight));
      const spotX = stage.current.clientWidth / 2;
      const spotY = Math.max(headingBottom + cardHeight * 0.62, gridTop - cardHeight * 0.15);
      setOffsets(list.map(card => ({
        x: spotX - (card.offsetLeft + card.offsetWidth / 2),
        y: spotY - (card.offsetTop + card.offsetHeight / 2),
      })));
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [animated]);

  if (!animated) return <section className="section strengths" ref={section}><div className="shell">
    <SectionHeading label="MEU JEITO DE TRABALHAR" title="O que levo para cada interface." />
    <div className="strength-grid">{strengths.map(([icon, title, text], i) =>
      <Reveal className="strength" key={title}><span className="strength-badge" aria-hidden="true">{i + 1}º</span>
        <Icon name={icon} size={25} /><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
  </div></section>;

  return <section className="strengths strengths-pinned" ref={section} style={{ height: (strengths.length * 75 + 100) + "vh" }}>
    <div className="strengths-stage" ref={stage}>
      <div className="shell">
        <div className="strengths-head" ref={headingRef}>
          <SectionHeading label="MEU JEITO DE TRABALHAR" title="O que levo para cada interface." />
          <div className="strength-steps" aria-hidden="true">{strengths.map((_, i) =>
            <StrengthStep key={i} index={i} total={strengths.length} progress={progress} />)}</div>
        </div>
        <div className="strength-grid" ref={cards}>{strengths.map(([icon, title, text], i) =>
          <StrengthCard key={title} index={i} total={strengths.length} progress={progress} offset={offsets[i]}
            icon={icon} title={title} text={text} />)}</div>
      </div>
    </div>
  </section>;
}

/* Capelo que cai na cabeça da personagem; ao clicar, ele é jogado para o alto. */
function GradCap({ landed, delay = 0 }) {
  const reduced = useReducedMotion();
  const [hops, setHops] = useState(0);
  return <motion.button type="button" className="grad-cap" aria-label="Capelo de formatura. Clique para jogar para o alto."
    initial={reduced ? false : { y: -480, rotate: -80, opacity: 0 }}
    animate={landed || reduced ? { y: 0, rotate: 6, opacity: 1 } : undefined}
    transition={{ type: "spring", stiffness: 160, damping: 10, mass: 1.1, delay }}
    whileHover={reduced ? undefined : { y: -8, rotate: 0 }}
    onClick={() => setHops(value => value + 1)}>
    <motion.svg viewBox="0 0 120 84" aria-hidden="true" key={hops}
      animate={hops && !reduced ? { y: [0, -150, 0, -16, 0], rotate: [0, 340, 360, 360, 360] } : undefined}
      transition={{ duration: 1.1, times: [0, 0.4, 0.75, 0.88, 1], ease: "easeOut" }}>
      <path className="cap-base" d="M30 36v17c0 9 60 9 60 0V36L60 48Z" />
      <path className="cap-board" d="M60 8 116 28 60 48 4 28Z" />
      <path className="cap-shine" d="M60 14 98 28 60 42" />
      <g className="cap-tassel">
        <path d="M60 28C78 30 94 31 102 33v20" />
        <path className="cap-fringe" d="M98 52h8l-1 14h-6Z" />
      </g>
      <circle className="cap-button" cx="60" cy="28" r="3.6" />
    </motion.svg>
  </motion.button>;
}

/* A personagem surge pela base da seção, no canto direito, e ganha o capelo. */
function PeekingRayara() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const show = inView || reduced;
  return <div className="peek" ref={ref}>
    <motion.div className="peek-body" initial={reduced ? false : { y: "100%", rotate: 8 }}
      animate={show ? { y: "0%", rotate: 0 } : undefined}
      transition={{ type: "spring", stiffness: 70, damping: 11, delay: 0.15 }}
      whileHover={reduced ? undefined : { scale: 1.05 }}>
      <img src="/rayara-espiando-v2.webp" width="600" height="445" alt="" />
      <div className="peek-cap"><GradCap landed={show} delay={1} /></div>
    </motion.div>
  </div>;
}

function Experience() {
  return (
    <>
      <Strengths />
      <section className="section experience" id="experiencia"><div className="shell story-grid">
        <SectionHeading label="EXPERIÊNCIA" title="O que aprendi na prática.">
          <p>Trabalhar com públicos diferentes me ensinou a prestar atenção no que as pessoas entendem, perguntam e precisam fazer.</p>
        </SectionHeading>
        <div className="jobs">{experience.map(([company, role, date, place, description]) =>
          <details key={company + role}>
            <summary><span><span className="eyebrow">{date}{place && " · " + place}</span><strong>{role}</strong><span>{company}</span></span><span className="plus" aria-hidden="true">+</span></summary>
            <p>{description}</p>
          </details>)}</div>
      </div></section>
      <section className="section education"><PeekingRayara /><div className="shell">
        <SectionHeading label="FORMAÇÃO" title="Onde estudei." />
        <div className="education-grid">{education.map(([tag, title, institution], i) =>
          <motion.div className="school" key={tag}
            initial={{ opacity: 0, y: 70, rotateX: -55, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.25 + i * 0.18 }}
            whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}>
            <span className="tag">{tag}</span><h3>{title}</h3><p>{institution}</p></motion.div>)}</div>
      </div></section>
    </>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className={"project-art " + project.theme} aria-hidden="true">
      {project.image ? <img src={project.image} alt="" loading="lazy" /> : (
        <div className="mock">
          <div className="mock-top"><span>● ● ●</span><span>{project.name}</span></div>
          <div className="mock-inner"><div className="mock-tiles"><i /><i /><i /></div>
            <div className="mock-icon"><Icon name={project.icon} size={42} strokeWidth={1.6} /></div>
            <div className="mock-bars"><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      )}
    </div>
  );
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/* Marcações de "ferramenta de design": seleção, medidas e espaçamentos. */
function BuildMark({ mark }) {
  const { type, x, y, w = 0, h = 0, text } = mark;
  if (type === "box") return <div className="bm-box" style={{ left: x, top: y, width: w, height: h }}>
    <i /><i /><i /><i /><span>{text}</span></div>;
  if (type === "h") return <div className="bm-h" style={{ left: x, top: y, width: w }}><span>{text}</span></div>;
  return <div className="bm-v" style={{ left: x, top: y, height: h }}><span>{text}</span></div>;
}

function Projects() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const [scope, animate] = useAnimate();
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const cursorRef = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(scope, { once: true, amount: 0.3 });
  const [build, setBuild] = useState("idle");
  const [marks, setMarks] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (selected && !dialog.current.open) dialog.current.showModal();
  }, [selected]);

  // Esconde os elementos antes da construção só quando a animação vai rodar.
  useEffect(() => {
    if (!reduced && matchMedia("(min-width: 721px)").matches) setBuild("pending");
  }, [reduced]);

  // O cursor monta a seção ao vivo: posiciona o título, arrasta cada card e mede os espaços.
  const started = useRef(false);
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);
  useEffect(() => {
    if (!inView || build !== "pending" || started.current) return;
    started.current = true;
    const alive = true;
    setBuild("running");
    async function run() {
      const shell = scope.current;
      const base = shell.getBoundingClientRect();
      // Medido sempre em relação à posição atual da seção, mesmo se a página rolar durante a animação.
      const rel = element => {
        const r = element.getBoundingClientRect();
        const now = shell.getBoundingClientRect();
        return { x: r.left - now.left, y: r.top - now.top, w: r.width, h: r.height };
      };
      const cursor = cursorRef.current;
      const heading = headingRef.current;
      const cards = [...gridRef.current.children];
      const move = (x, y, duration = 0.6) => animate(cursor, { x, y }, { duration, ease: [0.65, 0, 0.25, 1] });
      const click = () => animate(cursor, { scale: [1, 0.82, 1] }, { duration: 0.22 });

      await animate(cursor, { x: base.width - 40, y: 10, opacity: 1 }, { duration: 0 });
      const h = rel(heading);
      await move(h.x + h.w * 0.55, h.y + h.h * 0.6, 0.8);
      if (!alive) return;
      await click();
      setStatus("Inserindo título");
      setMarks([{ type: "box", ...h, text: "h2 · Instrument Serif" }]);
      await animate(heading, { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { duration: 0.6, ease: "easeOut" });
      const g = rel(gridRef.current);
      setMarks(current => [...current, { type: "v", x: h.x + 26, y: h.y + h.h, h: g.y - (h.y + h.h), text: Math.round(g.y - (h.y + h.h)) + "px" }]);
      await wait(550);

      const spawn = { x: g.x + g.w / 2, y: g.y + g.h + 70 };
      let previous = null;
      for (const [i, card] of cards.entries()) {
        if (!alive) return;
        const c = rel(card);
        setStatus("Arrastando " + (projects[i]?.name ?? "GitHub"));
        await move(spawn.x, spawn.y, 0.45);
        await click();
        animate(card, { opacity: 1, x: spawn.x - (c.x + c.w / 2), y: spawn.y - (c.y + c.h / 2), scale: 0.45, rotate: -5 }, { duration: 0 });
        setMarks(current => current.filter(mark => mark.type !== "box"));
        const target = { x: c.x + c.w * 0.5, y: c.y + c.h * 0.42 };
        await Promise.all([
          animate(card, { x: 0, y: 0, scale: 1, rotate: 0 }, { duration: 0.8, ease: [0.65, 0, 0.25, 1] }),
          move(target.x, target.y + c.h * 0.08, 0.8),
        ]);
        animate(card, { scale: [1.025, 1] }, { duration: 0.25 });
        const next = [{ type: "box", ...c, text: `${Math.round(c.w)} × ${Math.round(c.h)}` }];
        if (previous && Math.abs(previous.y - c.y) < 4) {
          const gap = c.x - (previous.x + previous.w);
          next.push({ type: "h", x: previous.x + previous.w, y: c.y + c.h / 2, w: gap, text: Math.round(gap) + "px" });
        } else if (previous) {
          const gap = c.y - (previous.y + previous.h);
          next.push({ type: "v", x: c.x + 30, y: c.y - gap, h: gap, text: Math.round(gap) + "px" });
        }
        setMarks(current => [...current.filter(mark => mark.type !== "box"), ...next]);
        previous = c;
        await wait(420);
      }

      if (!alive) return;
      const caption = cards[0].querySelector(".project-caption");
      const cap = rel(caption);
      setStatus("Alinhando com space-between");
      await move(cap.x + cap.w * 0.5, cap.y + cap.h * 0.5, 0.6);
      await click();
      setMarks(current => [...current.filter(mark => mark.type !== "box"),
        { type: "h", x: cap.x + 14, y: cap.y + cap.h / 2, w: cap.w - 28, text: "justify-content: space-between" }]);
      await wait(1300);
      setStatus("Layout pronto ✓");
      await move(base.width - 30, cap.y - 40, 0.7);
      await wait(700);
      setMarks([]);
      await animate(cursor, { opacity: 0 }, { duration: 0.4 });
      if (mounted.current) setBuild("done");
    }
    run().catch(() => { if (mounted.current) setBuild("done"); });
  }, [inView, build, animate, scope]);

  return (
    <section id="projetos" className="section projects" data-build={build}><div className="shell" ref={scope}>
      <div className="build-target" ref={headingRef}><SectionHeading label="PROJETOS" title="Na prática." /></div>
      <div className="project-grid" ref={gridRef}>
        {projects.map(project => <div className="project build-target" key={project.name}>
          <button className="project-button" onClick={() => setSelected(project)} aria-label={"Abrir projeto " + project.name}>
            <ProjectVisual project={project} />
            <span className="project-caption"><span><strong>{project.name}</strong>
              <ul className="project-tags">{project.stack.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul></span>
              <span className="project-arrow"><ArrowUpRight size={20} /></span>
            </span>
          </button>
        </div>)}
        <div className="project project-more build-target">
          <a className="project-button" href="https://github.com/RayaraVilar" target="_blank" rel="noreferrer">
            <div className="project-art github-art" aria-hidden="true">
              <Github size={64} strokeWidth={1.4} />
              <span className="github-handle">@RayaraVilar</span>
            </div>
            <span className="project-caption"><span><strong>Visitar GitHub</strong>
              <ul className="project-tags"><li>Mais projetos</li><li>Código aberto</li></ul></span>
              <span className="project-arrow"><ArrowUpRight size={20} /></span>
            </span>
          </a>
        </div>
      </div>
      {build === "running" && <div className="build-layer" aria-hidden="true">
        {marks.map((mark, i) => <BuildMark key={mark.type + i} mark={mark} />)}
      </div>}
      <div className="build-cursor" ref={cursorRef} aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5Z" /></svg>
        <span>Rayara{status && <em> · {status}</em>}</span>
      </div>
      <dialog ref={dialog} aria-labelledby="case-title" onClose={() => setSelected(null)}>
        {selected && <div className="case">
          <button className="close" type="button" onClick={() => dialog.current.close()} aria-label="Fechar projeto"><X /></button>
          <h2 id="case-title">{selected.name}</h2>
          <ProjectVisual project={selected} />
          {!caseFields.some(([key]) => selected[key]) && <p>Prévia conceitual. O estudo de caso está em preparação.</p>}
          {caseFields.filter(([key]) => selected[key]).map(([key, label]) => <div key={key}><h3>{label}</h3><p>{selected[key]}</p></div>)}
          {selected.stack.length > 0 && <ul className="tags">{selected.stack.map(tech => <li className="tag" key={tech}>{tech}</li>)}</ul>}
          <div className="case-links">
            {selected.website && <a href={selected.website}>Abrir projeto <ArrowUpRight size={16} /></a>}
            {selected.repository && <a href={selected.repository}>Ver repositório <ArrowUpRight size={16} /></a>}
          </div>
        </div>}
      </dialog>
    </div></section>
  );
}

/* Os interesses caem um por um como adesivos, quicam ao pousar e podem ser arrastados. */
function FallingInterests() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return <>
    <ul className="interest-list" ref={ref}>{interests.map(([icon, label], i) => {
      const rest = i % 2 ? 2 : -2;
      return <motion.li key={label}
        initial={reduced ? false : { y: -380, rotate: (i % 2 ? 1 : -1) * (20 + i * 6), opacity: 0 }}
        animate={inView || reduced ? { y: 0, rotate: rest, opacity: 1 } : undefined}
        transition={{ y: { type: "spring", stiffness: 260, damping: 13, mass: 1.2, delay: 0.15 + i * 0.32 },
          rotate: { type: "spring", stiffness: 120, damping: 9, delay: 0.15 + i * 0.32 },
          opacity: { duration: 0.15, delay: 0.15 + i * 0.32 } }}
        drag dragSnapToOrigin dragElastic={0.5}
        whileHover={reduced ? undefined : { y: -5, rotate: rest * -2 }}
        whileDrag={{ scale: 1.12, rotate: 0, zIndex: 5, cursor: "grabbing" }}>
        <Icon name={icon} size={24} /> {label}
      </motion.li>;
    })}</ul>
  </>;
}

/* Bola de lã quicando pelas bordas da seção e um gatinho branco correndo atrás dela pelo chão. */
function YarnChase() {
  const layer = useRef(null);
  const ball = useRef(null);
  const cat = useRef(null);
  const thread = useRef(null);
  const [meow, setMeow] = useState(false);
  const kick = useRef(null);

  useEffect(() => {
    const root = layer.current;
    const section = root.parentElement;
    const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const R = 22;
    const state = {
      w: 0, h: 0,
      b: { x: 120, y: 80, vx: 170, vy: 130, spin: 0, squash: 0 },
      c: { x: 60, vx: 0, y: 0, vy: 0, dir: 1, rest: 0, jumping: false },
      trail: [],
      pointer: { x: -999, y: -999 },
    };
    const resize = () => { state.w = section.clientWidth; state.h = section.clientHeight; };
    resize();
    state.b.x = state.w * 0.7;

    kick.current = () => {
      const angle = Math.random() * Math.PI * 2;
      state.b.vx = Math.cos(angle) * 420;
      state.b.vy = Math.sin(angle) * 420 - 120;
    };

    function place() {
      const { b, c, h } = state;
      ball.current.style.transform = `translate(${b.x - R}px, ${b.y - R}px) rotate(${b.spin}deg) scale(${1 + b.squash}, ${1 - b.squash})`;
      const floor = h - 12;
      cat.current.style.transform = `translate(${c.x - 55}px, ${floor - 74 + c.y}px) scaleX(${c.dir})`;
      cat.current.dataset.state = c.jumping ? "jump" : c.rest > 0 || Math.abs(c.vx) < 15 ? "sit" : "run";
      thread.current.setAttribute("d", state.trail.length > 1 ? "M" + state.trail.map(p => p.join(" ")).join(" L") : "");
    }

    if (reducedQuery.matches) {
      state.b.x = state.w - 160; state.b.y = state.h - 40; state.c.x = state.w - 260;
      place();
      return;
    }

    let frame = 0, last = performance.now(), visible = true;
    function step(now) {
      frame = 0;
      const dt = Math.min((now - last) / 1000, 0.04);
      last = now;
      const { b, c, w, h } = state;
      const floor = h - 12;

      // Bola: velocidade constante com quiques nas bordas e desvio do cursor.
      const px = b.x - state.pointer.x, py = b.y - state.pointer.y, pd = Math.hypot(px, py);
      if (pd < 110 && pd > 0) { b.vx += px / pd * 900 * dt; b.vy += py / pd * 900 * dt; }
      const speed = Math.hypot(b.vx, b.vy);
      const target = 190;
      const k = 1 + (target / speed - 1) * Math.min(1, dt * 1.5);
      b.vx *= k; b.vy *= k;
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.x < R) { b.x = R; b.vx = Math.abs(b.vx); b.squash = 0.18; }
      if (b.x > w - R) { b.x = w - R; b.vx = -Math.abs(b.vx); b.squash = 0.18; }
      if (b.y < R) { b.y = R; b.vy = Math.abs(b.vy); b.squash = -0.18; }
      if (b.y > floor - R) { b.y = floor - R; b.vy = -Math.abs(b.vy); b.squash = -0.18; }
      b.squash *= 0.86;
      b.spin += b.vx * dt * 2.2;
      state.trail.unshift([Math.round(b.x), Math.round(b.y)]);
      if (state.trail.length > 26) state.trail.pop();

      // Gato: corre pelo chão atrás da bola e dá o bote quando ela passa perto.
      if (c.rest > 0) c.rest -= dt;
      const dx = b.x - c.x;
      if (!c.jumping && c.rest <= 0) {
        const desired = Math.sign(dx) * Math.min(Math.abs(dx) * 2.4, 260);
        c.vx += (desired - c.vx) * Math.min(1, dt * 4);
        if (Math.abs(dx) > 8) c.dir = dx > 0 ? 1 : -1;
        if (Math.abs(dx) < 90 && b.y > floor - 190) { c.jumping = true; c.vy = -430; }
      } else if (!c.jumping) c.vx *= 0.8;
      if (c.jumping) {
        c.vy += 1300 * dt;
        c.y += c.vy * dt;
        const catY = floor - 40 + c.y;
        if (Math.hypot(b.x - (c.x + c.dir * 30), b.y - catY) < 50) {
          b.vx = c.dir * (230 + Math.random() * 120);
          b.vy = -260 - Math.random() * 160;
          b.squash = 0.22;
        }
        if (c.y >= 0) { c.y = 0; c.vy = 0; c.jumping = false; c.rest = 0.5 + Math.random() * 0.5; }
      }
      c.x = Math.min(w - 50, Math.max(50, c.x + c.vx * dt));

      place();
      if (visible) frame = requestAnimationFrame(step);
    }

    const move = event => {
      const r = section.getBoundingClientRect();
      state.pointer.x = event.clientX - r.left; state.pointer.y = event.clientY - r.top;
    };
    const leave = () => { state.pointer.x = state.pointer.y = -999; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) { last = performance.now(); frame = requestAnimationFrame(step); }
    });
    observer.observe(section);
    const resizer = new ResizeObserver(resize);
    resizer.observe(section);
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    if (!meow) return;
    const timer = setTimeout(() => setMeow(false), 1600);
    return () => clearTimeout(timer);
  }, [meow]);

  return <div className="yarn-layer" ref={layer}>
    <svg className="yarn-thread" aria-hidden="true"><path ref={thread} /></svg>
    <button type="button" className="yarn-ball" ref={ball} aria-label="Bola de lã. Clique para chutar." onClick={() => kick.current?.()}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" className="yarn-base" />
        <path d="M8 18c10 2 22 10 26 24M12 10c12 4 22 14 24 30M20 5c8 6 16 14 22 28M6 28c8 0 18 6 20 15M30 5c-8 10-20 16-25 16M40 12c-12 6-22 18-26 30" className="yarn-lines" />
        <circle cx="24" cy="24" r="20" className="yarn-outline" />
      </svg>
    </button>
    <button type="button" className="yarn-cat" ref={cat} aria-label="Gatinho branco. Clique para ele miar." onClick={() => setMeow(true)}>
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <g className="cat-tail"><path className="cat-tail-out" d="M26 42C10 36 6 18 16 10" /><path className="cat-tail-in" d="M26 42C10 36 6 18 16 10" /></g>
        <g className="cat-legs cat-legs-b"><rect x="30" y="50" width="9" height="22" rx="4.5" /><rect x="72" y="50" width="9" height="22" rx="4.5" /></g>
        <ellipse className="cat-fur" cx="52" cy="46" rx="30" ry="15" />
        <g className="cat-legs cat-legs-a"><rect x="40" y="50" width="9" height="22" rx="4.5" /><rect x="64" y="50" width="9" height="22" rx="4.5" /></g>
        <path className="cat-fur" d="M75 24 78 8 88 19M90 19 100 9 101 26" />
        <circle className="cat-fur" cx="88" cy="32" r="16" />
        <path className="cat-ear" d="M79 20 80 12 85 18M93 18 98 13 98 21" />
        <circle className="cat-eye" cx="94" cy="30" r="2.6" />
        <circle className="cat-eye" cx="84" cy="30" r="2.4" />
        <path className="cat-nose" d="M89 35h3l-1.5 2Z" />
        <ellipse className="cat-blush" cx="97" cy="36" rx="3" ry="1.8" />
        <path className="cat-whisker" d="M96 37l12-2M96 39l12 2" />
      </svg>
      {meow && <span className="cat-meow" role="status">Miau!</span>}
    </button>
  </div>;
}

function SkillsAndInterests() {
  return (
    <>
      <section className="section skills"><div className="shell">
        <SectionHeading label="HABILIDADES" title="O que uso para criar." />
        <div className="education-grid">{skills.map(([icon, title, items]) =>
          <Reveal className="skill" key={title}><Icon name={icon} size={25} /><h3>{title}</h3>
            <ul className="tags">{items.map(item => <li className="tag" key={item}>{item}</li>)}</ul>
          </Reveal>)}</div>
      </div></section>
      <section className="section interests"><YarnChase /><div className="shell">
        <SectionHeading label="FORA DA TELA" title="O que me move." />
        <FallingInterests />
      </div></section>
    </>
  );
}

function DraggableSticker({ label, className, children, bounds }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moved = useRef(false);
  const reduced = useReducedMotion();
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.button className={"sticker " + className} type="button" aria-label={label}
      drag dragConstraints={bounds} dragMomentum={false} dragElastic={0} style={{ x, y }}
      whileDrag={reduced ? undefined : { scale: 1.14, rotate: 8 }}
      onDragStart={() => { moved.current = true; }}
      onPointerDown={() => { moved.current = false; }}
      onClick={event => { if (!moved.current || event.detail === 0) reset(); }}
      onDoubleClick={reset}>
      {children}
    </motion.button>
  );
}

function Contact() {
  const bounds = useRef(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const whatsapp = "https://wa.me/" + contact.whatsapp + "?text=" + encodeURIComponent("Olá, Rayara! Vi seu portfólio e gostaria de conversar.");
  // Envia pelo FormSubmit (sem servidor próprio). Se falhar, abre o aplicativo de e-mail com a mensagem pronta.
  async function send(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setSending(true);
    setStatus("Enviando…");
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + contact.email, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.get("name"), email: fields.get("email"), message: fields.get("message"),
          _subject: "Contato pelo portfólio: " + fields.get("name"), _template: "table", _captcha: "false",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) === "false") throw new Error(result.message || "Falha no envio");
      form.reset();
      setStatus("Mensagem enviada! Respondo em breve ♡");
    } catch {
      const body = fields.get("message") + "\n\n" + fields.get("name") + "\n" + fields.get("email");
      window.location.href = "mailto:" + contact.email + "?subject=" + encodeURIComponent("Contato pelo portfólio") + "&body=" + encodeURIComponent(body);
      setStatus("Não consegui enviar daqui, então abri seu aplicativo de e-mail com a mensagem pronta.");
    } finally {
      setSending(false);
    }
  }
  return (
    <footer id="contato" className="section contact"><div className="shell">
      <div className="contact-panel" ref={bounds}>
        <div className="contact-grid">
          <div className="contact-intro">
            <div className="eyebrow"><Mail size={16} /> CONTATO</div>
            <h2>Vamos<br /> conversar<span>?</span></h2>
            <p>Tem uma vaga ou um projeto que pede atenção à experiência de quem usa? Adoraria conhecer a ideia.</p>
            <p className="contact-mail"><a href={"mailto:" + contact.email}>{contact.email}</a></p>
          </div>
          <form className="contact-form" onSubmit={send}>
            <div className="form-head"><strong>Me mande uma mensagem</strong><small>Chega direto no meu e-mail</small></div>
            <div className="form-row">
              <label>Nome<input name="name" autoComplete="name" placeholder="Seu nome" required /></label>
              <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="voce@email.com" required /></label>
            </div>
            <label>Mensagem<textarea name="message" rows={4} placeholder="Conte um pouco sobre a vaga ou o projeto" required /></label>
            <button className="button" type="submit" disabled={sending}>{sending ? "Enviando…" : <>Enviar mensagem <Send size={16} /></>}</button>
            <div role="status">{status}</div>
          </form>
        </div>
        <ul className="contact-quick">
          <li><a className="quick quick-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">
            <span className="quick-icon"><MessageCircle size={22} /></span><span><strong>WhatsApp</strong><small>(83) 99928-7661</small></span><ArrowUpRight size={18} /></a></li>
          <li><a className="quick quick-resume" href={contact.resume} download="Curriculo-Rayara-Vilar-Frontend.pdf">
            <span className="quick-icon"><FileDown size={22} /></span><span><strong>Currículo</strong><small>Baixar PDF</small></span><ArrowRight size={18} /></a></li>
          <li><a className="quick" href={contact.linkedin} target="_blank" rel="noreferrer">
            <span className="quick-icon"><Linkedin size={22} /></span><span><strong>LinkedIn</strong><small>/in/rayara-vilar</small></span><ArrowUpRight size={18} /></a></li>
          <li><a className="quick" href={contact.github} target="_blank" rel="noreferrer">
            <span className="quick-icon"><Github size={22} /></span><span><strong>GitHub</strong><small>@RayaraVilar</small></span><ArrowUpRight size={18} /></a></li>
        </ul>
        <div className="sticker-wall">
          <div className="wordmark" aria-hidden="true">Rayara!</div>
          <DraggableSticker className="footer-cat" label="Adesivo de gato. Clique para voltar à posição inicial." bounds={bounds}><Cat /></DraggableSticker>
          <DraggableSticker className="footer-heart" label="Adesivo de coração. Clique para voltar à posição inicial." bounds={bounds}><Heart fill="currentColor" /></DraggableSticker>
          <DraggableSticker className="footer-plane" label="Adesivo de avião. Clique para voltar à posição inicial." bounds={bounds}><Plane /></DraggableSticker>
        </div>
      </div>
      <div className="footer-line"><span>Rayara Vilar · Patos, Paraíba</span><a href="#topo">Voltar ao topo ↑</a></div>
    </div></footer>
  );
}

export default function Page() {
  return <MotionConfig reducedMotion="user">
    <Header />
    <main id="principal">
      <Intro /><Story /><Experience /><Projects /><SkillsAndInterests />
    </main>
    <Contact />
  </MotionConfig>;
}
