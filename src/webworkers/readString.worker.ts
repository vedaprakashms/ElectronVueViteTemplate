import { stringToArray } from '../functions/readUS'

addEventListener('message', (e) => {
    //console.log(e.data)
    stringToArray(e.data).then((r) => {
        //console.log(r)
        postMessage(r)
    })
})
