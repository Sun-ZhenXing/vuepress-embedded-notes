import{_ as o,M as i,p as l,q as u,R as n,N as t,V as e,t as s,Q as c,a1 as a}from"./framework-8980b429.js";const k="/vuepress-embedded-notes/assets/62a6e7be094754312986ad2d-32ad1d3c.svg",r={},d=n("h1",{id:"超声波测距",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#超声波测距","aria-hidden":"true"},"#"),s(" 超声波测距")],-1),v=n("p",null,"本文是嵌入式的课程设计，设计超声波测距并使用数码管渲染。本文是使用 Arduino 和 Mbed 设计的，仅供参考。",-1),m={class:"table-of-contents"},b=a('<h2 id="_1-主要设计" tabindex="-1"><a class="header-anchor" href="#_1-主要设计" aria-hidden="true">#</a> 1. 主要设计</h2><h3 id="_1-1-设计目标" tabindex="-1"><a class="header-anchor" href="#_1-1-设计目标" aria-hidden="true">#</a> 1.1 设计目标</h3><p>设计一个超声波测距仪，测量的结果需要在三位的七段数码管上显示出来。</p><p>传感器：</p><ul><li>数码管型号为 <strong>3361AS</strong>（共阴极）</li><li>超声波传感器型号为 <strong>HC-SR04</strong></li></ul><p>数码管的原理图如下：</p><p><img src="'+k+'" alt="" loading="lazy"></p><p>主要难点：</p><ul><li>如何使用七段数码管 <ul><li>如何正确表示数字</li><li>如何以较快的速度绘制，利用视觉延迟防止闪烁</li><li>如何使用数码管模块</li></ul></li><li>如何使用超声波测距</li></ul><h1 id="_2-arduino-设计" tabindex="-1"><a class="header-anchor" href="#_2-arduino-设计" aria-hidden="true">#</a> 2. Arduino 设计</h1><p>一开始是使用 Arduino UNO 设计的，因为 Arduino 设计比较简单，很多库可以直接用，使用 Arduino 测量的结果也比较精确。</p>',11),f=a(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_A</span> <span class="token expression"><span class="token number">2</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_B</span> <span class="token expression"><span class="token number">3</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_C</span> <span class="token expression"><span class="token number">4</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_D</span> <span class="token expression"><span class="token number">5</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_E</span> <span class="token expression"><span class="token number">6</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_F</span> <span class="token expression"><span class="token number">7</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_G</span> <span class="token expression"><span class="token number">8</span></span></span>

<span class="token comment">// 分别连接三个灯 S1、S2、S3</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_1</span> <span class="token expression"><span class="token number">9</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_2</span> <span class="token expression"><span class="token number">10</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_3</span> <span class="token expression"><span class="token number">11</span></span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">pingPin</span> <span class="token expression"><span class="token number">13</span>  </span><span class="token comment">// 超声波 Pin</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">echoPin</span> <span class="token expression"><span class="token number">12</span>  </span><span class="token comment">// 超声波 Echo</span></span>

<span class="token comment">// 默认延迟时间</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_DELAY</span> <span class="token expression"><span class="token number">1</span></span></span>

<span class="token comment">// 数字的字形</span>
<span class="token comment">// 每一个位分别对应 Dot|G|F|E|D|C|B|A</span>
<span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> NUM_7_SEG<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0b0111111</span><span class="token punctuation">,</span>
    <span class="token number">0b0000110</span><span class="token punctuation">,</span>
    <span class="token number">0b1011011</span><span class="token punctuation">,</span>
    <span class="token number">0b1001111</span><span class="token punctuation">,</span>
    <span class="token number">0b1100110</span><span class="token punctuation">,</span>
    <span class="token number">0b1101101</span><span class="token punctuation">,</span>
    <span class="token number">0b1111101</span><span class="token punctuation">,</span>
    <span class="token number">0b0000111</span><span class="token punctuation">,</span>
    <span class="token number">0b1111111</span><span class="token punctuation">,</span>
    <span class="token number">0b1101111</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 将测量时间换算为距离</span>
<span class="token keyword">long</span> <span class="token function">microsecondsToCentimeters</span><span class="token punctuation">(</span><span class="token keyword">long</span> microseconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> microseconds <span class="token operator">/</span> <span class="token number">29</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 清空屏幕</span>
<span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_1<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_2<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_3<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_A<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_B<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_C<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_D<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_E<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_F<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_G<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 绘制一个数字</span>
<span class="token keyword">void</span> <span class="token function">draw_digital</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_1<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_2<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_3<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_1<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_2<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_3<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_1<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_2<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_3<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> seg <span class="token operator">=</span> NUM_7_SEG<span class="token punctuation">[</span>number<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">7</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>seg <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_A <span class="token operator">+</span> i<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">digitalWrite</span><span class="token punctuation">(</span>LED_A <span class="token operator">+</span> i<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        seg <span class="token operator">&gt;&gt;=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 绘制一个数值</span>
<span class="token keyword">void</span> <span class="token function">show_number</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> hund <span class="token operator">=</span> num <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> tens <span class="token operator">=</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> ones <span class="token operator">=</span> num <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&gt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">draw_digital</span><span class="token punctuation">(</span>hund<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">delay</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&gt;=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">draw_digital</span><span class="token punctuation">(</span>tens<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">delay</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">draw_digital</span><span class="token punctuation">(</span>ones<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">delay</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Serial<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token number">9600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>pingPin<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>echoPin<span class="token punctuation">,</span> INPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_1<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_2<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_3<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_A<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_B<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_C<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_D<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_E<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_F<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pinMode</span><span class="token punctuation">(</span>LED_G<span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">delay</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> duration<span class="token punctuation">,</span> cm<span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>pingPin<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">delayMicroseconds</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>pingPin<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">delayMicroseconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">digitalWrite</span><span class="token punctuation">(</span>pingPin<span class="token punctuation">,</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>

    duration <span class="token operator">=</span> <span class="token function">pulseIn</span><span class="token punctuation">(</span>echoPin<span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cm <span class="token operator">=</span> <span class="token function">microsecondsToCentimeters</span><span class="token punctuation">(</span>duration<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Serial<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cm<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Serial<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;cm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
    <span class="token comment">// 延迟绘制</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cm <span class="token operator">&lt;</span> <span class="token number">1000</span> <span class="token operator">&amp;&amp;</span> cm <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">show_number</span><span class="token punctuation">(</span>cm<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">delay</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-mbed-设计" tabindex="-1"><a class="header-anchor" href="#_2-mbed-设计" aria-hidden="true">#</a> 2. Mbed 设计</h1><p>Mbed 设计过程很相似，甚至有一些代码都一致。</p>`,3),_=a(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;mbed.h&quot;</span></span>

BusOut <span class="token function">Disp</span><span class="token punctuation">(</span>p5<span class="token punctuation">,</span> p6<span class="token punctuation">,</span> p7<span class="token punctuation">,</span> p8<span class="token punctuation">,</span> p9<span class="token punctuation">,</span> p10<span class="token punctuation">,</span> p11<span class="token punctuation">)</span><span class="token punctuation">;</span>
DigitalOut <span class="token function">ctrl1</span><span class="token punctuation">(</span>p12<span class="token punctuation">)</span><span class="token punctuation">;</span>
DigitalOut <span class="token function">ctrl2</span><span class="token punctuation">(</span>p13<span class="token punctuation">)</span><span class="token punctuation">;</span>
DigitalOut <span class="token function">ctrl3</span><span class="token punctuation">(</span>p14<span class="token punctuation">)</span><span class="token punctuation">;</span>

DigitalOut <span class="token function">trigger</span><span class="token punctuation">(</span>p15<span class="token punctuation">)</span><span class="token punctuation">;</span>
DigitalIn <span class="token function">echo</span><span class="token punctuation">(</span>p16<span class="token punctuation">)</span><span class="token punctuation">;</span>

Timer timer<span class="token punctuation">;</span>

<span class="token comment">// 默认延迟时间</span>
<span class="token keyword">const</span> <span class="token keyword">int</span> LED_DELAY <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 数码管数字</span>
<span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> NUM_SEG<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0b0111111</span><span class="token punctuation">,</span>
    <span class="token number">0b0000110</span><span class="token punctuation">,</span>
    <span class="token number">0b1011011</span><span class="token punctuation">,</span>
    <span class="token number">0b1001111</span><span class="token punctuation">,</span>
    <span class="token number">0b1100110</span><span class="token punctuation">,</span>
    <span class="token number">0b1101101</span><span class="token punctuation">,</span>
    <span class="token number">0b1111101</span><span class="token punctuation">,</span>
    <span class="token number">0b0000111</span><span class="token punctuation">,</span>
    <span class="token number">0b1111111</span><span class="token punctuation">,</span>
    <span class="token number">0b1101111</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctrl1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    ctrl2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    ctrl3 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    Disp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">long</span> <span class="token function">microsecondsToCentimeters</span><span class="token punctuation">(</span><span class="token keyword">long</span> microseconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> microseconds <span class="token operator">/</span> <span class="token number">53</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * @brief 写数字到数码管
 * @param number 数字
 * @param s 第几个灯
 */</span>
<span class="token keyword">void</span> <span class="token function">draw_digital</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctrl1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        ctrl2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        ctrl3 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctrl1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        ctrl2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        ctrl3 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        ctrl1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        ctrl2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        ctrl3 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    Disp <span class="token operator">=</span> NUM_SEG<span class="token punctuation">[</span>number<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * @brief 显示数字
 * @param number 0-999 的数字
 */</span>
<span class="token keyword">void</span> <span class="token function">show_number</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> hund <span class="token operator">=</span> number <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> ten <span class="token operator">=</span> <span class="token punctuation">(</span>number <span class="token operator">-</span> hund <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> one <span class="token operator">=</span> number <span class="token operator">-</span> hund <span class="token operator">*</span> <span class="token number">100</span> <span class="token operator">-</span> ten <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&gt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">draw_digital</span><span class="token punctuation">(</span>hund<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&gt;=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">draw_digital</span><span class="token punctuation">(</span>ten<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">draw_digital</span><span class="token punctuation">(</span>one<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * @brief 计算误差时间
 * @return int
 */</span>
<span class="token keyword">int</span> <span class="token function">get_correction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    timer<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    timer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>echo <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">;</span>
    timer<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> timer<span class="token punctuation">.</span><span class="token function">read_us</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> correction <span class="token operator">=</span> <span class="token function">get_correction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        trigger <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        timer<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">wait_us</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        trigger <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>echo <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">;</span>
        timer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>echo <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">;</span>
        timer<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> distance <span class="token operator">=</span> <span class="token function">microsecondsToCentimeters</span><span class="token punctuation">(</span>timer<span class="token punctuation">.</span><span class="token function">read_us</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> correction<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>distance <span class="token operator">&lt;</span> <span class="token number">1000</span> <span class="token operator">&amp;&amp;</span> distance <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">show_number</span><span class="token punctuation">(</span>distance<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">wait_ms</span><span class="token punctuation">(</span>LED_DELAY <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function w(y,h){const p=i("router-link");return l(),u("div",null,[d,v,n("nav",m,[n("ul",null,[n("li",null,[t(p,{to:"#_1-主要设计"},{default:e(()=>[s("1. 主要设计")]),_:1}),n("ul",null,[n("li",null,[t(p,{to:"#_1-1-设计目标"},{default:e(()=>[s("1.1 设计目标")]),_:1})])])])])]),b,c(" TODO：插入连线图和效果图 "),f,c(" TODO：插入连线图和效果图 "),_])}const D=o(r,[["render",w],["__file","index.html.vue"]]);export{D as default};
