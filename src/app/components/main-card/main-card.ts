import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-card',
  imports: [],
  templateUrl: './main-card.html',
  styleUrl: './main-card.scss',
})
export class MainCard {
  public x = input<number>(13);
  public y = input<number>(0);
  public width = input<number>(300);
  public height = input<number>(332);
}
