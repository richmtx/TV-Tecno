export interface ProgramaDestacado {
    id: number;
    titulo: string;
    etiqueta: string;
    dias: string;
    horaInicio: string;
    horaFin: string | null;
    imagenUrl: string | null;
    imagenAlt: string | null;
    orden: number;
    creadoEn: string;
    actualizadoEn: string;
    actualizadoPor: number | null;
}