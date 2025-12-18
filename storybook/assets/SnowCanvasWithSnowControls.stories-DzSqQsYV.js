import{j as o}from"./jsx-runtime-u17CrQMm.js";import{S as t}from"./SnowControls-BJuI8usL.js";import{S as e}from"./SnowCanvas-GWnEPxP2.js";import"./iframe-C_7jIU3i.js";import"./preload-helper-PPVm8Dsz.js";import"./snow-store-BVS_x2Xb.js";const l={title:"Components/SnowCanvasWithSnowControls",component:e,parameters:{layout:"centered",docs:{description:{component:"Interactive control panel for configuring snowfall effects. Users can toggle snow, adjust intensity, change themes, and more."}}},tags:["autodocs"]},r={args:{},decorators:[s=>o.jsxs("div",{style:{minHeight:"500px",width:"100%",background:"linear-gradient(to bottom, #0f172a, #1e293b)",padding:"2rem"},children:[o.jsx(t,{}),o.jsx(s,{})]})]},n={render:()=>o.jsxs(o.Fragment,{children:[o.jsx(e,{}),o.jsx("div",{style:{transform:"scale(0.8)",transformOrigin:"top left"},children:o.jsx(t,{})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {},
  decorators: [Story => <div style={{
    minHeight: "500px",
    width: "100%",
    background: "linear-gradient(to bottom, #0f172a, #1e293b)",
    padding: "2rem"
  }}>
        <SnowControls />
        <Story />
      </div>]
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <SnowCanvas />
      <div style={{
      transform: "scale(0.8)",
      transformOrigin: "top left"
    }}>
        <SnowControls />
      </div>
    </>
}`,...n.parameters?.docs?.source}}};const g=["Default","Compact"];export{n as Compact,r as Default,g as __namedExportsOrder,l as default};
