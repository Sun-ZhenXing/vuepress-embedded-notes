---
title: 第 9 章：PIO 外设
description: Pico PIO 外设
---

# 9. PIO 外设

[[TOC]]

```python
import rp2
from machine import Pin

@rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
def blink():
    wrap_target()
    set(pins, 1)                  [31]
    nop()                         [31]
    nop()                         [31]
    nop()                         [31]
    nop()                         [31]
    set(pins, 0)                  [31]
    nop()                         [31]
    nop()                         [31]
    nop()                         [31]
    nop()                         [31]
    wrap()

sm = rp2.StateMachine(0, blink, freq=300, set_base=Pin(25))
sm.active(1)
```
