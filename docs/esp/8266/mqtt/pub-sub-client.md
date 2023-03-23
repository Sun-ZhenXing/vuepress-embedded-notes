# PubSubClient 使用指南

## 1. 安装 PubSubClient

在 Arduino 社区内存在很多不同版本的 PubSubClient，本文介绍的是较为经典且稳定的版本。可以查看 [GitHub 项目](https://github.com/knolleary/pubsubclient)，作者也提供了 [API 文档](https://pubsubclient.knolleary.net/api)。

## 2. 使用入门

```cpp
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "SSID";
const char* password = "PASSWORD";
const char* mqtt_server = "broker.mqtt-dashboard.com";
const char* TOPIC = "home/devices/onoff/";
// 标识当前设备的客户端编号
const char* client_id = "clientId-ApjJZcy9Dh";

WiFiClient espClient;
PubSubClient client(espClient);
```
