import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Video } from '../../models/video';
import {ViewChild, ElementRef } from '@angular/core'; // 👈 Revisá que estén las tres

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './works.html',
  styleUrls: ['./works.css']
})
export class Works {
  @ViewChild('carruselContenedor') carrusel!: ElementRef<HTMLDivElement>;
  
  misVideos: Array<Video> = [
    {
      titulo: 'Narrative Style',
      categoria: 'StoryTelling',
      colorBadge: 'text-tertiary',
      imagenPortada: 'assets/video3.mp4', 
      linkVideo: 'assets/video1.mp4',    
      claseBento: '',
      linkExterno: ''   // 👈 ¡Acá va el link real de Instagram/TikTok!
 // Ya no la usamos, la dejamos vacía
    },
    {
      titulo: 'Travel Life Style',
      categoria: 'Viral / Social',
      colorBadge: 'text-secondary',
      imagenPortada: 'assets/video3.mp4',
      linkVideo: 'assets/video6.mp4',    
      claseBento: '',
      linkExterno: 'https://www.tiktok.com/@assist365ok/video/7637260289750158612?lang=es-419'   // 👈 ¡Acá va el link real de Instagram/TikTok!
    },
    {
      titulo: 'Travel Life Style',
      categoria: 'Viral / Social',
      colorBadge: 'text-primary',
      imagenPortada: 'assets/video2.mp4',
      linkVideo: 'assets/video2.mp4',    
      claseBento: '',
            linkExterno: ''   // 👈 ¡Acá va el link real de Instagram/TikTok!

    },
    {
      titulo: 'Tutorial',
      categoria: 'House tips',
      colorBadge: 'text-primary',
      imagenPortada: 'assets/video3.mp4',
      linkVideo: 'assets/video4.mp4',    
      claseBento: '',
      linkExterno: 'https://www.instagram.com/reel/DW9--MOkfVn/'   // 👈 ¡Acá va el link real de Instagram/TikTok!

    },
    {
      titulo: 'Tutorial',
      categoria: 'House tips',
      colorBadge: 'text-primary',
      imagenPortada: 'assets/video3.mp4',
      linkVideo: 'assets/video7.mp4',    
      claseBento: '',
      linkExterno: ''   // 👈 ¡Acá va el link real de Instagram/TikTok!

    },
    {
      titulo: 'Clip',
      categoria: 'Stream',
      colorBadge: 'text-primary',
      imagenPortada: 'assets/video3.mp4',
      linkVideo: 'assets/video5.mp4',    
      claseBento: '',
      linkExterno: ''   // 👈 ¡Acá va el link real de Instagram/TikTok!

    }
  ];

anteriorVideo() {
    this.carrusel.nativeElement.scrollBy({ left: -350, behavior: 'smooth' });
  }

  // ➡️ Mover carrusel a la derecha
  siguienteVideo() {
    this.carrusel.nativeElement.scrollBy({ left: 350, behavior: 'smooth' });
  }

  pausarYReiniciar(videoElement: HTMLVideoElement) {
    videoElement.pause();
    videoElement.currentTime = 0;
  }

  abrirVideo(url: string) {
    window.open(url, '_blank');
  }
}