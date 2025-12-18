// demo/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  SnowCanvas,
  SnowAccumulation,
  SnowControls,
  useSnow,
} from "../src/index";

// Перенесите стили в отдельную функцию
const injectStyles = () => {
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body {
      overflow-x: hidden;
    }
    
    #root {
      min-height: 100vh;
      width: 100%;
    }
    
    .snow-container {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 50;
      pointer-events: none;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

// Внесите инъекцию стилей при загрузке
if (typeof document !== "undefined") {
  injectStyles();
}

// Вынесите интерфейс для карточек
interface PresetCard {
  name: string;
  intensity: number;
  color: string;
}

interface DemoCard {
  title: string;
  desc: string;
}

function DemoApp() {
  const { updateConfig, clearAllSnow, getSnowflakeCount } = useSnow();

  const presets: PresetCard[] = [
    { name: "Light Snow", intensity: 50, color: "bg-blue-500" },
    { name: "Winter Magic", intensity: 100, color: "bg-purple-500" },
    { name: "Blizzard", intensity: 200, color: "bg-gray-700" },
    { name: "Snow Storm", intensity: 300, color: "bg-cyan-600" },
  ];

  const demoCards: DemoCard[] = [
    { title: "Winter Card", desc: "Snow accumulates on top" },
    { title: "Frosty Panel", desc: "Watch snow build up" },
    { title: "Ice Box", desc: "Snowflakes fade after 5 seconds" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white p-4 md:p-8 relative">
      <SnowCanvas
        accumulationElements={[".card", "header", ".btn", ".demo-box"]}
        className="snow-container"
      />

      <div className="relative z-60">
        <SnowControls />
      </div>

      <header className="relative header max-w-6xl mx-auto mb-12 p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <SnowAccumulation elementId="header" className="rounded-2xl" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ❄️ Snowfall Demo
          </h1>
          <p className="text-xl opacity-90">
            Beautiful, customizable snowfall effects for React with accumulation
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto relative z-10">
        <section className="mb-12 relative z-20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <span className="text-sm opacity-80">
                /snowfall/storybook/
              </span>
            </a>

            <div className="card relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold mb-2">Live stats</h3>
              <p className="opacity-80 mb-2">
                Current number of stuck snowflakes across the page.
              </p>
              <p className="text-2xl font-bold">
                {getSnowflakeCount()}{" "}
                <span className="text-sm font-medium opacity-80">
                  flakes
                </span>
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presets.map((preset) => (
              <button
                key={preset.name}
                className={`${preset.color} btn p-4 rounded-xl text-white font-medium hover:opacity-90 transition-all transform hover:scale-105 relative z-20`}
                onClick={() => updateConfig({ intensity: preset.intensity })}
              >
                {preset.name}
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
                className="card relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <SnowAccumulation
                  elementId={`card-${index}`}
                  className="rounded-2xl"
                />
                <div className="relative z-20">
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
            <h3 className="text-xl font-bold">@openflygroup/snowfall</h3>
            <p className="opacity-80">Beautiful snowfall effects for React</p>
          </div>
          <div className="flex gap-4">
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

// Экспорт для избежания warning
export { DemoApp };

// Mount the app
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DemoApp />
    </React.StrictMode>
  );
}
