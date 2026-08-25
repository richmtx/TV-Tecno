export interface NoticiaRapida {
    id: number;
    texto: string;
    orden: number;
    creadoEn: string;
    actualizadoEn: string;
    actualizadoPor: number | null;
}