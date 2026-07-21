import { Component, computed, signal, HostListener } from '@angular/core';

interface CategoriaVideo {
  id: string;
  nombre: string;
  cantidad: number;
}

interface VideoItem {
  titulo: string;
  categoria: string;
  descripcion: string;
  duracion: string;
}

interface OpcionSelect {
  valor: string;
  etiqueta: string;
}

type Vista = 'cuadricula' | 'lista';

@Component({
  selector: 'app-videoteca-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './videoteca-catalogo.component.html',
  styleUrl: './videoteca-catalogo.component.css',
})
export class VideotecaCatalogoComponent {
  readonly categorias: CategoriaVideo[] = [
    { id: 'todos', nombre: 'Todos los videos', cantidad: 156 },
    { id: 'noticias', nombre: 'Noticias', cantidad: 45 },
    { id: 'cultura', nombre: 'Cultura', cantidad: 28 },
    { id: 'ciencia', nombre: 'Ciencia y Tecnología', cantidad: 32 },
    { id: 'educacion', nombre: 'Educación', cantidad: 24 },
    { id: 'deportes', nombre: 'Deportes', cantidad: 18 },
    { id: 'entrevistas', nombre: 'Entrevistas', cantidad: 25 },
    { id: 'eventos', nombre: 'Eventos', cantidad: 16 },
  ];

  // Datos de ejemplo. Se reemplazarán por los videos reales desde el panel admin.
  readonly videos: VideoItem[] = [
    {
      titulo: 'Noticiero Tecnológico - 19 de julio 2025',
      categoria: 'Noticias',
      descripcion: 'Las noticias más relevantes del Instituto Tecnológico de Durango.',
      duracion: '24:35',
    },
    {
      titulo: 'Conexión Vinculación - Episodio 12',
      categoria: 'Entrevistas',
      descripcion: 'Hablamos con líderes de la industria sobre innovación y colaboración.',
      duracion: '30:12',
    },
    {
      titulo: 'Cultura Durango: Tradición que nos une',
      categoria: 'Cultura',
      descripcion: 'Conoce más sobre nuestras raíces y expresiones culturales.',
      duracion: '15:48',
    },
    {
      titulo: 'Laboratorio Vivo - Ingeniería Electromecánica',
      categoria: 'Ciencia y Tecnología',
      descripcion: 'Recorrido por los laboratorios y proyectos de nuestros estudiantes.',
      duracion: '22:10',
    },
    {
      titulo: 'Tecno Deportes - Jornada 5',
      categoria: 'Deportes',
      descripcion: 'Resumen de la jornada deportiva de los equipos representativos.',
      duracion: '18:20',
    },
    {
      titulo: 'Foro de Innovación Educativa 2025',
      categoria: 'Eventos',
      descripcion: 'Cobertura completa del foro con ponentes nacionales e internacionales.',
      duracion: '41:05',
    },
    {
      titulo: 'Tips para crear mejores videos',
      categoria: 'Educación',
      descripcion: 'Consejos prácticos de producción para creadores de contenido.',
      duracion: '10:22',
    },
    {
      titulo: 'Entrevista con egresados destacados',
      categoria: 'Entrevistas',
      descripcion: 'Historias de éxito de quienes hoy transforman su industria.',
      duracion: '27:33',
    },
  ];

  // Gradientes de ejemplo para las miniaturas mientras no haya imágenes reales.
  private readonly paleta = [
    'linear-gradient(135deg, #6b1538, #a83f63)',
    'linear-gradient(135deg, #1e2a5a, #3b4d8f)',
    'linear-gradient(135deg, #4a2c5e, #7d4a9e)',
    'linear-gradient(135deg, #263445, #4c6178)',
    'linear-gradient(135deg, #7a3b2e, #b5623f)',
    'linear-gradient(135deg, #1f4037, #3a7d68)',
  ];

  readonly categoriaActiva = signal<string>('todos');
  readonly vista = signal<Vista>('cuadricula');

  // ===== Dropdown: Ordenar =====
  readonly opcionesOrden: OpcionSelect[] = [
    { valor: 'recientes', etiqueta: 'Más recientes' },
    { valor: 'antiguos', etiqueta: 'Más antiguos' },
    { valor: 'populares', etiqueta: 'Más vistos' },
  ];
  readonly ordenActivo = signal<string>('recientes');
  readonly ordenAbierto = signal<boolean>(false);

  readonly ordenEtiqueta = computed(
    () =>
      this.opcionesOrden.find((o) => o.valor === this.ordenActivo())?.etiqueta ??
      'Más recientes'
  );

  // ===== Dropdown: Filtrar por fecha =====
  readonly opcionesFecha: OpcionSelect[] = [
    { valor: '', etiqueta: 'Seleccionar fecha' },
    { valor: 'hoy', etiqueta: 'Hoy' },
    { valor: 'semana', etiqueta: 'Esta semana' },
    { valor: 'mes', etiqueta: 'Este mes' },
    { valor: 'anio', etiqueta: 'Este año' },
  ];
  readonly fechaActiva = signal<string>('');
  readonly fechaAbierto = signal<boolean>(false);

  readonly fechaEtiqueta = computed(
    () =>
      this.opcionesFecha.find((o) => o.valor === this.fechaActiva())?.etiqueta ??
      'Seleccionar fecha'
  );

  readonly totalMostrado = computed(() => {
    const activa = this.categorias.find((c) => c.id === this.categoriaActiva());
    return activa ? activa.cantidad : this.videos.length;
  });

  seleccionarCategoria(id: string): void {
    this.categoriaActiva.set(id);
  }

  cambiarVista(vista: Vista): void {
    this.vista.set(vista);
  }

  colorMiniatura(indice: number): string {
    return this.paleta[indice % this.paleta.length];
  }

  // ===== Control de dropdowns =====
  alternarOrden(): void {
    this.ordenAbierto.update((abierto) => !abierto);
    this.fechaAbierto.set(false);
  }

  seleccionarOrden(valor: string): void {
    this.ordenActivo.set(valor);
    this.ordenAbierto.set(false);
  }

  alternarFecha(): void {
    this.fechaAbierto.update((abierto) => !abierto);
    this.ordenAbierto.set(false);
  }

  seleccionarFecha(valor: string): void {
    this.fechaActiva.set(valor);
    this.fechaAbierto.set(false);
  }

  // Cierra ambos dropdowns al hacer clic fuera de cualquier .dropdown
  @HostListener('document:click', ['$event'])
  cerrarSiClicFuera(evento: MouseEvent): void {
    const objetivo = evento.target as HTMLElement;
    if (!objetivo.closest('.dropdown')) {
      this.ordenAbierto.set(false);
      this.fechaAbierto.set(false);
    }
  }

  // Cierra con la tecla Escape
  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    this.ordenAbierto.set(false);
    this.fechaAbierto.set(false);
  }
}