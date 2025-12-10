import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
    plugins: [viteSingleFile()],
    build:{
        minify:'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            },
            format: {
                comments: false, // 设置为false以去除所有注释
            },
        },
    },
    server:{
        proxy:{
            '/api':{
                target:'http://10.0.0.66', // 开发时指向小车ip
                changeOrigin:true,
            }
        }
    }
})
