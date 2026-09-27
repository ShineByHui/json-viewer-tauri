import './assets/main.css'

import { createApp } from 'vue'
import { getName, getVersion } from '@tauri-apps/api/app'
import { getCurrentWindow } from '@tauri-apps/api/window'
import App from './App.vue'

// 标题栏带上版本号，名称和版本都取自 tauri.conf.json，升级只改一处。
// 纯浏览器里跑 `pnpm dev` 时这两个调用会失败，忽略即可。
;(async () => {
  try {
    const [name, version] = await Promise.all([getName(), getVersion()])
    await getCurrentWindow().setTitle(`${name} v${version}`)
  } catch {
    // 非 Tauri 环境（浏览器调试），保持 tauri.conf.json 里的默认标题
  }
})()

createApp(App).mount('#app')
