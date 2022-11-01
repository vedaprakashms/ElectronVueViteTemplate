import { readUSTemplate } from '../functions/readUS'

addEventListener('message', (e) => {
    //console.log(e.data)
    readUSTemplate(e.data).then((r) => {
        //console.log(r)
        postMessage(r)
    })
})
