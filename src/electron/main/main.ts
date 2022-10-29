process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { app, BrowserWindow } from 'electron'
import path from 'path'
import { Worker } from 'worker_threads'
import * as Remote from "@electron/remote/main"

Remote.initialize()

let win: BrowserWindow

app.whenReady().then(() => {
  win = new BrowserWindow({
    width:800,
    height:600,
    autoHideMenuBar:true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      preload:path.join(__dirname,"./preload.js")
    }
  })
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  } else {
    win.loadURL(process.env.VITE_DEV_SERVER_URL as string)
    win.webContents.openDevTools()
  }

  win.maximize()
  Remote.enable(win.webContents)

  const worker = new Worker(path.join(__dirname, './worker.js'))
  worker.on('message', value => {
    console.log('[worker message]:', value)
  })
})