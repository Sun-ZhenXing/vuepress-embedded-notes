---
title: MicroPython 配置 IDE
description: MicroPython 配置 IDE
---

# MicroPython 配置 IDE

## 1. 开发环境

根据树莓派官网的提示，目前对 Pico 支持性最好的 IDE 是 [Thonny](https://thonny.org/)，建议安装最新版本的 Thonny 来调试 Pico。

在 Thonny 中，如果你想将文件下载到 Pico 中，只需要保存到 Pico 即可，而且 Thonny 支持交互模式的 Pico。如果你想删除一个文件，只需要选择打开 Pico 上的文件，然后右键删除你想删除的文件即可。

但是 Thonny 开发 Python 效率较低，缺少 Hints（语法提示和错误提示），我们需要功能健全的 IDE 开发 Python。很多情况下，我们只是需要开发的 IDE 支持 Hints，而不需要安装整个 MicroPython 环境，下面我们举例几种 IDE 支持 MicroPython Hints 的方法。

## 2. 提供语法提示

下面提供几种语法提示的解决方法，仅供参考。

### 2.1 VS Code 引入存根文件

下面的设置依赖于 Pylance 插件，确保你的 VS Code 的 Python 插件是 Pylance。

引入 MicroPython 的存根文件（Stub files，即 `.pyi` 文件）即可，可以克隆下面的项目：

```bash
git clone https://github.com/vlasovskikh/intellij-micropython.git
```

例如，我将其放到 `D:\WorkSpace\intellij-micropython` 下面，那么只需要配置 VS Code 工作区设置即可（添加文件 `.vscode/settings.json`）：

```json
{
    "python.analysis.extraPaths": [
        "D:\\WorkSpace\\intellij-micropython\\typehints\\rpi_pico",
        "D:\\WorkSpace\\intellij-micropython\\typehints\\micropython",
        "D:\\WorkSpace\\intellij-micropython\\typehints\\stdlib"
    ],
    "python.analysis.diagnosticSeverityOverrides": {
        "reportMissingModuleSource": "none"
    }
}
```

使用 `reportMissingModuleSource` 配置原因是如果 Pylance 发现了 `.pyi` 存根文件，但是没有发现源文件，Pylance 就会认为这个库无法加载，并给出警告。但是一般情况下这种问题不会发生，所以我们禁用了这个警告。

由于我只用于开发 RaspberryPi Pico，所以我只引入了标准库和 `rpi_pico` 依赖，你可以根据需求选择自己的依赖。

此时，我可以正常开发任何 MicroPython 应用了，代码自动补全还包含英文的注解，免去许多查文档的麻烦。

### 2.2 用于 IntelliJ 系列产品

我们注意到上面的项目其实是为 IntelliJ 打造的插件，包括 PyCharm 等在内都可以使用，直接装在 IDE 里面。下载地址：<https://plugins.jetbrains.com/plugin/9777-micropython>，可以使用插件获得完整开发体验。

目前（2022-05-15）支持的开发板：
- ESP8266
- PyBoard
- BBC Micro:bit
- Raspberry Pi Pico

### 2.3 全局设置

使用 `micropython-stubber` 可对多数 MicroPython 程序提供语法提示。

::: warning 破坏性警告

这可能对你的 Python 依赖包产生破坏性修改，所以请使用 `venv` 等工具创建虚拟环境专门用于 MicroPython 的开发。

:::

如果你想为大多数 MicroPython 程序设置自动补全，可以使用下面的库：

```bash
pip install micropython-stubber
```

对于这个库本文作者没有进行测试，而且可能和很多库的配置有冲突，我就暂且不使用它了。
