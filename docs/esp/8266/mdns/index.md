---
title: ESP8266 使用 mDNS
description: ESP8266 使用 mDNS 指南
---

# ESP8266 使用 mDNS

## 1. 什么是 mDNS

mDNS 可以在没有 DNS 服务器的情况下在内网就可以访问域名。域名的后缀必须是 `.local`，而且需要设备支持 mDNS 才可以。Android 和 iOS 大部分不支持，PC 端大多支持。

关于 mDNS 的详细信息可阅读我的 [mDNS 笔记](https://blog.alexsun.top/vuepress-network-notes/application-layer-protocol/dns/mdns.html) 。

## 2. ESP8266 开启 mDNS

可参考 [示例代码](https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266mDNS/examples/mDNS_Web_Server/mDNS_Web_Server.ino) 。

```cpp
// 引入 mDNS 库，安装 ESP8266 库后就包含了
#include <ESP8266mDNS.h>

void setup() {
    // 连接 WiFi 后开启 mDNS 服务
    if (WiFi.status() == WL_CONNECTED) {
        // 使用后将可以通过 http://dht22-esp8266.local/ 访问
        if (MDNS.begin("dht22-esp8266")) {
            Serial.println("MDNS started");
            MDNS.addService("http", "tcp", 80);
        } else {
            Serial.println("MDNS failed");
        }
    }
}

void loop() {
    // 每次循环时都进行更新
    MDNS.update();
    server.handleClient();
}
```

配置后可以通过 <http://dht22-esp8266.local/> 来访问 ESP8266 提供的服务。
