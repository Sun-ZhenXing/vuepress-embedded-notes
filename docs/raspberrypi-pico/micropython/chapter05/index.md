# 5. 串口数据发送

[[TOC]]

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
