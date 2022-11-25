import{_ as t,o as l,c as e,e as n,a,b as s}from"./app.3adaa376.js";const m={},p=n('<h1 id="_2-读取温度并显示" tabindex="-1"><a class="header-anchor" href="#_2-读取温度并显示" aria-hidden="true">#</a> 2. 读取温度并显示</h1><h2 id="_2-1-什么是-adc" tabindex="-1"><a class="header-anchor" href="#_2-1-什么是-adc" aria-hidden="true">#</a> 2.1 什么是 ADC</h2><p>Pico 需要使用 MicroPython 提供的接口来完成 ADC 控制。<code>machine.ADC</code> 类提供了 ADC 的支持。</p><h2 id="_2-2-pico-读取内置温度传感器原理" tabindex="-1"><a class="header-anchor" href="#_2-2-pico-读取内置温度传感器原理" aria-hidden="true">#</a> 2.2 Pico 读取内置温度传感器原理</h2>',4),c=a("p",null,[s("Pico 的 ADC 控制器第 4 通道直接连接着一个温度传感器，将温度和电压之间建立联系。温度 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mn",null,"27"),a("mi",{mathvariant:"normal"},"°"),a("mi",{mathvariant:"normal"},"C")]),a("annotation",{encoding:"application/x-tex"},"27\\degree\\rm C")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6944em"}}),a("span",{class:"mord"},"27°"),a("span",{class:"mord"},[a("span",{class:"mord mathrm"},"C")])])])]),s(" 时，电压为 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mn",null,"0.706"),a("mi",{mathvariant:"normal"},"V")]),a("annotation",{encoding:"application/x-tex"},"0.706\\rm V")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6833em"}}),a("span",{class:"mord"},"0.706"),a("span",{class:"mord"},[a("span",{class:"mord mathrm",style:{"margin-right":"0.01389em"}},"V")])])])]),s(" 。")],-1),i=a("p",null,[s("温度与电压变换的函数的斜率为 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mo",null,"−"),a("mn",null,"1.721"),a("mrow",null,[a("mi",{mathvariant:"normal"},"m"),a("mi",{mathvariant:"normal"},"V"),a("mi",{mathvariant:"normal"},"/"),a("mi",{mathvariant:"normal"},"°"),a("mi",{mathvariant:"normal"},"C")])]),a("annotation",{encoding:"application/x-tex"},"-1.721 \\rm mV/\\degree C")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),a("span",{class:"mord"},"−"),a("span",{class:"mord"},"1.721"),a("span",{class:"mord"},[a("span",{class:"mord mathrm"},"mV/°C")])])])]),s("，即每增加 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mn",null,"1"),a("mi",{mathvariant:"normal"},"°"),a("mi",{mathvariant:"normal"},"C")]),a("annotation",{encoding:"application/x-tex"},"1\\degree \\rm C")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6944em"}}),a("span",{class:"mord"},"1°"),a("span",{class:"mord"},[a("span",{class:"mord mathrm"},"C")])])])]),s(" 那么电压下降 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mn",null,"0.001721"),a("mi",{mathvariant:"normal"},"V")]),a("annotation",{encoding:"application/x-tex"},"0.001721\\rm V")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6833em"}}),a("span",{class:"mord"},"0.001721"),a("span",{class:"mord"},[a("span",{class:"mord mathrm",style:{"margin-right":"0.01389em"}},"V")])])])]),s(" 。对于每个芯片参数可能略有区别，官方文档也提供了校准方法，详情请查阅有关资料。")],-1),r=a("p",null,[s("一般情况下可以直接计算，得到粗略的估计值。设温度为 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"T")]),a("annotation",{encoding:"application/x-tex"},"T")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6833em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T")])])]),s("，当前温度传感器的电压为 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"v")]),a("annotation",{encoding:"application/x-tex"},"v")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.4306em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"v")])])]),s("，可得到如下关系：")],-1),o=a("p",{class:"katex-block"},[a("span",{class:"katex-display"},[a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[a("semantics",null,[a("mrow",null,[a("mi",null,"T"),a("mo",null,"="),a("mn",null,"27"),a("mo",null,"−"),a("mfrac",null,[a("mrow",null,[a("mi",null,"v"),a("mo",null,"−"),a("mn",null,"0.706")]),a("mn",null,"0.001721")])]),a("annotation",{encoding:"application/x-tex"}," T = 27 - \\frac{v - 0.706}{0.001721} ")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6833em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),a("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),a("span",{class:"mrel"},"="),a("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),a("span",{class:"mord"},"27"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),a("span",{class:"mbin"},"−"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),a("span",{class:"base"},[a("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),a("span",{class:"mord"},[a("span",{class:"mopen nulldelimiter"}),a("span",{class:"mfrac"},[a("span",{class:"vlist-t vlist-t2"},[a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"1.3214em"}},[a("span",{style:{top:"-2.314em"}},[a("span",{class:"pstrut",style:{height:"3em"}}),a("span",{class:"mord"},[a("span",{class:"mord"},"0.001721")])]),a("span",{style:{top:"-3.23em"}},[a("span",{class:"pstrut",style:{height:"3em"}}),a("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),a("span",{style:{top:"-3.677em"}},[a("span",{class:"pstrut",style:{height:"3em"}}),a("span",{class:"mord"},[a("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"v"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),a("span",{class:"mbin"},"−"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),a("span",{class:"mord"},"0.706")])])]),a("span",{class:"vlist-s"},"​")]),a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.686em"}},[a("span")])])])]),a("span",{class:"mclose nulldelimiter"})])])])])])],-1),h=n(`<h2 id="_2-3-烧录代码" tabindex="-1"><a class="header-anchor" href="#_2-3-烧录代码" aria-hidden="true">#</a> 2.3 烧录代码</h2><p>将代码保存为 <code>main.py</code>，然后运行它：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> machine
<span class="token keyword">import</span> utime

sensor <span class="token operator">=</span> machine<span class="token punctuation">.</span>ADC<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
offset <span class="token operator">=</span> <span class="token number">3.3</span> <span class="token operator">/</span> <span class="token number">65535</span>

<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    val <span class="token operator">=</span> sensor<span class="token punctuation">.</span>read_u16<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> offset
    temp <span class="token operator">=</span> <span class="token number">27</span> <span class="token operator">-</span> <span class="token punctuation">(</span>val <span class="token operator">-</span> <span class="token number">0.706</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">0.001721</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span>
    utime<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 Thonny 的绘图功能查看温度曲线，右键 Shell，点击 <strong>显示绘图器</strong> 可以看到温度变换的曲线。</p>`,4),d=[p,c,i,r,o,h];function u(k,g){return l(),e("div",null,d)}const v=t(m,[["render",u],["__file","index.html.vue"]]);export{v as default};
