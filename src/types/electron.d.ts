import { Music } from '../../shared/interfaces/music.interface';
import { GroupCreateRequest } from '../../shared/dtos/group-create.request';
import { Group } from '../../shared/interfaces/group.interface';
import { GroupType } from '../../shared/enums/group-type';

export {};

declare global {
  interface Window {
    api: {
      music: {
        getAll(): Promise<Music[]>;
        create(music: Music): Promise<void>;
      };

      groups: {
        getAll(): Promise<Group[]>;
        getByType(type: GroupType): Promise<Group[]>;
        create(group: GroupCreateRequest): Promise<void>;
        delete(gropuId: number): Promise<void>;
      };

      updates: {
        onStatus(callback: (status: UpdateStatus) => void): void;
        install(): Promise<void>;
      };
    };
  }
}
