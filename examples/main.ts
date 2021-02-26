import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './plugins'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import './assets/style/index.scss'

import PreCode from './components/PreCode.vue'


import {
    Button,    
  } from '../packages/vxe-table'

const app = createApp(App)

app.component(PreCode.name,PreCode)

app.use(ElementPlus)
app.use(Button)
app.use(router)

// app.config.globalProperties.$t = i18n.global.t
// app.config.globalProperties.$i18n = i18n.global

// app.config.globalProperties.$XModal = VXETable.modal
// app.config.globalProperties.$XPrint = VXETable.print
// app.config.globalProperties.$XSaveFile = VXETable.saveFile
// app.config.globalProperties.$XReadFile = VXETable.readFile

app.mount('#app')