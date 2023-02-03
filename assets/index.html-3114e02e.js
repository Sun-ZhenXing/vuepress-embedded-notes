import{_ as c,M as i,p as l,q as s,R as o,t as e,N as a,a1 as n}from"./framework-39cc0843.js";const r={},d=n('<h1 id="_3-pico-adc-模块" tabindex="-1"><a class="header-anchor" href="#_3-pico-adc-模块" aria-hidden="true">#</a> 3. Pico ADC 模块</h1><nav class="table-of-contents"><ul></ul></nav><p>ADC 代表模数转换。</p><p>Pico 模块有 3 个 ADC 通道，固定在 4 个引脚上，总共 5 个通道，其中一个内部通道即温度传感器，还有专用的 <code>ADC_VREF</code> 引脚，主要特性如下：<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p><ul><li>SAR ADC</li><li>500 kSPS</li><li>12Bit（9.5 ENOB）</li><li>5 个输入源（<code>GPIO26</code>、<code>GPIO27</code>、<code>GPIO28</code>、<code>GPIO29</code>）</li><li>4 个坑位采样 FIFO</li><li>中断 / DMA 支持</li><li>采样一次停止 / 连续采样不停止</li><li>自由模式下定时器控制采样速率</li><li>自由模式下多通道循环采样</li><li>自动缩减至 8 位</li><li>内置温度传感器</li><li>没有内置 <code>VREF</code>，因此不能反推 <code>AVCC</code> 电压</li></ul><p>在 Pico 板子上，GPIO29 即 ADC/4 通道是用来测量 VSYS/3 电压的。</p><hr class="footnotes-sep">',7),_={class:"footnotes"},f={class:"footnotes-list"},h={id:"footnote1",class:"footnote-item"},p={href:"https://www.taterli.com/7512/",target:"_blank",rel:"noopener noreferrer"},u=o("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1);function m(P,A){const t=i("ExternalLinkIcon");return l(),s("div",null,[d,o("section",_,[o("ol",f,[o("li",h,[o("p",null,[e("RP2040（树莓派 Pico）ADC，TaterLi 个人博客，"),o("a",p,[e("https://www.taterli.com/7512/"),a(t)]),e(),u])])])])])}const x=c(r,[["render",m],["__file","index.html.vue"]]);export{x as default};