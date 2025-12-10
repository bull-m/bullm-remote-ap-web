/**
 * 主入口文件
 */
import './style.scss'
import {initWifiList} from "./list.ts";
import {addTokenForm, getToken, removeToken, setToken} from "./token.ts";
import {addInfoList} from "./info.ts";
import SvgLogoText from './icon/logo-text.svg'
import SvgGithub from './icon/github.svg'
import SvgLogo from './icon/logo.svg'
import SvgBack from './icon/back.svg'
import {DomRemoveToApp} from "./utils.ts";

// 网站图标
const link: HTMLLinkElement = document.createElement("link")
link.href = SvgLogo;
link.rel = "shortcut icon";
link.type = "image/svg+xml";
document.getElementsByTagName("head")[0].appendChild(link);

// 渲染顶部Logo区域和导航按钮
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="logo">
        <img src="${SvgLogo}">
        <img class="text" src="${SvgLogoText}">
        <a href="https://github.com/bull-m" target="_blank" class="go" title="前往github"><img src="${SvgGithub}"></a>
        <img id="back-btn" src="${SvgBack}" title="退出登录" onclick="logout()">
    </div>
`;


/**
 * 退出登录
 */
(window as any).logout = function () {
    document.querySelector<HTMLDivElement>('#back-btn')!.style.display = 'none'
    removeToken()
    init()
}

/**
 * 初始化应用
 * @param _token - 可选的token参数，用于手动验证
 * 流程：
 * 1. 尝试使用传入token或本地存储的token进行认证
 * 2. 如果认证失败，显示token输入表单
 * 3. 如果认证成功，显示设备信息和WiFi列表
 */
function init(_token: string | null = null) {
    const token = _token || getToken() || ''
    
    fetch('/api/info?token=' + token)
        .then(async (res) => {
            // 认证失败，显示登录表单
            if (res.status === 401) {
                addTokenForm(init); // 显示登录表单
                DomRemoveToApp('wifi-box')
                DomRemoveToApp('info-box')
                if (_token) {
                    alert('TOKEN错误')
                }
            } else {
                DomRemoveToApp('token-box') // 移除token表单
                const data = await res.json()
                addInfoList(data); // 渲染设备基础信息
                setToken(token) // 保存token
                if (token) { // 显示退出登录按钮
                    document.querySelector<HTMLDivElement>('#back-btn')!.style.display = 'block'
                }
                await initWifiList(); // WiFi列表
            }
        })
        .catch(err => {
            console.error('初始化失败:', err)
            alert('连接错误，请稍后再试')
        })
}

// 启动应用
init()
