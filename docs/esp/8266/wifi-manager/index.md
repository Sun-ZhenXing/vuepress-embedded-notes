---
title: WiFiManager 自动配网
description: 介绍如何使用 WiFiManager 进行自动配网
---

# WiFiManager 自动配网

## 1. 自动配网

### 1.1 为什么需要自动配网

[WiFiManager](https://github.com/tzapu/WiFiManager) 库可以帮助我们自动配置 WiFi 信息。

### 1.2 WiFiManager 的安装

安装库：在 Arduino IDE 中搜索 `WiFiManager tzapu` 可以找到对应库，安装稳定版。

### 1.3 WiFiManager API

| 常用接口                                  | 功能         |
| ----------------------------------------- | ------------ |
| `wifiManager.resetSettings()`             | 清除配置信息 |
| `wifiManager.autoConnect(ssid, [passwd])` | 开启热点     |

## 2. 清除 WiFi 信息

为了防止原有 WiFi 信息影响程序运行，或测试 WiFiManager 效果，先清除原 WiFi 信息：

```cpp
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>

void setup() {
    Serial.begin(115200);
    // 创建 WiFiManager 对象
    WiFiManager wifiManager;

    // 清除 ESP8266 所存储的 WiFi 连接信息
    wifiManager.resetSettings();
    Serial.println("ESP8266 WiFi settings cleared!");
}

void loop() {
}
```

## 3. 使用自动配网

如果配置信息里面的 WiFi 可以正确连接，那么热点将不会开启。

热点开启后，打开手机或笔记本电脑的 WiFi，连接后会提示此 WiFi 需要认证，点击认证即可进入配置界面。

```cpp
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>

void setup() {
    Serial.begin(115200);
    // 创建 WiFiManager 对象
    WiFiManager wifiManager;

    // 现在将尝试自动连接 WiFi
    // 如果连接失败，则自动开启热点，热点名称为 AutoConnectAP
    // 热点密码为 PasswordAP
    wifiManager.autoConnect("AutoConnectAP", "PasswordAP");

    // WiFi 连接成功后执行下面的代码
    Serial.print("ESP8266 Connected to ");
    // WiFi 名称
    Serial.println(WiFi.SSID());
    Serial.print("IP address:\t");
    // IP 地址
    Serial.println(WiFi.localIP());
}

void loop() {
}
```
