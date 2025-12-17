import React from "react";
import ReactDOM from "react-dom/client";
import {
  SnowCanvas,
  SnowAccumulation,
  SnowControls,
  useSnow,
} from "../src/index";

function DemoApp() {
  const { updateConfig, clearAllSnow } = useSnow();

  return (
    <div className="min-h-screen gradient-bg text-white p-4 md:p-8">
      {/* Snowfall Effect */}
      <SnowCanvas
        accumulationElements={[".card", "header", ".btn", ".demo-box"]}
      />

      {/* Controls */}
      <SnowControls />

      {/* Header */}
      <header className="snow-surface header max-w-6xl mx-auto mb-12 p-6 md:p-8 rounded-2xl frosted-glass">
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Presets Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Light Snow", intensity: 50, color: "bg-blue-500" },
              { name: "Winter Magic", intensity: 100, color: "bg-purple-500" },
              { name: "Blizzard", intensity: 200, color: "bg-gray-700" },
              { name: "Snow Storm", intensity: 300, color: "bg-cyan-600" },
            ].map((preset, i) => (
              <button
                key={preset.name}
                className={`${preset.color} btn p-4 rounded-xl text-white font-medium hover:opacity-90 transition-all transform hover:scale-105`}
                onClick={() => updateConfig({ intensity: preset.intensity })}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </section>

        {/* Demo Cards */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Accumulation Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Winter Card", desc: "Snow accumulates on top" },
              { title: "Frosty Panel", desc: "Watch snow build up" },
              { title: "Ice Box", desc: "Snowflakes fade after 5 seconds" },
            ].map((card, i) => (
              <div
                key={card.title}
                className="card snow-surface p-6 rounded-2xl frosted-glass"
              >
                <SnowAccumulation
                  elementId={`card-${i}`}
                  className="rounded-2xl"
                  renderSnowflake={(flake) => {
                    const opacity = flake.fadeStart
                      ? Math.max(0, 1 - (Date.now() - flake.fadeStart) / 2000)
                      : flake.opacity;

                    return (
                      <div
                        key={flake.id}
                        className="absolute rounded-full bg-white"
                        style={{
                          left: `${flake.x}px`,
                          top: `${flake.y}px`,
                          width: `${flake.size * 2}px`,
                          height: `${flake.size * 2}px`,
                          opacity,
                          transform: `translate(-50%, -50%)`,
                          transition: "opacity 0.3s ease-out",
                        }}
                      />
                    );
                  }}
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="opacity-80 mb-4">{card.desc}</p>
                  <button
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    onClick={() => {
                      // Simulate adding more snow
                      updateConfig({ intensity: 150 });
                    }}
                  >
                    Add More Snow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Demo Box */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Interactive Area
          </h2>
          <div className="demo-box snow-surface p-8 rounded-2xl frosted-glass min-h-[300px]">
            <SnowAccumulation elementId="demo-box" className="rounded-2xl" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">
                Play with Snow Settings
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                  onClick={() => updateConfig({ windStrength: 2 })}
                >
                  Strong Wind
                </button>
                <button
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                  onClick={() =>
                    updateConfig({ snowflakeSize: { min: 4, max: 10 } })
                  }
                >
                  Large Snowflakes
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  onClick={clearAllSnow}
                >
                  Clear All Snow
                </button>
              </div>
              <p className="opacity-80">
                Interact with the controls panel (bottom-right) or use buttons
                above to modify snow behavior. Snow will accumulate on this box
                and fade away after a few seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Quick Example</h2>
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`import { SnowCanvas, SnowControls } from '@openflygroup/snowfall';

function WinterApp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
      <SnowCanvas 
        accumulationElements={['.card', 'header']}
      />
      <SnowControls />
      
      <header className="card header">
        <h1>❄️ Winter Wonderland</h1>
      </header>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">@openflygroup/snowfall</h3>
            <p className="opacity-80">Beautiful snowfall effects for React</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/OpenFlyGroup/snowfall"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://npmjs.com/package/@openflygroup/snowfall"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </div>
        </div>
        <p className="text-center mt-8 opacity-60 text-sm">
          Made with ❤️ by OpenFly Group
        </p>
      </footer>
    </div>
  );
}

// Mount the app
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DemoApp />
    </React.StrictMode>
  );
}
