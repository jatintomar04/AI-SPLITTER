import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Tiny hook: fires when element enters viewport ──────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
   
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

// ── Reveal wrapper ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ${delay}ms, transform 0.75s ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "✦",
    title: "AI Split Assistant",
    body: "Ask plain questions — 'Who owes the most?' AI answers instantly with full context of your group's expenses.",
  },
  {
    icon: "⇄",
    title: "Smart Settle Up",
    body: "Our algorithm minimises total transactions. 10 people, 3 transfers. Everyone pays exactly what they owe.",
  },
  {
    icon: "◎",
    title: "Flexible Splits",
    body: "Split equally, by percentage, or by exact amount.",
  },
  {
    icon: "◈",
    title: "Real-time Balances",
    body: "Balances update instantly as expenses are added.",
  },
  {
    icon: "⌘",
    title: "Group History",
    body: "A full log of every expense with dates, payers, and splits.",
  },
  {
    icon: "◇",
    title: "Works Everywhere",
    body: "Browser, mobile, desktop — no install needed.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create a group",
    body: "Add your people — friends, roommates, colleagues.",
  },
  {
    n: "2",
    title: "Log expenses",
    body: "Add what was spent, who paid, and who was involved.",
  },
  {
    n: "3",
    title: "Ask AI anything",
    body: "Get summaries, fairness checks, and suggestions.",
  },
  {
    n: "4",
    title: "Settle up",
    body: "See exactly who pays whom and how much.",
  },
];

const TESTIMONIALS = [
  {
    q: "Used this for a Goa trip. The AI feature is wild.",
    name: "Rohan K.",
    role: "Product designer, Pune",
    init: "RK",
    bg: "bg-indigo-950",
    text: "text-indigo-300",
  },
  {
    q: "Our flatmate drama ended after using this.",
    name: "Priya S.",
    role: "Software engineer, Bengaluru",
    init: "PS",
    bg: "bg-emerald-950",
    text: "text-emerald-300",
  },
  {
    q: "We reduced 12 payments down to 4.",
    name: "Arjun M.",
    role: "Finance analyst, Mumbai",
    init: "AM",
    bg: "bg-rose-950",
    text: "text-rose-300",
  },
];

const MARQUEE_ITEMS = [
  "Trips & Travel",
  "Roommate Bills",
  "Group Dinners",
  "Office Lunches",
  "Weekend Getaways",
  "Family Vacations",
];

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    featured: false,
    features: [
      "Up to 5 people",
      "Unlimited expenses",
      "Smart settle-up",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "₹199",
    period: "per month",
    featured: true,
    features: [
      "Unlimited people",
      "AI assistant",
      "Unlimited groups",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Teams",
    price: "₹799",
    period: "per month",
    featured: false,
    features: [
      "Everything in Pro",
      "CSV export",
      "Priority support",
    ],
    cta: "Contact Sales",
  },
];



// ── Main Component ─────────────────────────────────────────────────────────
const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate() 
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ${delay}ms, transform 0.8s ${delay}ms`,
  });

  return (
    <div className="bg-[#0a0a0a] text-[#f0ede8] min-h-screen overflow-x-hidden font-sans">
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        html {
          scroll-behavior: smooth;
        }

        .font-serif-disp {
          font-family: 'Instrument Serif', serif;
        }

        .font-dm {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 22s linear infinite;
          will-change: transform;
        }

        @keyframes pulse-dot {
          0%,100% {
            opacity: 1;
          }

          50% {
            opacity: 0.25;
          }
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s infinite;
        }
      `}</style>

   

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 65%)",
          }}
        />

        <div
          style={fadeUp(80)}
          className="inline-flex items-center gap-2 bg-[#c9a96e]/10 border border-[#c9a96e]/25 text-[#c9a96e] text-[11px] uppercase px-4 py-1.5 rounded-full mb-10 font-dm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse-dot" />
          AI-Powered · Now Available
        </div>

        <h1
          style={fadeUp(220)}
          className="font-serif-disp text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-[-0.025em] max-w-4xl mb-6"
        >
          Split bills without the{" "}
          <em className="text-[#c9a96e] not-italic">awkward</em> math
        </h1>

        <p
          style={fadeUp(380)}
          className="text-[#f0ede8]/45 text-lg max-w-lg leading-[1.8] mb-12 font-light font-dm"
        >
          Splitwise-Ai uses AI to handle group expenses instantly — track who
          paid, who owes, and settle up in seconds.
        </p>

        <div
          style={fadeUp(500)}
          className="flex flex-wrap gap-4 justify-center mb-20"
        >
          <Link to={"/login"} className="bg-[#c9a96e] hover:bg-[#e8c990] text-[#0a0a0a] text-base font-medium px-8 py-3.5 rounded-lg transition-all font-dm">
            Start Splitting Free
          </Link>

          <button className="border border-white/[0.08] hover:border-white/[0.18] text-[#f0ede8]/55 hover:text-[#f0ede8] text-base px-6 py-3.5 rounded-lg transition-all font-dm">
            See how it works →
          </button>
        </div>

        <div
          style={fadeUp(640)}
          className="flex flex-wrap items-center justify-center gap-10"
        >
          {[
            ["240k+", "Groups settled"],
            ["₹4.2Cr", "Split this month"],
            ["4.9★", "User rating"],
          ].map(([num, label], i) => (
            <div key={label} className="flex items-center gap-10">
              {i > 0 && <div className="w-px h-10 bg-white/[0.07]" />}

              <div className="text-center">
                <span className="font-serif-disp text-3xl block">
                  {num}
                </span>

                <span className="text-[11px] text-[#f0ede8]/40 uppercase font-dm">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-t border-b border-white/[0.07] bg-[#111111] py-4">
        <div className="animate-marquee flex gap-14 w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-[#f0ede8]/40 whitespace-nowrap font-dm"
            >
              <span className="text-[#c9a96e] text-[8px]">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#c9a96e] mb-3 font-dm">
              What you get
            </p>

            <h2 className="font-serif-disp text-4xl md:text-5xl mb-4">
              Everything fair splitting{" "}
              <em className="text-[#c9a96e]">demands</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.07] rounded-2xl overflow-hidden mt-14">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-10 border border-white/[0.07] hover:bg-[#111111] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-lg mb-5">
                  {f.icon}
                </div>

                <h3 className="font-serif-disp text-xl mb-2">
                  {f.title}
                </h3>

                <p className="text-[#f0ede8]/45 text-sm leading-[1.75] font-dm">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="how-it-works" className="py-28 px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <h2 className="font-serif-disp text-4xl md:text-5xl">
              From group to{" "}
              <em className="text-[#c9a96e]">settled</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#171717] border border-white/[0.07] flex items-center justify-center text-[#c9a96e] mx-auto mb-5 font-serif-disp">
                  {s.n}
                </div>

                <p className="font-medium mb-2 font-dm">{s.title}</p>

                <p className="text-[#f0ede8]/40 text-sm font-dm">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="font-serif-disp text-4xl md:text-5xl">
              People love using{" "}
              <em className="text-[#c9a96e]">Splitwise</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-[#111111] border border-white/[0.07] rounded-2xl p-8 h-full">
                  <p className="text-[#c9a96e] mb-4">★★★★★</p>

                  <p className="font-serif-disp italic leading-[1.8] mb-8">
                    "{t.q}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${t.bg} ${t.text} flex items-center justify-center text-xs`}
                    >
                      {t.init}
                    </div>

                    <div>
                      <p className="text-sm font-medium font-dm">
                        {t.name}
                      </p>

                      <p className="text-xs text-[#f0ede8]/40 font-dm">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <h2 className="font-serif-disp text-4xl md:text-5xl">
              Simple pricing
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-9 border ${
                  plan.featured
                    ? "border-[#c9a96e]/35 bg-[#0f0e0b]"
                    : "border-white/[0.07]"
                }`}
              >
                <p className="uppercase text-xs text-[#f0ede8]/40 mb-4 font-dm">
                  {plan.name}
                </p>

                <p className="font-serif-disp text-5xl mb-1">
                  {plan.price}
                </p>

                <p className="text-sm text-[#f0ede8]/40 mb-7 font-dm">
                  {plan.period}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-[#f0ede8]/55"
                    >
                      <span className="text-[#c9a96e]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button  onClick={()=> navigate("/login")}
                  className={`w-full py-3 rounded-lg text-sm font-medium ${
                    plan.featured
                      ? "bg-[#c9a96e] text-[#0a0a0a]"
                      : "border border-white/[0.07] text-[#f0ede8]"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <Reveal>
          <h2 className="font-serif-disp text-5xl md:text-6xl max-w-3xl mx-auto leading-[1.05] mb-6">
            Stop letting money get{" "}
            <em className="text-[#c9a96e]">weird</em>
          </h2>

          <p className="text-[#f0ede8]/40 max-w-md mx-auto mb-10 font-dm">
            Join thousands of groups who use Splitwise to keep trips fun.
          </p>

          <Link to={"/login"} className="bg-[#c9a96e] hover:bg-[#e8c990] text-[#0a0a0a] px-10 py-4 rounded-xl font-medium">
            Split your first bill
          </Link>
        </Reveal>
      </section>

     
    </div>
  );
};

export default Home;