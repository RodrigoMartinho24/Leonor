import { Routes } from '@angular/router';
import { MusicComponent } from './pages/music/music';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'músicas',
    component: MusicComponent,
  },
];
