---
title: Jetson 测试摄像头
description: Jetson 测试摄像头
---

# Jetson 测试摄像头

[[TOC]]

## 1. CSI 摄像机

直接测试，显示窗口：

```bash
nvgstcapture-1.0
```

- 按 `j` 键拍摄一张图像
- 按 `q` 退出
- 按 `1` 开始录制视频
- 按 `0` 停止录制视频

垂直翻转：

```bash
nvgstcapture-1.0 --orientation 2
```

自动拍摄：

```bash
nvgstcapture-1.0 --automate --capture-auto
```

## 2. USB 摄像头

查看摄像头设备：

```bash
ls /dev/vid*
```

测试 USB 摄像头：

```bash
# V4L2 USB camera (where <N> is the /dev/videoN node)
nvgstcapture-1.0 --camsrc=0 --cap-dev-node=<N>
```

USB 摄像头自动录制：

```bash
nvgstcapture-1.0 --mode=2 --camsrc=0 --cap-dev-node=<N> --automate --capture-auto
```
