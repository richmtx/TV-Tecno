import { Component, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TabId = 'timeline' | 'albums' | 'instalaciones' | 'estudiantes';

export interface GaleriaTab {
  id: TabId;
  label: string;
}

export interface EraPhoto {
  src: string;
  alt: string;
}

export interface Era {
  id: string;
  years: string;
  title: string;
  description: string;
  photoCount: number;
  photos: EraPhoto[];
}

@Component({
  selector: 'app-collage',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
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
        { src: 'assets/galeria/1920-01.jpg', alt: 'Edificio original del ITD, década de 1920' },
        { src: 'assets/galeria/1920-02.jpg', alt: 'Grupo de estudiantes fundadores' },
        { src: 'assets/galeria/1920-03.jpg', alt: 'Fachada histórica del plantel' },
        { src: 'assets/galeria/1920-04.jpg', alt: 'Aula de clases en los primeros años' }
      ]
    },
    {
      id: '1951-1980',
      years: '1951 - 1980',
      title: 'Crecimiento y formación',
      description: 'Una época de expansión académica y desarrollo institucional.',
      photoCount: 86,
      photos: [
        { src: 'assets/galeria/1951-01.jpg', alt: 'Nuevo edificio académico del ITD' },
        { src: 'assets/galeria/1951-02.jpg', alt: 'Estudiantes en clase, década de 1960' },
        { src: 'assets/galeria/1951-03.jpg', alt: 'Vista aérea del campus' },
        { src: 'assets/galeria/1951-04.jpg', alt: 'Generación de egresados' }
      ]
    },
    {
      id: '1981-2000',
      years: '1981 - 2000',
      title: 'Modernización',
      description: 'Nuevas carreras, infraestructura y tecnología.',
      photoCount: 112,
      photos: [
        { src: 'assets/galeria/1981-01.jpg', alt: 'Edificio principal del ITD renovado' },
        { src: 'assets/galeria/1981-02.jpg', alt: 'Alumnos en laboratorio de prácticas' },
        { src: 'assets/galeria/1981-03.jpg', alt: 'Andador central del campus' },
        { src: 'assets/galeria/1981-04.jpg', alt: 'Trabajo en taller de mecánica' }
      ]
    },
    {
      id: '2001-2010',
      years: '2001 - 2010',
      title: 'Innovación y tecnología',
      description: 'Impulso a la investigación y al desarrollo tecnológico.',
      photoCount: 156,
      photos: [
        { src: 'assets/galeria/2001-01.jpg', alt: 'Edificio de innovación tecnológica' },
        { src: 'assets/galeria/2001-02.jpg', alt: 'Equipo de estudiantes en proyecto de robótica' },
        { src: 'assets/galeria/2001-03.jpg', alt: 'Pasillo interior del edificio académico' },
        { src: 'assets/galeria/2001-04.jpg', alt: 'Nuevas instalaciones del plantel' }
      ]
    },
    {
      id: '2011-actualidad',
      years: '2011 - Actualidad',
      title: 'Hacia el futuro',
      description: 'Formando líderes para un mundo en constante evolución.',
      photoCount: 210,
      photos: [
        { src: 'assets/galeria/2011-01.jpg', alt: 'Fachada actual del Instituto Tecnológico de Durango' },
        { src: 'assets/galeria/2011-02.jpg', alt: 'Estudiantes trabajando en prototipo' },
        { src: 'assets/galeria/2011-03.jpg', alt: 'Vista panorámica del campus actual' },
        { src: 'assets/galeria/2011-04.jpg', alt: 'Comunidad estudiantil del ITD' }
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