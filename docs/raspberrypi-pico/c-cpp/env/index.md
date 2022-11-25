---
lang: zh-CN
title: Pico C/C++ 开发环境搭建
description: 简单介绍如何搭建 Pico 的 C/C++ 开发环境
---

# Pico C/C++ 开发环境搭建

::: warning 环境配置

本文构建的是 x86 下的交叉编译环境，使用 Ubuntu 系统，如果需要其他系统或架构不能保证成功。

:::

## 必要条件

- Ubuntu 20.04 或更高（官方建议）
- 系统桌面支持（非必须，部分功能依赖桌面）

## 步骤

### 安装基本依赖

```bash
sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi build-essential
```

### 克隆官方仓库

```bash
cd
mkdir -p pico
cd pico/
git clone -b master https://github.com/raspberrypi/pico-sdk.git
cd pico-sdk/
git submodule update --init
cd ..
git clone -b master https://github.com/raspberrypi/pico-examples.git

# Pico Project Generator 需要 GUI 支持
sudo apt install python3-tk
git clone https://github.com/raspberrypi/pico-project-generator.git
```

保存环境变量：

```bash
cd
echo "export PICO_SDK_PATH=/home/$USER/pico/pico-sdk" >> .bashrc
source .bashrc
```

### 验证 SDK

```bash
cd
cd pico/pico-examples/
mkdir -p build
cd build/
cmake ..

cd blink/
make -j $(nproc)
```

将 Pico 进入下载模式，将 `.uf2` 文件复制到 Pico 中即可。

下面是 `blink.c` 的源代码：

```c
// blink/blink.c
#include "pico/stdlib.h"

int main() {
#ifndef PICO_DEFAULT_LED_PIN
#warning blink example requires a board with a regular LED
#else
    const uint LED_PIN = PICO_DEFAULT_LED_PIN;
    gpio_init(LED_PIN);
    gpio_set_dir(LED_PIN, GPIO_OUT);
    while (true) {
        gpio_put(LED_PIN, 1);
        sleep_ms(250);
        gpio_put(LED_PIN, 0);
        sleep_ms(250);
    }
#endif
}
```

这是其 `CMakeLists.txt`：

```cmake
add_executable(blink
    blink.c
)

# pull in common dependencies
target_link_libraries(blink pico_stdlib)

# create map/bin/hex file etc.
pico_add_extra_outputs(blink)

# add url via pico_set_program_url
example_auto_set_url(blink)
```

### 使用工程生成器

```bash
cd
cd pico/pico-project-generator/

./pico_project.py --gui
```

填写正确位置可生成工程，我们生成一个 `myblink` 工程。

将 `blink.c` 复制覆盖到 `myblink.c`，然后编译它：

```bash
cd path/to/new/project

cd build
make -j $(nproc)
```

## VS Code 推荐插件

```bash
code --install-extension marus25.cortex-debug
code --install-extension ms-vscode.cmake-tools
code --install-extension ms-vscode.cpptools
```
