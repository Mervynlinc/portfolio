"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { name: "Nurs7", url: "https://github.com/Mervynlinc/nurs7", liveUrl: "https://nurs7.vercel.app/", visual: "dashboard", description: "Nurs7 is the digital home for an independent nursing company serving East Africa — Uganda first, the wider region as it grows. The site has three divisions (Supplies, Publishing, Media), with Supplies as the launch-critical revenue driver." },
  { name: "RideShare", url: "https://github.com/Mervynlinc/rideshare", liveUrl: "https://rideshare-demo.vercel.app/", visual: "rides", description: "RideShare is a student-focused ride-sharing platform for Ugandan universities, helping students find ride buddies heading the same way and split boda-boda transport costs. Students can discover rides by destination, coordinate trips with fellow students, and make everyday travel around campus and town more affordable." },
  { name: "Arena Plus", url: "https://github.com/Mervynlinc/arena-plus", liveUrl: "https://www.arena-plus.me", visual: "code", description: "An intuitive, lightweight mobile sports streaming application that allows fans to easily discover live events, browse categories, and open verified match broadcasts instantly. The application provides an effortless, mobile-optimized gateway to global sports feeds without any unnecessary clutter." },
  { name: "AMR", url: "https://github.com/Mervynlinc/AMR", liveUrl: "https://amr-admin-dashboard.vercel.app/login", visual: "window" },
];

const quotes = [
  { text: "The unexamined life is not worth living.", author: "Socrates", period: "c. 470 BC–399 BC · Classical Greece" },
  { text: "If you know the enemy and know yourself, you need not fear the result of a hundred battles.", author: "Sun Tzu", period: "770 BC–476 BC · Spring and Autumn period" },
  { text: "The mind converts and changes every hindrance to its activity into an aid.", author: "Marcus Aurelius", period: "161 AD–180 AD · Antonine dynasty" },
  { text: "The journey of a thousand li commenced with a single step.", author: "Laozi", period: "770 BC–476 BC · Spring and Autumn period" },
  { text: "Veni, vidi, vici.", translation: "I came, I saw, I conquered.", author: "Julius Caesar", period: "49 BC–44 BC · Roman Republic" },
];

const processSteps = ["System requirements", "Analysis", "Design", "Development", "Testing", "Deployment", "Maintenance"];
const technologies = ["React", "Tailwind CSS", "JavaScript", "Node.js", "Express", "GitHub", "Linux", "Figma"];
const email = "namanyamervyn@gmail.com";
const githubUsername = "Mervynlinc";

function shuffle(values) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildContributionWeeks(contributions) {
  const today = new Date();
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (52 * 7 + 6));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const counts = new Map(contributions.map((day) => [day.date, day]));
  const weeks = [];
  for (let week = 0; week < 53; week += 1) {
    const days = [];
    for (let weekday = 0; weekday < 7; weekday += 1) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + week * 7 + weekday);
      const key = date.toISOString().slice(0, 10);
      days.push(counts.get(key) || { date: key, count: 0, level: 0 });
    }
    weeks.push(days);
  }
  return weeks;
}

function TechIcon({ name }) {
  return (
    <svg className="h-[22px] w-[22px] shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" aria-hidden="true">
      {name === "React" && <><circle cx="12" cy="12" r="2" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.25" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.25" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.25" /></>}
      {name === "Tailwind CSS" && <path d="M4 9c1.2-3.2 3.2-4.8 6-4.8 4.2 0 4.7 3.2 6.8 3.7 1.4.4 2.5-.2 3.2-1.7-1.2 3.2-3.2 4.8-6 4.8-4.2 0-4.7-3.2-6.8-3.7C5.8 7 4.7 7.6 4 9Zm-1 8c1.2-3.2 3.2-4.8 6-4.8 4.2 0 4.7 3.2 6.8 3.7 1.4.4 2.5-.2 3.2-1.7-1.2 3.2-3.2 4.8-6 4.8-4.2 0-4.7-3.2-6.8-3.7-1.4-.4-2.5.2-3.2 1.7Z" fill="currentColor" />}
      {name === "JavaScript" && <><rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="currentColor" /><text x="5" y="17" fill="#10110f" fontSize="8" fontWeight="700">JS</text></>}
      {name === "Node.js" && <><path d="m12 2.4 8.2 4.7v9.5L12 21.3l-8.2-4.7V7.1L12 2.4Z" fill="none" stroke="currentColor" strokeWidth="1.5" /><text x="8" y="15.5" fill="currentColor" fontSize="8" fontWeight="700">N</text></>}
      {name === "Express" && <><path d="M3 5.5h18v13H3z" fill="none" stroke="currentColor" strokeWidth="1.2" /><text x="5" y="15.5" fill="currentColor" fontSize="8" fontWeight="700">ex</text></>}
      {name === "GitHub" && <path d="M12 2.5a9.7 9.7 0 0 0-3.1 18.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.5Z" fill="currentColor" />}
      {name === "Linux" && <><path d="M12 3c-2.5 0-3.8 2.4-3.8 5.7v4.6c-1.6.8-3.3 2.2-3.3 4 0 1.1 1 1.7 2.1 1.7.8 0 1.5-.2 2.1-.7.8.6 1.8.9 2.9.9s2.1-.3 2.9-.9c.6.5 1.3.7 2.1.7 1.1 0 2.1-.6 2.1-1.7 0-1.8-1.7-3.2-3.3-4V8.7C15.8 5.4 14.5 3 12 3Z" fill="none" stroke="currentColor" strokeWidth="1.35" /><circle cx="10.2" cy="8.6" r=".7" fill="currentColor" /><circle cx="13.8" cy="8.6" r=".7" fill="currentColor" /></>}
      {name === "Figma" && <path d="M8 2.5h4v6H8a3 3 0 1 1 0-6Zm4 0h4a3 3 0 1 1 0 6h-4v-6Zm-4 6h4v6H8a3 3 0 1 1 0-6Zm4 0h4a3 3 0 1 1 0 6 3 3 0 0 1-3-3V8.5Zm-4 6h4v4a3 3 0 1 1-3-3h-1Z" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />}
    </svg>
  );
}

function SocialIcon({ type }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg className="h-5 w-5 shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" aria-hidden="true">
      {type === "email" && <><rect x="3" y="5" width="18" height="14" rx="1.5" {...common} /><path d="m4 7 8 6 8-6" {...common} /></>}
      {type === "phone" && <path d="M7.1 3.5h3l1.5 4.2-2 1.8a15 15 0 0 0 4.9 4.9l1.8-2 4.2 1.5v3c0 .8-.7 1.5-1.5 1.5C10.7 18.4 5.6 13.3 5.6 5c0-.8.7-1.5 1.5-1.5Z" {...common} />}
      {type === "whatsapp" && <><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" {...common} /><path d="M8.5 8.2c.3-.7.6-.7 1-.7h.4c.2 0 .4.1.5.4l.7 1.5c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.3.2.5.2.7 0l.7-.8c.2-.2.4-.2.6-.1l1.4.7c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.4-.5.4-1.2.5-2 .3-1-.3-2.2-.9-3.3-2-1.1-1-1.8-2.2-2-3.1-.2-.7-.1-1.2.2-1.6Z" fill="currentColor" /></>}
      {type === "linkedin" && <><rect x="3" y="3" width="18" height="18" rx="2" {...common} /><path d="M7.5 10v7m0-10v.1M11 17v-7h2.4v1.1c.4-.8 1.1-1.3 2.2-1.3 1.8 0 2.9 1.1 2.9 3.4V17" {...common} /></>}
    </svg>
  );
}

function ProjectVisual({ type }) {
  const visuals = {
    dashboard: { src: "/projects/nurs7.png", alt: "Nurs7 nursing platform homepage" },
    rides: { src: "/projects/rideshare.png", alt: "RideShare project landing page" },
    code: { src: "/projects/arena-plus.png", alt: "Arena Plus mobile app landing page" },
    window: { src: "/projects/amr.png", alt: "AMR Admin surveillance dashboard sign-in page" },
  };
  const visual = visuals[type];
  return <div className="project-visual"><img src={visual.src} alt={visual.alt} loading="lazy" /></div>;
}

function ProcessSequence({ duplicate = false }) {
  return (
    <div className="process-sequence" aria-hidden={duplicate || undefined}>
      {processSteps.map((step, index) => (
        <span className="contents" key={step}>
          <span className="inline-flex items-center gap-2.5 whitespace-nowrap"><b className="process-number">{String(index + 1).padStart(2, "0")}</b>{step}</span>
          <span className="process-arrow" aria-hidden="true">→</span>
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [projectList, setProjectList] = useState(projects);
  const [githubStats, setGithubStats] = useState(null);
  const [githubStatsLoaded, setGithubStatsLoaded] = useState(false);
  const [quoteOrder, setQuoteOrder] = useState([0, 1, 2, 3, 4]);
  const [quoteCursor, setQuoteCursor] = useState(0);
  const [quotePaused, setQuotePaused] = useState(false);
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);
  const modelRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    try { setTheme(localStorage.getItem("portfolio-theme") || "dark"); } catch { /* storage may be unavailable */ }
    setQuoteOrder(shuffle([0, 1, 2, 3, 4]));
  }, []);

  useEffect(() => {
    let active = true;
    let lastRefresh = 0;
    const refreshInterval = 60 * 60 * 1000;
    async function refreshGithubData(force = false) {
      if (!force && Date.now() - lastRefresh < refreshInterval) return;
      lastRefresh = Date.now();
      try {
        const response = await fetch("/api/github", { cache: "no-store" });
        if (!response.ok) throw new Error("GitHub data unavailable");
        const data = await response.json();
        if (!active) return;
        if (Array.isArray(data.projects) && data.projects.length) {
          const remoteProjects = new Map(data.projects.map((project) => [project.name, project]));
          setProjectList(projects.map((project) => {
            const remoteProject = remoteProjects.get(project.name);
            return { ...project, ...remoteProject, description: project.description || remoteProject?.description };
          }));
        }
        setGithubStats(data.streak || null);
        setGithubStatsLoaded(true);
      } catch {
        if (active) setGithubStatsLoaded(true);
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) refreshGithubData();
    };
    refreshGithubData(true);
    const interval = window.setInterval(() => refreshGithubData(), refreshInterval);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* storage may be unavailable */ }
  }, [theme]);

  useEffect(() => () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
  }, []);

  useEffect(() => {
    if (quotePaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setTimeout(() => {
      if (quoteCursor + 1 < quoteOrder.length) {
        setQuoteCursor(quoteCursor + 1);
      } else {
        const nextOrder = shuffle([0, 1, 2, 3, 4]);
        if (nextOrder[0] === quoteOrder[quoteCursor]) [nextOrder[0], nextOrder[1]] = [nextOrder[1], nextOrder[0]];
        setQuoteOrder(nextOrder);
        setQuoteCursor(0);
      }
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [quoteOrder, quoteCursor, quotePaused]);

  function moveQuote(direction) {
    if (direction > 0 && quoteCursor === quoteOrder.length - 1) {
      const nextOrder = shuffle([0, 1, 2, 3, 4]);
      if (nextOrder[0] === quoteOrder[quoteCursor]) [nextOrder[0], nextOrder[1]] = [nextOrder[1], nextOrder[0]];
      setQuoteOrder(nextOrder);
      setQuoteCursor(0);
      return;
    }
    setQuoteCursor((cursor) => (cursor + direction + quoteOrder.length) % quoteOrder.length);
  }

  function moveModel(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    modelRef.current?.setAttribute("camera-orbit", ((x - 0.5) * 32) + "deg 75deg 85%");
  }

  function resetModel() {
    modelRef.current?.setAttribute("camera-orbit", "0deg 75deg 85%");
  }

  function showToast(type, message) {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ type, message });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 6000);
  }

  async function sendContact(event) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      form.reset();
      showToast("success", "Message sent. Thanks for reaching out.");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const quote = quotes[quoteOrder[quoteCursor]];
  return (
    <>
      {toast && <div className={"fixed right-4 top-4 z-[100] flex max-w-[calc(100vw-2rem)] items-start gap-4 border px-4 py-3 shadow-[0_12px_40px_#0008] sm:right-6 sm:top-6 " + (toast.type === "success" ? "border-[var(--accent)] bg-[var(--panel)] text-[var(--ink)]" : "border-[#d8756e] bg-[var(--panel)] text-[var(--ink)]")} role={toast.type === "error" ? "alert" : "status"} aria-live={toast.type === "error" ? "assertive" : "polite"}>
        <span className={"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold " + (toast.type === "success" ? "bg-[var(--accent)] text-[#11130d]" : "bg-[#d8756e] text-[#11130d]")} aria-hidden="true">{toast.type === "success" ? "✓" : "!"}</span>
        <p className="m-0 flex-1 text-[13px] leading-relaxed">{toast.message}</p>
        <button className="ml-1 text-[18px] leading-none text-[var(--muted)] hover:text-[var(--ink)]" type="button" onClick={() => setToast(null)} aria-label="Dismiss notification">×</button>
      </div>}
      <header className="shell flex h-[76px] items-center justify-between border-b border-[var(--line)]">
        <a className="flex items-center gap-[11px] font-semibold tracking-[-.025em]" href="#top" aria-label="Namanya Mervyn home">
          <span className="h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full border border-[#55594d]"><img src="/namanya-portrait.png" alt="" className="h-full w-full object-cover object-[50%_29%]" /></span>
          <span>Namanya Mervyn</span>
        </a>
        <nav className="ml-auto flex items-center gap-3 text-[10px] text-[var(--muted)] sm:gap-8 sm:text-[13px]" aria-label="Main navigation">
          <a className="hover:text-[var(--accent)]" href="#work">Work</a><a className="hover:text-[var(--accent)]" href="#about">About</a><a className="hover:text-[var(--accent)]" href="#contact">Contact</a>
          <button type="button" className="inline-flex min-h-9 items-center gap-2 border border-[var(--line)] bg-transparent px-2.5 py-1.5 font-sans text-[10px] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]" onClick={() => setTheme((value) => value === "dark" ? "light" : "dark")} aria-label={"Switch to " + (theme === "dark" ? "light" : "dark") + " mode"}>
            <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span><span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="shell grid min-h-[605px] grid-cols-1 items-center gap-4 py-[58px] sm:py-[72px] lg:grid-cols-[1.1fr_.9fr] lg:gap-[50px] lg:pb-[84px]">
          <div>
            <div className="font-sans text-[13px] tracking-[.02em] text-[var(--accent)]">Software engineer · Web · Mobile · DevOps</div>
            <h1 className="mt-7 mb-6 max-w-[660px] text-[clamp(54px,7vw,88px)] font-medium leading-[.99] tracking-[-.072em]">Building across<br />screens and<br /><em className="display-serif font-normal not-italic text-[var(--accent)]">systems.</em></h1>
            <p className="max-w-[485px] text-[15px] leading-[1.75] text-[#b8b8af] sm:text-[17px]">I’m <strong className="font-semibold text-[var(--ink)]">Namanya Mervyn</strong>, a software engineer working across web and mobile development, with a focus on building and operating dependable digital products.</p>
            <div className="mt-[35px] flex items-center gap-7">
              <a className="inline-flex items-center gap-[17px] bg-[var(--accent)] px-[18px] py-[14px] text-[15px] font-semibold transition hover:-translate-y-0.5 hover:bg-[#d7ff83]" style={{ color: theme === "dark" ? "#000" : "#11130d" }} href="#work">Explore my work </a>
              <a className="text-[15px] text-[var(--muted)] transition hover:text-[var(--accent)]" href="/mervyn_namanya_cv.pdf" download="Namanya-Mervyn-CV.pdf">Download my CV</a>
            </div>
          </div>
          <div className="relative grid min-h-[290px] place-items-stretch sm:min-h-[340px] lg:min-h-[600px]" onPointerMove={moveModel} onPointerLeave={resetModel} aria-label="Interactive Julius Caesar 3D model, horizontally responsive">
            <model-viewer ref={modelRef} className="portrait-viewer" src="/julius-caesar.glb" poster="/julius-caesar.jpg" alt="Interactive 3D marble bust of Julius Caesar" loading="lazy" camera-controls disable-zoom disable-pan touch-action="pan-y" camera-orbit="0deg 75deg 85%" field-of-view="26deg" min-camera-orbit="-16deg 75deg 85%" max-camera-orbit="16deg 75deg 85%" interaction-prompt="none"><img slot="poster" src="/julius-caesar.jpg" alt="Black and white marble bust of Julius Caesar" draggable="false" /></model-viewer>
          </div>
        </section>

        <div className="process-marquee sm:text-[17px]" role="region" aria-label="Software development lifecycle">
          <div className="process-track"><ProcessSequence /><ProcessSequence duplicate /></div>
        </div>

        <section id="work" className="shell scroll-mt-8 py-[76px] sm:py-[106px]">
          <div className="mb-[33px] flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-[30px]"><h2 className="text-[clamp(35px,4vw,51px)] font-medium leading-[1.07] tracking-[-.055em]">Built with purpose.</h2></div>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            {projectList.map((project, index) => (
              <a key={project.name} className="flex flex-col overflow-hidden border border-[var(--line)] bg-[var(--panel)] text-inherit no-underline transition hover:-translate-y-[3px] hover:border-[#626a4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live site`}>
                <ProjectVisual type={project.visual} />
                <div className="flex flex-1 flex-col px-6 pt-[23px] pb-[25px]">
                  <div className="flex items-center justify-between gap-4"><h3 className="m-0 text-xl font-medium tracking-[-.035em]">{project.name}</h3><span className="font-sans text-[10px] text-[var(--faint)]">{String(index + 1).padStart(2, "0")} / 04</span></div>
                  <p className="my-2.5 mb-4 min-h-[43px] text-[13px] text-[var(--muted)] sm:text-[17px]">{project.description || "Explore the code, README, and project details in the repository."}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-3"><span className="inline-flex items-center gap-2 font-sans text-[10px] text-[var(--accent)]">Visit live site ↗</span><span className="inline-flex border border-[#383b33] px-2 py-1 font-sans text-[9px] text-[#aaa99f]">{project.language || "GitHub project"}{Number.isFinite(project.stars) ? ` · ★ ${project.stars}` : ""}</span></div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-[var(--line)] bg-[#141512] py-[75px] sm:py-[100px]" style={{ background: "var(--panel)" }}>
          <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-[100px]">
            <div className="self-start lg:sticky lg:top-8"><h2 className="text-[clamp(35px,4vw,51px)] font-medium leading-[1.07] tracking-[-.055em]">Good software<br />starts with<br />good questions.</h2></div>
            <div className="text-[15px] leading-[1.8] text-[#b7b8af] sm:text-[17px]">
              <p className="mb-[22px] mt-0">I build for the web and mobile, and I care about what happens after software ships. My work spans <strong className="font-medium text-[var(--ink)]">application development and DevOps</strong>—from shaping a useful experience to helping the systems behind it run reliably.</p>
              <p className="mb-[22px] mt-0">I bring curiosity, care, and a steady focus on solving the problem in front of me. We can add a more personal note here when you’re ready.</p>
              <div className="mt-8 grid grid-cols-3 gap-2.5">
                {["Start with people", "Make it clear", "Keep improving"].map((principle) => <button className="principle-reveal flex min-h-[104px] flex-col items-center border-t border-[#46483e] bg-transparent pt-3.5 font-sans text-[10px] text-[#d2d2c9] sm:text-[11px]" type="button" aria-label={"Show principle: " + principle} key={principle}><span className="principle-copy"><span>{principle}</span></span></button>)}
              </div>
            </div>
          </div>
        </section>

        <section className="shell scroll-mt-8 overflow-hidden py-[72px] sm:py-[100px]" aria-labelledby="quote-heading">
          <div className="mb-[33px] flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-[30px]"><h2 id="quote-heading" className="text-[clamp(35px,4vw,51px)] font-medium leading-[1.07] tracking-[-.055em]">How to think. How to act.</h2></div>
          <div className="relative border border-[var(--line)] bg-[radial-gradient(ellipse_at_80%_0%,#31392255_0%,transparent_48%),#151612] px-5 pt-[34px] pb-6 sm:px-[clamp(22px,7vw,84px)] sm:pt-[43px] sm:pb-9" onMouseEnter={() => setQuotePaused(true)} onMouseLeave={() => setQuotePaused(false)} onFocus={() => setQuotePaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setQuotePaused(false); }}>
            <div className="quote-mark pointer-events-none absolute top-3 right-4 text-[65px] text-[#657447] sm:top-5 sm:right-[30px] sm:text-[90px]" aria-hidden="true">“</div>
            <figure key={quote.text} className="quote-slide flex min-h-[195px] flex-col justify-center sm:min-h-[170px]">
              <blockquote className="quote-text m-0 max-w-[850px]">{quote.text}{quote.translation && <span className="mt-3 block font-sans text-[15px] italic leading-normal tracking-normal text-[var(--muted)]">{quote.translation}</span>}</blockquote>
              <figcaption className="mt-6 font-sans text-[10px] uppercase tracking-[.08em] text-[var(--muted)]">{quote.author} · {quote.period}</figcaption>
            </figure>
            <div className="mt-3 flex items-center justify-end"><div className="flex gap-2"><button className="h-[34px] w-[34px] border border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]" type="button" onClick={() => moveQuote(-1)} aria-label="Previous quote">←</button><button className="h-[34px] w-[34px] border border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]" type="button" onClick={() => moveQuote(1)} aria-label="Next quote">→</button></div></div>
          </div>
        </section>

        <section className="shell scroll-mt-8 pb-[75px] sm:pb-[102px]" aria-labelledby="stack-heading">
          <div className="mb-[33px] flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-[30px]"><h2 id="stack-heading" className="text-[clamp(35px,4vw,51px)] font-medium leading-[1.07] tracking-[-.055em]">My everyday toolkit.</h2></div>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            <article className="min-h-[218px] border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-[26px]"><h3 className="mb-5 text-[15px] font-medium tracking-[-.025em] sm:text-[17px]">Technologies I use</h3><div className="grid grid-cols-2 gap-[9px]">{technologies.map((tech) => <span key={tech} className="tech-tile flex min-h-12 items-center gap-[11px] border border-[#3b3e34] px-2.5 py-2 font-rounded text-[12px] text-[#d0d0c7] sm:text-[17px]"><TechIcon name={tech} />{tech}</span>)}</div></article>
            <article className="min-h-[218px] border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-[26px]"><h3 className="mb-3 text-[17px] font-medium tracking-[-.025em]">GitHub contributions</h3><p className="mb-[18px] text-xs text-[var(--muted)]">Daily activity over the past year.</p><div className="min-h-[105px] border border-dashed border-[#41443a] bg-[#121310] p-3">{githubStats?.contributions?.length ? <><div className="overflow-x-auto pb-2"><div className="grid w-full grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: "repeat(53, minmax(8px, 1fr))" }} role="img" aria-label="GitHub contribution activity for the past year">{buildContributionWeeks(githubStats.contributions).flatMap((week, weekIndex) => week.map((day, dayIndex) => {
              const colors = ["bg-[#171b22]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"];
              return <span key={`${weekIndex}-${dayIndex}`} className={`aspect-square w-full rounded-[2px] ${colors[Math.min(4, day.level || 0)]}`} title={`${day.date}: ${day.count} contributions`} aria-hidden="true" />;
            }))}</div></div><div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-[var(--muted)]"><span>{githubStats.currentStreak} day current streak</span><span>{githubStats.totalContributions} contributions this year</span></div></> : <p className="m-0 py-10 text-center text-xs text-[var(--muted)]">{githubStatsLoaded ? "Live contribution data is temporarily unavailable." : "Loading live contribution data…"}</p>}</div></article>
          </div>
        </section>

        <section id="contact" className="shell scroll-mt-8 pt-[76px] pb-[79px] sm:pt-[106px]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:gap-[30px]"><h2 className="max-w-none text-[clamp(30px,6vw,72px)] font-medium leading-[1.07] tracking-[-.055em]"><span className="block whitespace-nowrap">Have a good problem</span><span className="block whitespace-nowrap">to solve together?</span></h2></div>
          <form className="mt-[45px] border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7" onSubmit={sendContact}>
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <label className="flex flex-col gap-2 font-rounded text-[15px] tracking-[.07em] text-[#c3c4bb] sm:text-[17px]">your name<input className="w-full border border-[#383a32] bg-[#11120f] px-3.5 py-[13px] font-rounded text-[15px] normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--accent)] sm:text-[17px]" name="name" autoComplete="name" required placeholder="Name" /></label>
              <label className="flex flex-col gap-2 font-rounded text-[15px] tracking-[.07em] text-[#c3c4bb] sm:text-[17px]">your email<input className="w-full border border-[#383a32] bg-[#11120f] px-3.5 py-[13px] font-rounded text-[15px] normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--accent)] sm:text-[17px]" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
              <label className="flex flex-col gap-2 font-rounded text-[15px] tracking-[.07em] text-[#c3c4bb] sm:col-span-2 sm:text-[17px]">subject<input className="w-full border border-[#383a32] bg-[#11120f] px-3.5 py-[13px] font-rounded text-[15px] normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--accent)] sm:text-[17px]" name="subject" required placeholder="What would you like to talk about?" /></label>
              <label className="flex flex-col gap-2 font-rounded text-[15px] tracking-[.07em] text-[#c3c4bb] sm:col-span-2 sm:text-[17px]">message<textarea className="min-h-[135px] w-full resize-y border border-[#383a32] bg-[#11120f] px-3.5 py-[13px] font-rounded text-[15px] normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--accent)] sm:text-[17px]" name="message" required placeholder="Tell me a little about it..." /></label>
            </div>
            <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><button className="inline-flex items-center gap-[17px] bg-[var(--accent)] px-[18px] py-[14px] text-[13px] font-semibold text-[#11130d] transition hover:-translate-y-0.5 hover:bg-[#d7ff83] disabled:cursor-wait disabled:opacity-70" type="submit" disabled={sending}>{sending ? "Sending…" : "Send message"} <span className="text-[19px]">{sending ? "…" : "↗"}</span></button><span className="font-sans text-[10px] text-[var(--muted)]" aria-live="polite">{sending ? "Sending your message…" : ""}</span></div>
          </form>
        </section>
      </main>

      <footer id="contact-details" className="mt-[22px] border-t border-[var(--line)] bg-[#141512] font-sans text-[11px] text-[var(--muted)]" style={{ background: "var(--panel)" }}>
        <div className="shell pt-10 pb-[23px]">
          <div className="flex flex-col justify-between gap-7 border-b border-[var(--line)] pb-8 md:flex-row md:gap-10">
            <div><h2 className="mb-2 text-[22px] font-medium tracking-[-.04em] text-[var(--ink)]">Namanya Mervyn</h2><p className="max-w-[280px] font-sans text-[12px] leading-relaxed text-[var(--faint)]">Software engineer · Web · Mobile · DevOps</p></div>
            <div className="min-w-0 md:min-w-[min(100%,550px)]"><h3 className="mb-3.5 font-sans text-[10px] uppercase tracking-[.1em] text-[#d0d0c7]">Find me around the web</h3><div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a className="social-link flex min-h-12 items-center gap-[11px] border border-[#33352e] px-[11px] py-[9px]" href="https://wa.me/256786556617" target="_blank" rel="noreferrer"><SocialIcon type="whatsapp" /><span>WhatsApp<small className="mt-0.5 block font-sans text-[9px] text-[var(--faint)]">+256 786556617</small></span></a>
              <a className="social-link flex min-h-12 items-center gap-[11px] border border-[#33352e] px-[11px] py-[9px]" href="tel:+256702988255"><SocialIcon type="phone" /><span>Phone<small className="mt-0.5 block font-sans text-[9px] text-[var(--faint)]">+256 702988255</small></span></a>
              <a className="social-link flex min-h-12 items-center gap-[11px] border border-[#33352e] px-[11px] py-[9px]" href={"mailto:" + email}><SocialIcon type="email" /><span>Email<small className="mt-0.5 block font-sans text-[9px] text-[var(--faint)]">{email}</small></span></a>
              <a className="social-link flex min-h-12 items-center gap-[11px] border border-[#33352e] px-[11px] py-[9px]" href="https://www.linkedin.com/in/namanya-mervyn-8ab510326/" target="_blank" rel="noreferrer"><SocialIcon type="linkedin" /><span>LinkedIn<small className="mt-0.5 block font-sans text-[9px] text-[var(--faint)]">View my profile</small></span></a>
            </div></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-[18px] font-sans text-[10px] text-[var(--faint)] sm:flex-row"><span>© {new Date().getFullYear()} Namanya Mervyn</span><a className="hover:text-[var(--accent)]" href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </>
  );
}
