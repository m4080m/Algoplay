(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{934:(e,s,r)=>{Promise.resolve().then(r.bind(r,7196))},7196:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>c});var t=r(4650),a=r(3064),l=r(2531),i=r(584);function c(){let[e,s]=(0,a.useState)([]);return(0,a.useEffect)(()=>{fetch("algorithms/index.json").then(e=>e.json()).then(e=>s(e.algorithms)).catch(e=>console.error("알고리즘 목록을 불러오는데 실패했습니다:",e))},[]),(0,t.jsxs)("div",{className:"min-h-screen px-16 py-12 max-w-7xl mx-auto",children:[(0,t.jsx)("div",{className:"relative w-full mb-12 flex justify-center",children:(0,t.jsx)(i.default,{src:"banner.png",alt:"알고리즘 시각화 플랫폼",width:1200,height:300,priority:!0,className:"w-auto h-auto"})}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:e.map(e=>(0,t.jsx)(l.default,{href:"/algorithm/".concat(e.id),className:"group p-8 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors",children:(0,t.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,t.jsx)("span",{className:"text-base text-blue-600",children:e.category}),(0,t.jsx)("h2",{className:"text-2xl font-semibold group-hover:text-blue-600 transition-colors",children:e.title}),(0,t.jsx)("p",{className:"text-lg text-gray-600 dark:text-gray-400",children:e.description})]})},e.id))})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[531,364,947,170,744],()=>s(934)),_N_E=e.O()}]);