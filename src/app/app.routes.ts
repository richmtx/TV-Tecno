import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/index/index.component').then(
        (m) => m.IndexComponent
      ),
  },
  {
    path: 'programacion',
    loadComponent: () =>
      import('./features/home/pages/programacion/programacion.component').then(
        (m) => m.ProgramacionComponent
      ),
  },
  {
    path: 'acerca',
    loadComponent: () =>
      import('./features/home/pages/acerca/acerca.component').then(
        (m) => m.AcercaComponent
      ),
  },
  {
    path: 'videoteca',
    loadComponent: () =>
      import('./features/home/pages/videoteca/videoteca.component').then(
        (m) => m.VideotecaComponent
      ),
  },
  // aquí irán las demás features...
];