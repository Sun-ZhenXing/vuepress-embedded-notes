import{_ as c,M as i,p,q as l,R as n,N as e,V as t,t as s,a1 as o}from"./framework-d3922052.js";const d={},r=n("h1",{id:"_1-pico-c-c-开发环境搭建",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-pico-c-c-开发环境搭建","aria-hidden":"true"},"#"),s(" 1. Pico C/C++ 开发环境搭建")],-1),u={class:"table-of-contents"},k=o(`<h2 id="_1-1-安装基本依赖" tabindex="-1"><a class="header-anchor" href="#_1-1-安装基本依赖" aria-hidden="true">#</a> 1.1 安装基本依赖</h2><p>本文构建的是 x86 下的交叉编译环境，使用 Ubuntu 系统，如果需要其他系统或架构不能保证成功。</p><div class="hint-container warning"><p class="hint-container-title">环境必要条件</p><ul><li>Ubuntu 20.04 或更高（官方建议）</li><li>系统桌面支持（非必须，部分功能依赖桌面）</li></ul></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> cmake gcc-arm-none-eabi libnewlib-arm-none-eabi build-essential
</code></pre></div><h2 id="_1-2-克隆官方仓库" tabindex="-1"><a class="header-anchor" href="#_1-2-克隆官方仓库" aria-hidden="true">#</a> 1.2 克隆官方仓库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> pico
<span class="token builtin class-name">cd</span> pico/
<span class="token function">git</span> clone <span class="token parameter variable">-b</span> master https://github.com/raspberrypi/pico-sdk.git <span class="token parameter variable">--depth</span> <span class="token number">1</span>
<span class="token builtin class-name">cd</span> pico-sdk/
<span class="token function">git</span> submodule update <span class="token parameter variable">--init</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token function">git</span> clone <span class="token parameter variable">-b</span> master https://github.com/raspberrypi/pico-examples.git <span class="token parameter variable">--depth</span> <span class="token number">1</span>

<span class="token comment"># Pico Project Generator 需要 GUI 支持</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> python3-tk
<span class="token function">git</span> clone https://github.com/raspberrypi/pico-project-generator.git <span class="token parameter variable">--depth</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存环境变量：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;export PICO_SDK_PATH=/home/<span class="token environment constant">$USER</span>/pico/pico-sdk&quot;</span> <span class="token operator">&gt;&gt;</span> .bashrc
<span class="token builtin class-name">source</span> .bashrc
</code></pre></div><h2 id="_1-3-验证-sdk" tabindex="-1"><a class="header-anchor" href="#_1-3-验证-sdk" aria-hidden="true">#</a> 1.3 验证 SDK</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span>
<span class="token builtin class-name">cd</span> pico/pico-examples/
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> build
<span class="token builtin class-name">cd</span> build/
cmake <span class="token punctuation">..</span>

<span class="token builtin class-name">cd</span> blink/
<span class="token function">make</span> <span class="token parameter variable">-j</span> <span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>
</code></pre></div><p>将 Pico 进入下载模式，将 <code>.uf2</code> 文件复制到 Pico 中即可。</p><p>下面是 <code>blink.c</code> 的源代码：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">// blink/blink.c</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;pico/stdlib.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">PICO_DEFAULT_LED_PIN</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">warning</span> <span class="token expression">blink example requires a board with a regular LED</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token keyword">const</span> uint LED_PIN <span class="token operator">=</span> PICO_DEFAULT_LED_PIN<span class="token punctuation">;</span>
    <span class="token function">gpio_init</span><span class="token punctuation">(</span>LED_PIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">gpio_set_dir</span><span class="token punctuation">(</span>LED_PIN<span class="token punctuation">,</span> GPIO_OUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>true<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">gpio_put</span><span class="token punctuation">(</span>LED_PIN<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">sleep_ms</span><span class="token punctuation">(</span><span class="token number">250</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">gpio_put</span><span class="token punctuation">(</span>LED_PIN<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">sleep_ms</span><span class="token punctuation">(</span><span class="token number">250</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是其 <code>CMakeLists.txt</code>：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token keyword">add_executable</span><span class="token punctuation">(</span>blink
    blink.c
<span class="token punctuation">)</span>

<span class="token comment"># pull in common dependencies</span>
<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span>blink pico_stdlib<span class="token punctuation">)</span>

<span class="token comment"># create map/bin/hex file etc.</span>
<span class="token function">pico_add_extra_outputs</span><span class="token punctuation">(</span>blink<span class="token punctuation">)</span>

<span class="token comment"># add url via pico_set_program_url</span>
<span class="token function">example_auto_set_url</span><span class="token punctuation">(</span>blink<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-4-使用工程生成器" tabindex="-1"><a class="header-anchor" href="#_1-4-使用工程生成器" aria-hidden="true">#</a> 1.4 使用工程生成器</h2><p>此部分需要系统有桌面。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span>
<span class="token builtin class-name">cd</span> pico/pico-project-generator/

./pico_project.py <span class="token parameter variable">--gui</span>
</code></pre></div><p>填写正确位置可生成工程，我们生成一个 <code>myblink</code> 工程。</p><p>将 <code>blink.c</code> 复制覆盖到 <code>myblink.c</code>，然后编译它：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> path/to/new/project

<span class="token builtin class-name">cd</span> build
<span class="token function">make</span> <span class="token parameter variable">-j</span> <span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>
</code></pre></div><h2 id="_1-5-vs-code-推荐插件" tabindex="-1"><a class="header-anchor" href="#_1-5-vs-code-推荐插件" aria-hidden="true">#</a> 1.5 VS Code 推荐插件</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>code --install-extension marus25.cortex-debug
code --install-extension ms-vscode.cmake-tools
code --install-extension ms-vscode.cpptools
</code></pre></div>`,23);function b(v,m){const a=i("router-link");return p(),l("div",null,[r,n("nav",u,[n("ul",null,[n("li",null,[e(a,{to:"#_1-1-安装基本依赖"},{default:t(()=>[s("1.1 安装基本依赖")]),_:1})]),n("li",null,[e(a,{to:"#_1-2-克隆官方仓库"},{default:t(()=>[s("1.2 克隆官方仓库")]),_:1})]),n("li",null,[e(a,{to:"#_1-3-验证-sdk"},{default:t(()=>[s("1.3 验证 SDK")]),_:1})]),n("li",null,[e(a,{to:"#_1-4-使用工程生成器"},{default:t(()=>[s("1.4 使用工程生成器")]),_:1})]),n("li",null,[e(a,{to:"#_1-5-vs-code-推荐插件"},{default:t(()=>[s("1.5 VS Code 推荐插件")]),_:1})])])]),k])}const _=c(d,[["render",b],["__file","index.html.vue"]]);export{_ as default};
