import{_ as o,M as n,p as c,q as p,R as e,N as l,V as i,t as a,a1 as s}from"./framework-d3922052.js";const h="/vuepress-embedded-notes/assets/overview-f632b0d9.svg",u="/vuepress-embedded-notes/assets/home-2ec8392b.svg",_="/vuepress-embedded-notes/assets/server-f0b76136.svg",m={},T=e("h1",{id:"mqtt-智能家居",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mqtt-智能家居","aria-hidden":"true"},"#"),a(" MQTT 智能家居")],-1),b={class:"table-of-contents"},x=s('<h2 id="_1-项目概述" tabindex="-1"><a class="header-anchor" href="#_1-项目概述" aria-hidden="true">#</a> 1. 项目概述</h2><h3 id="_1-1-项目特点概述" tabindex="-1"><a class="header-anchor" href="#_1-1-项目特点概述" aria-hidden="true">#</a> 1.1 项目特点概述</h3><p>本项目致力于高性能、弹性可扩展、私有化、低延迟、权限可控的智能家居系统，主要构成是 MQTT 服务云端和本地物联网设备组成。</p><p>本地物联网设备是零耦合的，方案尽可能将各种传感器逻辑独立出来。可以弹性增加物联网模块。</p><p>私有化部署或本地部署，对云端没有完全依赖。可以冗余化部署，当云端不可用时自动连接本地的服务。</p><p>低成本，使用 ESP8266/ESP32 作为无线通讯芯片，使用 Rock Pi 3A 作为视频监控和本地冗余服务器。可使用机器学习框架搭建智能响应系统，可使用 NPU 进行神经网络推理，以获取更多的机器学习能力，总体成本大致只需 400 元。</p><p>权限可控，应用是管理设备组的基本单位，应用可以被用户自由创建和修改，并通过应用分配权限。这一点和现代公有云系统或 SaaS 系统很相似。</p><h3 id="_1-2-项目技术概述" tabindex="-1"><a class="header-anchor" href="#_1-2-项目技术概述" aria-hidden="true">#</a> 1.2 项目技术概述</h3><p>技术选型：</p><ul><li>使用 Rock Pi 3A 作为家庭云盒子 <ul><li>其 AI 芯片的性价比远高于其他 AI 芯片</li><li>RK3568 芯片含有 NPU，支持快速的神经网络推理</li><li>可以将云端部署方案冗余到盒子内</li><li>支持视频捕获，使用 RTMP 视频流协议直播内容</li></ul></li><li>使用 ESP8266 / ESP32 作为无线通讯芯片 <ul><li>低成本</li><li>易于接入和快速扩展</li><li>接入烟雾传感器用于安全警报</li><li></li></ul></li><li>使用 <code>asyncio</code> 为基础的 Python 服务 <ul><li>分为 AMQTT 为基础的持久化服务和业务服务两大模块</li><li><code>uvloop</code> 最快速的事件循环引擎，比 V8 / Node.js 事件循环快 2 倍左右</li><li><code>sanic</code> 异步高性能 Web 服务框架</li><li><code>aiomysql</code> 是 MySQL 异步驱动</li><li><code>sqlalchemy</code> 应用最广泛数据库 ORM 框架，现已支持异步驱动</li></ul></li><li>Web 架构 <ul><li>使用 Nginx 进行代理和反向代理</li><li>使用 RTMP 配合 Nginx 插件搭建流媒体服务器，用于支持 RTMP 视频流协议直播</li><li>使用 Docker / Docker-Compose 部署应用</li></ul></li><li>使用 Vue3 + PWA 构建前端 <ul><li>PWA 是现代化的 Web 应用，可代替传统应用</li><li>Vue3 + TS + Vite4 方案</li><li>使用 Naive UI 作为 UI 库</li></ul></li></ul><h3 id="_1-3-项目工作流程" tabindex="-1"><a class="header-anchor" href="#_1-3-项目工作流程" aria-hidden="true">#</a> 1.3 项目工作流程</h3><p>终端设备和智能设备通过联网即可通信，由服务器提供全部通信服务。</p><p><img src="'+h+'" alt="" loading="lazy"></p><p>室内传感器工作流程示意图：</p><p><img src="'+u+'" alt="" loading="lazy"></p><p>服务端架构图：</p><p><img src="'+_+'" alt="" loading="lazy"></p><h2 id="_2-模型设计" tabindex="-1"><a class="header-anchor" href="#_2-模型设计" aria-hidden="true">#</a> 2. 模型设计</h2><h3 id="_2-1-总体模型" tabindex="-1"><a class="header-anchor" href="#_2-1-总体模型" aria-hidden="true">#</a> 2.1 总体模型</h3><h3 id="_2-2-数据模型设计" tabindex="-1"><a class="header-anchor" href="#_2-2-数据模型设计" aria-hidden="true">#</a> 2.2 数据模型设计</h3><p>实体如下：</p><table><thead><tr><th style="text-align:center;"></th><th></th></tr></thead><tbody><tr><td style="text-align:center;">组（Group）</td><td>指家庭、团队、车间等形成的管理组</td></tr><tr><td style="text-align:center;">用户（User）</td><td>用户实体</td></tr><tr><td style="text-align:center;">应用（Application）</td><td>应用抽象，含权限信息，对应 MQTT 服务器的用户</td></tr><tr><td style="text-align:center;">用户-应用（UserApplication）</td><td>用户-应用多对多关系表</td></tr><tr><td style="text-align:center;">设备（Device）</td><td>代表实际的物联网设备</td></tr><tr><td style="text-align:center;">消息（Message）</td><td>设备的数据信息</td></tr></tbody></table>',22),f=e("h2",{id:"_3-mqtt-方案",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-mqtt-方案","aria-hidden":"true"},"#"),a(" 3. MQTT 方案")],-1),M=e("h3",{id:"_3-1-mqtt-服务端",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-1-mqtt-服务端","aria-hidden":"true"},"#"),a(" 3.1 MQTT 服务端")],-1),k={href:"https://github.com/emqx/emqx",target:"_blank",rel:"noopener noreferrer"},v=s(`<p>使用 Docker 创建服务器：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> emqx <span class="token parameter variable">-p</span> <span class="token number">1883</span>:1883 <span class="token parameter variable">-p</span> <span class="token number">8083</span>:8083 <span class="token parameter variable">-p</span> <span class="token number">8084</span>:8084 <span class="token parameter variable">-p</span> <span class="token number">8883</span>:8883 <span class="token parameter variable">-p</span> <span class="token number">18083</span>:18083 emqx/emqx:latest
</code></pre></div><h3 id="_3-2-mqtt-客户端" tabindex="-1"><a class="header-anchor" href="#_3-2-mqtt-客户端" aria-hidden="true">#</a> 3.2 MQTT 客户端</h3><p>作为服务，MQTT 客户端可运行在服务器中，维护与 MQTT 服务器的连接来获取数据。</p><p>其方案如下：</p><ul><li>使用 AMQTT 配合 <code>asyncio</code> 来实现 MQTT 的发送接收</li><li>使用 <code>uvloop</code> 作为 <code>asyncio</code> 的引擎，达到接近系统级别的事件循环速度</li><li>使用 <code>sqlalchemy</code> 配合 <code>aiomysql</code> 来与数据库创建异步连接，用于持久化数据</li></ul><p>客户端需要实时控制或获取数据，使用 WebSocket 协议进行通信。由客户端先向业务服务请求 MQTT 服务器的授权，然后使用授权访问 MQTT 服务器。</p><h2 id="_4-客户端设计" tabindex="-1"><a class="header-anchor" href="#_4-客户端设计" aria-hidden="true">#</a> 4. 客户端设计</h2><h3 id="_4-1-前端设计" tabindex="-1"><a class="header-anchor" href="#_4-1-前端设计" aria-hidden="true">#</a> 4.1 前端设计</h3><p>前端技术架构：</p><ul><li>Vue3 + Vite4 + TypeScript 基础架构</li><li>Naive UI 作为 UI 库</li><li>Pinia 存储模块</li><li>Axios 网络请求模块</li></ul><p>前端分为几个主要的工作页面：</p><ul><li>主页</li><li>登录</li><li>注册</li><li>个人</li><li>设备管理</li><li>数据报表</li></ul>`,13);function g(q,y){const t=n("router-link"),d=n("Mermaid"),r=n("ExternalLinkIcon");return c(),p("div",null,[T,e("nav",b,[e("ul",null,[e("li",null,[l(t,{to:"#_1-项目概述"},{default:i(()=>[a("1. 项目概述")]),_:1}),e("ul",null,[e("li",null,[l(t,{to:"#_1-1-项目特点概述"},{default:i(()=>[a("1.1 项目特点概述")]),_:1})]),e("li",null,[l(t,{to:"#_1-2-项目技术概述"},{default:i(()=>[a("1.2 项目技术概述")]),_:1})]),e("li",null,[l(t,{to:"#_1-3-项目工作流程"},{default:i(()=>[a("1.3 项目工作流程")]),_:1})])])]),e("li",null,[l(t,{to:"#_2-模型设计"},{default:i(()=>[a("2. 模型设计")]),_:1}),e("ul",null,[e("li",null,[l(t,{to:"#_2-1-总体模型"},{default:i(()=>[a("2.1 总体模型")]),_:1})]),e("li",null,[l(t,{to:"#_2-2-数据模型设计"},{default:i(()=>[a("2.2 数据模型设计")]),_:1})])])]),e("li",null,[l(t,{to:"#_3-mqtt-方案"},{default:i(()=>[a("3. MQTT 方案")]),_:1}),e("ul",null,[e("li",null,[l(t,{to:"#_3-1-mqtt-服务端"},{default:i(()=>[a("3.1 MQTT 服务端")]),_:1})]),e("li",null,[l(t,{to:"#_3-2-mqtt-客户端"},{default:i(()=>[a("3.2 MQTT 客户端")]),_:1})])])]),e("li",null,[l(t,{to:"#_4-客户端设计"},{default:i(()=>[a("4. 客户端设计")]),_:1}),e("ul",null,[e("li",null,[l(t,{to:"#_4-1-前端设计"},{default:i(()=>[a("4.1 前端设计")]),_:1})])])])])]),x,l(d,{id:"mermaid-257",code:"eJxLLXLJTEwvSszlUgAC96L80gKFmhpd3ZpqhdDi1CIrBaWMxGIlsCSID5MDKwRK5ibmJaanYsq7pJZlJqfiUeBYUJCTmZxYkpmfh0UVkiw+12BRhmouXDUWlXAnwhVBRGDyvqnFxUBHwRQAAGp5XfI="}),f,M,e("p",null,[e("a",k,[a("EMQX"),l(r)]),a(" 是应用广泛的分布式 MQTT 服务器，特点是高性能、低延时。EMQX 主要使用 Erlang 编写，全面支持 MQTT 3.x 和 MQTT 5.0。")]),v])}const A=o(m,[["render",g],["__file","index.html.vue"]]);export{A as default};