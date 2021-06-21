"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function loadMainWindow() {
    var win = new electron_1.BrowserWindow({
        title: "GTK in HTML!",
        width: 640,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.webContents.openDevTools();
    win.loadURL('file://' + __dirname + '/website/index.html');
    win.webContents.session.setPreloads([
        "website/index.js"
    ]);
    return win;
}
electron_1.app.allowRendererProcessReuse = false;
electron_1.app.on('ready', loadMainWindow);
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows.length === 0)
        loadMainWindow();
});
