import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie'; // <-- Sacamos AnimationItem de acá
import { AnimationItem } from 'lottie-web'; // <-- Lo importamos de lottie-web

@Component({
  selector: 'app-footer',
  imports: [LottieComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
options: any = {
  path: '/assets/animacion.json',
  loop: true,
  autoplay: true,
  renderer: 'canvas',
  rendererSettings: {
    clearCanvas: true,
    progressiveLoad: false,
    hideOnTransparentVideo: true
  }
};
  // Ahora sí TypeScript va a saber qué es AnimationItem
  animationCreated(animationItem: AnimationItem): void {
    console.log('La animación cargó de diez!', animationItem);
  }
}