<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuBar from "@/components/menubar.vue"

import myworker1 from "@/webworkers/1.worker?worker"

const worker1 = new myworker1()

worker1.postMessage("this is awsome")
console.log(window.myApi?.getString())
console.log(window.myApi?.getDownloadPath())

let closeApp = ()=>window.myApi?.closeApp()
let minimize = ()=>window.myApi?.minimize()
let toggleMaximize=()=>window.myApi?.toggleMaximize()

</script>

<template>


    <header class="titlebar">
      <div class="bg-black w-full align-middle content-center flex justify-between ">
        <div class="hamurger mx-2 mt-1 Clickbutton md:hidden">
          <div class="h-1 w-4 bg-white mb-[2px]"></div>
          <div class="h-1 w-4 bg-white mb-[2px]"></div>
          <div class="h-1 w-4 bg-white mb-[2px]"></div>
        </div>
        <h1 class="text-white font-bold mx-2 max-sm:text-center">US Patent Status </h1>
        <div class="max-md:hidden text-white">
          <MenuBar/>
        </div>
        <div class="align-middle">
          <fa class="text-green-500 mx-1 Clickbutton" icon="circle" @click="minimize"/>
          <fa class="text-amber-500 mx-1 Clickbutton" icon="circle" @click="toggleMaximize"/>
          <fa class="text-red-500 mx-1 Clickbutton" icon="circle" @click="closeApp"/>          
        </div>
      </div>
    </header>
  
    <RouterView class="md:h-[93.5%] h-[90%]" />

    <footer>
      <div class="w-full bg-black">
        <h1 class="text-white">this is footer</h1>
      </div>
    </footer>
</template>

<style scoped>
.titlebar {
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
}
.Clickbutton {
  -webkit-app-region: no-drag;
}
</style>

