import { Routes } from '@angular/router';

export const NOTICIAS_ROUTES: Routes = [
    {
        path: ':slug',
        loadComponent: () =>
            import('./pages/noticia-detalle/noticia-detalle.component').then(
                (m) => m.NoticiaDetalleComponent
            ),
    },
];