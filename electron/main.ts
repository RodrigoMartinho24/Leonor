import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { registerGroupIpc } from './modules/groups/group.ipc';
import { migrateDatabase } from './database/migrate';

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
    win.loadFile(path.join(__dirname, '../dist/Leonor/browser/index.html'));
  }
}

app.whenReady().then(() => {
  migrateDatabase();

  registerGroupIpc();

  createWindow();
});
