import{j as n}from"./jsx-runtime-u17CrQMm.js";import{useMDXComponents as i}from"./index-DqVz7AR1.js";import{M as r}from"./blocks-BkhkQwNZ.js";import"./iframe-DQzrXPAg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CfcSfBDw.js";function o(s){const e={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Guides/How it works"}),`
`,n.jsx(e.h1,{id:"how-it-works",children:"How it works"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"@openflygroup/snowfall"}),` is built as a small rendering engine plus a state store
with a thin React wrapper on top.`]}),`
`,n.jsx(e.h2,{id:"highlevel-architecture",children:"High‑level architecture"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-text",children:`┌──────────────────────────────┐
│ React app                    │
│                              │
│  ┌────────────────────────┐  │
│  │  SnowCanvas           │  │
│  │  SnowAccumulation     │  │
│  │  SnowControls / Hook  │  │
│  └────────────────────────┘  │
│              │                │
└──────────────┼────────────────┘
               │ uses
               ▼
┌─────────────────────────────────────┐
│ Zustand store (\`useSnowStore\`)     │
│ - global config (intensity, colors)│
│ - list of stuck snowflakes         │
│ - presets and helpers              │
└─────────────────────────────────────┘
               │ drives
               ▼
┌─────────────────────────────────────┐
│ SnowEngine (canvas renderer)       │
│ - creates & animates snowflakes    │
│ - updates positions & rotations    │
│ - asks CollisionDetector where     │
│   flakes should stick              │
└─────────────────────────────────────┘
               │ queries
               ▼
┌─────────────────────────────────────┐
│ CollisionDetector                   │
│ - tracks DOM element bounding rects │
│ - detects hits & top zones         │
└─────────────────────────────────────┘
`})}),`
`,n.jsx(e.h2,{id:"rendering-flow",children:"Rendering flow"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"SnowCanvas"})," mounts a full‑screen ",n.jsx(e.code,{children:"<canvas>"})," overlay and creates a ",n.jsx(e.code,{children:"SnowEngine"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"SnowEngine"})," reads the current ",n.jsx(e.code,{children:"SnowConfig"})," from the store and spawns snowflakes."]}),`
`,n.jsxs(e.li,{children:["On every animation frame it:",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"updates snowflake positions based on gravity, wind and rotation,"}),`
`,n.jsxs(e.li,{children:["checks collisions via ",n.jsx(e.code,{children:"CollisionDetector"}),","]}),`
`,n.jsx(e.li,{children:"pushes stuck snowflakes into the store."}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"SnowAccumulation"}),` subscribes to the store and renders stuck flakes as absolutely
positioned DOM nodes on top of your elements.`]}),`
`,n.jsxs(e.li,{children:["A small interval in ",n.jsx(e.code,{children:"SnowCanvas"})," fades out old flakes according to ",n.jsx(e.code,{children:"fadeDelay"}),`
and `,n.jsx(e.code,{children:"fadeDuration"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"customisation-surface",children:"Customisation surface"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Visuals"}),": ",n.jsx(e.code,{children:"colors"}),", ",n.jsx(e.code,{children:"snowflakeSize"}),", ",n.jsx(e.code,{children:"shapes"})," (",n.jsx(e.code,{children:"circle"}),", ",n.jsx(e.code,{children:"star"}),", ",n.jsx(e.code,{children:"cross"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Behavior"}),": ",n.jsx(e.code,{children:"intensity"}),", ",n.jsx(e.code,{children:"windStrength"}),", ",n.jsx(e.code,{children:"accumulation"}),", ",n.jsx(e.code,{children:"fadeDelay"}),", ",n.jsx(e.code,{children:"fadeDuration"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Control"}),":",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"SnowControls"})," — ready‑made floating panel."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"useSnow()"})," — hook that exposes ",n.jsx(e.code,{children:"updateConfig"}),", ",n.jsx(e.code,{children:"toggle"}),", ",n.jsx(e.code,{children:"clearAllSnow"}),", counters, etc."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"presets"})," and ",n.jsx(e.code,{children:"createSnowConfig"})," — helpers for reusable configurations."]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:"Use this page as a mental model when tweaking performance or adding your own presets."})]})}function x(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(o,{...s})}):o(s)}export{x as default};
