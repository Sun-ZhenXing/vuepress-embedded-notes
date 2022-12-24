---
title: ESP8266 使用 MQTT 通信
description: ESP8266 使用 MQTT 通信方法简介
---

# ESP8266 使用 MQTT 通信

## 1. MQTT

::: tip MQTT 协议中文文档

可以查阅 [MQTT 3.1.1 中文文档](https://mcxiaoke.gitbooks.io/mqtt-cn/content/)。

:::

MQTT 协议是为大量计算能力有限，且工作在低带宽、不可靠的网络的远程传感器和控制设备通讯而设计的协议。MQTT 被广泛用于物联网设备通信，MQTT 基于 TCP/IP，只有较简单的通信字段。目前有 MQTT 5.0 和 MQTT 3.1.1 两个主流版本。

主要特征：
1. 使用发布/订阅消息模式，提供一对多的消息发布，解除应用程序耦合
2. 对负载内容屏蔽的消息传输
3. 使用 TCP/IP 提供网络连接
4. 有三种消息发布服务质量

## 2. 相关笔记

1. [MQTT Topic 解析](./mqtt-topic.md)

## 3. 适用于 ESP8266 的第三方库

ESP8266 常用的 MQTT 库：
- [Adafruit MQTT Library](https://github.com/adafruit/Adafruit_MQTT_Library)
- [PubSubClient](https://github.com/knolleary/pubsubclient)

笔记将重点使用 PubSubClient 来完成 MQTT 通信，请阅读下面的章节：

1. [PubSubClient 使用指南](./pub-sub-client.md)
