import { Directive, ElementRef, input } from '@angular/core';
import { MenuComponent } from '../components/menu-component/menu-component';
import { MenuPosition } from '../types/menu-position.type';

@Directive({
  selector: '[appMenuTriggerFor]',
  host: {
    '(click)': 'toggle()',
  },
})
export class MenuTriggerDirective {
  public appMenuTriggerFor = input.required<MenuComponent>();

  public position = input<MenuPosition>('below');

  constructor(private element: ElementRef<HTMLElement>) {}

  protected toggle() {
    this.appMenuTriggerFor()
      .toggle(
        this.element.nativeElement,
        this.position()
      );

  }
}
