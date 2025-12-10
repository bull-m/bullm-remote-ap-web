/**
 * WiFi列表
 */
import Sortable from 'sortablejs';
import SvgSort from './icon/sort.svg'
import SvgDelect from './icon/delect.svg'
import {DomAddToApp, DomRemoveToApp} from "./utils.ts";
import {getToken} from "./token.ts";

// WiFi列表数据
let data = {
    list: [] as {
        name: string   // WiFi名称(SSID)
        pass?: string  // WiFi密码，可选
    }[]
}

/**
 * 初始化WiFi列表
 */
export async function initWifiList() {
    // 从服务器获取WiFi列表
    data = await fetch(`/api/wifi?token=${getToken()}`).then(res => res.json())

    // 确俚list存在
    if (!data.list) {
        data.list = []
    }

    // 移除旧的WiFi列表
    DomRemoveToApp('wifi-box')

    // 渲染WiFi列表界面
    DomAddToApp(`
    <div class="header">
      <h1>WiFi列表</h1>
      <p>将按顺序进行连接，拖动可排序</p>
    </div>
    <div class="list" id="wifi-list">
        ${data.list.map((item, index) => `
          <div class="item">
              <div class="details">
                <div class="name">${item.name}</div>
                <div class="pass">${item.pass ? '密码：***' : '无密码'}</div>
              </div>
              <div class="sort">
                <img src="${SvgSort}" alt="排序">
              </div>
              <div class="delect" onclick="wifi_delect('${item.name}', ${index})">
                <img src="${SvgDelect}" alt="删除">
              </div>
          </div>
        `).join('')}
        <button class="btn" onclick="wifi_add()">添加</button>
    </div>`, 'wifi-box', "container")

    // 初始化拖拽排序
    initSortable()
}

/**
 * 添加WiFi
 * 提示用户输入WiFi名称和密码
 */
(window as any).wifi_add = () => {
    // 限制最多10个WiFi
    if (data.list.length >= 10) {
        alert('最多可添加10个WiFi，不能再多啦！！！')
        return
    }
    // 输入WiFi名称
    const name = prompt('请输入WiFi名称')
    if (!name) {
        return
    }
    // 输入密码（可留空）
    const pass = prompt('请输入密码(可以留空)') || undefined
    data.list.push({name, pass})
    save()
}

/**
 * 删除WiFi
 * @param name
 * @param index
 */
(window as any).wifi_delect = (name: string, index: number) => {
    if (window.confirm(`确定要删除 ${name} 吗？`)) {
        data.list.splice(index, 1)
        save()
    }
}

/**
 * 保存WiFi
 */
async function save() {
    console.log("保存WiFi列表:", data.list)
    try {
        // 保存
        await fetch(`/api/wifi-set?token=${getToken()}&data=${JSON.stringify(data)}`)
        // 初始化列表
        await initWifiList()
    } catch (error) {
        console.error('保存WiFi列表失败:', error)
        alert('保存失败，请稍后再试')
    }
}

/**
 * 拖拽功能
 */
function initSortable() {
    const el = document.getElementById('wifi-list')!;
    (window as any)._sortable?.destroy?.();
    (window as any)._sortable = Sortable.create(el, {
        animation: 150,
        dragClass: "draging",
        handle: '.sort',
        // 拖拽结束
        onEnd: (evt) => {
            data.list.splice(evt.newIndex!, 0, data.list.splice(evt.oldIndex!, 1)[0]);
            save()
        },
    });
}
