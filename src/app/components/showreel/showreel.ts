import { Component } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
  selector: 'app-showreel',
  standalone: true,
  imports: [FadeInDirective],
  templateUrl: './showreel.html',
  styleUrl: './showreel.css',
})
export class Showreel {
  mostrandoVideo = false;

  reproducir() {
    this.mostrandoVideo = true;
  }
}