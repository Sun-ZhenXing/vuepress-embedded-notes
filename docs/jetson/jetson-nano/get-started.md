---
title: 开始使用 Jetson Nano
description: 开始使用 Jetson Nano
---

# 开始使用 Jetson Nano

[[TOC]]

## 1. 安装硬件板块

::: info 有用的信息

- [Jetson Nano 官方指南](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit)，另外有 [中文版](https://developer.nvidia.com/zh-cn/embedded/learn/get-started-jetson-nano-devkit)，建议阅读英文版以确保最新
- [Jetson Nano 官方指南 PDF](https://developer.nvidia.com/embedded/dlc/Jetson_Nano_Developer_Kit_User_Guide)
- [Waveshare Wiki: Jetson Nano Case (C)](https://www.waveshare.com/wiki/Jetson_Nano_Case_(C))，另外有 [中文版](https://www.waveshare.net/wiki/Jetson_Nano_Case_(C))

:::

在购买官方 Jetson 开发板时其模块已经安装完成，为了更好地使用 Jetson Nano，推荐购买 Waveshare 系列的保护壳。

但是不同的 Nano 版型和 Waveshare Jetson Nano Case 的版型有所不同，请确认是正确的版本再购买，部分 Jetson Nano 无法适配 TF 转接槽。

这里使用的是金属壳套装（即 C 型号），请参考 [官方 Wiki](https://www.waveshare.net/wiki/Jetson_Nano_Case_(C)) 以进行适配安装，其他型号同理。

有一些可选的硬件：
- 摄像头
- 无线网卡
- TF 卡

可任意选择，以方便硬件开发。

## 2. 安装系统

推荐参考 [Jetson Nano 官方指南](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit) 进行安装，安装系统时最好有显示屏，完成初始化配置后可以使用 SSH 连接。

下载 Jetson Nano 系统镜像，[最新版下载地址](https://developer.nvidia.com/jetson-nano-sd-card-image)。如果需要其他版本的镜像，请到 [下载中心](https://developer.nvidia.com/embedded/downloads) 查看，下载中心同样有中文版：[下载中心（中文）](https://developer.nvidia.com/zh-cn/embedded/downloads)。

使用 [Rufus](https://rufus.ie/zh/) 或者 [balenaEtcher](https://www.balena.io/etcher/) 等烧录软件，烧录下载得到的镜像文件到 U 盘或者 SD 卡。建议容量大于等于 64 GB，可能会安装各种驱动和软件。

通过 U 盘或 SD 卡启动即可。

## 3. 安装开发基本环境

此环境可以基于不同版本的 Python，其对应版本可参考 [官方博客](https://forums.developer.nvidia.com/t/72048)，本文基于官方镜像的 Python 3.6。不同的版本使用 JetPack 版本也不同，本文支持的 JetPack 版本：
- JetPack 4.4 (L4T R32.4.3)
- JetPack 4.4.1 (L4T R32.4.4)
- JetPack 4.5 (L4T R32.5.0)
- JetPack 4.5.1 (L4T R32.5.1)
- JetPack 4.6 (L4T R32.6.1)

### 3.1 设置环境

更新源：

```bash
sudo apt update
sudo apt upgrade
```

更新 `pip` 和镜像：

```bash
python3 -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

::: info 发行版本

下面的设置基于 Ubuntu 18，其他版本请参考官方网站。

:::

安装 CUDA 工具包和 cuDNN：

```bash
sudo apt-get install cuda-toolkit-10-2
sudo apt install libcudnn8
```

安装 TensorRT 和 TensorRT Python 包：

```bash
sudo apt install nvidia-tensorrt
sudo apt install python3-libnvinfer
```

添加 CUDA 工具路径到 PATH：

```bash
echo 'export PATH=$PATH:/usr/local/cuda-10.2/bin' >> ~/.bashrc
source ~/.bashrc
```

### 3.2 安装 PyTorch

请确保选择正确的 PyTorch 和 Torchvision 版本。

其中 `v0.8.0` 和 Python 3.6 对应，其他版本对应表如下。

| PyTorch 版本  | Torchvision 版本    |
| ------------- | ------------------- |
| PyTorch v1.6  | torchvision v0.7.0  |
| PyTorch v1.7  | torchvision v0.8.1  |
| PyTorch v1.8  | torchvision v0.9.0  |
| PyTorch v1.9  | torchvision v0.10.0 |
| PyTorch v1.10 | torchvision v0.11.1 |
| PyTorch v1.11 | torchvision v0.12.0 |
| PyTorch v1.12 | torchvision v0.13.0 |

PyTorch v1.6.0 到 PyTorch v1.10.0 使用 Python 3.6，PyTorch v1.11.0 到 PyTorch v1.12.0 使用 Python 3.8。

```bash
wget https://nvidia.box.com/shared/static/p57jwntv436lfrd78inwl7iml6p13fzh.whl -O torch-1.8.0-cp36-cp36m-linux_aarch64.whl
sudo apt-get install python3-pip libopenblas-base libopenmpi-dev libomp-dev
pip3 install Cython
pip3 install numpy torch-1.8.0-cp36-cp36m-linux_aarch64.whl
```

如果下载不方便可以在电脑上下载后传到 Nano 上。

### 3.3 安装 Torchvision

先安装 Pillow：

```bash
pip3 install pillow
```

然后执行下面的命令编译安装 Torchvision：

```bash
sudo apt-get install libjpeg-dev zlib1g-dev libpython3-dev libavcodec-dev libavformat-dev libswscale-dev

git clone --branch v0.8.0 https://github.com/pytorch/vision torchvision
cd torchvision
export BUILD_VERSION=0.8.0
python3 setup.py install --user
```

检查安装结果：

```python
import torch

print(torch.__version__)
print('CUDA available: ' + str(torch.cuda.is_available()))
print('cuDNN version: ' + str(torch.backends.cudnn.version()))
a = torch.cuda.FloatTensor(2).zero_()
print('Tensor a = ' + str(a))
b = torch.randn(2).cuda()
print('Tensor b = ' + str(b))
c = a + b
print('Tensor c = ' + str(c))

import torchvision
print(torchvision.__version__)
```

### 3.4 安装 torch2trt

```bash
git clone https://github.com/NVIDIA-AI-IOT/torch2trt --depth 1
cd torch2trt
sudo python3 setup.py install --plugins
```

## 4. 高性能模式

除了 **无桌面模式** 和 **swap 虚拟内存** 外，还可以提高功耗和解除硬件限制来提高性能。

查看当前工作模式：

```bash
sudo nvpmodel -q
```

将工作模式设置为最大功率（10 W）：

```bash
sudo nvpmodel -m 0
```

将工作模式设定为低功率（5 W）：

```bash
sudo nvpmodel -m 1
```

解除硬件限制：

```bash
sudo jetson_clocks
```
