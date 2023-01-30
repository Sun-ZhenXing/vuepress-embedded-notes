---
title: Jetson Nano 工具
description: Jetson Nano 工具
---

# Jetson Nano 工具

[[TOC]]

## 1. CPU / GPU 状态工具

`jetson-stats` 包含各种 Jetson 状态管理工具，安装：

```bash
sudo apt install python3-pip
sudo pip3 install jetson-stats
```

查看状态：

```bash
sudo jtop
```

显示 Jetson 的状态和所有信息：

```bash
jetson_release
```

查看各种资源：

```bash
tegrastats
```

## 2. 摄像头驱动

如果需要使用摄像头，需要安装驱动：[^1]

[^1]: 在 Jetson Nano 上运行 PyTorch 模型，PyTorch，<https://pytorch.org/blog/running-pytorch-models-on-jetson-nano/>

```bash
sudo dpkg -r arducam-nvidia-l4t-kernel
sudo shutdown -r now
```

或者从脚本安装：

```bash
wget https://github.com/ArduCAM/MIPI_Camera/releases/download/v0.0.3/install_full.sh
chmod +x install_full.sh
./install_full.sh -m arducam
```

通过下面的命令检查所有的视频设备：

```bash
ls /dev/vid*
```

通过下面的命令查看摄像头的内容：

```bash
nvgstcapture-1.0 --orientation=2
```
