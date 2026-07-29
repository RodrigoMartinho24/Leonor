import { Component, computed, Optional, output, signal } from '@angular/core';
import { LucideCheck, LucideX } from '@lucide/angular';
import { MenuComponent } from '../../../components/menu-component/menu-component';

@Component({
  selector: 'app-menu-create-group',
  imports: [LucideCheck, LucideX],
  templateUrl: './menu-create-group.component.html',
  styleUrl: './menu-create-group.component.scss',
})
export class MenuCreateGroupComponent {
  protected title = signal<string>('');

  public onCreate = output<string>();
  constructor(@Optional() private menu: MenuComponent) {}

  protected create(): void {
    this.onCreate.emit(this.title()!);
    this.menu?.close();
    this.title.set('');
  }

  protected close(): void {
    this.menu?.close();
  }
}
