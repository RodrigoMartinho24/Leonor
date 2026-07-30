import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { registerGroupIpc } from './modules/groups/group.ipc';
import { migrateDatabase } from './database/migrate';
import { autoUpdater } from "electron-updater";

console.time('startup');
function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.maximize();

  if (!app.isPackaged) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '..', '..', 'dist', 'Leonor', 'browser', 'index.html');

    win.loadFile(indexPath);
  }
}

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  registerGroupIpc();

  createWindow();
  
  autoUpdater.checkForUpdatesAndNotify();

  migrateDatabase();
});
