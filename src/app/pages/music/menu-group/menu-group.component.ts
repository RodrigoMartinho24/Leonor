import { Component, Optional, output } from '@angular/core';
import { LucidePencil, LucidePlus, LucideTrash2 } from '@lucide/angular';
import { MenuComponent } from '../../../components/menu-component/menu-component';

@Component({
  selector: 'app-menu-group',
  imports: [LucidePencil, LucideTrash2, LucidePlus],
  templateUrl: './menu-group.component.html',
  styleUrl: './menu-group.component.scss',
})
export class MenuGroupComponent {
  public onDelete = output();
  
  constructor(@Optional() private menu: MenuComponent) {}

  protected delete(): void {
    this.onDelete.emit();
    this.menu?.close();
  }
}
