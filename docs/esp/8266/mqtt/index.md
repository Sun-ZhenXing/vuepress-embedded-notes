---
title: ESP8266 使用 MQTT 通信
description: ESP8266 使用 MQTT 通信方法简介
---

# ESP8266 使用 MQTT 通信

## 1. MQTT

::: tip MQTT 协议中文文档

可以查阅 [MQTT 3.1.1 中文文档](https://mcxiaoke.gitbooks.io/mqtt-cn/content/)。

:::

MQTT 被广泛用于物联网设备通信，MQTT 基于 TCP/IP，只有较简单的通信字段。目前有 MQTT 5.0 和 MQTT 3.1.1 两个主流版本。

1. [MQTT Topic 解析](./mqtt-topic.md)

## 2. 适用于 ESP8266 的第三方库

ESP8266 常用的 MQTT 库：
- [Adafruit MQTT Library](https://github.com/adafruit/Adafruit_MQTT_Library)
- [PubSubClient](https://github.com/knolleary/pubsubclient)

笔记将重点使用 PubSubClient 来完成 MQTT 通信，请阅读下面的章节：

1. [PubSubClient 使用指南](./pub-sub-client.md)
