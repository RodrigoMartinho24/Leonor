import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow();
  win.maximize();

  if (!app.isPackaged) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadFile(
      path.join(__dirname, '../dist/Leonor/browser/index.html')
    );
  }
}

app.whenReady().then(createWindow);