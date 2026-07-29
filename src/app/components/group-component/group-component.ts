import { Component, input, output } from '@angular/core';
import { Group } from '../../../../shared/interfaces/group.interface';
import { MenuComponent } from '../menu-component/menu-component';
import { MenuGroupComponent } from '../../pages/music/menu-group/menu-group.component';
import { MenuTriggerDirective } from '../../directives/menu-trigger';
import { LucideEllipsisVertical } from '@lucide/angular';

@Component({
  selector: 'app-group',
  imports: [MenuComponent, MenuGroupComponent, MenuTriggerDirective, LucideEllipsisVertical],
  templateUrl: './group-component.html',
  styleUrl: './group-component.scss',
  host: {
    '(click)': 'onClick()',
    '[class.hovered]': 'isSelected()'
  }
})
export class GroupComponent {
  public group = input.required<Group<any>>();
  public onSelected = output<Group<any> | undefined>();
  public isSelected = input<boolean>(false);
  public menu = input.required<MenuComponent>();

  protected onClick(): void {
    if (this.isSelected()) {
      this.onSelected.emit(undefined);
      return;
    }

    this.onSelected.emit(this.group());
  }
}
