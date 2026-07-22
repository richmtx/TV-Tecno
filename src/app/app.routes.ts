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
      import('./features/programacion/pages/programacion/programacion.component').then(
        (m) => m.ProgramacionComponent
      ),
  },
  {
    path: 'acerca',
    loadComponent: () =>
      import('./features/acerca/pages/acerca/acerca.component').then(
        (m) => m.AcercaComponent
      ),
  },
  {
    path: 'videoteca',
    loadComponent: () =>
      import('./features/videoteca/pages/videoteca/videoteca.component').then(
        (m) => m.VideotecaComponent
      ),
  },
  {
    path: 'en-vivo',
    loadComponent: () =>
      import('./features/en-vivo/pages/en-vivo/en-vivo.component').then(
        (m) => m.EnVivoComponent
      ),
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('./features/galeria/pages/galeria/galeria.component').then(
        (m) => m.GaleriaComponent
      ),
  },
];