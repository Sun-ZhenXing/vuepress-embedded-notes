# 7. 外部引脚中断

[[TOC]]

```python
from machine import Pin

p2 = Pin(2, Pin.IN, Pin.PULL_UP)

def interrupt(p: Pin):
    print('irq:', p.irq().flags())

p2.irq(interrupt, Pin.IRQ_FALLING)
```
