import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/index/index.component').then(
        (m) => m.IndexComponent
      ),
  },
  // aquí irán las demás features...
];