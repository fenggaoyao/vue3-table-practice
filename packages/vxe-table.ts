import { App } from 'vue'
import XEUtils from 'xe-utils/ctor'
import VXETable from './v-x-e-table'

import Button from './button'

// 按需加载的组件
const components = [
    Button
]



// 默认安装
function install (app: App) {

    components.forEach(component => component.install(app))
  }

  declare module './v-x-e-table' {
    interface VXETableInstance {
      install: typeof install;
    }
  }


  VXETable.install = install

  export * from './button'
  export default VXETable



