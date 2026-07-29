import { ipcMain } from 'electron';
import { groupService } from './group.service';

export function registerGroupIpc() {
  ipcMain.handle('groups:getAll', () => {
    return groupService.getAll();
  });

  ipcMain.handle('groups:getByType', (_, type) => {
    return groupService.getByType(type);
  });

  ipcMain.handle('groups:create', (_, group) => {
    return groupService.create(group);
  });

  ipcMain.handle('groups:delete', (_, groupId) => {
    return groupService.delete(groupId);
  });
}
