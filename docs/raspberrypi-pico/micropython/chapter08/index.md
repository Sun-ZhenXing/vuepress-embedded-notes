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
