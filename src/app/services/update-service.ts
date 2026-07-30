import { Injectable, signal } from '@angular/core';
import { UpdateStatus } from '../../../shared/interfaces/update-status.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public readonly status = signal<UpdateStatus | null>(null);

  constructor() {
    window.api.updates.onStatus((status: UpdateStatus) => {
      this.status.set(status);
    });
  }
}
