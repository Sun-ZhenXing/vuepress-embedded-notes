---
title: 开始使用 Rock 3A
description: 开始使用 Rock 3A
---

# 开始使用 Rock 3A

[[TOC]]

## 1. 烧录系统

::: tip 下载系统

从 [官方 GitHub 仓库](https://github.com/radxa-build/rock-3a) 可以下载系统，并获得系统镜像的有关信息。

下载系统镜像，建议使用 Debian/Ubuntu 镜像，因为 RKNPU/RKNN_Toolkit 对于 Debian 系列系统支持最好。并且不要使用预发布的版本，部分驱动可能不稳定或无法使用。

:::

下载得到类似 `rock-3a-debian-bullseye-xfce4-arm64-20xxxxxx-xxxx-gpt.img.xz` 的文件，使用 [Rufus](https://rufus.ie/zh/) 或者 [balenaEtcher](https://www.balena.io/etcher/) 等烧录软件，烧录下载得到的镜像文件到 U 盘或者 SD 卡。

将 SD 卡插入到主板的 SD 卡槽，连接网线和电源。如果有显示屏更好，可以直接通过命令得到 IP 信息。

如果没有显示屏，可能需要尝试几种方法获取 Rock 的 IP 地址。如果当前系统支持 mDNS，则可以通过下面的方式获取 IP：

```bash
ping rock3a.local
```

否则，通过端口搜索或扫描，或者查看路由器管理界面，可以得到其 IP 地址，直接使用 SSH 连接即可。SSH 连接命令：

```bash
ssh rock@<ip>
```

默认的账号和密码都是 `rock`。

::: info 设备对应的设备表

参见参考文献。[^1]

[^1]: Work with ROCK 3 Debian，Radxa Wiki，<https://wiki.radxa.com/Rock3/Debian>

| 镜像烧录方式 | 设备           |
| ------------ | -------------- |
| eMMC         | `/dev/mmcblk0` |
| SD Card      | `/dev/mmcblk1` |
| NVME M.2 SDD | `/dev/nvme0n1` |

:::

## 2. 基本功能安装

### 2.1 更新源和内核

这一小节以 Debian 为例。

各种查看系统内核版本和发行版本的命令：

```bash
uname -a
hostnamectl

cat /etc/issue
cat /etc/os-release
cat /etc/debian_version
```

添加官方秘钥：[^2]

[^2]: radxa debian packages repository，<http://apt.radxa.com/>

```bash
wget -O -  apt.radxa.com/stretch/public.key | sudo apt-key add -
```

系统的软件源列表更新：

```bash
sudo echo 'deb https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
#deb-src https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb https://mirrors.aliyun.com/debian-security/ bullseye-security main
#deb-src https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
#deb-src https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
#deb-src https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib

deb http://apt.radxa.com/buster-stable/ buster main
deb http://apt.radxa.com/buster-testing/ buster main
deb http://apt.radxa.com/stretch/ stretch main' > /etc/apt/sources.list
```

更新系统功能命令，注意需要保持 Linux 内核版本和其包版本一致。

```bash
sudo apt-get update
sudo apt-get install -y rockchip-overlay
sudo apt-get install -y linux-4.19-rock-3-latest
```

如果下载较慢，可以使用局域网代理，将 `<ip>` 和 `<port>` 替换为你的代理主机信息：

```bash
export http_proxy=http://<ip>:<port>
export https_proxy=socks://<ip>:<port>
```

### 2.2 Ubuntu 安装桌面

这是可选功能，如果您确实有需要则可以安装，安装过程较慢。Ubuntu 镜像默认没有桌面，安装桌面命令：

```bash
sudo apt-get update
sudo apt install ubuntu-mate-core
sudo apt install ubuntu-mate-desktop
```

### 2.3 个性化配置

支持常见命令简写 `ll`、`la`、`l`：

```bash
echo "alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'" >> ~/.bashrc
source ~/.bashrc
```

## 3. 开启 NPU

NPU 在新版本镜像中没有被默认开启，需要开启 NPU 引导。如果不确定系统有没有引导 NPU，则查看配置：

```bash
sudo dmesg | grep rknpu
```

检查内核版本：

```bash
uname -a
```

得到：

```txt
Linux rock-3a 4.19.193-58-rockchip-gbac1feba87f0 #rockchip SMP Tue Oct 18 09:36:57 UTC 2022 aarch64 aarch64 aarch64 GNU/Linux
```

发现内核版本是 `4.19`，尝试安装或更新内核：

```bash
sudo apt install linux-4.19-rock-3-latest
```

注释 `/boot/config.txt` 文件内的禁用 NPU 配置：

```properties
# dtoverlay=rk3568-disable-npu
```

然后更新 extlinux，然后重启：

```bash
sudo update_extlinux.sh

sudo reboot
```

重启后检查 NPU 有没有正常启动：

```bash
sudo dmesg | grep rknpu
```

可以看到很多关于 NPU 的引导日志说明启动成功。

## 4. 初始化 RKNN 服务

镜像内没有 RKNN 服务，部分 NPU 功能可能无法使用，下面的命令将给系统安装此服务：

```bash
git clone https://github.com/rockchip-linux/rknpu2 --depth 1

pushd rknpu2/runtime/RK356X/Linux/librknn_api/aarch64
sudo cp * /usr/lib/
popd

pushd rknpu2/runtime/RK356X/Linux/rknn_server/aarch64/usr/bin
sudo cp * /usr/bin/
popd
```

然后使用 root 权限启动 RKNN 服务：

```bash
chmod +x /usr/bin/rknn_server
chmod +x /usr/bin/start_rknn.sh
chmod +x /usr/bin/restart_rknn.sh
restart_rknn.sh
```

## 5. 开启串口通信

在 `/boot/config.txt` 中定义了启动时引导的设备，如果需要 I2C、PWM、SPI、UART、CAN 等串口控制器，请确保 `overlays` 值正确。

### 5.1 I2C

```properties
overlays=rk3568-i2c2-m0
overlays=rk3568-i2c3-m0
```

### 5.2 PWM

```properties
overlays=rk3568-pwm0-m0
overlays=rk3568-pwm0-m1
overlays=rk3568-pwm1-m1
```

启动时自动生成 `/sys/devices/platform/fdd70000.pwm/pwm/pwmchip*`。

### 5.3 UART

使得设备 `/dev/ttyS2` 作为调试控制台：

```properties
overlays=rk3568-fiq-debugger-uart2m0
```

使得设备 `/dev/ttyS2` 作为标准命令行输出到 UART，需要开启：

```properties
overlays=rk3568-uart2-m0
```
