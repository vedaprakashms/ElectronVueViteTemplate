<script setup lang="ts">
import PatentNumber from '@/components/PatentNumber.vue'
import { ref } from 'vue'
import { usTemplate } from '@/functions/writeustemplate'
import { readUSTemplate, stringToArray } from '@/functions/readUS'
let searchtext = ref('')
let onFileSelected = async (e: any) => {
    const file = e.target.files[0]
    const data = await file.arrayBuffer()
    await readUSTemplate(data).then(async (r) => {
        console.log(r)
    })
}
let onStringSelected = async () => {
    stringToArray(searchtext.value).then()
}
</script>

<template>
    <main class="overflow-scroll">
        <h1
            class="uppercase text-3xl font-bold font-Trispace text-center underline decoration-wavy hover:decoration-double text-zinc-800"
        >
            US Patent Status Extraction
        </h1>
        <div id="fileInput" class="mx-2 mt-2 grid grid-cols-12 gap-2">
            <input
                type="file"
                @change="onFileSelected"
                class="rounded-md col-span-12 lg:col-span-11 bg-slate-200 placeholder:text-2xl placeholder:text-center"
            />
            <div
                @click="usTemplate"
                class="hover:bg-green-600 text-center col-span-12 lg:col-span-1 bg-slate-700 rounded-md text-2xl font-bold text-yellow-200 hover:text-orange-400 max-lg:flex max-lg:justify-center"
            >
                <fa :icon="['fas', 'file-excel']" class="text-white mt-1" />
                <span class="font-bold text-white px-1"> Template </span>
            </div>
        </div>
        <div class="mx-2 mt-2 grid grid-cols-12 gap-2">
            <textarea
                rows="7"
                class="rounded-md col-span-12 lg:col-span-11 bg-slate-200 placeholder:text-2xl placeholder:text-center"
                placeholder="Enter United States Application and Patent Numbers"
                v-model="searchtext"
            ></textarea>
            <button
                @click="onStringSelected"
                class="col-span-12 lg:col-span-1 bg-slate-700 rounded-md text-2xl font-bold text-yellow-200 hover:text-orange-400"
            >
                Search <fa :icon="['fab', 'searchengin']" />
            </button>
        </div>
        <div class="mx-2">
            <h1 class="text-center text-4xl underline decoration-wavy mb-4">
                Results
            </h1>
            <div class="grid grid-cols-12 gap-2 m-2">
                <PatentNumber
                    class="col-span-12 md:col-span-6 lg:col-span-4 rounded-lg flex justify-center"
                    v-for="i in 102"
                    :key="i"
                    :number="i"
                />
            </div>
        </div>
    </main>
</template>
