import { useEffect, useState } from "react";

const STEPS = [
  "Connecting to your group…",
  "Fetching expense history…",
  "Calculating balances…",
  "Running AI analysis…",
  "Almost ready…",
];

const  Loading = ()=> {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 0.6;
      });
    }, 18);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setStepIdx(Math.min(Math.floor(progress / 21), STEPS.length - 1));
  }, [progress]);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden px-6">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .font-serif { font-family: 'Instrument Serif', Georgia, serif; }
        .font-dm    { font-family: 'DM Sans', sans-serif; }

        @keyframes spin-cw  { to { transform: rotate(360deg); } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes float-sp {
          0%   { opacity:0; transform: translateY(0) scale(1); }
          10%  { opacity:.5; }
          85%  { opacity:.4; }
          100% { opacity:0; transform: translateY(-70px) scale(.4); }
        }
        @keyframes shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
        @keyframes ticker-in {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes glow-bar {
          0%,100% { box-shadow: 0 0 8px rgba(201,169,110,.35); }
          50%     { box-shadow: 0 0 18px rgba(201,169,110,.7); }
        }

        .spin-cw  { animation: spin-cw  3s linear infinite; }
        .spin-ccw { animation: spin-ccw 2s linear infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #c9a96e 0%, #f5df9e 40%, #c9a96e 70%, #e8c990 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.6s linear infinite;
        }
        .bar-fill { animation: glow-bar 1.8s ease-in-out infinite; }
        .ticker   { animation: ticker-in .35s ease forwards; }
        .sparkle  { position: absolute; pointer-events: none; animation: float-sp linear infinite; }
      `}</style>

      {/* ── Ambient glow ──────────────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 65%)" }}
      />

      {/* ── Floating sparkles ─────────────────────────────────────── */}
      {[...Array(22)].map((_, i) => (
        <span
          key={i}
          className="sparkle text-[#c9a96e]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${7 + Math.random() * 9}px`,
            animationDuration: `${8 + Math.random() * 9}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0,
          }}
        >
          {["✦", "✧", "⋆", "·"][Math.floor(Math.random() * 4)]}
        </span>
      ))}

      {/* ── Grid texture ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#c9a96e 1px,transparent 1px),linear-gradient(90deg,#c9a96e 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-10">

        {/* Logo lockup */}
        <div className="relative flex items-center justify-center w-28 h-28">

          {/* Outer slow ring */}
          <div className="spin-cw absolute inset-0 rounded-full"
            style={{ border: "1.5px dashed rgba(201,169,110,0.2)" }} />

          {/* Middle faster ring with gap */}
          <div className="spin-ccw absolute inset-3 rounded-full"
            style={{ border: "2px solid transparent", borderTopColor: "#c9a96e", borderRightColor: "rgba(201,169,110,.3)" }} />

          {/* Inner ring */}
          <div className="spin-cw absolute inset-6 rounded-full"
            style={{ border: "1.5px solid rgba(201,169,110,.15)", borderBottomColor: "#c9a96e" }} />

          {/* Center badge */}
          <div
            className="relative z-10 w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
            style={{
              background: "#0f0e0b",
              border: "1px solid rgba(201,169,110,0.3)",
            }}
          >
            <span className="font-serif text-[11px] text-[#c9a96e] leading-none">Split</span>
            <span className="font-serif italic text-[11px] text-[#e8c990] leading-none">wise</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-[2rem] tracking-[-0.02em] leading-tight shimmer-text">
            Loading Splitwise
          </h1>
          <p
            key={stepIdx}
            className="ticker font-dm text-sm font-light text-[#f0ede8]/40"
          >
            {STEPS[stepIdx]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 flex flex-col items-center gap-3">
          <div
            className="w-full h-[3px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-full rounded-full bar-fill transition-all duration-200 ease-out"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #c9a96e, #f5df9e)",
              }}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <span
              className="font-dm text-[11px] font-medium tracking-[0.06em] uppercase"
              style={{ color: "rgba(201,169,110,0.6)" }}
            >
              {pct < 100 ? "Preparing" : "Ready"}
            </span>
            <span
              className="font-dm text-[13px] font-medium tabular-nums"
              style={{ color: "#c9a96e" }}
            >
              {pct}%
            </span>
          </div>
        </div>

        {/* Pulse dots */}
        <div className="flex gap-2 items-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 1 || i === 2 ? "8px" : "6px",
                height: i === 1 || i === 2 ? "8px" : "6px",
                background: "#c9a96e",
                opacity: pct >= (i + 1) * 25 ? 1 : 0.15,
                transition: "opacity 0.4s",
                animation: pct >= (i + 1) * 25 ? `pulse-dot 1.4s ${i * 0.18}s ease-in-out infinite` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Terminal lines (bottom-left) ──────────────────────────── */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div
          className="font-dm space-y-1.5"
          style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(201,169,110,0.25)" }}
        >
          <p className={pct >= 20 ? "opacity-100" : "opacity-30"} style={{ transition: "opacity .5s" }}>
            {`> FETCH /api/groups/expenses`}
          </p>
          <p className={pct >= 45 ? "opacity-100" : "opacity-30"} style={{ transition: "opacity .5s" }}>
            {`> CALC_BALANCES... DONE`}
          </p>
          <p className={pct >= 70 ? "opacity-100" : "opacity-30"} style={{ transition: "opacity .5s" }}>
            {`> AI_ENGINE READY`}
          </p>
          <p className={pct >= 95 ? "opacity-100" : "opacity-20"} style={{ transition: "opacity .5s" }}>
            {`> RENDERING_DASHBOARD...`}
          </p>
        </div>
      </div>

      {/* ── Version tag (bottom-right) ────────────────────────────── */}
      <div
        className="absolute bottom-10 right-10 hidden md:flex items-center gap-2 font-dm"
        style={{ fontSize: "11px", color: "rgba(240,237,232,0.18)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: pct < 100 ? "#c9a96e" : "#1D9E75", animation: "pulse-dot 1.2s ease-in-out infinite" }}
        />
        Splitwise v2.0
      </div>
    </div>
  );
}

export default Loading