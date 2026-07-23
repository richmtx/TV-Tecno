import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type TabId = 'timeline' | 'albums' | 'instalaciones' | 'estudiantes';

export interface GaleriaTab {
  id: TabId;
  label: string;
}

export interface EraPhoto {
  id: string;
  label: string;     // descripción para accesibilidad
  gradient: string;  // color sólido temporal
}

export interface Era {
  id: string;
  years: string;
  title: string;
  description: string;
  photoCount: number;
  photos: EraPhoto[];
}

const G = {
  oliva: 'linear-gradient(135deg, #4a3d13, #836d23)',
  rojo: 'linear-gradient(135deg, #661a20, #b42e38)',
  morado: 'linear-gradient(135deg, #341830, #5c2c56)',
  verde: 'linear-gradient(135deg, #022e22, #04513c)',
  azul: 'linear-gradient(135deg, #191f5a, #2c379d)'
};

@Component({
  selector: 'app-collage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './collage.component.html',
  styleUrl: './collage.component.css'
})
export class CollageComponent {

  readonly tabs: GaleriaTab[] = [
    { id: 'timeline', label: 'Línea del tiempo' },
    { id: 'albums', label: 'Álbumes' },
    { id: 'instalaciones', label: 'Instalaciones' },
    { id: 'estudiantes', label: 'Estudiantes' }
  ];

  readonly filterOptions: string[] = [
    'Más recientes',
    'Más antiguas',
    'Más vistas',
    'Blanco y negro'
  ];

  readonly eras: Era[] = [
    {
      id: '1920-1950',
      years: '1920 - 1950',
      title: 'Nuestros inicios',
      description: 'Los primeros pasos del Instituto Tecnológico de Durango.',
      photoCount: 24,
      photos: [
        { id: 'a1', label: 'Edificio original del ITD, década de 1920', gradient: G.oliva },
        { id: 'a2', label: 'Grupo de estudiantes fundadores', gradient: G.rojo },
        { id: 'a3', label: 'Fachada histórica del plantel', gradient: G.morado },
        { id: 'a4', label: 'Aula de clases en los primeros años', gradient: G.verde }
      ]
    },
    {
      id: '1951-1980',
      years: '1951 - 1980',
      title: 'Crecimiento y formación',
      description: 'Una época de expansión académica y desarrollo institucional.',
      photoCount: 86,
      photos: [
        { id: 'b1', label: 'Nuevo edificio académico del ITD', gradient: G.azul },
        { id: 'b2', label: 'Estudiantes en clase, década de 1960', gradient: G.oliva },
        { id: 'b3', label: 'Vista aérea del campus', gradient: G.rojo },
        { id: 'b4', label: 'Generación de egresados', gradient: G.morado }
      ]
    },
    {
      id: '1981-2000',
      years: '1981 - 2000',
      title: 'Modernización',
      description: 'Nuevas carreras, infraestructura y tecnología.',
      photoCount: 112,
      photos: [
        { id: 'c1', label: 'Edificio principal del ITD renovado', gradient: G.verde },
        { id: 'c2', label: 'Alumnos en laboratorio de prácticas', gradient: G.azul },
        { id: 'c3', label: 'Andador central del campus', gradient: G.oliva },
        { id: 'c4', label: 'Trabajo en taller de mecánica', gradient: G.rojo }
      ]
    },
    {
      id: '2001-2010',
      years: '2001 - 2010',
      title: 'Innovación y tecnología',
      description: 'Impulso a la investigación y al desarrollo tecnológico.',
      photoCount: 156,
      photos: [
        { id: 'd1', label: 'Edificio de innovación tecnológica', gradient: G.morado },
        { id: 'd2', label: 'Equipo de estudiantes en proyecto de robótica', gradient: G.verde },
        { id: 'd3', label: 'Pasillo interior del edificio académico', gradient: G.azul },
        { id: 'd4', label: 'Nuevas instalaciones del plantel', gradient: G.oliva }
      ]
    },
    {
      id: '2011-actualidad',
      years: '2011 - Actualidad',
      title: 'Hacia el futuro',
      description: 'Formando líderes para un mundo en constante evolución.',
      photoCount: 210,
      photos: [
        { id: 'e1', label: 'Fachada actual del Instituto Tecnológico de Durango', gradient: G.rojo },
        { id: 'e2', label: 'Estudiantes trabajando en prototipo', gradient: G.morado },
        { id: 'e3', label: 'Vista panorámica del campus actual', gradient: G.verde },
        { id: 'e4', label: 'Comunidad estudiantil del ITD', gradient: G.azul }
      ]
    }
  ];

  readonly activeTab = signal<TabId>('timeline');
  readonly searchTerm = signal<string>('');
  readonly isFilterOpen = signal<boolean>(false);
  readonly activeFilter = signal<string>('Más recientes');

  /** Filtrado en cliente por años, título o descripción. */
  readonly filteredEras = computed<Era[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.eras;
    }
    return this.eras.filter(era =>
      era.years.toLowerCase().includes(term) ||
      era.title.toLowerCase().includes(term) ||
      era.description.toLowerCase().includes(term)
    );
  });

  setTab(id: TabId): void {
    this.activeTab.set(id);
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  toggleFilter(): void {
    this.isFilterOpen.update(open => !open);
  }

  selectFilter(option: string): void {
    this.activeFilter.set(option);
    this.isFilterOpen.set(false);
  }

  verTodas(era: Era): void {
    // TODO: navegar al álbum completo de la época
    console.log('Ver todas las fotos de', era.years);
  }

  enviarFotos(): void {
    // TODO: abrir modal o navegar al formulario de envío
    console.log('Enviar mis fotos');
  }

  trackByEra(_index: number, era: Era): string {
    return era.id;
  }
}