import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'TV Tecno',
    loadComponent: () =>
      import('./features/home/pages/index/index.component').then(
        (m) => m.IndexComponent
      ),
  },
  {
    path: 'programacion',
    title: 'Programación | TV Tecno ITD',
    loadComponent: () =>
      import('./features/programacion/pages/programacion/programacion.component').then(
        (m) => m.ProgramacionComponent
      ),
  },
  {
    path: 'acerca',
    title: 'Acerca de | TV Tecno ITD',
    loadComponent: () =>
      import('./features/acerca/pages/acerca/acerca.component').then(
        (m) => m.AcercaComponent
      ),
  },
  {
    path: 'videoteca',
    title: 'Videoteca | TV Tecno ITD',
    loadComponent: () =>
      import('./features/videoteca/pages/videoteca/videoteca.component').then(
        (m) => m.VideotecaComponent
      ),
  },
  {
    path: 'en-vivo',
    title: 'En vivo | TV Tecno ITD',
    loadComponent: () =>
      import('./features/en-vivo/pages/en-vivo/en-vivo.component').then(
        (m) => m.EnVivoComponent
      ),
  },
  {
    path: 'galeria',
    loadChildren: () =>
      import('./features/galeria/galeria.routes').then((m) => m.GALERIA_ROUTES),
  },
  {
    path: 'contacto',
    title: 'Contacto | TV Tecno ITD',
    loadComponent: () =>
      import('./features/contacto/pages/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      ),
  },
  {
    path: 'noticias',
    loadChildren: () =>
      import('./features/noticias/noticias.routes').then((m) => m.NOTICIAS_ROUTES),
  },
];