import{j as n}from"./jsx-runtime-u17CrQMm.js";import{u as o,M as t,S as i}from"./blocks-DC2fhqjD.js";import{S as c}from"./SnowCanvas-gWvx85XO.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-hau0a6yw.js";import"./index-DWH6TMWy.js";import"./snow-store-y1pg4JU8.js";function r(s){const e={code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"Introduction"}),`
`,n.jsx(e.h1,{id:"openflygroupsnowfall",children:"@openflygroup/snowfall"}),`
`,n.jsx(i,{name:"Showcase",children:()=>{const l={width:"100%",height:"400px",background:"linear-gradient(to bottom, #0f172a, #1e293b)",borderRadius:"12px",position:"relative",overflow:"hidden"};return n.jsxs("div",{style:l,children:[n.jsx(c,{}),n.jsxs("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",textAlign:"center",color:"white",zIndex:100},children:[n.jsx("h1",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"❄️ Snowfall"}),n.jsx("p",{style:{fontSize:"1.2rem",opacity:.9},children:"Beautiful, customizable snowfall effects for React"})]})]})}}),`
`,n.jsx(e.h2,{id:"-возможности",children:"✨ Возможности"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"🎨 Полная кастомизация"})," — размер, цвет, форма и скорость снежинок"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"🏔️ Накопление на элементах"})," — снег «налипает» на выбранные DOM-элементы"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"⏱️ Авто-затухание"})," — постепенное исчезновение снега по таймеру"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"📱 Высокая производительность"})," — отрисовка через canvas с плавной анимацией"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"🎯 TypeScript"})," — полностью типизированный API"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"🎮 Панель управления"})," — готовые контролы для изменения настроек на лету"]}),`
`]}),`
`,n.jsx(e.h2,{id:"-быстрый-старт",children:"🚀 Быстрый старт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @openflygroup/snowfall zustand
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import {
  SnowCanvas,
  SnowAccumulation,
  SnowControls,
} from "@openflygroup/snowfall";

function WinterApp() {
  return (
    <>
      <SnowCanvas accumulationElements={[".card", "h1", "button"]} />
      <SnowAccumulation elementId="header" />
      <SnowControls />

      <h1 className="relative">Winter Wonderland</h1>
      <div className="card relative">Snow will accumulate here</div>
    </>
  );
}
`})}),`
`,n.jsx(e.h2,{id:"-далее",children:"📚 Далее"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Откройте раздел ",n.jsx(e.strong,{children:"API Reference"})," для подробного описания пропсов"]}),`
`,n.jsxs(e.li,{children:["Посмотрите готовые истории компонентов ",n.jsx(e.code,{children:"SnowCanvas"}),", ",n.jsx(e.code,{children:"SnowControls"})," и ",n.jsx(e.code,{children:"SnowAccumulation"})]}),`
`,n.jsx(e.li,{children:"Зайдите на сайт-демо чтобы увидеть библиотеку в действии"}),`
`]})]})}function p(s={}){const{wrapper:e}={...o(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}export{p as default};
