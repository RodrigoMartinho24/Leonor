import { Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { LucideArrowLeft, LucideEllipsisVertical, LucidePlus } from '@lucide/angular';
import { Group } from '../../data/interfaces/group.interface';
import { Music } from '../../data/interfaces/music.interface';
import { MenuComponent } from '../../components/menu-component/menu-component';
import { MenuTriggerDirective } from '../../directives/menu-trigger';
import { GroupComponent } from '../../components/group-component/group-component';
import { MenuGroupComponent } from './menu-group/menu-group.component';
import { MenuCreateGroupComponent } from './menu-create-group/menu-create-group.component';

@Component({
  selector: 'app-music',
  imports: [
    LucideArrowLeft,
    GroupComponent,
    LucideEllipsisVertical,
    MenuComponent,
    MenuTriggerDirective,
    LucidePlus,
    MenuGroupComponent,
    MenuCreateGroupComponent
  ],
  templateUrl: './music.html',
  styleUrl: './music.scss',
})
export class MusicComponent {
  protected selectedGroup = signal<Group<Music> | undefined>(undefined);
  protected selectedMusicId = signal<string | undefined>(undefined);
  protected search = signal<string>('');
  protected location = inject(Location);
  protected groups: Group<Music>[] = [
    {
      id: '1',
      title: 'Manhã',
      content: [
        {
          id: '1',
          title: 'Atirei o Pau ao Gato',
          lyrics: `Atirei o Pau ao gato to to, mas o gato to to, não morreu eu eu,
          Dona Chica ca ca, assustou-se se se
          Com o berro, com o berro
          Que o gato deu, miauuu.
          Sentada na Chaminé, veio uma pulga, morder-me o pé,
          Ou ela chora, ou ela grita, ou vai-se embora, pulga maldita.`,
        },
        {
          id: '2',
          title: 'Brilha, brilha lá no céu',
          lyrics: `Brilha, brilha lá no céu
            A estrelinha que nasceu
            Logo outra surge ao lado
            E o céu fica iluminado
            Brilha, brilha lá no céu
            A estrelinha que nasceu.
            `,
        },
      ],
    },
    {
      id: '2',
      title: 'Tarde',
      content: [
        {
          id: '3',
          title: 'Come a papa, Joana, come a papa',
          lyrics: `Come a papa, Joana come a papa
            Come a papa, Joana come a papa
            Joana come a papa.
            1, 2, 3
            Uma colher de cada vez
            4, 5, 6
            Era uma história de reis
            E outra colher de papa.
            7, 8, 9
            Ainda nada se resolve
            10, 11, 12
            À espera que a mosca pouse
            E outra colher de papa
            13, 14 e meia,
            A coisa não está tão feia. 15, 16, 17
            Mais um pingo no babete
            E outra colher de papa.
            `,
        },
      ],
    },
  ];
  protected music = computed(() => {
    const search = this.search()?.toLowerCase();

    if (!this.selectedGroup() && search) {
      return this.groups.flatMap((g) =>
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
    this.groups.flatMap((g) => g.content)?.find((m) => m.id === this.selectedMusicId()),
  );

  protected selectMusic(musicId: string): void {
    this.selectedMusicId.update((current) => (current === musicId ? undefined : musicId));
  }
}
