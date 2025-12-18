import React from "react";
import ReactDOM from "react-dom/client";
import {
  SnowCanvas,
  SnowAccumulation,
  SnowControls,
  useSnow,
} from "../src/index";

// const injectStyles = () => {
//   const styles = `
//     // html, body {
//     //   overflow-x: hidden;
//     // }

//     // #root {
//     //   min-height: 100vh;
//     //   width: 100%;
//     // }

//     // .snow-container {
//     //   position: fixed !important;
//     //   top: 0 !important;
//     //   left: 0 !important;
//     //   width: 100vw !important;
//     //   height: 100vh !important;
//     //   z-index: 50;
//     //   pointer-events: none;
//     // }
//   `;

//   const styleSheet = document.createElement("style");
//   styleSheet.innerText = styles;
//   document.head.appendChild(styleSheet);
// };

// if (typeof document !== "undefined") {
//   injectStyles();
// }

interface PresetCard {
  name: string;
  intensity: number;
  color: string;
  description: string;
}

interface DemoCard {
  title: string;
  desc: string;
}

interface Feature {
  title: string;
  description: string;
}

function DemoApp() {
  const { updateConfig, clearAllSnow, getSnowflakeCount } = useSnow();

  const presets: PresetCard[] = [
    {
      name: "Light Snow",
      intensity: 40,
      color: "from-sky-400 to-blue-500",
      description: "Subtle, calm snowfall for hero sections.",
    },
    {
      name: "Winter Mood",
      intensity: 90,
      color: "from-indigo-400 to-purple-500",
      description: "Gently animated flakes for product pages.",
    },
    {
      name: "Blizzard",
      intensity: 180,
      color: "from-slate-500 to-slate-800",
      description: "Heavy snowfall for dramatic landing pages.",
    },
    {
      name: "Snow Storm",
      intensity: 260,
      color: "from-cyan-400 to-blue-900",
      description: "Maximum intensity for showcases and demos.",
    },
  ];

  const demoCards: DemoCard[] = [
    { title: "Winter Card", desc: "Snow accumulates on top" },
    {
      title: "Frosty Panel",
      desc: "Watch snow gradually build up on edges.",
    },
    { title: "Ice Box", desc: "Snowflakes fade after a short delay." },
  ];

  const features: Feature[] = [
    {
      title: "GPU‑friendly canvas rendering",
      description:
        "All snowflakes are rendered on a single canvas layer, keeping your React tree light and responsive.",
    },
    {
      title: "Realistic accumulation",
      description:
        "Snow tracks collisions with your components and visually piles up on top of cards, headers and controls.",
    },
    {
      title: "Fully controllable via React",
      description:
        "Adjust intensity, wind, colors and behavior at runtime using hooks or the built‑in Snowfall Controls panel.",
    },
    {
      title: "Framework‑agnostic styles",
      description:
        "The library ships with a precompiled Tailwind‑powered stylesheet that works in any React app.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-4 md:px-8 py-8 relative">
      <SnowCanvas
        accumulationElements={[".card", "header", ".btn", ".demo-box"]}
        className="snow-container"
      />

      <header
        id="header"
        className="relative header max-w-6xl mx-auto mb-16 p-6 md:p-10 rounded-3xl bg-linear-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-white/10 shadow-[0_20px_70px_-15px_rgba(2,6,23,0.9)] backdrop-blur-xl"
      >
        <SnowAccumulation elementId="header" className="rounded-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300 mb-2">
                @openflygroup/snowfall
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                Snowfall for React
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                A lightweight, GPU‑friendly snowfall engine with realistic
                accumulation and interactive controls for your React UI.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-3 text-sm text-sky-100/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1 border border-sky-500/40">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live demo running</span>
              </span>
              <span className="text-xs text-white/70">
                ❄️ {getSnowflakeCount()} flakes currently on screen
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <a
              href="https://github.com/OpenFlyGroup/snowfall"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <span>View on GitHub</span>
            </a>
            <a
              href="https://openflygroup.github.io/snowfall/storybook/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-medium hover:bg-white/20 border border-white/20 transition-all"
            >
              <span>Storybook Gallery</span>
            </a>
            <span className="text-xs text-white/70">
              npm:{" "}
              <code className="text-xs text-sky-200">
                @openflygroup/snowfall
              </code>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-200 text-xs">
                GPU
              </span>
              <span>Canvas‑based, GPU‑friendly rendering.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-100 text-xs">
                FX
              </span>
              <span>Realistic accumulation and fading effects.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-100 text-xs">
                TS
              </span>
              <span>Type‑safe API with first‑class React support.</span>
            </div>
          </div>
        </div>
      </header>

      <div className="fixed bottom-6 right-6 z-50">
        <SnowControls />
      </div>

      <main className="max-w-6xl mx-auto relative z-10">
        <section className="mb-16 relative z-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How it works</h2>
          <p className="mb-4 opacity-90">
            <strong>@openflygroup/snowfall</strong> renders snowfall using a{" "}
            <code>canvas</code> overlay and a small physics engine. Snowflakes
            are animated on the GPU-friendly canvas, while collisions with your
            DOM elements are tracked in a separate store so snow can
            &quot;stick&quot; on top of cards, headers and buttons.
          </p>
          <p className="mb-4 opacity-90">
            You control everything via React components and hooks:{" "}
            <code>SnowCanvas</code> for the global overlay,{" "}
            <code>SnowAccumulation</code> for per-element snow, and{" "}
            <code>SnowControls</code> or <code>useSnow()</code> for changing
            intensity, colors and behavior at runtime.
          </p>
          <p className="mb-6 opacity-90">
            The demo page itself is built with Tailwind CSS classes that are
            precompiled into the library&apos;s bundled stylesheet, so you can
            drop the effect into any React app with minimal setup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <a
              href="https://github.com/OpenFlyGroup/snowfall"
              target="_blank"
              rel="noreferrer"
              className="card relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="opacity-80 mb-2">
                Browse the source code, open issues or contribute improvements.
              </p>
              <span className="text-sm opacity-80">
                github.com/OpenFlyGroup/snowfall
              </span>
            </a>

            <a
              href="https://openflygroup.github.io/snowfall/storybook/"
              target="_blank"
              rel="noreferrer"
              className="card relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Storybook</h3>
              <p className="opacity-80 mb-2">
                Interactive gallery of components, props and usage examples.
              </p>
              <span className="text-sm opacity-80">/snowfall/storybook/</span>
            </a>

            <div className="card relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold mb-2">Live stats</h3>
              <p className="opacity-80 mb-2">
                Current number of stuck snowflakes across the page.
              </p>
              <p className="text-2xl font-bold">
                {getSnowflakeCount()}{" "}
                <span className="text-sm font-medium opacity-80">flakes</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5 md:p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Install</h3>
              <p className="text-sm text-white/70 mb-3">
                Add the package to your React project:
              </p>
              <pre className="text-xs md:text-sm bg-black/60 rounded-xl p-4 overflow-x-auto border border-white/10">
                <code>npm install @openflygroup/snowfall</code>
              </pre>
            </div>
            <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5 md:p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Quick start</h3>
              <p className="text-sm text-white/70 mb-3">
                Drop a canvas and an accumulation target into your page:
              </p>
              <pre className="text-[11px] md:text-xs bg-black/60 rounded-xl p-4 overflow-x-auto border border-white/10">
                <code>{`import { SnowCanvas, SnowAccumulation } from "@openflygroup/snowfall";

export function Page() {
  return (
    <>
      <SnowCanvas accumulationElements={[".hero-card"]} />
      <section className="hero-card">
        Your content here
        <SnowAccumulation elementId="hero" />
      </section>
    </>
  );
}`}</code>
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/75">{feature.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presets.map((preset) => (
              <button
                key={preset.name}
                className={`btn relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${preset.color} px-4 py-5 text-left text-sm font-medium shadow-[0_18px_60px_rgba(15,23,42,0.9)] hover:scale-105 transition-transform`}
                onClick={() => updateConfig({ intensity: preset.intensity })}
              >
                <span className="relative z-10 block mb-1.5 text-base font-semibold">
                  {preset.name}
                </span>
                <span className="relative z-10 block text-xs text-white/80 mb-3">
                  {preset.description}
                </span>
                <span className="relative z-10 inline-flex items-center rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                  {preset.intensity} flakes/sec
                </span>
                <span className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-60" />
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12 relative z-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Accumulation Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoCards.map((card, index) => (
              <div
                key={card.title}
                data-snow-id={`card-${index}`}
                className="card relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <SnowAccumulation
                  elementId={`card-${index}`}
                  className="rounded-2xl"
                />
                <div className="relative z-20 space-y-3">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="opacity-80 mb-4">{card.desc}</p>
                  <button
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    onClick={() => updateConfig({ intensity: 150 })}
                  >
                    Add More Snow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/20 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Snowfall for React</h3>
            <p className="opacity-80">
              Beautiful snowfall effects for React by{" "}
              <span className="font-semibold">@openflygroup</span>.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/OpenFlyGroup/snowfall"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://openflygroup.github.io/snowfall/storybook/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline"
            >
              Storybook
            </a>
            <button
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              onClick={clearAllSnow}
            >
              Clear All Snow
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { DemoApp };

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DemoApp />
    </React.StrictMode>
  );
}
