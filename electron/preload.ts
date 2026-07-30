import { contextBridge, ipcRenderer } from 'electron';
import { GroupType } from '../shared/enums/group-type';
import { GroupCreateRequest } from '../shared/dtos/group-create.request';
import { UpdateStatus } from '../shared/interfaces/update-status.interface';

contextBridge.exposeInMainWorld('api', {
  groups: {
    getByType: (type: GroupType) => ipcRenderer.invoke('groups:getByType', type),
    create: (group: GroupCreateRequest) => ipcRenderer.invoke('groups:create', group),
    delete: (groupId: number) => ipcRenderer.invoke('groups:delete', groupId),
  },
  updates: {
    onStatus: (callback: (status: UpdateStatus) => void) =>
      ipcRenderer.on('update:status', (_, status) => callback(status)),

    install: () => ipcRenderer.invoke('update:install'),
  },
});
