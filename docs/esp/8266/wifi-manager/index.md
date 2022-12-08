---
title: WiFiManager 自动配网
description: 介绍如何使用 WiFiManager 进行自动配网
---

# WiFiManager 自动配网

## 1. 自动配网

### 1.1 为什么需要自动配网

我们一般在代码中配置 WiFi 的名称和密码，当我们需要切换 WiFi 时还需要重新烧录代码，非常不方便。自动配网可以使我们适配需要的 WiFi 而不需要重写代码。

[WiFiManager](https://github.com/tzapu/WiFiManager) 库就是一个自动配网库，可以帮助我们自动配置 WiFi 信息。

### 1.2 WiFiManager 的安装

安装库：在 Arduino IDE 中搜索 `WiFiManager tzapu` 可以找到对应库，安装稳定版即可。

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

如果不需要密码，去掉 `passwd` 参数即可：

```cpp
wifiManager.autoConnect("AutoConnectAP");
```

## 4. 自定义 WiFi 配置页面

我们可以修改 `WiFiManager.h` 来修改内容，只需修改下面内容即可。

```cpp
const char HTTP_HEADER[] PROGMEM          = "";
const char HTTP_STYLE[] PROGMEM           = "";
const char HTTP_SCRIPT[] PROGMEM          = "";
const char HTTP_HEADER_END[] PROGMEM      = "";
const char HTTP_PORTAL_OPTIONS[] PROGMEM  = "";
const char HTTP_ITEM[] PROGMEM            = "";
const char HTTP_FORM_START[] PROGMEM      = "";
const char HTTP_FORM_PARAM[] PROGMEM      = "";
const char HTTP_FORM_END[] PROGMEM        = "";
const char HTTP_SCAN_LINK[] PROGMEM       = "";
const char HTTP_SAVED[] PROGMEM           = "";
const char HTTP_END[] PROGMEM             = "";
```

修改案例可以参见 [GitHub：taichi-maker/WiFiManager](https://github.com/taichi-maker/WiFiManager/blob/master/WiFiManager.h)。

## 参考

1. 太极创客，<http://www.taichi-maker.com/homepage/esp8266-nodemcu-iot/iot-c/esp8266-tips/wifimanager/>
