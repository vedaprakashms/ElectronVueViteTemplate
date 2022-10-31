<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    number: Number,
})
let r = ref(true)
let kr = ref('circle-info')
let bac = ref('h-4 text-amber-300 mx-2 mt-1')
let k = () => {
    if (r.value) {
        r.value = false
        kr.value = 'shield-halved'
        bac.value = 'h-4 text-green-500 mx-2 mt-1'
    } else {
        r.value = true
        kr.value = 'circle-info'
        bac.value = 'h-4 text-amber-300 mx-2 mt-1'
    }
}
</script>
<template>
    <div class="bg-slate-700 text-white flex align-middle">
        <h1>{{ props.number }}</h1>
        <fa :icon="['fas', kr]" :class="bac" @click="k" />
    </div>
</template>
