import { Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { LucideArrowLeft, LucideEllipsisVertical, LucidePlus } from '@lucide/angular';
import { Group } from '../../../../shared/interfaces/group.interface';
import { Music } from '../../../../shared/interfaces/music.interface';
import { MenuComponent } from '../../components/menu-component/menu-component';
import { MenuTriggerDirective } from '../../directives/menu-trigger';
import { GroupComponent } from '../../components/group-component/group-component';
import { MenuCreateGroupComponent } from './menu-create-group/menu-create-group.component';
import { GroupType } from '../../../../shared/enums/group-type';
import { MenuGroupComponent } from './menu-group/menu-group.component';

@Component({
  selector: 'app-music',
  imports: [
    LucideArrowLeft,
    GroupComponent,
    LucideEllipsisVertical,
    MenuComponent,
    MenuTriggerDirective,
    LucidePlus,
    MenuCreateGroupComponent,
    MenuGroupComponent
  ],
  templateUrl: './music.html',
  styleUrl: './music.scss',
})
export class MusicComponent {
  protected selectedGroup = signal<Group<Music> | undefined>(undefined);
  protected selectedMusicId = signal<number | undefined>(undefined);
  protected search = signal<string>('');
  protected location = inject(Location);
  protected groups = signal<Group<Music>[]>([]);
  protected music = computed(() => {
    const search = this.search()?.toLowerCase();

    if (!this.selectedGroup() && search) {
      return this.groups().flatMap((g) =>
        g.content.filter((m) => m.title.toLowerCase().includes(search)),
      );
    }

    if (!this.selectedGroup()) {
      return;
    }

    return this.selectedGroup()?.content.filter((m) => m.title.toLowerCase().includes(search));
  });
  protected musicTitle = computed(() => this.selectedMusic()?.title);
  protected musicLyrics = computed(() => this.selectedMusic()?.lyrics);
  protected selectedMusic = computed(() =>
    this.groups().flatMap((g) => g.content)?.find((m) => m.id === this.selectedMusicId()),
  );

  constructor() {
    this.loadGroups();
  }

  protected selectMusic(musicId: number): void {
    this.selectedMusicId.update((current) => (current === musicId ? undefined : musicId));
  }

  private loadGroups(): void {
    window.api.groups.getByType(GroupType.Music).then((result) => this.groups.set(result));
  }

  protected createGroup(title: string): void {
    window.api.groups.create({ title: title, type: GroupType.Music }).then(() => this.loadGroups());
  }

  protected deleteGroup(): void {
    window.api.groups.delete(this.selectedGroup()!.id).then(() => this.loadGroups());
  }
}
