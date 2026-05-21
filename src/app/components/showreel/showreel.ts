import { Component } from '@angular/core';

@Component({
  selector: 'app-showreel',
  standalone: true,
  imports: [],
  templateUrl: './showreel.html',
  styleUrl: './showreel.css',
})
export class Showreel {

  // Función idéntica a tu vista de Works para el mouseleave
  pausarYReiniciar(videoElement: HTMLVideoElement) {
    videoElement.pause();
    videoElement.currentTime = 0;
  }
}