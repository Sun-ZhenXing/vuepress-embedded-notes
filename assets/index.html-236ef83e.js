import{_ as p,M as c,p as l,q as i,R as n,N as s,V as e,t as o,a1 as r}from"./framework-d3922052.js";const u={},h=n("h1",{id:"_1-点亮-led",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-点亮-led","aria-hidden":"true"},"#"),o(" 1. 点亮 LED")],-1),d={class:"table-of-contents"},_=n("h2",{id:"_1-1-烧录固件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-1-烧录固件","aria-hidden":"true"},"#"),o(" 1.1 烧录固件")],-1),k={href:"https://micropython.org/download/rp2-pico/",target:"_blank",rel:"noopener noreferrer"},y=n("strong",null,"Firmware/Releases",-1),m=n("code",null,"rp2-pico-20220618-v1.19.1.uf2",-1),f=n("p",null,[o("下载方法是按住按键不松手，然后使用 USB 插入到电脑上，电脑会将 Pico 识别为储存设备。我们将 "),n("code",null,"rp2-pico-20220618-v1.19.1.uf2"),o(" 文件拖放到 Pico 中，然后重启 Pico，Pico 中就可以使用 MicroPython 了。")],-1),g=n("h2",{id:"_1-2-thonny-ide",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-2-thonny-ide","aria-hidden":"true"},"#"),o(" 1.2 Thonny IDE")],-1),P={href:"https://thonny.org/",target:"_blank",rel:"noopener noreferrer"},b=r(`<p>请访问上面的官网，然后下载到你的系统并安装，安装后可以通过如下方法设置 Pico 环境：</p><ol><li>将树莓派 Pico 插入到你的电脑，确保驱动最新</li><li>打开 Thonny</li><li>点击 <strong>运行</strong> -&gt; <strong>选择解释器</strong>，然后选择解释器为 <strong>MicroPython (Raspberry Pi Pico)</strong></li></ol><p>此时如果没有异常，会出现 Shell 窗口，如果没有 Shell 窗口，点击 <strong>窗口</strong> -&gt; <strong>Shell</strong> 可以打开 Shell 窗口。</p><p>你可以在交互式窗口内执行 Python 解释器，你输入的代码都会通过串口发送到 Pico，再由 Pico 执行返回。</p><h2 id="_1-3-使用-thonny-保存代码" tabindex="-1"><a class="header-anchor" href="#_1-3-使用-thonny-保存代码" aria-hidden="true">#</a> 1.3 使用 Thonny 保存代码</h2><p>将下面的代码保存为 <code>main.py</code>，在 Thonny 中选择保存到 Pico 上。</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> machine <span class="token keyword">import</span> Pin
<span class="token keyword">import</span> utime

led <span class="token operator">=</span> Pin<span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> Pin<span class="token punctuation">.</span>OUT<span class="token punctuation">)</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    led<span class="token punctuation">.</span>value<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    utime<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    led<span class="token punctuation">.</span>value<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    utime<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre></div><p>点击绿色的执行按钮，可以直接执行上述代码。可以看到 Pico 上的 LED 灯每隔 1 秒变化一次。</p>`,8);function x(T,v){const a=c("router-link"),t=c("ExternalLinkIcon");return l(),i("div",null,[h,n("nav",d,[n("ul",null,[n("li",null,[s(a,{to:"#_1-1-烧录固件"},{default:e(()=>[o("1.1 烧录固件")]),_:1})]),n("li",null,[s(a,{to:"#_1-2-thonny-ide"},{default:e(()=>[o("1.2 Thonny IDE")]),_:1})]),n("li",null,[s(a,{to:"#_1-3-使用-thonny-保存代码"},{default:e(()=>[o("1.3 使用 Thonny 保存代码")]),_:1})])])]),_,n("p",null,[o("首先到 "),n("a",k,[o("Pico MicroPython 固件下载地址"),s(t)]),o(" 下载固件，下载最新版本的 "),y,o("，你下载的文件名称应该类似于 "),m,o("。")]),f,g,n("p",null,[o("官方推荐使用 "),n("a",P,[o("Thonny"),s(t)]),o(" 开发 Pico，这里也是以 Thonny 为例开发。所以我们需要先安装 Thonny。")]),b])}const E=p(u,[["render",x],["__file","index.html.vue"]]);export{E as default};