import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideCheck, LucideDownload, LucideInfo, LucideX } from '@lucide/angular';
import { MenuComponent } from './components/menu-component/menu-component';
import { UpdateService } from './services/update-service';
import { MenuTriggerDirective } from './directives/menu-trigger';
import { DecimalPipe } from '@angular/common';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { UpdateStatusEnum } from '../../shared/interfaces/update-status.interface';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LucideInfo,
    MenuComponent,
    MenuTriggerDirective,
    DecimalPipe,
    ProgressBarComponent,
    LucideCheck,
    LucideDownload,
    LucideX
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Leonor');
  protected readonly updateService = inject(UpdateService);
  protected readonly updateStatusEnum = UpdateStatusEnum;

  protected progress = computed(() => this.updateService.status()?.progress);
  protected status = computed(() => this.updateService.status()?.status);

  protected install(): void {
    window.api.updates.install();
  }
}
