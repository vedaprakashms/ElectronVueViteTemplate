import {contextBridge} from "electron"
import { app } from "@electron/remote";

const Api = {
    getString:():string=>"this is a Test String",
    getDownloadPath:():string=>app.getPath("downloads")
}
contextBridge.exposeInMainWorld("myApi",Api)
export {Api}
