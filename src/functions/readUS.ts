import { read, utils } from 'xlsx'
import { useToast } from 'vue-toastification'
import { useUSPTOStore } from '@/stores/uspto'

let readUSTemplate = async (data: any) => {
    //init Toastification
    const toast = useToast()
    //init usptostore
    let usStore = useUSPTOStore()
    toast.info('Started to read Selected template...', { timeout: 2500 })
    const workbook = read(data)
    let worksheet = workbook.Sheets['USTemplate']
    let Sheetdata = utils.sheet_to_json(worksheet)
    //console.log(Sheetdata)
    let PatentNo: any = [],
        ApplicationNo: any = []
    Sheetdata.map((e: any) => {
        // Removing Patent Numbers Unrelated Char like "US", Kind Code, spaces etc...
        let k = ''
        k = e['Patent Number']
        if (k) {
            k = k.toLocaleString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            k = k.replace(/([a,b,c,e,h,p,s,f,j,k,o][0-9]{0,1}){0,1}$/gim, '')
            PatentNo.push(k)
        }
        // Removing Patent Numbers Unrelated Char like "US", "/", ",", Spaces etc...
        k = e['Application Number']
        if (k) {
            k = k.toLocaleString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            ApplicationNo.push(k)
        }
    })
    usStore.updateAppNo([])
    usStore.updateAppNo(ApplicationNo)
    usStore.updatePatNo([])
    usStore.updatePatNo(PatentNo)
    toast.success(
        'Imported Patent Numbers, Application Numbers, Publication Numbers ',
        {
            timeout: 2000,
        }
    )
    return { PatentNo, ApplicationNo }
}

let stringToArray = async (data: string) => {
    const toast = useToast()
    let usStore = useUSPTOStore()
    let apparray: string[] = []
    let patarray: string[] = []
    data = data.split(/"/gim).join('')
    data = data.replace(/;/gim, '\n')
    //console.log(data)
    let temp = data.split(/\r?\n/).filter((e) => {
        return e != '' || null || e.match(/US/gim)
    })
    temp.map((e, i) => {
        const rExp1: RegExp = /US[0-9]{2}\/[0-9]{3},[0-9]{3}/gim
        const rExp2: RegExp = /US[0-9]{7,15}/gim
        let temp1 = e.match(rExp1)
        if (temp1) {
            let k = ''
            k = temp1.toString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            apparray.push(k)
        } else {
            let k = e.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            k = k.replace(/([a,b,c,e,h,p,s,f,j,k,o][0-9]{0,1}){0,1}$/gim, '')
            patarray.push(k)
        }
    })
    apparray = [...new Set(apparray)]
    patarray = [...new Set(patarray)]

    usStore.updateAppNo(apparray)
    usStore.updatePatNo(patarray)
    toast.success(
        'Allocated the patent/application/Publication Number to each group below.',
        { timeout: 2000 }
    )
    return { PatentNo: patarray, ApplicationNo: apparray }
}

export { readUSTemplate, stringToArray }
