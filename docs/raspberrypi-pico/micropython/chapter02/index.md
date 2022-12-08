---
title: 第 2 章：读取温度并显示
description: 读取 Pico 内温度传感器的数值，学习使用 ADC
---

# 2. 读取温度并显示

## 2.1 什么是 ADC

Pico 需要使用 MicroPython 提供的接口来完成 ADC 控制。`machine.ADC` 类提供了 ADC 的支持。

## 2.2 Pico 读取内置温度传感器原理

Pico 的 ADC 控制器第 4 通道直接连接着一个温度传感器，将温度和电压之间建立联系。温度 $27\degree\rm C$ 时，电压为 $0.706\rm V$。

温度与电压变换的函数的斜率为 $-1.721 \rm mV/\degree C$，即每增加 $1\degree \rm C$ 那么电压下降 $0.001721\rm V$。对于每个芯片参数可能略有区别，官方文档也提供了校准方法，详情请查阅有关资料。

一般情况下可以直接计算，得到粗略的估计值。设温度为 $T$，当前温度传感器的电压为 $v$，可得到如下关系：

$$
T = 27 - \frac{v - 0.706}{0.001721}
$$

## 2.3 烧录代码

将代码保存为 `main.py`，然后运行它：

```python
import machine
import utime

sensor = machine.ADC(4)
offset = 3.3 / 65535

while True:
    val = sensor.read_u16() * offset
    temp = 27 - (val - 0.706) / 0.001721
    print(temp)
    utime.sleep(2)
```

使用 Thonny 的绘图功能查看温度曲线，右键 Shell，点击 **显示绘图器** 可以看到温度变换的曲线。
