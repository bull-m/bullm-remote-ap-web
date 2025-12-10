/**
 * Token管理模块
 * 负责用户认证、token存储和验证
 */
import {DomAddToApp, DomRemoveToApp} from "./utils.ts";

// 存储验证成功后的回调函数
let callback: ((token: string) => void) | undefined = undefined

/**
 * 添加token输入表单
 * @param call - 验证成功后的回调函数，接收token作为参数
 */
export function addTokenForm(call: (token: string) => void) {
    callback = call
    DomRemoveToApp('token-box')
    DomAddToApp(`
   <div class="input">
       <label for="password">密码或者TOKEN</label>
       <input autocomplete="off" type="text" id="password" placeholder="请输入密码或者TOKEN">
   </div>
   <button class="btn" onclick="token_verify()">验证</button>
`, "token-box", 'container')
}

/**
 * 验证token
 * 获取输入框中的密码/token并调用回调函数
 */
(window as any).token_verify = () => {
    const password = document.querySelector<HTMLInputElement>('#password')!.value.trim()
    if (password.length === 0) {
        alert('请输入密码或者TOKEN')
        return
    }
    callback?.(password)
}


// localStorage中存储token的key
const TOKEN_KEY = '_nm_token';

/**
 * 从本地存储获取token
 * @returns token字符串或null
 */
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

/**
 * 保存token到本地存储
 * @param token - 要保存的token字符串
 */
export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 从本地存储移除token
 */
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}