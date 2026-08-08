import { Routes } from '@angular/router';

/**
 * Rutas de la sección Galería.
 * El layout monta el hero y las pestañas una sola vez; cada sección
 * se carga de forma diferida dentro del <router-outlet>.
 */
export const GALERIA_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout/galeria-layout/galeria-layout.component').then(
                (m) => m.GaleriaLayoutComponent
            ),
        children: [
            {
                path: '',
                redirectTo: 'linea-del-tiempo',
                pathMatch: 'full',
            },
            {
                path: 'linea-del-tiempo',
                data: { tab: 'timeline', titulo: 'Línea del tiempo' },
                loadComponent: () =>
                    import('./pages/linea-del-tiempo/linea-del-tiempo.component').then(
                        (m) => m.LineaDelTiempoComponent
                    ),
            },
            {
                path: 'albumes',
                data: { tab: 'albums', titulo: 'Álbumes' },
                loadComponent: () =>
                    import('./pages/albumes/albumes.component').then(
                        (m) => m.AlbumesComponent
                    ),
            },
            {
                path: 'instalaciones',
                data: { tab: 'instalaciones', titulo: 'Instalaciones' },
                loadComponent: () =>
                    import('./pages/instalaciones/instalaciones.component').then(
                        (m) => m.InstalacionesComponent
                    ),
            },
            {
                path: 'estudiantes',
                data: { tab: 'estudiantes', titulo: 'Estudiantes' },
                loadComponent: () =>
                    import('./pages/estudiantes/estudiantes.component').then(
                        (m) => m.EstudiantesComponent
                    ),
            },
            {
                path: '**',
                redirectTo: 'linea-del-tiempo',
            },
        ],
    },
];