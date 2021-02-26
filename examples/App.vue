<template>
  <div id="app" @click="clickEvent">
    
<header class="page-header">
      <div class="left">
        <a href="/">
、          <span class="title">dollymi</span>
        </a>
        </div>
      <div class="right">
        <div class="content">
          <span
           
            class="performance"
            >Memory used: {{appData.usedJSHeapSize}} MB.</span
          >
        </div></div>
 </header>

<div class="page-container">
  <div class="aside" :class="{visible: appData.showLeft}">
    <div class="body">
      <div class="docs">
        <template v-if="appData.apiList.length">
          <ul class="nav-menu">
            <li v-for="(item, index) in appData.apiList" :key="index" :class="{expand: item.expand}">
              <a class="nav-link" @click="linkEvent(item)" :title="item.label" :class="{disabled: item.disabled, active: pageKey === item.value}">
                <i class="vxe-icon--arrow-right nav-link-icon"></i>
                <span v-html="item.label"></span>
              </a>
              <ul v-if="item.children" v-show="item.expand" class="nav-child-menu">
                <li v-for="(child, cIndex) in item.children" :key="cIndex" :class="{'is-donation': ['Donation'].includes(child.locat.name), 'is-bad': ['TableBadEdit', 'TableBadLineHeight', 'TableBadNonsupport'].includes(child.locat.name)}">
                  <a class="nav-link disabled" v-if="child.disabled"  v-html="child.label"></a>
                  <router-link v-else class="nav-link" :to="child.locat" :title="child.label" v-html="child.label"></router-link>
                </li>
              </ul>
            </li>
          </ul>
        </template>

      </div>
    </div>
  </div>
 <div class="oper-wrapper" v-show="showOperBtn">
    <vxe-button class="oper-btn" :icon="appData.showLeft ? 'vxe-icon--arrow-left' : 'vxe-icon--arrow-right'" @click="appData.showLeft = !appData.showLeft"></vxe-button>
  </div>
  <div class="body">
        <div class="content" :class="{full: ['VXEAPI', 'Donation', 'Run'].includes($route.name)}">
    
      <router-view/>
    </div>
  </div>
</div>
    
     
  </div>
</template>

<script lang="ts">

import {  defineComponent,reactive,nextTick, computed } from 'vue'
import XEUtils from 'xe-utils'
import router from './router'

export default defineComponent({
  setup () {
  const appData = reactive({
      showLeft: true,
      selected: null,
      filterName: '',
      apiList: [] as any[],
      tableData: [] as any[],
      selectBetaVersion: null,
      betaVersionList: [] as any[],
      selectStableVersion: null,
      stableVersionList: [] as any[],
      version: '4',
      usedJSHeapSize: '0',
      tableList:[
          {
          label: '功能模块',
          value: 'module',
          expand: true,
          children: [
            {
              label: '按钮',
              locat: {
                name: 'ModuleButton'
              }
            }
          ]
          }
      ]
    })

    const linkEvent=(item:any)=>{
      if(!item.disabled){
         item.expand=!item.expand
      }
    }

 
   const loadList = () => {
      appData.tableData = XEUtils.clone(appData.tableList, true)
      appData.apiList = appData.tableData
    }

     const clickEvent = (evnt: any) => {
      const pElem = evnt.target
      if (pElem && pElem.className === 'demo-code') {
        const nextElem = pElem.nextSibling
        if (nextElem && nextElem.tagName.toLowerCase() === 'pre') {
          if (nextElem.className.indexOf('is-show') > -1) {
            nextElem.className = ''
          } else {
            nextElem.className = 'is-show'
          }
        }
      }
    }

  const init = () => {
      loadList()
    }

    const pageKey=computed(()=>{
      const $route=router.currentRoute.value;
      return $route.path.split('/')[2]
    })

    const showOperBtn=computed(()=>{
      const $route=router.currentRoute.value;
      return $route.path.split('/')[2]
    })

  nextTick(() => {
      if (process.env.NODE_ENV === 'development') {
        setInterval(() => {
          const performance: any = window.performance
          if (performance && performance.memory) {
            appData.usedJSHeapSize = XEUtils.toFixed(XEUtils.floor(performance.memory.usedJSHeapSize / 1048576, 2), 2)
          }
        }, 3000)
      }
      init()
    })

    return {
      appData,
      linkEvent,
      pageKey,
      showOperBtn,
      clickEvent
    }

  }

}
)


</script>
