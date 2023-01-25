---
title: 第 6 章：串口外设接收数据
description: Pico 串口外设接收数据
---

# 6. 串口外设接收数据

[[TOC]]

```python
from machine import UART, Pin

uart = UART(0, baudrate=115200, bits=8, parity=None,
            stop=1, tx=Pin(0), rx=Pin(1))

while True:
    flag = uart.any()
    if flag > 0:
        print(flag)
        received = uart.readline()
        uart.write(received)
```
