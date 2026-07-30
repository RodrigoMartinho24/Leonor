import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideInfo } from '@lucide/angular';
import { MenuComponent } from './components/menu-component/menu-component';
import { UpdateService } from './services/update-service';
import { MenuTriggerDirective } from './directives/menu-trigger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LucideInfo, MenuComponent, MenuTriggerDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Leonor');
  protected readonly updateService = inject(UpdateService);
}
