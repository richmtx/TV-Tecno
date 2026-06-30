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
      import('./features/programacion/programacion.component').then(
        (m) => m.ProgramacionComponent
      ),
  },
  {
    path: 'acerca',
    loadComponent: () =>
      import('./features/acerca/acerca.component').then(
        (m) => m.AcercaComponent
      ),
  },
  {
    path: 'videoteca',
    loadComponent: () =>
      import('./features/videoteca/videoteca.component').then(
        (m) => m.VideotecaComponent
      ),
  },
  {
  path: 'en-vivo',
  loadComponent: () =>
    import('./features/en-vivo/en-vivo.component').then(
      (m) => m.EnVivoComponent
    ),
},
];