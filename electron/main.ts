import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { registerGroupIpc } from './modules/groups/group.ipc';
import { migrateDatabase } from './database/migrate';
import { autoUpdater } from 'electron-updater';
import { UpdateStatus, UpdateStatusEnum } from '../shared/interfaces/update-status.interface';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.maximize();

  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '..', '..', 'dist', 'Leonor', 'browser', 'index.html');

    mainWindow.loadFile(indexPath);
  }
}

function sendUpdate(update: UpdateStatus) {
  mainWindow?.webContents.send('update:status', update);
}

autoUpdater.on('download-progress', (progress) => {
  sendUpdate({
    status: UpdateStatusEnum.downloading,
    progress: progress.percent,
  });
});

autoUpdater.on('update-downloaded', (info) => {
  sendUpdate({
    status: UpdateStatusEnum.downloaded,
    version: info.version,
  });
});

app.whenReady().then(() => {
  registerGroupIpc();

  createWindow();

  autoUpdater.checkForUpdatesAndNotify();

  migrateDatabase();
});

let updateReady = false;

autoUpdater.on('update-downloaded', () => {
  updateReady = true;
});

app.on('before-quit', () => {
  if (updateReady) {
    autoUpdater.quitAndInstall(false, true);
  }
});
