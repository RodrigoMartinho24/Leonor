import { Component, signal } from '@angular/core';
import { MenuPosition } from '../../types/menu-position.type';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.scss',
})
export class MenuComponent {
  protected isOpen = signal(false);
  protected left = signal(0);
  protected top = signal(0);
  protected position = signal<MenuPosition>('below');
  protected arrowOffset = signal(0);
  protected arrowX = signal(0);
  protected arrowY = signal(0);
  protected arrowPosition = signal(0);

  public toggle(trigger: HTMLElement, position: MenuPosition) {
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.open(trigger, position);
  }

  public open(trigger: HTMLElement, position: MenuPosition = 'below') {
    const rect = trigger.getBoundingClientRect();

    this.position.set(position);

    switch (position) {
      case 'below':
        this.left.set(rect.left);
        this.top.set(rect.bottom + 6);
        this.arrowPosition.set(rect.width / 2);
        break;

      case 'above':
        this.left.set(rect.left);
        this.top.set(rect.top - 6);
        this.arrowPosition.set(rect.width / 2);
        break;

      case 'right':
        this.left.set(rect.right + 16);
        this.top.set(rect.top);
        this.arrowPosition.set(rect.height / 2);
        break;

      case 'left':
        this.left.set(rect.left - 6);
        this.top.set(rect.top);
        this.arrowPosition.set(rect.height / 2);
        break;
    }

    this.isOpen.set(true);
  }

  public close() {
    this.isOpen.set(false);
  }
}
