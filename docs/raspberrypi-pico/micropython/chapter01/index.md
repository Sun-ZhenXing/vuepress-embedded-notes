---
title: 第 1 章：点亮 LED
description: 开始使用树莓派 Pico，点亮 LED
---

# 1. 点亮 LED

## 1.1 烧录固件

首先到 [Pico MicroPython 固件下载地址](https://micropython.org/download/rp2-pico/) 下载固件，下载最新版本的 **Firmware/Releases**，你下载的文件名称应该类似于 `rp2-pico-20220618-v1.19.1.uf2`。

下载方法是按住按键不松手，然后使用 USB 插入到电脑上，电脑会将 Pico 识别为储存设备。我们将 `rp2-pico-20220618-v1.19.1.uf2` 文件拖放到 Pico 中，然后重启 Pico，Pico 中就可以使用 MicroPython 了。

## 1.2 Thonny IDE

官方推荐使用 [Thonny](https://thonny.org/) 开发 Pico，这里也是以 Thonny 为例开发。所以我们需要先安装 Thonny。

请访问上面的官网，然后下载到你的系统并安装，安装后可以通过如下方法设置 Pico 环境：
1. 将树莓派 Pico 插入到你的电脑，确保驱动最新
2. 打开 Thonny
3. 点击 **运行** -> **选择解释器**，然后选择解释器为 **MicroPython (Raspberry Pi Pico)**

此时如果没有异常，会出现 Shell 窗口，如果没有 Shell 窗口，点击 **窗口** -> **Shell** 可以打开 Shell 窗口。

你可以在交互式窗口内执行 Python 解释器，你输入的代码都会通过串口发送到 Pico，再由 Pico 执行返回。

## 1.3 使用 Thonny 保存代码

将下面的代码保存为 `main.py`，在 Thonny 中选择保存到 Pico 上。

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
