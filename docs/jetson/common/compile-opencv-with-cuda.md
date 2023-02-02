---
title: 编译 CUDA 支持的 OpenCV
description: 编译 CUDA 支持的 OpenCV
---

# 编译 CUDA 支持的 OpenCV

[[TOC]]

## 1. 安装依赖

在编译之前确保你的设备已经安装了 CUDA。查看是否安装了 CUDA 和 OpenCV，以及此 OpenCV 是否有 CUDA 支持：

```bash
jetson_release
```

确保能看到 CUDA 版本。如果没有安装 OpenCV 或 OpenCV 的 CUDA 支持为 **NO**，说明需要编译 CUDA 支持的 OpenCV。

卸载 OpenCV 所有组件：

```bash
sudo apt purge libopencv*
```

下面安装编译所需的基本依赖（当前 OpenCV 4.7.0，Ubuntu 18.04 编译通过，其他版本可参考，理论上通用）：

```bash
sudo apt install -y build-essential checkinstall cmake pkg-config yasm git gfortran
sudo apt install -y libjpeg8-dev libtiff5-dev libavcodec-dev libavformat-dev libswscale-dev libdc1394-22-dev libxine2-dev libv4l-dev
sudo apt install -y libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgtk2.0-dev libtbb2 libtbb-dev libatlas-base-dev libfaac-dev libmp3lame-dev libtheora-dev libvorbis-dev libxvidcore-dev libopencore-amrnb-dev libopencore-amrwb-dev x264 v4l-utils
sudo apt install -y python-dev python-numpy libjpeg-dev libpng-dev libtiff-dev
sudo apt install -y libjasper-dev
```

最后一个如果提示包没有找到，可以加入下面的源：

```bash
sudo add-apt-repository "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ xenial main multiverse restricted universe"
sudo apt update
```

## 2. 编译和构建

下载 [OpenCV: Releases](https://github.com/opencv/opencv/releases) 和 [OpenCV_Contrib: Tags](https://github.com/opencv/opencv_contrib/tags) 下载相同版本的代码，并解压到同一个文件夹下：

下面是示例的目录结构：

- `opencv-source/`
    - `opencv-4.7.0/`
        - `build/`
    - `opencv_contrib-4.7.0/`

现在进行编译：

```bash
cd opencv-4.7.0/
mkdir build
cd build
```

查看 `CUDA_ARCH_BIN` 的值：

```bash
cd /usr/local/cuda/samples/1_Utilities/deviceQuery
sudo make
./deviceQuery
```

在 **CUDA Capability Major/Minor version number** 后面的数字即 `CUDA_ARCH_BIN` 的值。在 Jetson Nano 上查询结果为 5.3：

```bash
export CUDA_ARCH_BIN_VERSION=5.3
```

示例 CMake 选项：

```bash
cmake \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DOPENCV_ENABLE_NONFREE=ON \
    -DBUILD_opencv_python3=ON \
    -DWITH_FFMPEG=ON \
    -DWITH_CUDA=ON \
    -DCUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda \
    -DCUDA_ARCH_BIN=${CUDA_ARCH_BIN_VERSION} \
    -DENABLE_FAST_MATH=ON \
    -DCUDA_FAST_MATH=ON \
    -DWITH_CUBLAS=ON \
    -DOPENCV_GENERATE_PKGCONFIG=ON \
    -DOPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-4.7.0/modules/ \
    ..
```

***TODO*** 可以指定 `-DCUDA_ARCH_PTX=5.3` 和 `CUDA_ARCH_BIN` 值相同，用途和影响未知。

::: info 使用 Clang

经过测试，发现部分设备使用 GCC 编译套件出现各种编译或链接错误，可能是由于编译器版本过旧或者不匹配造成的，可以使用 Clang 代替：

```bash
sudo apt install clang
sudo apt install lld-10 liblld-10

sudo ln -s -f /usr/bin/lld-10 /usr/bin/lld
```

请检查是否有新版本的 LLD，当前测试的镜像最新版本为 LLD-10，可以加入其他镜像来更新 LLD。

CMake 指令如下：

```bash
cmake \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_CXX_COMPILER=$(which clang++) \
    -DCMAKE_C_COMPILER=$(which clang) \
    -DCMAKE_LINKER=$(which lld) \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DOPENCV_ENABLE_NONFREE=ON \
    -DBUILD_opencv_python3=ON \
    -DWITH_FFMPEG=ON \
    -DWITH_CUDA=ON \
    -DCUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda \
    -DCUDA_ARCH_BIN=${CUDA_ARCH_BIN_VERSION} \
    -DENABLE_FAST_MATH=ON \
    -DCUDA_FAST_MATH=ON \
    -DWITH_CUBLAS=ON \
    -DOPENCV_GENERATE_PKGCONFIG=ON \
    -DOPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-4.7.0/modules/ \
    ..
```

:::

下面进行编译：

```bash
make -j $(nproc)
```

此过程较长，预计需要几个小时。

安装：

```bash
sudo make install
```

如果此时没有错误，可以用 `jetson_release` 查询到安装成功：

```bash
jetson_release
```

查询结果：

```yml{12}
Model: NVIDIA Jetson Nano Developer Kit - Jetpack 4.6.3 [L4T 32.7.3]
NV Power Mode: MAXN - Type: 0
jtop:
 - Version: 4.1.0
 - Service: Active
Libraries:
 - CUDA: 10.2.300
 - cuDNN: 8.2.1.32
 - TensorRT: 4.6.3
 - VPI: 1.2.3
 - Vulkan: 1.2.70
 - OpenCV: 4.7.0 - with CUDA: YES
```
