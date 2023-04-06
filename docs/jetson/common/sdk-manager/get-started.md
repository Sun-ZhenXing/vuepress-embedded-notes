# 使用 SDK Manager

[[TOC]]

## 1. 安装 SDK Manager

到 [下载页面](https://developer.nvidia.com/drive/sdk-manager) 下载最新版本，建议使用 Ubuntu 18.04 或更高。

::: info 应该选择哪个 Ubuntu 版本？

目前官方对 SDK Manager 支持不好，截至目前（2023 年 4 月 6 日），新的系统不能安装旧版本的 JetPack 4.x 等工具，而且新版本的 JetPack（指 5.x 版本）仅仅支持少部分 Jetson，所以建议使用 Ubuntu 18.04 LTS。

:::

现在，在 Ubuntu 18.04 上安装 SDK Manager，如果是更新的系统也可以使用下面的命令：

```bash
sudo apt install ./sdkmanager_[version].deb
```

安装完成后直接在命令行启动即可：

```bash
sdkmanager
```

## 2. 卸载 SDK Manager

如果需要卸载已安装的 SDK Manager，可以使用以下命令：

```bash
sudo apt remove sdkmanager
rm ~/.nvsdkm/ -rf
```

## 3. 使用 Docker 安装 SDK Manager

到 [下载页面](https://developer.nvidia.com/drive/sdk-manager) 下载 Docker 版本的 SDK Manager，然后使用以下命令启动：

安装 Docker 镜像：

```bash
docker load -i ./sdkmanager_[version].tar.gz
```

查看 Docker 镜像：

```bash
docker images
```

将镜像的 Tag 改为 `latest`：

```bash
docker tag sdkmanager:latest sdkmanager:[version]
```

查看帮助：

```bash
docker run --rm -it sdkmanager:latest --help
```
