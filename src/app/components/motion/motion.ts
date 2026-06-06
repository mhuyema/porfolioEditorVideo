import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-motion',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  templateUrl: './motion.html',
  styleUrls: ['./motion.css']
})
export class Motion implements OnInit {
  lang = inject(LanguageService);
  videoActivoIndex: number | null = null;
  selectedItem: Video | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.misMotions.forEach(v => {
      const img = new Image();
      img.src = this.obtenerThumbnailYT(v.linkVideo);
    });
  }

  misMotions: Array<Video> = [
    {
      titulo: 'Full Album Visualizer',
      categoria: 'Omar Varela x Ecko',
      colorBadge: 'text-primary',
      imagenPortada: '',
      linkVideo: 'https://www.youtube.com/watch?v=s2rHeRQIg6A',
      claseBento: 'col-span-2',
      linkExterno: ''
    },
    {
      titulo: 'Totem',
      categoria: 'Motion Design',
      colorBadge: 'text-tertiary',
      imagenPortada: '',
      linkVideo: 'https://youtube.com/shorts/1FZNh1XkDRU',
      claseBento: 'col-span-1',
      linkExterno: ''
    },
    {
      titulo: 'Documentary Edit',
      categoria: 'Magnates Style · After Effects',
      colorBadge: 'text-secondary',
      imagenPortada: '',
      linkVideo: 'https://youtu.be/QyTz6E9kKYM',
      claseBento: 'col-span-2',
      linkExterno: ''
    },
    {
      titulo: 'Intro Documental',
      categoria: 'Argentine Style · After Effects',
      colorBadge: 'text-primary',
      imagenPortada: '',
      linkVideo: 'https://youtu.be/S5TiLLVscPo',
      claseBento: 'col-span-2',
      linkExterno: ''
    },
    {
      titulo: 'Education Motion',
      categoria: 'Motion Graphics Ads · After Effects',
      colorBadge: 'text-primary',
      imagenPortada: '',
      linkVideo: 'https://youtube.com/shorts/XL88EQmrBMI',
      claseBento: 'col-span-2',
      linkExterno: ''
    },
    {
      titulo: 'Publicity Motion',
      categoria: 'Motion Graphics Ads · After Effects',
      colorBadge: 'text-primary',
      imagenPortada: '',
      linkVideo: 'https://youtu.be/Hh8Bz5BmQ0s',
      claseBento: 'col-span-2',
      linkExterno: ''
    }
  ];

  esHorizontal(item: Video): boolean {
    return item.claseBento.includes('col-span-2');
  }

  obtenerThumbnailYT(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : url;
  }

  obtenerEmbedYT(url: string): SafeResourceUrl {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    const id = match ? match[1] : '';
    const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  obtenerEmbedModalYT(url: string): SafeResourceUrl {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    const id = match ? match[1] : '';
    const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  seleccionarItem(item: Video) {
    this.selectedItem = item;
  }

  cerrarModal() {
    this.selectedItem = null;
  }

  abrirVideo(url: string) {
    if (url) window.open(url, '_blank');
  }

  imgLoaded(e: Event) {
    (e.target as HTMLImageElement).style.opacity = '1';
  }

  iframeLoaded(e: Event) {
    (e.target as HTMLIFrameElement).style.opacity = '1';
  }
}
