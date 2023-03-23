# 3. 检测按键

[[TOC]]

```python
from machine import Pin
import utime

key = Pin(16, Pin.IN)

while True:
    print(key.value())
    utime.sleep(1)
```
