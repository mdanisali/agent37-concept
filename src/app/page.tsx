"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Star,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Lightbulb,
  Zap,
  LayoutDashboard,
  MessageSquare,
  Monitor,
  Link2,
  Mail,
  MessageCircle,
  FileText,
  Github,
  Gamepad2,
  Smartphone,
  Send,
  Calendar,
  Sheet,
  Database,
  Wrench,
  Package,
  Bell,
  Globe,
  Check,
  Heart,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ========= DATA ========= */

const USE_CASES = [
  {
    icon: BarChart3,
    title: "Market Scanning Bot",
    desc: "An agent that scans markets every 5 seconds, flags anomalies, and sends alerts to Telegram — no tokens needed to keep it running.",
    quote: '"Built a bot that scans markets every 5 seconds. No tokens burned to run." — Mike T.',
  },
  {
    icon: Lightbulb,
    title: "Business Idea Assistant",
    desc: "A personal AI co-founder that researches markets, validates ideas, drafts pitch decks, and connects to your calendar and email.",
    quote: '"Helping me with a business idea, solving a problem in my day job." — Ryan M.',
  },
  {
    icon: Zap,
    title: "Personal Automation Agent",
    desc: "Automate email triage, Notion updates, Slack summaries, and 850+ integrations — all from a single OpenClaw instance running 24/7.",
    quote: '"The hardening alone was worth it." — Daniel R.',
  },
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Provision & monitor instances in one dashboard",
    desc: "Spin up, restart, and monitor all your OpenClaw agents from a single clean interface.",
  },
  {
    icon: MessageSquare,
    title: "Access the OpenClaw Dashboard",
    desc: "Full chat interface to interact with your agent. Configure skills, prompts, and behaviours.",
  },
  {
    icon: Monitor,
    title: "Full terminal access through your browser",
    desc: "TTYD shell access right in the browser. Install packages, debug, configure — full root access.",
  },
  {
    icon: Link2,
    title: "Connect Gmail, Calendar, Notion, and 850+ apps",
    desc: "Pre-configured integrations. No OAuth setup, no API wrangling. Just toggle and go.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Sign up & choose a plan",
    desc: "Pick Basic, Pro, or Max depending on your needs. Checkout takes 30 seconds.",
  },
  {
    num: "02",
    title: "Instance launches in ~60s",
    desc: "An isolated container with HTTPS, terminal access, and the full OpenClaw dashboard.",
  },
  {
    num: "03",
    title: "Start building",
    desc: "Open the dashboard, connect integrations, and let your agents run 24/7.",
  },
];

const INTEGRATIONS = [
  { icon: Mail, name: "Gmail" },
  { icon: MessageCircle, name: "Slack" },
  { icon: FileText, name: "Notion" },
  { icon: Github, name: "GitHub" },
  { icon: Gamepad2, name: "Discord" },
  { icon: Smartphone, name: "WhatsApp" },
  { icon: Send, name: "Telegram" },
  { icon: Calendar, name: "Google Calendar" },
  { icon: Sheet, name: "Google Sheets" },
  { icon: Database, name: "Airtable" },
  { icon: Wrench, name: "Jira" },
  { icon: Package, name: "Trello" },
  { icon: Bell, name: "Zapier" },
  { icon: Globe, name: "Webhooks" },
];

const PRICING = [
  {
    name: "Basic",
    price: "$3.99",
    desc: "Perfect for getting started",
    features: [
      "1 vCPU, 4 GB RAM, 12 GB storage",
      "Bring your own API keys (BYOK)",
      "All AI models (Claude, GPT, Gemini)",
      "1,000+ ready-to-use integrations",
      "Discord/Community support",
      "~5M Agent37 LLM tokens / month",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29.99",
    desc: "For power users & builders",
    features: [
      "Everything in Basic",
      "2 vCPU, 8 GB RAM, 30 GB storage",
      "Built-in browser (Chromium)",
      "Email/Chat support",
      "~25M Agent37 LLM tokens / month",
      "1K Brave Web Search calls / month",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Max",
    price: "$99.99",
    desc: "For teams & enterprises",
    features: [
      "Everything in Pro",
      "4 vCPU, 16 GB RAM, 60 GB storage",
      "Dedicated onboarding (weekly call)",
      "Priority support",
      "Team management + roles",
      "~100M Agent37 LLM tokens / month",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const TESTIMONIALS = [
  { initials: "NK", name: "Nemke K.", quote: "Your slots are going insanely fast. Already sent referrals to friends." },
  { initials: "MT", name: "Mike T.", quote: "Built a bot that scans markets every 5 seconds… No tokens needed to run." },
  { initials: "RM", name: "Ryan M.", quote: "Helping me with a business idea… solving a problem in my day job." },
  { initials: "AB", name: "Andrew B.", quote: "Solving a problem that people like me probably wouldn't take the time to solve ourselves." },
  { initials: "DR", name: "Daniel R.", quote: "The hardening alone was worth it." },
  { initials: "JP", name: "James P.", quote: "Give people a few days at a low cost and they will be hooked." },
];

const FAQS = [
  { q: "What's the catch?", a: "It's shared infrastructure on managed containers. You get a dedicated container with isolated storage, but the underlying hardware is shared — which is how we keep the price at $3.99/mo." },
  { q: "Do I get full terminal access?", a: "Yes. Full TTYD shell access right in your browser. Install packages, configure settings, debug — you have root access to your container." },
  { q: "Can I bring my own API key?", a: "Yes. You can configure any provider — Anthropic, OpenAI, Google, or any OpenAI-compatible endpoint. Your keys, your models." },
  { q: "What if I cancel?", a: "Your instance stops at the end of your billing period. You can export your data anytime before that. No lock-in, no penalties." },
  { q: "What's the difference between tiers?", a: "Resources (CPU, RAM, storage), tool limits (search calls, LLM tokens), and features (browser access, team management, priority support)." },
  { q: "What happened to $0.99 pricing?", a: "The $0.99 founding batch was a limited launch offer and all spots were filled. The current early bird rate is $3.99/mo." },
  { q: "Can I upgrade later?", a: "Yes. Upgrades apply immediately and you're only charged the prorated difference for the rest of your billing cycle." },
  { q: "Is my data isolated?", a: "Yes. Every instance runs in its own Docker container with separate storage volumes. Your data is completely isolated from other users." },
];

const TERMINAL_LINES = [
  { text: "$ openclaw deploy --plan basic", delay: 0 },
  { text: "⠋ Provisioning container...", delay: 800 },
  { text: "✓ Container ready (1 vCPU, 4GB RAM)", delay: 2000 },
  { text: "✓ HTTPS configured", delay: 2800 },
  { text: "✓ Terminal access enabled", delay: 3400 },
  { text: "✓ Dashboard live at agent37.com/i/thor", delay: 4200 },
  { text: "", delay: 5000 },
  { text: "🚀 Your OpenClaw instance is running!", delay: 5200 },
  { text: "   Uptime: 24/7 | Status: healthy", delay: 5800 },
];

/* ========= LOGO ========= */
function AgentLogo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Agent 37"
      width={size}
      height={size}
      style={{ filter: "invert(1)" }}
    />
  );
}

/* ========= LIVE TERMINAL COMPONENT ========= */
function LiveTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const lineTimers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const restartTimer = setTimeout(() => {
      setVisibleLines(0);
      // Re-trigger after full cycle
      const cycle = setInterval(() => {
        setVisibleLines(0);
        TERMINAL_LINES.forEach((line, i) => {
          setTimeout(() => setVisibleLines(i + 1), line.delay);
        });
      }, 8000);
      return () => clearInterval(cycle);
    }, 8000);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(restartTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden animate-float">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-[#555] ml-2 font-mono">thor@agent37</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green animate-blink" />
          <span className="text-[0.7rem] font-semibold text-green uppercase tracking-wider">Live</span>
          <span className="text-xs text-[#555] font-mono ml-2">{formatTime(timer)}</span>
        </div>
      </div>
      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[220px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${
              line.text.startsWith("✓") ? "text-green" :
              line.text.startsWith("🚀") ? "text-white font-semibold" :
              line.text.startsWith("$") ? "text-white" :
              "text-[#666]"
            }`}
          >
            {line.text}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-white/80 animate-cursor" />
        )}
      </div>
    </div>
  );
}

/* ========= HOW IT WORKS WITH CYCLING HIGHLIGHT ========= */
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">How it works</h2>
          <p className="text-[#888] text-lg max-w-[600px] mx-auto">From zero to running agent in under 2 minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting arrows between cards */}
          <div className="hidden md:flex absolute top-1/2 left-[calc(33.33%+2px)] -translate-y-1/2 z-10">
            <ChevronRight className={`w-6 h-6 transition-colors duration-500 ${activeStep >= 1 ? "text-white" : "text-white/20"}`} />
          </div>
          <div className="hidden md:flex absolute top-1/2 left-[calc(66.66%+2px)] -translate-y-1/2 z-10">
            <ChevronRight className={`w-6 h-6 transition-colors duration-500 ${activeStep >= 2 ? "text-white" : "text-white/20"}`} />
          </div>

          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`relative bg-[#0a0a0a] rounded-2xl p-8 transition-all duration-700 ease-in-out cursor-default ${
                activeStep === i
                  ? "border-2 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.08)] scale-[1.02]"
                  : "border border-white/[0.06] opacity-50 scale-100"
              }`}
              onMouseEnter={() => setActiveStep(i)}
            >
              <div className={`text-4xl font-extrabold mb-4 transition-colors duration-500 font-mono ${
                activeStep === i ? "text-white" : "text-white/20"
              }`}>
                {s.num}
              </div>
              <h3 className={`text-[1.05rem] font-bold mb-2.5 tracking-tight transition-colors duration-500 ${
                activeStep === i ? "text-white" : "text-white/50"
              }`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                activeStep === i ? "text-[#aaa]" : "text-[#555]"
              }`}>{s.desc}</p>

              {/* Active indicator bar */}
              <div className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-700 ${
                activeStep === i ? "bg-white" : "bg-transparent"
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========= AUTO-SCROLLING INTEGRATIONS ========= */
function IntegrationsMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.5; // pixels per frame
    let rafId: number;
    let paused = false;

    const step = () => {
      if (!paused) {
        pos += speed;
        // Reset when half the content has scrolled (since we doubled items)
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.style.transform = `translateX(-${pos}px)`;
      }
      rafId = requestAnimationFrame(step);
    };

    el.addEventListener("mouseenter", () => (paused = true));
    el.addEventListener("mouseleave", () => (paused = false));

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const items = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">850+ Integrations</h2>
          <p className="text-[#888] text-lg max-w-[600px] mx-auto">Connect anything your agent needs — out of the box</p>
        </div>
      </div>

      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div ref={scrollRef} className="flex w-max gap-4 py-4 will-change-transform">
          {items.map((int, i) => (
            <div key={`${int.name}-${i}`} className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 bg-[#0a0a0a] border border-white/[0.08] rounded-full text-sm font-medium text-[#888] hover:border-white/15 hover:text-white transition-colors whitespace-nowrap">
              <int.icon className="w-4 h-4" />
              {int.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========= PAGE ========= */
export default function HomePage() {
  return (
    <>
      {/* ==================== NAVBAR — Fix #1: center-aligned links ==================== */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[900px] bg-black/70 backdrop-blur-xl border border-white/[0.06] rounded-full px-6 py-2.5 flex items-center justify-between transition-colors hover:border-white/10">
        <a href="#" className="flex items-center gap-2.5 font-bold text-[1.05rem] tracking-tight flex-shrink-0">
          <AgentLogo size={28} />
          Agent 37
        </a>

        {/* Center-aligned nav links */}
        <div className="hidden md:flex items-center justify-center gap-7 flex-1">
          <a href="#how-it-works" className="text-sm text-[#888] hover:text-white transition-colors font-medium">How it works</a>
          <a href="#pricing" className="text-sm text-[#888] hover:text-white transition-colors font-medium">Pricing</a>
          <a href="#faq" className="text-sm text-[#888] hover:text-white transition-colors font-medium">FAQ</a>
          <a href="https://skills.agent37.com" target="_blank" rel="noopener" className="text-sm text-[#888] hover:text-white transition-colors font-medium">Browse Skills</a>
        </div>

        <a href="#" className="hidden md:inline-flex flex-shrink-0 bg-white text-black px-5 py-2 rounded-full text-[0.82rem] font-semibold hover:bg-gray-200 transition-all">
          Claim $3.99/mo Spot
        </a>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="pt-40 pb-20 text-center relative overflow-hidden">
        {/* Subtle blue side glow */}
        <div className="absolute top-0 left-0 w-[400px] h-full bg-[radial-gradient(ellipse_at_left,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-full bg-[radial-gradient(ellipse_at_right,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* PH Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/[0.08] rounded-full px-4 py-1.5 text-[0.82rem] text-[#888] mb-8">
            <Star className="w-4 h-4 text-orange-500" />
            Product Hunt #1 Product of the Day
          </div>

          <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-5 max-w-[800px] mx-auto text-white">
            Your own OpenClaw instance for{" "}
            <span className="border border-white/20 rounded-xl px-4 py-1 inline-block">$3.99/mo</span>
          </h1>

          <p className="text-lg text-[#888] mb-9 max-w-[560px] mx-auto">
            No setup work. Full terminal access. Live in ~60 seconds.
          </p>

          {/* Availability */}
          <div className="mb-8">
            <p className="text-sm text-[#888] mb-2.5">
              <span className="text-white font-semibold">197 spots left</span> at $3.99/mo — then $9.99/mo for new signups
            </p>
            <div className="w-80 h-1.5 bg-white/[0.08] rounded-full mx-auto overflow-hidden">
              <div className="h-full w-[80%] bg-white rounded-full animate-pulse-glow" />
            </div>
          </div>

          {/* DUAL CTAs */}
          <div className="flex items-center justify-center gap-4 mb-5 flex-wrap">
            <a href="#" className="bg-white text-black px-8 py-3.5 rounded-full text-[0.95rem] font-semibold hover:bg-gray-200 transition-all inline-flex items-center gap-2">
              Claim $3.99/mo Spot
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#use-cases" className="bg-white/[0.06] border border-white/10 text-white px-8 py-3.5 rounded-full text-[0.95rem] font-semibold hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2">
              See what people build
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[0.8rem] text-[#555]">Cancel anytime · Shared infrastructure · Money-back guarantee</p>

          {/* Fix #2: AI provider logos instead of "Available on" */}
          <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
            <span className="text-[0.7rem] uppercase tracking-widest text-[#555] font-semibold">Integrate with any AI</span>
            <div className="flex items-center gap-3 ml-2">
              {/* Claude (Anthropic) */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/[0.08] rounded-full text-[0.78rem] text-[#aaa] font-medium">
                <svg className="w-4 h-4" viewBox="0 0 46 32" fill="currentColor">
                  <path d="M33.6 0H25.5l12.2 32h8.1L33.6 0zM8.2 0L0 32h7.8l1.7-4.8h12.9L24 32h7.8L19.7 0H8.2zm3.8 21.2L16 9.5l4 11.7H12z"/>
                </svg>
                Claude
              </div>
              {/* OpenAI */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/[0.08] rounded-full text-[0.78rem] text-[#aaa] font-medium">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                </svg>
                OpenAI
              </div>
              {/* Gemini */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/[0.08] rounded-full text-[0.78rem] text-[#aaa] font-medium">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
                </svg>
                Gemini
              </div>
              {/* + any provider */}
              <span className="text-[0.78rem] text-[#555] font-medium">+ any provider</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== USE-CASE CARDS ==================== */}
      <section id="use-cases" className="py-10 pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">What people actually build</h2>
            <p className="text-[#888] text-lg max-w-[600px] mx-auto">Real agents running 24/7 on Agent37 infrastructure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="group bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-9 transition-all hover:border-white/15 hover:bg-[#111] hover:translate-y-[-4px] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-[52px] h-[52px] rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                  <uc.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[1.1rem] font-bold mb-2.5 tracking-tight">{uc.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{uc.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/[0.06] text-[0.8rem] text-[#555] italic">{uc.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LIVE TERMINAL — Fix #3: Lively dashboard ==================== */}
      <section className="pb-24">
        <div className="max-w-[900px] mx-auto px-6">
          <LiveTerminal />
        </div>
      </section>

      {/* ==================== SEE IT IN ACTION ==================== */}
      <section id="features" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">See it in action</h2>
            <p className="text-[#888] text-lg max-w-[600px] mx-auto">Everything you need to run powerful AI agents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 transition-all hover:border-white/15 hover:translate-y-[-2px]">
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-[#888]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS — Fix #4: Animated cycling highlight ==================== */}
      <HowItWorks />

      {/* ==================== INTEGRATIONS — Fix #5: Auto-scrolling marquee ==================== */}
      <IntegrationsMarquee />

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">Simple, transparent pricing</h2>
            <p className="text-[#888] text-lg max-w-[600px] mx-auto">Start at $3.99/mo. Upgrade as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`bg-[#0a0a0a] border rounded-2xl p-9 transition-all hover:translate-y-[-4px] relative ${plan.popular ? "border-white/30 ring-1 ring-white/10" : "border-white/[0.08] hover:border-white/15"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[0.7rem] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-[1.1rem] font-bold">{plan.name}</div>
                <div className="text-[2.4rem] font-extrabold tracking-[-0.04em] mb-1">
                  {plan.price} <span className="text-[0.9rem] font-medium text-[#555]">/mo</span>
                </div>
                <div className="text-[0.82rem] text-[#555] mb-6">{plan.desc}</div>
                <ul className="mb-7 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.84rem] text-[#888]">
                      <Check className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full text-[0.88rem] font-semibold transition-all cursor-pointer ${plan.popular ? "bg-white text-black hover:bg-gray-200" : "bg-white/[0.06] border border-white/10 text-white hover:bg-white/10"}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMPARISON ==================== */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">Why not just self-host?</h2>
            <p className="text-[#888] text-lg max-w-[600px] mx-auto">Here&apos;s what you skip with Agent37</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-9">
              <h3 className="text-[1.1rem] font-bold mb-5 tracking-tight">🐢 Traditional Setup</h3>
              <ul className="space-y-3">
                {[
                  ["Rent a VPS", "15 min"],
                  ["Install Docker", "20 min"],
                  ["Configure SSL / HTTPS", "15 min"],
                  ["Install OpenClaw", "15 min"],
                  ["Setup terminal access", "10 min"],
                  ["Wire integrations", "30+ min"],
                ].map(([task, time]) => (
                  <li key={task} className="flex items-center justify-between text-sm text-[#888]">
                    <span>{task}</span>
                    <span className="text-xs text-[#555]">{time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/[0.06] text-sm font-semibold text-[#555]">~2 hours of setup</div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/30 rounded-2xl p-9 ring-1 ring-white/10">
              <h3 className="text-[1.1rem] font-bold mb-5 tracking-tight">⚡ With Agent 37</h3>
              <ul className="space-y-3">
                {["Pick a plan ✓", "Click deploy ✓", "Start building ✓"].map((item) => (
                  <li key={item} className="text-sm text-[#888]">{item}</li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/[0.06] text-2xl font-extrabold text-green">&lt; 1 minute</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">What people are saying</h2>
            <p className="text-[#888] text-lg max-w-[600px] mx-auto">From the Agent37 community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-7 flex flex-col transition-all hover:border-white/15 hover:translate-y-[-2px]">
                <div className="flex-1 mb-5">
                  <span className="text-3xl font-extrabold text-white/30 leading-none">&ldquo;</span>
                  <p className="text-sm text-[#888] leading-relaxed mt-2">{t.quote}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-[0.8rem] font-bold">
                    {t.initials}
                  </div>
                  <div className="text-sm font-semibold">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ACCORDION ==================== */}
      <section id="faq" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em] mb-3">Frequently asked questions</h2>
          </div>

          <div className="max-w-[740px] mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl overflow-hidden px-0 data-[state=open]:border-white/20 transition-colors">
                  <AccordionTrigger className="px-6 py-5 text-[0.95rem] font-semibold hover:no-underline hover:text-white cursor-pointer">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-[0.88rem] text-[#888] leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM BLOCKS ==================== */}
      <section className="py-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-9">
              <h3 className="text-xl font-bold mb-2.5">For creators</h3>
              <p className="text-sm text-[#888] mb-5">Monetize your templates & agent skills. Build once, sell on the Agent37 marketplace. Keep 80% of revenue.</p>
              <a href="#" className="bg-white/[0.06] border border-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2">Learn more</a>
            </div>
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-9">
              <h3 className="text-xl font-bold mb-2.5">Need dedicated hosting?</h3>
              <p className="text-sm text-[#888] mb-5">Enterprise deployment on your own AWS, GCP, or Azure infrastructure. Full compliance, full control.</p>
              <a href="#" className="bg-white/[0.06] border border-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2">Contact us</a>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center py-16 border-t border-white/[0.06]">
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] mb-3">Secure your spot at $3.99/mo</h2>
            <p className="text-[#888] mb-7">197 spots remaining. Price goes up to $9.99/mo after that.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="#" className="bg-white text-black px-8 py-3.5 rounded-full text-[0.95rem] font-semibold hover:bg-gray-200 transition-all inline-flex items-center gap-2">
                Claim $3.99/mo Spot
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#use-cases" className="bg-white/[0.06] border border-white/10 text-white px-8 py-3.5 rounded-full text-[0.95rem] font-semibold hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2">
                See what people build
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER — Fix #6: Center-aligned links ==================== */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Left: Logo */}
            <a href="#" className="flex items-center gap-2.5 font-bold flex-shrink-0">
              <AgentLogo size={24} />
              Agent 37
            </a>

            {/* Center: links — properly centered */}
            <div className="flex gap-6 flex-wrap justify-center flex-1">
              {["Creators", "AI Safety", "Privacy", "Terms", "Blog", "Tools"].map((link) => (
                <a key={link} href="#" className="text-[0.82rem] text-[#555] hover:text-white transition-colors">{link}</a>
              ))}
            </div>

            {/* Right: copyright */}
            <div className="text-[0.78rem] text-[#555] flex-shrink-0">
              © 2026 Agent 37 · Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> in New York
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
