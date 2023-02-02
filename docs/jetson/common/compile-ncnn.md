---
title: 编译 NCNN
description: 编译 NCNN
---

# 编译 NCNN

## 1. 编译 CMake

NCNN 编译要求 CMake 版本大于 3.13（当前 2023-02-02），而 Ubuntu 18 源很快停止维护，将维持 3.10 版本，所以我们需要从源码安装。

卸载 CMake：

```bash
apt-get remove cmake
```

安装 OpenSSL 库：

```bash
sudo apt-get install openssl libssl-dev
```

在 [CMake: download](https://cmake.org/download/) 页面找到最新版本，下载源代码：

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.25.2/cmake-3.25.2.tar.gz
tar xzvf cmake-3.25.2.tar.gz
cd cmake-3.25.2
```

编译安装：

```bash
./bootstrap
make -j $(nproc)
sudo make install
```

下面测试 CMake 版本：

```bash
cmake --version
```

## 2. 编译 NCNN

### 2.1 正常编译

克隆仓库，如果克隆失败建议使用代理：

```bash
git clone https://github.com/Tencent/ncnn.git
cd ncnn
git submodule update --init
```

现在准备编译：

```bash
mkdir -p build
cd build
cmake \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_TOOLCHAIN_FILE=../toolchains/jetson.toolchain.cmake \
    -DNCNN_VULKAN=ON \
    -DNCNN_SIMPLEOCV=ON \
    -DNCNN_BUILD_EXAMPLES=ON \
    ..
make -j $(nproc)
```

::: warning CUDA 错误

*@TODO* 在未指定 `-DNCNN_SIMPLEOCV=ON` 时将使用系统的 OpenCV，如果系统的 OpenCV 包含 CUDA 支持，那么此时需要指定 CUDA 的位置信息。但是通过各种方法仍然不能编译通过，出现找不到 CUDA 库信息的报告。当前使用 CUDA 10.2。

:::

### 2.2 使用 Clang 套件

需要编辑 `jetson.toolchain.cmake` 来禁用默认的 GCC 套件：

```cmake
# set(CMAKE_C_COMPILER "aarch64-linux-gnu-gcc")
# set(CMAKE_CXX_COMPILER "aarch64-linux-gnu-g++")

# set ${CMAKE_C_FLAGS} and ${CMAKE_CXX_FLAGS}flag for cross-compiled process
# -march=armv8-a could work on Jetson, but will compile without some extra cpu features
# set(CMAKE_C_FLAGS "-march=native ${CMAKE_C_FLAGS}")
# set(CMAKE_CXX_FLAGS "-march=native ${CMAKE_CXX_FLAGS}")
```

下面使用 Clang 套件编译：

```bash
cmake \
    -DCMAKE_CXX_COMPILER=$(which clang++) \
    -DCMAKE_C_COMPILER=$(which clang) \
    -DCMAKE_LINKER=$(which lld) \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_TOOLCHAIN_FILE=../toolchains/jetson.toolchain.cmake \
    -DNCNN_VULKAN=ON \
    -DNCNN_SIMPLEOCV=ON \
    -DNCNN_BUILD_EXAMPLES=ON \
    ..
make -j $(nproc)
```

::: warning 段错误

*@TODO* 该测试使用 Clang 套件，并包含 Vulkan 支持，执行任何测试程序输出结果后不能正确停止，抛出段错误：

```bash
cd ../examples
../build/examples/squeezenet ../images/128-ncnn.png
```

输出：

```log
[0 NVIDIA Tegra X1 (nvgpu)]  queueC=0[16]  queueG=0[16]  queueT=0[16]
[0 NVIDIA Tegra X1 (nvgpu)]  bugsbn1=0  bugbilz=0  bugcopc=0  bugihfa=0
[0 NVIDIA Tegra X1 (nvgpu)]  fp16-p/s/a=1/1/1  int8-p/s/a=1/1/1
[0 NVIDIA Tegra X1 (nvgpu)]  subgroup=32  basic=1  vote=1  ballot=1  shuffle=1
532 = 0.138184
920 = 0.061310
598 = 0.049622
Segmentation fault (core dumped)
```

暂时未解决。猜测和 Vulkan 有关，未使用 Vulkan 的 CPU 版本没有此错误。

:::

## 3. 基准测试

```bash
cd ../benchmark
../build/benchmark/benchncnn 10 $(nproc) 0 0
```

含 Vulkan 的版本在 Jetson Nano（B01）上的测试结果如下（2023-02-02）：

```log
[0 NVIDIA Tegra X1 (nvgpu)]  queueC=0[16]  queueG=0[16]  queueT=0[16]
[0 NVIDIA Tegra X1 (nvgpu)]  bugsbn1=0  bugbilz=0  bugcopc=0  bugihfa=0
[0 NVIDIA Tegra X1 (nvgpu)]  fp16-p/s/a=1/1/1  int8-p/s/a=1/1/1
[0 NVIDIA Tegra X1 (nvgpu)]  subgroup=32  basic=1  vote=1  ballot=1  shuffle=1
loop_count = 10
num_threads = 4
powersave = 0
gpu_device = 0
cooling_down = 1
          squeezenet  min =    9.32  max =    9.46  avg =    9.37
     squeezenet_int8  min =   25.15  max =   25.30  avg =   25.23
           mobilenet  min =   15.72  max =   15.86  avg =   15.79
      mobilenet_int8  min =   27.42  max =   27.72  avg =   27.57
        mobilenet_v2  min =   12.43  max =   12.53  avg =   12.48
        mobilenet_v3  min =   13.13  max =   13.26  avg =   13.19
          shufflenet  min =   10.93  max =   11.01  avg =   10.96
       shufflenet_v2  min =    9.82  max =   10.01  avg =    9.86
             mnasnet  min =   13.01  max =   13.25  avg =   13.07
     proxylessnasnet  min =   14.27  max =   14.41  avg =   14.32
     efficientnet_b0  min =   20.98  max =   21.22  avg =   21.09
   efficientnetv2_b0  min =   38.90  max =   39.22  avg =   39.02
        regnety_400m  min =   17.12  max =   17.30  avg =   17.19
           blazeface  min =    3.24  max =    3.29  avg =    3.26
           googlenet  min =   30.27  max =   30.49  avg =   30.34
      googlenet_int8  min =   79.61  max =   80.18  avg =   79.85
            resnet18  min =   27.47  max =   27.57  avg =   27.52
       resnet18_int8  min =   59.07  max =   59.74  avg =   59.40
             alexnet  min =   48.73  max =   49.26  avg =   48.96
               vgg16  min =  142.72  max =  144.31  avg =  143.05
          vgg16_int8  min =  286.85  max =  288.51  avg =  287.74
            resnet50  min =   71.55  max =   71.96  avg =   71.71
       resnet50_int8  min =  148.30  max =  149.12  avg =  148.60
      squeezenet_ssd  min =   32.92  max =   33.23  avg =   33.05
 squeezenet_ssd_int8  min =   65.86  max =   66.57  avg =   66.14
       mobilenet_ssd  min =   34.70  max =   35.01  avg =   34.86
  mobilenet_ssd_int8  min =   56.45  max =   56.75  avg =   56.63
      mobilenet_yolo  min =   70.04  max =   70.67  avg =   70.39
  mobilenetv2_yolov3  min =   45.47  max =   45.76  avg =   45.61
         yolov4-tiny  min =   66.89  max =   67.40  avg =   67.12
           nanodet_m  min =   18.73  max =   18.88  avg =   18.81
    yolo-fastest-1.1  min =   11.22  max =   11.39  avg =   11.30
      yolo-fastestv2  min =    9.76  max =    9.89  avg =    9.81
  vision_transformer  min = 2682.28  max = 2697.72  avg = 2689.92
          FastestDet  min =    9.94  max =   10.10  avg =   10.03
```

不含 Vulkan 的 CPU 版本在 Jetson Nano 上的测试结果如下（2023-02-02）：

```log
loop_count = 10
num_threads = 4
powersave = 0
gpu_device = 0
cooling_down = 1
          squeezenet  min =   28.98  max =   29.28  avg =   29.11
     squeezenet_int8  min =   25.10  max =   25.53  avg =   25.23
           mobilenet  min =   39.80  max =   40.09  avg =   39.96
      mobilenet_int8  min =   27.29  max =   27.63  avg =   27.49
        mobilenet_v2  min =   31.51  max =   31.98  avg =   31.65
        mobilenet_v3  min =   26.49  max =   26.86  avg =   26.69
          shufflenet  min =   20.04  max =   20.58  avg =   20.26
       shufflenet_v2  min =   17.02  max =   17.60  avg =   17.19
             mnasnet  min =   29.49  max =   30.02  avg =   29.62
     proxylessnasnet  min =   34.17  max =   34.86  avg =   34.42
     efficientnet_b0  min =   59.06  max =   59.87  avg =   59.28
   efficientnetv2_b0  min =   65.72  max =   91.38  avg =   68.73
        regnety_400m  min =   56.01  max =   56.48  avg =   56.21
           blazeface  min =    5.67  max =    5.84  avg =    5.74
           googlenet  min =   90.85  max =   91.61  avg =   91.17
      googlenet_int8  min =   78.91  max =   79.58  avg =   79.19
            resnet18  min =   80.18  max =   82.15  avg =   80.64
       resnet18_int8  min =   58.98  max =   77.46  avg =   61.45
             alexnet  min =   60.00  max =   61.35  avg =   60.46
               vgg16  min =  377.00  max =  382.35  avg =  379.10
          vgg16_int8  min =  285.44  max =  288.74  avg =  286.98
            resnet50  min =  196.79  max =  197.87  avg =  197.23
       resnet50_int8  min =  148.09  max =  149.84  avg =  148.88
      squeezenet_ssd  min =   82.21  max =   82.94  avg =   82.54
 squeezenet_ssd_int8  min =   65.03  max =   65.51  avg =   65.25
       mobilenet_ssd  min =   83.00  max =   83.69  avg =   83.28
  mobilenet_ssd_int8  min =   56.43  max =   56.95  avg =   56.65
      mobilenet_yolo  min =  185.10  max =  186.02  avg =  185.55
  mobilenetv2_yolov3  min =  111.98  max =  112.51  avg =  112.23
         yolov4-tiny  min =  156.89  max =  158.15  avg =  157.47
           nanodet_m  min =   40.70  max =   41.68  avg =   41.11
    yolo-fastest-1.1  min =   22.65  max =   22.91  avg =   22.79
      yolo-fastestv2  min =   18.55  max =   18.95  avg =   18.65
  vision_transformer  min = 3163.91  max = 3259.01  avg = 3206.24
          FastestDet  min =   19.80  max =   20.10  avg =   19.90
```

下面是详细比较（平均值）：

| 网络名称            | GPU(Vulkan) 平均 | CPU 平均   |
| ------------------- | ---------------- | ---------- |
| squeezenet          | 9.37             | 29.11      |
| squeezenet_int8     | 25.23            | **25.23**  |
| mobilenet           | 15.79            | 39.96      |
| mobilenet_int8      | 27.57            | **27.49**  |
| mobilenet_v2        | 12.48            | 31.65      |
| mobilenet_v3        | 13.19            | 26.69      |
| shufflenet          | 10.96            | 20.26      |
| shufflenet_v2       | 9.86             | 17.19      |
| mnasnet             | 13.07            | 29.62      |
| proxylessnasnet     | 14.32            | 34.42      |
| efficientnet_b0     | 21.09            | 59.28      |
| efficientnetv2_b0   | 39.02            | 68.73      |
| regnety_400m        | 17.19            | 56.21      |
| blazeface           | 3.26             | 5.74       |
| googlenet           | 30.34            | 91.17      |
| googlenet_int8      | 79.85            | **79.19**  |
| resnet18            | 27.52            | 80.64      |
| resnet18_int8       | 59.40            | 61.45      |
| alexnet             | 48.96            | 60.46      |
| vgg16               | 143.05           | 379.10     |
| vgg16_int8          | 287.74           | **286.98** |
| resnet50            | 71.71            | 197.23     |
| resnet50_int8       | 148.60           | 148.88     |
| squeezenet_ssd      | 33.05            | 82.54      |
| squeezenet_ssd_int8 | 66.14            | 65.25      |
| mobilenet_ssd       | 34.86            | 83.28      |
| mobilenet_ssd_int8  | 56.63            | 56.65      |
| mobilenet_yolo      | 70.39            | 185.55     |
| mobilenetv2_yolov3  | 45.61            | 112.23     |
| yolov4-tiny         | 67.12            | 157.47     |
| nanodet_m           | 18.81            | 41.11      |
| yolo-fastest-1.1    | 11.30            | 22.79      |
| yolo-fastestv2      | 9.81             | 18.65      |
| vision_transformer  | 2689.92          | 3206.24    |
| FastestDet          | 10.03            | 19.90      |
