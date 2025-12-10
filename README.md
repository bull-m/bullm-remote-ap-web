# 牛明远控 - APWEB

> 这是一个用于牛明远控WiFi配置的页面。主要用于AP模式的配网

**牛明远控主仓库** [https://github.com/bull-m/bullm-remote](https://github.com/bull-m/bullm-remote)

## 🚀 开发

### 启动开发服务

```bash
# 安装依赖
npm install
# 启动
npm run dev
```


### 修改代理地址

API 请求会代理到配置的遥控车 IP 地址  
编辑 `vite.config.ts` 文件中的 `target` 配置：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://10.0.0.66', // 修改为你的遥控车 IP
      changeOrigin: true,
    }
  }
}
```

### 构建生产版本

```bash
npm run build
```

构建完成后，会在 `dist` 目录生成一个完整的单文件 HTML，包含所有样式和脚本。将他复制到小车固件的`include/index_html.h`中即可
