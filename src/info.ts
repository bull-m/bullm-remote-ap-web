/**
 * 设备信息展示模块
 */
import {DomAddToApp, DomRemoveToApp} from "./utils.ts";

export function addInfoList(info: {
    ip: string,
    mac: string,
    type: string,
    hardware_version: string,
    version: string
}) {
    const list = [
        {name: 'IP地址', value: info.ip},
        {name: 'MAC地址', value: info.mac},
        {name: '设备代号', value: info.type},
        {name: '硬件版本', value: info.hardware_version},
        {name: '固件版本', value: info.version},
    ]
    
    // 移除旧的信息框
    DomRemoveToApp('info-box')
    // 渲染新的信息列表
    DomAddToApp(
        list.map(item => `<div class="info-item">
            <div class="name">${item.name}</div>
            <div class="value">${item.value}</div>
        </div>`).join(''),
        'info-box',
        "container"
    )
}
