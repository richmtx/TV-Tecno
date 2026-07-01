export interface Programa {
    hora: string;
    horaFin: string;
    titulo: string;
    descripcion: string;
    categoria: 'Noticias' | 'Ciencia' | 'Cultura' | 'Entrevista' | 'Documental' | 'Deportes' | 'Educativo';
    enVivo?: boolean;
}

export interface DiaSemana {
    nombre: string;
    corta: string;
    fecha: string;
    index: number;
    count: number;
}

export const ICONOS_CATEGORIA: Record<string, string> = {
    Noticias: 'M4 4h16v12H4z M4 20h16 M8 8h8 M8 11h8 M8 14h5',
    Ciencia: 'M9 3h6 M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3',
    Cultura: 'M12 3l2.5 5.5L20 9l-4.5 4 1 6L12 16l-4.5 3 1-6L4 9l5.5-.5z',
    Entrevista: 'M8 10h.01 M12 10h.01 M16 10h.01 M21 12a9 9 0 1 1-4.2-7.6L21 3v9z',
    Documental: 'M3 6h18v12H3z M3 10h18 M7 6v4 M11 6v4',
    Deportes: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z',
    Educativo: 'M12 3 2 8l10 5 10-5-10-5z M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5'
};