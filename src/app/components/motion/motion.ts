import { Component, inject } from '@angular/core';
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
export class Motion {
  lang = inject(LanguageService);
  videoActivoIndex: number | null = null;
  selectedItem: Video | null = null;
  private embedCache = new Map<string, SafeResourceUrl>();
  private embedModalCache = new Map<string, SafeResourceUrl>();

  constructor(private sanitizer: DomSanitizer) {}

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
      categoria: 'Motion Grapchis Ads · After Effects',
      colorBadge: 'text-primary',
      imagenPortada: '',
      linkVideo: 'https://youtube.com/shorts/XL88EQmrBMI',
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
    if (this.embedCache.has(url)) return this.embedCache.get(url)!;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    const id = match ? match[1] : '';
    const safe = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1`
    );
    this.embedCache.set(url, safe);
    return safe;
  }

  obtenerEmbedModalYT(url: string): SafeResourceUrl {
    if (this.embedModalCache.has(url)) return this.embedModalCache.get(url)!;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    const id = match ? match[1] : '';
    const safe = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`
    );
    this.embedModalCache.set(url, safe);
    return safe;
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
    const img = e.target as HTMLImageElement;
    img.style.opacity = '1';
    img.parentElement?.classList.remove('skeleton-shimmer');
  }

  iframeLoaded(e: Event) {
    (e.target as HTMLIFrameElement).style.opacity = '1';
  }
}
