import{u as te,a as F,M as oe,b as le,s as L,L as ae,c as ne}from"./app-90f296dd.js";import{r as b,h as C,c as se,u as re,L as ie,a8 as ce,o as ue,n as de,j as l,a9 as V,z as ve}from"./framework-35149b8f.js";function he(t){if(Array.isArray(t)){for(var e=0,o=Array(t.length);e<t.length;e++)o[e]=t[e];return o}else return Array.from(t)}var Y=!1;if(typeof window<"u"){var E={get passive(){Y=!0}};window.addEventListener("testPassive",null,E),window.removeEventListener("testPassive",null,E)}var j=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),w=[],R=!1,B=-1,H=void 0,M=void 0,K=function(e){return w.some(function(o){return!!(o.options.allowTouchMove&&o.options.allowTouchMove(e))})},z=function(e){var o=e||window.event;return K(o.target)||o.touches.length>1?!0:(o.preventDefault&&o.preventDefault(),!1)},fe=function(e){if(M===void 0){var o=!!e&&e.reserveScrollBarGap===!0,a=window.innerWidth-document.documentElement.clientWidth;o&&a>0&&(M=document.body.style.paddingRight,document.body.style.paddingRight=a+"px")}H===void 0&&(H=document.body.style.overflow,document.body.style.overflow="hidden")},pe=function(){M!==void 0&&(document.body.style.paddingRight=M,M=void 0),H!==void 0&&(document.body.style.overflow=H,H=void 0)},me=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},ye=function(e,o){var a=e.targetTouches[0].clientY-B;return K(e.target)?!1:o&&o.scrollTop===0&&a>0||me(o)&&a<0?z(e):(e.stopPropagation(),!0)},ge=function(e,o){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!w.some(function(n){return n.targetElement===e})){var a={targetElement:e,options:o||{}};w=[].concat(he(w),[a]),j?(e.ontouchstart=function(n){n.targetTouches.length===1&&(B=n.targetTouches[0].clientY)},e.ontouchmove=function(n){n.targetTouches.length===1&&ye(n,e)},R||(document.addEventListener("touchmove",z,Y?{passive:!1}:void 0),R=!0)):fe(o)}},we=function(){j?(w.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),R&&(document.removeEventListener("touchmove",z,Y?{passive:!1}:void 0),R=!1),B=-1):pe(),w=[]};const be="eJyVl1tPG0cUx7/KyK/JmnodRRVvEaRS1VK5AqkPVVQtZhuvii+1l0ZRhGSSmJi7IygFYwImQF3irKlSiK/wZXZmd5/6FTp7sXdnvDumDyB7/md+c+bMmTnHL0JjoXHnnyzJ82JoPASv1mHhDHa3tPqOrlzCUtE4WA7dD8XTKVlMybnQ+I8vQglRmBOz2BoLufmFp/iTmMtw2qcOLP5BGj9ZfLJ4PzSGZWKZx9Mx4G+OjbNCLjMrZrPPMxKXkeJpYiY6fqtvbqN/bkAMSz6zhWdiLp0Ux4Tkr7LM5ZJCVuYS5oCXMvX9zAxA+239VQ8q1/DvQuAWI2FgVFvagYLOX+q3l+6Of4pwlEB6QjAiDkRbaWkvWz6oPowyYCD5vl+reVRp+CD5vn+kAQMZdZDw85naq6CrJa22RiCjDpIyCETyYYBqVfhuTVdudKXqYfEcJTAYEYDyHbW3bc8gIBGOkhgYHqDfL9GGEugR9snPIBAZDQM7j3ZbqFr0oKKclXuDcQYh4iAqG3C1qn1oEJSIw/GIDBRvo6BygoqfaRRvo7xiIOpB2IUMhemBy/CP0OC+f8k/fEhfenPsLjc+zsUz5Ith3nYwMTZx7x6A3TzcensXjJSSs6znA2hKXu0M540PKinFs+nMczmRTg37NWWKMUsM9m4Qk+RcKucXGKD2brWdGkhOfjfNeo/UTl5tFdFeo2/pXtCBxJmLsI/GTAiWG1Y2GfmyekudMemNaUb4YHJHPAraQRMWPtklhriClDDKeyun5TQ+oHBCTs4PvfAzpgT0P9+jdyVmRJsd42SPjGR/iLUPeNTWqnl03MUFk9gHJbCeEBxho7Ch1c+J++odHRWFzMIsl8N/8XkJmw1FIrYwO70wO2GJztmi9Tdwgyq9ZESgsqK/LwDvXCI8ts7hpfHK9sJsT59JP0tcUkgJT8UskXU/SF9JU/Y40N9cwNWaufEedYNI7yg7161gwHBFVptt+7oYlbx+vhTINHOBZcms0d7daeXXdtioMm2GxokM57VhVmov+FHsa6pMe5FCRhpVo5sFY//UQgJ829GSt3bgqmjJFpMbyKyUtpMsIKBRzldmVSPTVCmrrRXbRWuOYlSvjMMTojIN7GxfKbvh5AwoO2LqN3bp0TYb8OQVKn2EnXZgmsLbAs4VdFhVO9eul9Ro4K7RxzPj4tSdN/geOMNOG/zwoEpdvTnUr3Y9q/ppwaTCmlFehsoebmDUzjZsb3tIflogybhY1xtLYHryG5dgj3G5uV9YM+0cwX0m7jC1nSNULMH9mgsJku9wxt5CHk8IGVnMfhEhzlur10EEaB+O/+2WcTOuthXw7eNJxnuEmzhPA0Blh/ch8azNBSfR//GcH/KcdzzXGx24tYuaf8H2OWxdo70b7TQ4W80u2+0rHk1OUG2221gIc/FRfbZ1Yez14XIB30HbC7V7jF4f4YOCm0dayfxV6e29zS1yd5lERWpx8T+iSE7m";const N=()=>l(L,{name:"close"},()=>l("path",{d:"m925.468 822.294-303.27-310.288L925.51 201.674c34.683-27.842 38.3-75.802 8.122-107.217-30.135-31.37-82.733-34.259-117.408-6.463L512.001 399.257 207.777 87.993C173.1 60.197 120.504 63.087 90.369 94.456c-30.179 31.415-26.561 79.376 8.122 107.217L401.8 512.005l-303.27 310.29c-34.724 27.82-38.34 75.846-8.117 107.194 30.135 31.437 82.729 34.327 117.408 6.486L512 624.756l304.177 311.22c34.68 27.84 87.272 24.95 117.408-6.487 30.223-31.348 26.56-79.375-8.118-107.195z"}));N.displayName="CloseIcon";const X=()=>l(L,{name:"heading"},()=>l("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));X.displayName="HeadingIcon";const q=()=>l(L,{name:"heart"},()=>l("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));q.displayName="HeartIcon";const U=()=>l(L,{name:"history"},()=>l("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));U.displayName="HistoryIcon";const W=()=>l(L,{name:"title"},()=>l("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));W.displayName="TitleIcon";const He={},Me=300,J=5,Le={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",select:"选择",navigate:"切换",exit:"关闭",history:"搜索历史",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},Te="search-pro-history-results",y=te(Te,[]),Se=()=>({history:y,addHistory:t=>{y.value.length<J?y.value=[t,...y.value]:y.value=[t,...y.value.slice(0,J-1)]},removeHistory:t=>{y.value=[...y.value.slice(0,t),...y.value.slice(t+1)]}}),Ce=b(be),Re=C(()=>JSON.parse(ae(Ce.value))),S=(t,e)=>{const o=t.toLowerCase(),a=e.toLowerCase(),n=[];let r=0,v=0;const h=(s,f=!1)=>{let i="";v===0?i=s.length>20?`… ${s.slice(-20)}`:s:f?i=s.length+v>100?`${s.slice(0,100-v)}… `:s:i=s.length>20?`${s.slice(0,20)} … ${s.slice(-20)}`:s,i&&n.push(i),v+=i.length,f||(n.push(["strong",e]),v+=e.length,v>=100&&n.push(" …"))};let p=o.indexOf(a,r);if(p===-1)return null;for(;p>=0;){const s=p+a.length;if(h(t.slice(r,p)),r=s,v>100)break;p=o.indexOf(a,r)}return v<100&&h(t.slice(r),!0),n},G=t=>t.reduce((e,{type:o})=>e+(o==="title"?50:o==="heading"?20:o==="custom"?10:1),0),ze=(t,e)=>{var o;const a={};for(const[n,r]of Object.entries(e)){const v=((o=e[n.replace(/\/[^\\]*$/,"")])==null?void 0:o.title)||"",h=`${v?`${v} > `:""}${r.title}`,p=S(r.title,t);p&&(a[h]=[...a[h]||[],{type:"title",path:n,display:p}]),r.customFields&&Object.entries(r.customFields).forEach(([s,f])=>{f.forEach(i=>{const c=S(i,t);c&&(a[h]=[...a[h]||[],{type:"custom",path:n,index:s,display:c}])})});for(const s of r.contents){const f=S(s.header,t);f&&(a[h]=[...a[h]||[],{type:"heading",path:n+(s.slug?`#${s.slug}`:""),display:f}]);for(const i of s.contents){const c=S(i,t);c&&(a[h]=[...a[h]||[],{type:"content",header:s.header,path:n+(s.slug?`#${s.slug}`:""),display:c}])}}}return Object.keys(a).sort((n,r)=>G(a[n])-G(a[r])).map(n=>({title:n,contents:a[n]}))},Oe=t=>{const e=F(),o=b([]),a=C(()=>Re.value[e.value]),n=ne(r=>{o.value=r?ze(r,a.value):[]},Me);return ve([t,e],()=>{n(t.value)}),o};var Ye=se({name:"SearchResult",props:{query:{type:String,required:!0}},emits:{close:()=>!0,updateQuery:t=>!0},setup(t,{emit:e}){const o=re(),a=ie(),n=F(),r=oe(Le),{history:v,addHistory:h,removeHistory:p}=Se(),s=ce(t,"query"),f=Oe(s),i=b(0),c=b(0),I=b(),O=C(()=>f.value.length>0),k=C(()=>f.value[i.value]||null),Z=()=>{i.value=i.value>0?i.value-1:f.value.length-1,c.value=k.value.contents.length-1},Q=()=>{i.value=i.value<f.value.length-1?i.value+1:0,c.value=0},$=()=>{c.value<k.value.contents.length-1?c.value=c.value+1:Q()},_=()=>{c.value>0?c.value=c.value-1:Z()},x=u=>u.map(d=>typeof d=="string"?d:l(d[0],d[1])),P=u=>{if(u.type==="custom"){const d=He[u.index]||"$content",[g,T=""]=typeof d=="object"?d[n.value].split("$content"):d.split("$content");return x([g,...u.display,T])}return x(u.display)},A=()=>{i.value=0,c.value=0,e("updateQuery",""),e("close")};return ue(()=>{le("keydown",u=>{if(O.value){if(u.key==="ArrowUp")_();else if(u.key==="ArrowDown")$();else if(u.key==="Enter"){const d=k.value.contents[c.value];a.path!==d.path&&(h(d),o.push(d.path),A())}}}),ge(I.value,{reserveScrollBarGap:!0})}),de(()=>{we()}),()=>l("div",{class:["search-pro-result",{empty:s.value===""?v.value.length===0:!O.value}],ref:I},s.value===""?v.value.length?l("ul",{class:"search-pro-result-list"},l("li",{class:"search-pro-result-list-item"},[l("div",{class:"search-pro-result-title"},r.value.history),v.value.map((u,d)=>l(V,{to:u.path,class:["search-pro-result-item",{active:c.value===d}],onClick:()=>{console.log("click"),A()}},()=>[l(U,{class:"search-pro-result-type"}),l("div",{class:"search-pro-result-content"},[u.type==="content"&&u.header?l("div",{class:"content-header"},u.header):null,l("div",P(u))]),l("button",{class:"search-pro-close-icon",onClick:g=>{g.preventDefault(),g.stopPropagation(),p(d)}},l(N))]))])):r.value.emptyHistory:O.value?l("ul",{class:"search-pro-result-list"},f.value.map(({title:u,contents:d},g)=>{const T=i.value===g;return l("li",{class:["search-pro-result-list-item",{active:T}]},[l("div",{class:"search-pro-result-title"},u||"Documentation"),d.map((m,ee)=>{const D=T&&c.value===ee;return l(V,{to:m.path,class:["search-pro-result-item",{active:D,"aria-selected":D}],onClick:()=>{h(m),A()}},()=>[m.type==="content"?null:l(m.type==="title"?W:m.type==="heading"?X:q,{class:"search-pro-result-type"}),l("div",{class:"search-pro-result-content"},[m.type==="content"&&m.header?l("div",{class:"content-header"},m.header):null,l("div",P(m))])])})])})):r.value.emptyResult)}});export{Ye as default};
