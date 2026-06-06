import { Component, AfterViewInit, OnDestroy, ViewChildren, QueryList, ElementRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  templateUrl: './works.html',
  styleUrls: ['./works.css']
})
export class Works implements AfterViewInit, OnDestroy {
  @ViewChildren('card') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  lang = inject(LanguageService);
  videoActivoKey: string | null = null;
  selectedVideo: Video | null = null;
  isDesktop = window.innerWidth >= 768;
  private embedCache = new Map<string, SafeResourceUrl>();
  private embedModalCache = new Map<string, SafeResourceUrl>();
  private rafId!: number;

  constructor(private sanitizer: DomSanitizer, private ngZone: NgZone) {}

  misVideos: Array<Video> = [
    {
      titulo: 'Narrative Style',
      categoria: 'StoryTelling',
      colorBadge: 'text-tertiary',
      imagenPortada: 'https://youtube.com/shorts/8VcKVLTbako',
      linkVideo: 'https://youtube.com/shorts/8VcKVLTbako',
      claseBento: '',
      linkExterno: ''
    },
    {
      titulo: 'Travel Life Style',
      categoria: 'Viral / Social',
      colorBadge: 'text-secondary',
      imagenPortada: 'https://youtube.com/shorts/UKoglYLAf9Y',
      linkVideo: 'https://youtube.com/shorts/UKoglYLAf9Y',
      claseBento: '',
      linkExterno: 'https://www.tiktok.com/@assist365ok/video/7637260289750158612?lang=es-419',
      vistas: '+270K views'
    },
    {
      titulo: 'Brasil en Marzo y Abril',
      categoria: 'Viral / Social',
      colorBadge: 'text-primary',
      imagenPortada: 'https://youtube.com/shorts/sWgxyE-_Pdw',
      linkVideo: 'https://youtube.com/shorts/sWgxyE-_Pdw',
      claseBento: '',
      linkExterno: 'https://www.tiktok.com/@assist365ok/video/7612432386441252116?lang=es-419',
      vistas: '+20K views'
    },
    {
      titulo: 'Tutorial',
      categoria: 'House tips',
      colorBadge: 'text-primary',
      imagenPortada: 'https://youtube.com/shorts/vb6agVg0N9A',
      linkVideo: 'https://youtube.com/shorts/vb6agVg0N9A',
      claseBento: '',
      linkExterno: 'https://www.instagram.com/reel/DW9--MOkfVn/',
      vistas: '+100K views'
    },
    {
      titulo: 'Tutorial',
      categoria: 'House tips',
      colorBadge: 'text-primary',
      imagenPortada: 'https://youtube.com/shorts/Iau1xChBFYk',
      linkVideo: 'https://youtube.com/shorts/Iau1xChBFYk',
      claseBento: '',
      linkExterno: ''
    },
    {
      titulo: 'Clip',
      categoria: 'Stream',
      colorBadge: 'text-primary',
      imagenPortada: 'https://youtube.com/shorts/oHtZaXthrwg',
      linkVideo: 'https://youtube.com/shorts/oHtZaXthrwg',
      claseBento: '',
      linkExterno: ''
    },
    {
      titulo: 'Comercial Video',
      categoria: 'Comercial',
      colorBadge: 'text-primary',
      imagenPortada: 'https://youtube.com/shorts/fj17oj8T-Ys',
      linkVideo: 'https://youtube.com/shorts/fj17oj8T-Ys',
      claseBento: '',
      linkExterno: ''
    },
    {
      titulo: 'Festival Promo',
      categoria: 'Promotion of a international festival',
      colorBadge: 'text-primary',
      imagenPortada: 'https://youtube.com/shorts/w-umVj__Hiw',
      linkVideo: 'https://youtube.com/shorts/w-umVj__Hiw',
      claseBento: '',
      linkExterno: ''
    }
  ];

  ngAfterViewInit() {
    if (window.innerWidth >= 768) {
      this.ngZone.runOutsideAngular(() => this.startCylinderEffect());
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  private startCylinderEffect() {
    const update = () => {
      const vw = window.innerWidth;
      const center = vw / 2;
      const R = vw * 0.58; // radio del cilindro en px
      const cards = this.cardRefs.toArray();

      // Read phase
      const rects = cards.map(r => r.nativeElement.getBoundingClientRect());

      // Write phase
      rects.forEach((rect, i) => {
        const cardCenter = rect.left + rect.width / 2;
        const distPx = cardCenter - center;

        // Proyección inversa de cilindro real: theta = asin(x / R)
        const clamped = Math.max(-R, Math.min(R, distPx));
        const theta = Math.asin(clamped / R);           // radianes
        const angleDeg = theta * (180 / Math.PI);
        const cos = Math.cos(theta);

        const scale   = Math.max(0.42, cos);
        const tz      = -180 * (1 - cos);               // recesión en profundidad
        const opacity = Math.max(0.08, Math.pow(cos, 1.8));

        const el = cards[i].nativeElement;
        el.style.transform = `rotateY(${angleDeg}deg) scale(${scale}) translateZ(${tz}px)`;
        el.style.opacity = String(opacity);
      });

      this.rafId = requestAnimationFrame(update);
    };

    this.rafId = requestAnimationFrame(update);
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

  seleccionarVideo(video: Video) {
    this.selectedVideo = video;
  }

  cerrarModal() {
    this.selectedVideo = null;
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
