# @openflygroup/snowfall

![npm version](https://img.shields.io/npm/v/@openflygroup/snowfall)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@openflygroup/snowfall)
![npm downloads](https://img.shields.io/npm/dm/@openflygroup/snowfall)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/OpenFlyGroup/snowfall/ci.yml)
![Coverage](https://img.shields.io/codecov/c/github/OpenFlyGroup/snowfall)
![License](https://img.shields.io/github/license/OpenFlyGroup/snowfall)
![GitHub issues](https://img.shields.io/github/issues/OpenFlyGroup/snowfall)

❄️ Beautiful, customizable snowfall effects for React with accumulation and fading animations.

## Features

- 🎨 Fully customizable snowflakes (size, color, shape, speed)
- 🏔️ Snow accumulation on DOM elements
- ⏱️ Automatic fading after specified time
- 🎮 Interactive controls panel
- 📱 Responsive and performant
- 🎯 TypeScript support
- 🎨 Tailwind CSS compatible
- 🔧 Multiple presets and themes
- 🎪 Extensible and pluggable

## Quick Start

```bash
npm install @openflygroup/snowfall zustand
```

```tsx
import {
  SnowCanvas,
  SnowAccumulation,
  SnowControls,
} from "@openflygroup/snowfall";

function App() {
  return (
    <>
      <SnowCanvas accumulationElements={[".card", "h1"]} />
      <SnowAccumulation elementId="header" />
      <SnowControls />

      <h1 className="relative">Winter Wonderland</h1>
      <div className="card relative">Snow will accumulate here</div>
    </>
  );
}
```

### Styles

By default, the library imports its own prebuilt Tailwind‑based stylesheet.  
If you prefer an explicit import, you can do:

```ts
import "@openflygroup/snowfall/styles";
```

## Documentation

- Docs site (GitHub Pages): `https://openflygroup.github.io/snowfall/`
- Storybook with live examples: `https://openflygroup.github.io/snowfall/storybook/`

## Contributing

Please read our Contributing Guide.

## License

MIT © OpenFly Group
