import { Component, inject, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit, OnDestroy {
  lang = inject(LanguageService);

  herramientas = [
    { nombre: 'Premiere Pro', icono: 'assets/pr-icon.png' },
    { nombre: 'After Effects', icono: 'assets/ae-icon.png' },
    { nombre: 'Photoshop',    icono: 'assets/ps-icon.png' },
  ];

  private targets = [
    { end: 3,  suffix: '+' },
    { end: 50, suffix: '+' },
    { end: 1,  suffix: 'M+' }
  ];

  animatedValues = signal(this.targets.map(t => '0' + t.suffix));
  private animated = false;
  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.animated) {
        this.animated = true;
        this.animateCounters();
        this.observer.disconnect();
      }
    }, { threshold: 0.3 });

    const el = document.querySelector('#about');
    if (el) this.observer.observe(el);
  }

  private animateCounters() {
    const steps = 55;
    const duration = 1400;

    this.targets.forEach((target, i) => {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const p = step / steps;
        const eased = 1 - Math.pow(1 - p, 3);
        const current = Math.round(eased * target.end);

        this.animatedValues.update(vals => {
          const copy = [...vals];
          copy[i] = current + target.suffix;
          return copy;
        });

        if (step >= steps) {
          clearInterval(interval);
          this.animatedValues.update(vals => {
            const copy = [...vals];
            copy[i] = target.end + target.suffix;
            return copy;
          });
        }
      }, duration / steps);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
