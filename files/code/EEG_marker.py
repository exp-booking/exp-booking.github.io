#!/usr/bin/env python
#-*-coding:utf-8 -*-
from psychopy import core,parallel

# psychopy打marker代码
# 可复制粘贴使用
pport = parallel.ParallelPort(address=0x3FF8)
# 并口，端口号：0x3FF8
def send_marker(marker_code):
    pport.setData(marker_code)
    # 发送marker
    core.wait(0.002)
    # 延迟0.002 sec，官方建议是.005，但能短还是短一点
    # .002参考了rusocsci引入的buttonbox设定
    # 不确定再短的话，脑电是否能接受到marker
    pport.setData(0)
    # 通道清零
