---
title: 第 3 章：Pico ADC 模块
description: 介绍树莓派 Pico 配置的 ADC 模块
---

# 3. Pico ADC 模块

[[TOC]]

ADC 代表模数转换。

Pico 模块有 3 个 ADC 通道，固定在 4 个引脚上，总共 5 个通道，其中一个内部通道即温度传感器，还有专用的 `ADC_VREF` 引脚，主要特性如下：[^1]

[^1]: RP2040（树莓派 Pico）ADC，TaterLi 个人博客，<https://www.taterli.com/7512/>

- SAR ADC
- 500 kSPS
- 12Bit（9.5 ENOB）
- 5 个输入源（`GPIO26`、`GPIO27`、`GPIO28`、`GPIO29`）
- 4 个坑位采样 FIFO
- 中断 / DMA 支持
- 采样一次停止 / 连续采样不停止
- 自由模式下定时器控制采样速率
- 自由模式下多通道循环采样
- 自动缩减至 8 位
- 内置温度传感器
- 没有内置 `VREF`，因此不能反推 `AVCC` 电压

在 Pico 板子上，GPIO29 即 ADC/4 通道是用来测量 VSYS/3 电压的。
