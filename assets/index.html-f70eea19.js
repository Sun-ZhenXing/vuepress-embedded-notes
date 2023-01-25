import{_ as n,p as a,q as s,a1 as t}from"./framework-d3922052.js";const e={},p=t(`<h1 id="_3-检测按键" tabindex="-1"><a class="header-anchor" href="#_3-检测按键" aria-hidden="true">#</a> 3. 检测按键</h1><nav class="table-of-contents"><ul></ul></nav><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> machine <span class="token keyword">import</span> Pin
<span class="token keyword">import</span> utime

key <span class="token operator">=</span> Pin<span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> Pin<span class="token punctuation">.</span>IN<span class="token punctuation">)</span>

<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span>value<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    utime<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre></div>`,3),o=[p];function c(l,u){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","index.html.vue"]]);export{r as default};
