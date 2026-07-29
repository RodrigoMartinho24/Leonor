import { GroupCreateRequest } from '../../../shared/dtos/group-create.request';
import { GroupType } from '../../../shared/enums/group-type';
import { Group } from '../../../shared/interfaces/group.interface';
import { Music } from '../../../shared/interfaces/music.interface';
import { MusicRepository } from '../music/music.repository';
import { GroupRepository } from './group.repository';

export class GroupService {
  constructor(
    private groupRepository = new GroupRepository(),
    private musicRepository = new MusicRepository(),
  ) {}

  public async getAll() {
    return this.groupRepository.getAll();
  }

  public async getByType(type: GroupType) {
    let groups = (await this.groupRepository.getByType(type)).map(g => g as Group<any>);

    switch (type) {
      case GroupType.Music:
        for (const group of groups) {
          group.content = await this.musicRepository.getByGroupId(group.id);
        }
        
        break;
    }

    return groups;
  }

  public async create(group: GroupCreateRequest) {
    return this.groupRepository.create(group);
  }

  public async delete(groupId: number) {
    return this.groupRepository.delete(groupId);
  }
}

export const groupService = new GroupService();
