---
title: 第 3 章：检测按键
description: Pico 检测按键
---

# 3. 检测按键

```python
from machine import Pin
import utime

key = Pin(16, Pin.IN)

while True:
    print(key.value())
    utime.sleep(1)
```

## 驱动 PWM 外设

![](./images/pwm.svg)

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

`pwm.duty_u16(ratio)` 将占空比设置为 `ratio` 。占空比此时应该为 `duty_u16 / 65535` 。

如果将 `Pin(16)` 替换为 `Pin(25)` 则可以控制内置的 LED 闪烁。

## 串口数据发送

![](./images/uart.svg)

```python
import utime
from machine import UART, Pin

uart = UART(0, baudrate=300, bits=8, parity=None, stop=1, tx=Pin(0), rx=Pin(1))
n = 0

while True:
    n = (n + 1) % 100
    print(n)
    uart.write("num={:3d}\n".format(n))
    utime.sleep(1)
```

## 串口外设接收数据

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

## 外部引脚中断

![](./images/key-interrupt.svg)

```python
from machine import Pin

p2 = Pin(2, Pin.IN, Pin.PULL_UP)

def interrupt(p: Pin):
    print('irq:', p.irq().flags())

p2.irq(interrupt, Pin.IRQ_FALLING)
```

## 定时器中断

```python
from machine import Pin, Timer

led = Pin(25, Pin.OUT)
timer = Timer()

def tick(timer: Timer):
    global led
    led.toggle()

timer.init(freq=0.5, mode=Timer.PERIODIC, callback=tick)
```

## PIO 外设

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
