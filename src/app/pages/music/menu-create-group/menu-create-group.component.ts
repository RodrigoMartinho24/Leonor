import { Component, ElementRef, Optional } from '@angular/core';
import { LucideCheck, LucideX } from '@lucide/angular';
import { MenuComponent } from '../../../components/menu-component/menu-component';

@Component({
  selector: 'app-menu-create-group',
  imports: [LucideCheck, LucideX],
  templateUrl: './menu-create-group.component.html',
  styleUrl: './menu-create-group.component.scss',
})
export class MenuCreateGroupComponent {
  constructor(@Optional() private menu: MenuComponent) {}

  protected close() {
    this.menu?.close();
  }
}
