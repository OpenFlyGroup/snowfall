import{j as n}from"./jsx-runtime-u17CrQMm.js";import{useMDXComponents as r}from"./index-8i81qGV5.js";import{M as c,A as l}from"./blocks-D8t1KOm5.js";import{S as i}from"./SnowCanvas-BheQ79vA.js";import"./iframe-dgwSIbXt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B74seekV.js";import"./snow-store-CqaX72Wv.js";function o(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(c,{title:"API Reference"}),`
`,n.jsx(e.h1,{id:"api-reference",children:"API Reference"}),`
`,n.jsx(e.h2,{id:"snowcanvas",children:n.jsx(e.code,{children:"SnowCanvas"})}),`
`,n.jsx(e.p,{children:"Основной компонент, который отрисовывает снег на всём экране или в заданной области."}),`
`,n.jsx(e.h3,{id:"props",children:"Props"}),`
`,n.jsx(l,{of:i}),`
`,n.jsx(e.h3,{id:"пример",children:"Пример"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { SnowCanvas } from "@openflygroup/snowfall";

function App() {
  return (
    <SnowCanvas
      accumulationElements={[".card", "h1", ".snow-surface"]}
      className="snow-overlay"
      style={{ opacity: 0.8 }}
      onSnowflakeStuck={(elementId, flake) => {
        console.log(\`Snowflake stuck to \${elementId}:\`, flake);
      }}
    />
  );
}
`})}),`
`,n.jsx(e.h2,{id:"другие-экспортируемые-сущности",children:"Другие экспортируемые сущности"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"SnowAccumulation"})," — отрисовка накопившегося снега на конкретном элементе (",n.jsx(e.code,{children:"elementId"}),")"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"SnowControls"})," — панель управления интенсивностью, темами и накоплением"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"useSnow"})," — хук для программного управления конфигом снега"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"useSnowStore"})," — прямой доступ к Zustand-стоянию (для продвинутых сценариев)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"presets"})," — готовые пресеты интенсивности и цветовых тем"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"createSnowConfig"})," — утилита для создания конфига с дефолтами"]}),`
`]})]})}function u(s={}){const{wrapper:e}={...r(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(o,{...s})}):o(s)}export{u as default};
