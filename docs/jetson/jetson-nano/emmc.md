# eMMC 系统

[[TOC]]

## 1. 烧录系统

将系统烧录到 eMMC，可参考 [SDK Manager 的使用](https://www.waveshare.net/wiki/JETSON-NANO-DEV-KIT)。

## 2. 复制系统到 U 盘

查看 U 盘的名称：

```bash
ls /dev/sd*
```

这里可以看到设备名称为 `sda`，设置其为 `usb_disk`：

```bash
export usb_name=sda
export usb_disk=/dev/${usb_name}
```

查看其是否被挂载：

```bash
df -h | grep ${usb_disk}
```

如果被挂载，可以先卸载：

```bash
sudo umount /media/${mount_dir}
```

现在格式化此 U 盘：

```bash
sudo mkfs.ext4 ${usb_disk}
```

如果提示是否格式化，按 `y` 回车，耐心等待。

下面将 `/boot/extlinux/extlinux.conf` 文件的下面一行修改为从 `sda` 引导：

```diff
-       APPEND ${cbootargs} quiet root=/dev/mmcblk0p1 rw rootwait ...
+       APPEND ${cbootargs} quiet root=/dev/sda rw rootwait ...
```

可以通过 `sed` 直接修改：

```bash
sudo sed -i s/mmcblk0p1/${usb_name}/ /boot/extlinux/extlinux.conf
```

将 U 盘挂载到 `/mnt/`：

```bash
sudo mount ${usb_disk} /mnt
```

将系统全部文件复制到 U 盘：

```bash
sudo cp -ax / /mnt
```

此过程较长，请耐心等待。

下面卸载 U 盘：

```bash
sudo umount /mnt/
```

重启系统：

```bash
sudo reboot
```
