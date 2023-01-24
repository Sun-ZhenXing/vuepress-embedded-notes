import{k as W,d as z}from"./app-aa88d9fe.js";import{c as b,h as v,j as n,L as I,u as C,ab as f}from"./framework-d3922052.js";var m=b({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(t){const p=v(()=>{const c={};return t.color&&(c.color=t.color),t.size&&(c["font-size"]=Number.isNaN(Number(t.size))?t.size:`${t.size}px`),Object.keys(c).length?c:null});return()=>t.icon?n("span",{key:t.icon,class:["font-icon icon",FONT_ICON_TYPE==="fontawesome"?"fa-fw fa-sm":"",t.icon.includes(" ")?t.icon:`${FONT_ICON_PREFIX}${t.icon}`],style:p.value}):null}}),R=b({name:"Catalog",props:{base:{type:String,default:""},level:{type:Number,default:3},titleGetter:{type:Function,default:t=>t.title},iconGetter:{type:Function,default:t=>t.icon},orderGetter:{type:Function,default:t=>t.order||0},shouldIndex:{type:Function,default:t=>t.index!==!1}},setup(t){const p=W({"/":{title:"目录"}}),c=I(),$=C(),y=z(),k=()=>{const o=t.base||c.path.replace(/\/[^/]+$/,"/"),u=$.getRoutes(),d=[];return u.filter(({meta:l,path:e})=>{if(!e.startsWith(o)||e===o)return!1;if(o==="/"){const a=Object.keys(y.value.locales).filter(s=>s!=="/");if(e==="/404.html"||a.some(s=>e.startsWith(s)))return!1}return(e.endsWith(".html")&&!e.endsWith("/index.html")||e.endsWith("/"))&&t.shouldIndex(l)}).map(({path:l,meta:e})=>{const a=l.substring(o.length).split("/").length;return{title:t.titleGetter(e),icon:t.iconGetter(e),base:l.replace(/\/[^/]+\/?$/,"/"),order:t.orderGetter(e),level:l.endsWith("/")?a-1:a,path:l}}).filter(({title:l,level:e})=>e<=t.level||!l).sort((l,e)=>l.level-e.level||(l.path.endsWith("/index.html")?-1:e.path.endsWith("/index.html")?1:l.order===null?e.order===null?l.title.localeCompare(e.title):e.order:e.order===null?l.order:l.order>0?e.order>0?l.order-e.order:-1:e.order<0?l.order-e.order:1)).forEach(l=>{var e;const{base:a,level:s}=l;switch(s){case 1:d.push(l);break;case 2:{const i=d.find(r=>r.path===a);i&&(i.children??(i.children=[])).push(l);break}default:{const i=d.find(r=>r.path===a.replace(/\/[^/]+\/$/,"/"));if(i){const r=(e=i.children)==null?void 0:e.find(h=>h.path===a);r&&(r.children??(r.children=[])).push(l)}}}}),d},N=v(()=>k());return()=>n("div",{class:"catalog-wrapper"},[n("h2",{class:"main-title"},p.value.title),...N.value.map(({children:o=[],icon:u,path:d,title:l},e)=>[n("h3",{id:l,class:["child-title",{"has-children":o.length}]},[n("a",{href:`#${l}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:d},()=>[u?n(m,{icon:u}):null,`${e+1}. ${l||"Unknown"}`])]),o.length?n("ul",{class:"child-catalog-wrapper"},o.map(({children:a=[],icon:s,path:i,title:r},h)=>n("li",{class:"child-catalog-item"},[n("div",{class:["sub-title",{"has-children":a.length}]},[n("a",{href:`#${r}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:i},()=>[s?n(m,{icon:s}):null,`${e+1}.${h+1} ${r||"Unknown"}`])]),a.length?n("div",{class:"sub-catalog-wrapper"},a.map(({icon:g,path:w,title:x},F)=>n(f,{class:"sub-catalog-item",to:w},()=>[g?n(m,{icon:g}):null,`${e+1}.${h+1}.${F+1} ${x||"Unknown"}`]))):null]))):null])])}});export{R as default};
