import { Component } from '@angular/core';

interface YoutubeFeature {
  icon: 'play' | 'bell' | 'community';
  title: string;
  description: string;
}

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css'
})
export class YoutubeComponent {
  readonly channelUrl = 'https://www.youtube.com/@tvtecno';

  readonly features: readonly YoutubeFeature[] = [
    {
      icon: 'play',
      title: 'Contenido exclusivo',
      description: 'Entrevistas, reportajes, coberturas y más.'
    },
    {
      icon: 'bell',
      title: 'Nuevos videos cada semana',
      description: 'Mantente siempre informado con nuevo contenido.'
    },
    {
      icon: 'community',
      title: 'Únete a nuestra comunidad',
      description: 'Comparte, comenta y forma parte de la comunidad TV Tecno.'
    }
  ];
}