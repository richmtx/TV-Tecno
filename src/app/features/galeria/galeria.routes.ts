import { Routes } from '@angular/router';

/**
 * Rutas de la sección Galería.
 *
 * GaleriaLayout aporta el hero y el pie común a todo.
 * SeccionesLayout añade las pestañas y la barra de filtros, y solo
 * envuelve a las cuatro secciones índice: las páginas de detalle
 * quedan fuera porque no llevan toolbar.
 *
 * Las rutas de detalle van declaradas antes que el layout de índice
 * para que el router no tenga que retroceder al resolverlas.
 */
export const GALERIA_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout/galeria-layout/galeria-layout.component').then(
                (m) => m.GaleriaLayoutComponent
            ),
        children: [

            // ---------- Detalle de colección ----------
            {
                path: 'linea-del-tiempo/:coleccionId',
                data: { seccion: 'timeline' },
                loadComponent: () =>
                    import('./pages/coleccion/coleccion.component').then(
                        (m) => m.ColeccionComponent
                    ),
            },
            {
                path: 'albumes/:coleccionId',
                data: { seccion: 'albums' },
                loadComponent: () =>
                    import('./pages/coleccion/coleccion.component').then(
                        (m) => m.ColeccionComponent
                    ),
            },
            {
                path: 'instalaciones/:coleccionId',
                data: { seccion: 'instalaciones' },
                loadComponent: () =>
                    import('./pages/coleccion/coleccion.component').then(
                        (m) => m.ColeccionComponent
                    ),
            },
            {
                path: 'estudiantes/:coleccionId',
                data: { seccion: 'estudiantes' },
                loadComponent: () =>
                    import('./pages/coleccion/coleccion.component').then(
                        (m) => m.ColeccionComponent
                    ),
            },

            // ---------- Secciones índice ----------
            {
                path: '',
                loadComponent: () =>
                    import('./layout/secciones-layout/secciones-layout.component').then(
                        (m) => m.SeccionesLayoutComponent
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
                ],
            },

            {
                path: '**',
                redirectTo: 'linea-del-tiempo',
            },
        ],
    },
];