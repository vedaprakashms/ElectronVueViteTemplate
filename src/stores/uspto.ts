import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUSPTOStore = defineStore('uspto', () => {
    const processing = ref(true)
    const btnValue = ref('Submit')
    let appno = ref<string[]>([])
    let patno = ref<string[]>([])

    let enableSpinner = () => {
        processing.value = false
        btnValue.value = 'Processing....'
    }
    let updateAppNo = (data: Array<string>) => {
        data.forEach((element) => {
            appno.value.push(element)
        })
    }
    let updatePatNo = (data: Array<string>) => {
        data.forEach((element) => {
            patno.value.push(element)
        })
    }
    return {
        processing,
        enableSpinner,
        btnValue,
        updateAppNo,
        updatePatNo,
        appno,
        patno,
    }
})
