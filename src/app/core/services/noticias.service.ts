import { Injectable, computed, signal } from '@angular/core';
import { Noticia } from '../models/noticia.model';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
    /**
     * Datos de prueba. En la Fase 6 esto se reemplaza por HttpClient
     * apuntando al módulo `noticias` del backend NestJS.
     */
    private readonly _noticias = signal<Noticia[]>([
        {
            id: 1,
            slug: 'estudiantes-itd-sistema-riego-inteligente-ia',
            titulo: 'Estudiantes del ITD desarrollan sistema de riego inteligente con IA',
            resumen:
                'El proyecto fue reconocido a nivel regional y busca financiamiento para su implementación en comunidades agrícolas.',
            contenido: `
        <p>Un equipo de estudiantes del Instituto Tecnológico de Durango desarrolló un sistema de riego automatizado que utiliza inteligencia artificial para optimizar el consumo de agua en cultivos de la región.</p>
        <p>El sistema emplea sensores de humedad conectados a un modelo predictivo que analiza datos meteorológicos locales para determinar el momento y la cantidad exacta de riego que requiere cada parcela.</p>
        <p>Durante las pruebas piloto, el prototipo logró reducir el consumo de agua sin afectar el rendimiento del cultivo, un resultado que llamó la atención de productores agrícolas del estado.</p>
        <p>El proyecto actualmente busca financiamiento para escalar su implementación en comunidades agrícolas de Durango.</p>
      `,
            categoria: 'noticias',
            imagen: 'assets/desarrollo/EstudiantesIA.png',
            imagenAlt: 'Estudiantes del ITD trabajando en el prototipo de riego inteligente',
            fechaPublicacion: '2026-06-02',
            tiempoLectura: 5,
            vistas: 1245,
            destacada: true,
        },
        {
            id: 2,
            slug: 'itd-sede-congreso-tecnologia-innovacion-2026',
            titulo: 'El ITD será sede del Congreso de Tecnología e Innovación 2026',
            resumen:
                'Más de 400 participantes de todo el país se reunirán en el campus para presentar proyectos y conferencias magistrales.',
            contenido: `
        <p>El Instituto Tecnológico de Durango fue designado sede del Congreso Nacional de Tecnología e Innovación 2026, que reunirá a más de 400 participantes provenientes de distintos estados del país.</p>
        <p>El programa contempla conferencias magistrales, talleres prácticos y una exposición de proyectos estudiantiles abierta al público.</p>
        <p>Las inscripciones se abrirán en las próximas semanas a través de los canales oficiales del Instituto.</p>
      `,
            categoria: 'academico',
            imagen: 'assets/desarrollo/Congreso.png',
            imagenAlt: 'Auditorio durante el Congreso de Tecnología e Innovación',
            fechaPublicacion: '2026-06-01',
            tiempoLectura: 3,
            vistas: 812,
            destacada: false,
        },
        {
            id: 3,
            slug: 'firma-convenio-industria-regional-software',
            titulo: 'Firma de convenio con la industria regional de software',
            resumen:
                'La alianza abrirá espacios de prácticas profesionales y residencias para estudiantes del ITD.',
            contenido: `
        <p>El Instituto Tecnológico de Durango firmó un convenio de colaboración con empresas de la industria regional de software, con el objetivo de fortalecer la vinculación entre la formación académica y el sector productivo.</p>
        <p>El acuerdo contempla la apertura de espacios para prácticas profesionales y residencias, así como la participación de profesionales del sector en actividades académicas dentro del campus.</p>
        <p>Las autoridades del Instituto destacaron que este tipo de alianzas permite que los estudiantes se incorporen al mercado laboral con experiencia real.</p>
      `,
            categoria: 'vinculacion',
            imagen: 'assets/desarrollo/Convenio.png',
            imagenAlt: 'Firma del convenio entre el ITD y la industria regional de software',
            fechaPublicacion: '2026-05-30',
            tiempoLectura: 4,
            vistas: 543,
            destacada: false,
        },
        {
            id: 4,
            slug: 'estudiantes-ganan-concurso-nacional-robotica',
            titulo: 'Estudiantes ganan concurso nacional de robótica',
            resumen:
                'El equipo representó al Tecnológico de Durango y obtuvo el primer lugar en la categoría avanzada.',
            contenido: `
        <p>Un grupo de estudiantes del Instituto Tecnológico de Durango ha puesto en alto el nombre de nuestra institución al obtener el primer lugar en el Concurso Nacional de Robótica 2026, en la categoría avanzada. El evento se llevó a cabo los días 24 y 25 de mayo en la ciudad de Monterrey, Nuevo León, reuniendo a los mejores talentos del país en innovación y tecnología.</p>
        <p>El equipo, conformado por cinco estudiantes de las carreras de Ingeniería en Mecatrónica e Ingeniería en Sistemas Computacionales, presentó un robot diseñado para realizar tareas de inspección industrial en entornos de difícil acceso. Su propuesta destacó por su creatividad, funcionalidad y aplicación en problemas reales.</p>
        <blockquote>Este logro es el resultado de meses de trabajo, dedicación y muchas horas de aprendizaje. Estamos muy orgullosos de representar al ITD y de demostrar que en Durango también se hace tecnología de primer nivel.</blockquote>
        <p>El concurso, organizado por la Asociación Mexicana de Robótica, evaluó a los participantes en distintos rubros como diseño, programación, innovación, trabajo en equipo y presentación técnica. Nuestro equipo superó a más de 40 instituciones de todo el país.</p>
        <p>La dirección del Instituto reconoció el esfuerzo de los estudiantes y sus asesores, destacando que este tipo de logros impulsan a más jóvenes a interesarse por la ciencia y la tecnología.</p>
        <p>Con este triunfo, el equipo del ITD obtiene su pase para representar a México en el torneo internacional de robótica que se celebrará en agosto en Brasil.</p>
      `,
            categoria: 'tecnologia',
            imagen: 'assets/desarrollo/Robotica.png',
            imagenAlt: 'Equipo de robótica del ITD con sus trofeos y el robot ganador',
            fechaPublicacion: '2026-05-28',
            tiempoLectura: 3,
            vistas: 967,
            destacada: false,
        },
        {
            id: 5,
            slug: 'presentacion-ballet-folclorico-itd',
            titulo: 'Gran presentación del Ballet Folclórico del ITD',
            resumen:
                'El ballet representó a Durango en el Festival Nacional de Arte y Cultura Tecnológica 2026.',
            contenido: `
        <p>El Ballet Folclórico del Instituto Tecnológico de Durango participó en el Festival Nacional de Arte y Cultura Tecnológica 2026, llevando al escenario un repertorio de danzas tradicionales del norte del país.</p>
        <p>La agrupación, integrada por estudiantes de distintas carreras, ha representado al Instituto en múltiples encuentros culturales a lo largo del año.</p>
      `,
            categoria: 'cultura',
            imagen: 'assets/desarrollo/BalletF.png',
            imagenAlt: 'Integrantes del Ballet Folclórico del ITD durante su presentación',
            fechaPublicacion: '2026-05-25',
            tiempoLectura: 2,
            vistas: 421,
            destacada: false,
        },
    ]);

    /** Todas las noticias, ordenadas de la más reciente a la más antigua */
    readonly noticias = computed(() =>
        [...this._noticias()].sort((a, b) =>
            b.fechaPublicacion.localeCompare(a.fechaPublicacion)
        )
    );

    /** La noticia destacada del home (la de la tarjeta grande) */
    readonly destacada = computed(
        () => this.noticias().find((n) => n.destacada) ?? this.noticias()[0]
    );

    /** Las 4 noticias secundarias del home (todas menos la destacada) */
    readonly secundarias = computed(() =>
        this.noticias().filter((n) => n.id !== this.destacada()?.id)
    );

    /** Busca una noticia por su slug. Devuelve undefined si no existe. */
    obtenerPorSlug(slug: string): Noticia | undefined {
        return this.noticias().find((n) => n.slug === slug);
    }

    /** Las otras 4 noticias, para el panel lateral del detalle */
    obtenerOtras(slugActual: string): Noticia[] {
        return this.noticias().filter((n) => n.slug !== slugActual);
    }
}