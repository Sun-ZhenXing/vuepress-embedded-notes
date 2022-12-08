---
title: 第 1 章：点亮 LED
description: 开始使用树莓派 Pico，点亮 LED
---

# 1. 点亮 LED

::: tip 阅读提示

如果没有阅读 [Pico 介绍](../../intro/)，请首先阅读 Pico 的基本信息，然后将 MicroPython 烧录到 Pico 内，下面开始使用 Pico。

:::

## 1.1 MicroPython 环境搭建

官方推荐使用 [Thonny](https://thonny.org/) 开发 Pico，这里也是以 Thonny 为例开发。所以我们需要先安装 Thonny。

请访问上面的官网，然后下载到你的系统并安装，安装后可以通过如下方法设置 Pico 环境：
1. 将树莓派 Pico 插入到你的电脑，确保驱动最新
2. 打开 Thonny
3. 点击 **运行** -> **选择解释器**，然后选择解释器为 **MicroPython (Raspberry Pi Pico)**

此时如果没有异常，会出现 Shell 窗口，如果没有 Shell 窗口，点击 **窗口** -> **Shell** 可以打开 Shell 窗口。

你可以在交互式窗口内执行 Python 解释器，你输入的代码都会通过串口发送到 Pico，再由 Pico 执行返回。

## 1.2 烧录代码

将下面的代码保存为 `main.py`，选择保存到 Pico 上。

```python
from machine import Pin
import utime

led = Pin(25, Pin.OUT)
while True:
    led.value(1)
    utime.sleep(1)
    led.value(0)
    utime.sleep(1)
```

点击绿色的执行按钮，可以直接执行上述代码。可以看到 Pico 上的 LED 灯每隔 1 秒变化一次。
