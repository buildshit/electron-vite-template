import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { existsSync } from 'fs'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Check if we have a built renderer (production) or should use dev server
  const rendererPath = path.join(__dirname, '../dist-renderer/index.html')
  const isDev = !existsSync(rendererPath)

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(rendererPath)
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  // Always quit the app when all windows are closed
  // This ensures the dev environment stops when you close the window
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})