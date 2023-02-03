import{u as ae,a as G,Y as oe,b as le,R as T,l as se,c as ne,S as U,D as re}from"./app-eebc91b8.js";import{r as L,h as b,c as ie,u as ce,L as ue,ab as de,o as ve,n as he,j as o,a5 as Z,z as pe,K as fe,i as me}from"./framework-39cc0843.js";function ye(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}else return Array.from(t)}var x=!1;if(typeof window<"u"){var O={get passive(){x=!0}};window.addEventListener("testPassive",null,O),window.removeEventListener("testPassive",null,O)}var E=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),w=[],I=!1,N=-1,H=void 0,k=void 0,Q=function(e){return w.some(function(a){return!!(a.options.allowTouchMove&&a.options.allowTouchMove(e))})},q=function(e){var a=e||window.event;return Q(a.target)||a.touches.length>1?!0:(a.preventDefault&&a.preventDefault(),!1)},ge=function(e){if(k===void 0){var a=!!e&&e.reserveScrollBarGap===!0,l=window.innerWidth-document.documentElement.clientWidth;a&&l>0&&(k=document.body.style.paddingRight,document.body.style.paddingRight=l+"px")}H===void 0&&(H=document.body.style.overflow,document.body.style.overflow="hidden")},we=function(){k!==void 0&&(document.body.style.paddingRight=k,k=void 0),H!==void 0&&(document.body.style.overflow=H,H=void 0)},Le=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},He=function(e,a){var l=e.targetTouches[0].clientY-N;return Q(e.target)?!1:a&&a.scrollTop===0&&l>0||Le(a)&&l<0?q(e):(e.stopPropagation(),!0)},ke=function(e,a){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!w.some(function(s){return s.targetElement===e})){var l={targetElement:e,options:a||{}};w=[].concat(ye(w),[l]),E?(e.ontouchstart=function(s){s.targetTouches.length===1&&(N=s.targetTouches[0].clientY)},e.ontouchmove=function(s){s.targetTouches.length===1&&He(s,e)},I||(document.addEventListener("touchmove",q,x?{passive:!1}:void 0),I=!0)):ge(a)}},Te=function(){E?(w.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),I&&(document.removeEventListener("touchmove",q,x?{passive:!1}:void 0),I=!1),N=-1):we(),w=[]};const Ce="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";const Y=()=>o(T,{name:"close"},()=>o("path",{d:"m925.468 822.294-303.27-310.288L925.51 201.674c34.683-27.842 38.3-75.802 8.122-107.217-30.135-31.37-82.733-34.259-117.408-6.463L512.001 399.257 207.777 87.993C173.1 60.197 120.504 63.087 90.369 94.456c-30.179 31.415-26.561 79.376 8.122 107.217L401.8 512.005l-303.27 310.29c-34.724 27.82-38.34 75.846-8.117 107.194 30.135 31.437 82.729 34.327 117.408 6.486L512 624.756l304.177 311.22c34.68 27.84 87.272 24.95 117.408-6.487 30.223-31.348 26.56-79.375-8.118-107.195z"}));Y.displayName="CloseIcon";const J=()=>o(T,{name:"heading"},()=>o("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));J.displayName="HeadingIcon";const W=()=>o(T,{name:"heart"},()=>o("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));W.displayName="HeartIcon";const D=()=>o(T,{name:"history"},()=>o("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));D.displayName="HistoryIcon";const K=()=>o(T,{name:"title"},()=>o("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));K.displayName="TitleIcon";const Se={},be=300,F=5,Ie={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",select:"选择",navigate:"切换",exit:"关闭",history:"搜索历史",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},qe="search-pro-history-results",y=ae(qe,[]),ze=()=>({history:y,addHistory:t=>{y.value.length<F?y.value=[t,...y.value]:y.value=[t,...y.value.slice(0,F-1)]},removeHistory:t=>{y.value=[...y.value.slice(0,t),...y.value.slice(t+1)]}}),Ae=L(Ce),Ve=b(()=>JSON.parse(se(Ae.value))),S=(t,e)=>{const a=t.toLowerCase(),l=e.toLowerCase(),s=[];let r=0,v=0;const h=(n,p=!1)=>{let i="";v===0?i=n.length>20?`… ${n.slice(-20)}`:n:p?i=n.length+v>100?`${n.slice(0,100-v)}… `:n:i=n.length>20?`${n.slice(0,20)} … ${n.slice(-20)}`:n,i&&s.push(i),v+=i.length,p||(s.push(["strong",e]),v+=e.length,v>=100&&s.push(" …"))};let f=a.indexOf(l,r);if(f===-1)return null;for(;f>=0;){const n=f+l.length;if(h(t.slice(r,f)),r=n,v>100)break;f=a.indexOf(l,r)}return v<100&&h(t.slice(r),!0),s},j=t=>t.reduce((e,{type:a})=>e+(a==="title"?50:a==="heading"?20:a==="custom"?10:1),0),xe=(t,e)=>{var a;const l={};for(const[s,r]of U(e)){const v=((a=e[s.replace(/\/[^\\]*$/,"")])==null?void 0:a.title)||"",h=`${v?`${v} > `:""}${r.title}`,f=S(r.title,t);f&&(l[h]=[...l[h]||[],{type:"title",path:s,display:f}]),r.customFields&&U(r.customFields).forEach(([n,p])=>{p.forEach(i=>{const c=S(i,t);c&&(l[h]=[...l[h]||[],{type:"custom",path:s,index:n,display:c}])})});for(const n of r.contents){const p=S(n.header,t);p&&(l[h]=[...l[h]||[],{type:"heading",path:s+(n.slug?`#${n.slug}`:""),display:p}]);for(const i of n.contents){const c=S(i,t);c&&(l[h]=[...l[h]||[],{type:"content",header:n.header,path:s+(n.slug?`#${n.slug}`:""),display:c}])}}}return re(l).sort((s,r)=>j(l[s])-j(l[r])).map(s=>({title:s,contents:l[s]}))},Ne=t=>{const e=G(),a=L([]),l=b(()=>Ve.value[e.value]),s=ne(r=>{a.value=r?xe(r,l.value):[]},be);return pe([t,e],()=>{s(t.value)}),a};var Re=ie({name:"SearchResult",props:{query:{type:String,required:!0}},emits:{close:()=>!0,updateQuery:t=>!0},setup(t,{emit:e}){const a=ce(),l=ue(),s=G(),r=oe(Ie),{history:v,addHistory:h,removeHistory:f}=ze(),n=de(t,"query"),p=Ne(n),i=L(0),c=L(0),M=L(),z=b(()=>p.value.length>0),A=b(()=>p.value[i.value]||null),X=()=>{i.value=i.value>0?i.value-1:p.value.length-1,c.value=A.value.contents.length-1},$=()=>{i.value=i.value<p.value.length-1?i.value+1:0,c.value=0},_=()=>{c.value<A.value.contents.length-1?c.value=c.value+1:$()},ee=()=>{c.value>0?c.value=c.value-1:X()},P=u=>u.map(d=>me(d)?d:o(d[0],d[1])),R=u=>{if(u.type==="custom"){const d=Se[u.index]||"$content",[g,C=""]=fe(d)?d[s.value].split("$content"):d.split("$content");return P([g,...u.display,C])}return P(u.display)},V=()=>{i.value=0,c.value=0,e("updateQuery",""),e("close")};return ve(()=>{le("keydown",u=>{if(z.value){if(u.key==="ArrowUp")ee();else if(u.key==="ArrowDown")_();else if(u.key==="Enter"){const d=A.value.contents[c.value];l.path!==d.path&&(h(d),a.push(d.path),V())}}}),ke(M.value,{reserveScrollBarGap:!0})}),he(()=>{Te()}),()=>o("div",{class:["search-pro-result",{empty:n.value===""?v.value.length===0:!z.value}],ref:M},n.value===""?v.value.length?o("ul",{class:"search-pro-result-list"},o("li",{class:"search-pro-result-list-item"},[o("div",{class:"search-pro-result-title"},r.value.history),v.value.map((u,d)=>o(Z,{to:u.path,class:["search-pro-result-item",{active:c.value===d}],onClick:()=>{console.log("click"),V()}},()=>[o(D,{class:"search-pro-result-type"}),o("div",{class:"search-pro-result-content"},[u.type==="content"&&u.header?o("div",{class:"content-header"},u.header):null,o("div",R(u))]),o("button",{class:"search-pro-close-icon",onClick:g=>{g.preventDefault(),g.stopPropagation(),f(d)}},o(Y))]))])):r.value.emptyHistory:z.value?o("ul",{class:"search-pro-result-list"},p.value.map(({title:u,contents:d},g)=>{const C=i.value===g;return o("li",{class:["search-pro-result-list-item",{active:C}]},[o("div",{class:"search-pro-result-title"},u||"Documentation"),d.map((m,te)=>{const B=C&&c.value===te;return o(Z,{to:m.path,class:["search-pro-result-item",{active:B,"aria-selected":B}],onClick:()=>{h(m),V()}},()=>[m.type==="content"?null:o(m.type==="title"?K:m.type==="heading"?J:W,{class:"search-pro-result-type"}),o("div",{class:"search-pro-result-content"},[m.type==="content"&&m.header?o("div",{class:"content-header"},m.header):null,o("div",R(m))])])})])})):r.value.emptyResult)}});export{Re as default};