import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  herramientas = [
    { nombre: 'Premiere Pro', icono: 'assets/pr-icon.png' },
    { nombre: 'After Effects', icono: 'assets/ae-icon.png' },
    { nombre: 'Photoshop',    icono: 'assets/ps-icon.png' },
  ];

  stats = [
    { valor: '3+',  label: 'Years editing' },
    { valor: '50+', label: 'Projects delivered' },
    { valor: '1M+', label: 'Views generated' },
  ];
}
