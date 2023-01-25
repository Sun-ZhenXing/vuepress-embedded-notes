---
title: 第 8 章：定时器中断
description: Pico 定时器中断
---

# 8. 定时器中断

[[TOC]]

```python
from machine import Pin, Timer

led = Pin(25, Pin.OUT)
timer = Timer()

def tick(timer: Timer):
    global led
    led.toggle()

timer.init(freq=0.5, mode=Timer.PERIODIC, callback=tick)
```
