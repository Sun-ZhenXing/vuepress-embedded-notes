---
title: 第 4 章：PWM 外设
description: Pico PWM 外设
---

# 4. PWM 外设

[[TOC]]

```python
from machine import Pin, PWM
import utime

led = PWM(Pin(16))
n = 0

while True:
    led.duty_u16(abs(32000 - n * 1000))
    n = (n + 1) & 63
    print(n)
    utime.sleep(0.1)
```

`pwm.duty_u16(ratio)` 将占空比设置为 `ratio`。占空比此时应该为 `duty_u16 / 65535`。

如果将 `Pin(16)` 替换为 `Pin(25)` 则可以控制内置的 LED 闪烁。
