import { app, BrowserWindow } from 'electron'

function loadMainWindow() {
    const win = new BrowserWindow({
        title: "GTK in HTML!",
        width: 640,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.webContents.openDevTools();
    win.loadFile('website/index.html');
    return win
}
app.allowRendererProcessReuse = false

app.on('ready', loadMainWindow)

app.on('activate', () => {
    if(BrowserWindow.getAllWindows.length === 0)
        loadMainWindow()
})