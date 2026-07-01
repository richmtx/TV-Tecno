import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Programa, DiaSemana } from '../../models/programa.model';
import { SelectorDiasComponent } from '../../components/selector-dias/selector-dias.component';
import { EnVivoAhoraComponent } from '../../components/en-vivo-ahora/en-vivo-ahora.component';
import { ListaProgramacionComponent } from '../../components/lista-programacion/lista-programacion.component';

const NOMBRES_DIAS = [
  { nombre: 'Lunes', corta: 'lun' },
  { nombre: 'Martes', corta: 'mar' },
  { nombre: 'Miércoles', corta: 'mié' },
  { nombre: 'Jueves', corta: 'jue' },
  { nombre: 'Viernes', corta: 'vie' },
  { nombre: 'Sábado', corta: 'sáb' },
  { nombre: 'Domingo', corta: 'dom' }
];

// 0 = Lunes ... 6 = Domingo
const PROGRAMAS_POR_DIA: Record<number, Programa[]> = {
  0: [
    { hora: '07:00', horaFin: '08:00', titulo: 'Buenos Días ITD', descripcion: 'Resumen matutino de actividades académicas y avisos institucionales.', categoria: 'Noticias' },
    { hora: '08:00', horaFin: '09:30', titulo: 'Aula Abierta', descripcion: 'Cápsulas educativas sobre programación y desarrollo de software.', categoria: 'Educativo' },
    { hora: '10:00', horaFin: '11:00', titulo: 'Laboratorio Vivo', descripcion: 'Recorrido por los laboratorios de Ingeniería Electromecánica.', categoria: 'Ciencia' },
    { hora: '12:00', horaFin: '13:00', titulo: 'Voces ITD', descripcion: 'Entrevista con egresados destacados del Tecnológico.', categoria: 'Entrevista' },
    { hora: '17:00', horaFin: '18:00', titulo: 'Crónicas del Campus', descripcion: 'Documental sobre la historia del Instituto Tecnológico de Durango.', categoria: 'Documental' },
  ],
  1: [
    { hora: '07:00', horaFin: '08:00', titulo: 'Noticiero Tecnológico', descripcion: 'Cobertura de eventos, becas y convocatorias vigentes.', categoria: 'Noticias' },
    { hora: '09:00', horaFin: '10:00', titulo: 'IA en Contexto', descripcion: 'Charla sobre aplicaciones de inteligencia artificial en la región.', categoria: 'Ciencia' },
    { hora: '11:00', horaFin: '12:00', titulo: 'Deporte Tecno', descripcion: 'Resumen de la jornada deportiva interna del ITD.', categoria: 'Deportes' },
    { hora: '16:00', horaFin: '17:00', titulo: 'Cultura Durango', descripcion: 'Expresiones artísticas de estudiantes y talleres culturales.', categoria: 'Cultura' },
  ],
  2: [
    { hora: '07:00', horaFin: '08:00', titulo: 'Buenos Días ITD', descripcion: 'Resumen matutino de actividades académicas y avisos institucionales.', categoria: 'Noticias' },
    { hora: '08:30', horaFin: '09:30', titulo: 'Ruta STEM', descripcion: 'Proyectos estudiantiles de ciencia, tecnología e ingeniería.', categoria: 'Educativo' },
    { hora: '11:00', horaFin: '12:00', titulo: 'Noticiero Tecnológico', descripcion: 'Cobertura de eventos, becas y convocatorias vigentes.', categoria: 'Noticias', enVivo: true },
    { hora: '13:00', horaFin: '14:00', titulo: 'Conexión Vinculación', descripcion: 'Convenios y proyectos con el sector productivo de Durango.', categoria: 'Entrevista' },
    { hora: '18:00', horaFin: '19:00', titulo: 'Laboratorio de IA', descripcion: 'Documental sobre la inauguración de nuevas instalaciones.', categoria: 'Documental' },
  ],
  3: [
    { hora: '07:00', horaFin: '08:00', titulo: 'Noticiero Tecnológico', descripcion: 'Cobertura de eventos, becas y convocatorias vigentes.', categoria: 'Noticias' },
    { hora: '09:00', horaFin: '10:00', titulo: 'Ingeniería en Acción', descripcion: 'Visita a proyectos de titulación de distintas carreras.', categoria: 'Ciencia' },
    { hora: '12:00', horaFin: '13:00', titulo: 'Diálogos ITD', descripcion: 'Mesa de discusión con docentes sobre innovación educativa.', categoria: 'Entrevista' },
    { hora: '17:00', horaFin: '18:00', titulo: 'Arte y Campus', descripcion: 'Talleres culturales y presentaciones estudiantiles.', categoria: 'Cultura' },
  ],
  4: [
    { hora: '07:00', horaFin: '08:00', titulo: 'Buenos Días ITD', descripcion: 'Resumen matutino de actividades académicas y avisos institucionales.', categoria: 'Noticias' },
    { hora: '10:00', horaFin: '11:00', titulo: 'Congreso Tecnológico', descripcion: 'Cobertura en vivo del Congreso de Tecnología e Ingeniería.', categoria: 'Documental' },
    { hora: '13:00', horaFin: '14:00', titulo: 'Deporte Tecno', descripcion: 'Resumen de la jornada deportiva interna del ITD.', categoria: 'Deportes' },
    { hora: '18:00', horaFin: '19:00', titulo: 'Voces ITD', descripcion: 'Entrevista con egresados destacados del Tecnológico.', categoria: 'Entrevista' },
  ],
  5: [
    { hora: '08:00', horaFin: '09:00', titulo: 'Fin de Semana Tecno', descripcion: 'Actividades culturales y deportivas del fin de semana.', categoria: 'Cultura' },
    { hora: '10:00', horaFin: '11:00', titulo: 'Ruta STEM', descripcion: 'Proyectos estudiantiles de ciencia, tecnología e ingeniería.', categoria: 'Educativo' },
    { hora: '15:00', horaFin: '16:00', titulo: 'Crónicas del Campus', descripcion: 'Documental sobre la historia del Instituto Tecnológico de Durango.', categoria: 'Documental' },
  ],
  6: [
    { hora: '10:00', horaFin: '11:00', titulo: 'Resumen Semanal', descripcion: 'Lo más destacado de la semana en el Tecnológico.', categoria: 'Noticias' },
    { hora: '13:00', horaFin: '14:00', titulo: 'Cultura Durango', descripcion: 'Expresiones artísticas de estudiantes y talleres culturales.', categoria: 'Cultura' },
    { hora: '16:00', horaFin: '17:00', titulo: 'Laboratorio Vivo', descripcion: 'Recorrido por los laboratorios de Ingeniería Electromecánica.', categoria: 'Ciencia' },
  ]
};

@Component({
  selector: 'app-programacion',
  standalone: true,
  imports: [CommonModule, SelectorDiasComponent, EnVivoAhoraComponent, ListaProgramacionComponent],
  templateUrl: './programacion.component.html',
  styleUrl: './programacion.component.css'
})
export class ProgramacionComponent {
  private programasPorDia = PROGRAMAS_POR_DIA;

  diasSemana: DiaSemana[] = [];
  diaSeleccionado = 0;
  diaHoy = 0;

  constructor() {
    this.diaHoy = this.calcularIndiceHoy();
    this.diaSeleccionado = this.diaHoy;
    this.diasSemana = this.construirSemana();
  }

  /** Convierte Date.getDay() (0=Domingo) a nuestro índice (0=Lunes) */
  private calcularIndiceHoy(): number {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  /** Construye la semana actual (Lunes a Domingo) con fechas reales y conteo de programas */
  private construirSemana(): DiaSemana[] {
    const hoy = new Date();
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - this.diaHoy);

    return NOMBRES_DIAS.map((dia, i) => {
      const fecha = new Date(lunes);
      fecha.setDate(lunes.getDate() + i);
      return {
        nombre: dia.nombre,
        corta: dia.corta,
        fecha: fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }).replace('.', ''),
        index: i,
        count: this.programasPorDia[i]?.length ?? 0
      };
    });
  }

  onDiaSeleccionado(index: number): void {
    this.diaSeleccionado = index;
  }

  get programasDelDia(): Programa[] {
    return this.programasPorDia[this.diaSeleccionado] ?? [];
  }

  get programaEnVivo(): Programa | undefined {
    if (this.diaSeleccionado !== this.diaHoy) return undefined;
    return this.programasDelDia.find(p => p.enVivo);
  }

  get nombreDiaSeleccionado(): string {
    return this.diasSemana[this.diaSeleccionado]?.nombre ?? '';
  }
}