import { Component, AfterViewInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [],
  template: `
    <!-- Razor blade — tip en (2,28), se alinea al cursor -->
    <svg #dot class="cursor-blade" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cuerpo de la hoja -->
      <path d="M2 28 L21 2 L23 5 L5 28 Z" fill="#b8c4ff" fill-opacity="0.88"/>
      <!-- Filo (borde de corte) -->
      <line x1="2" y1="28" x2="21" y2="2" stroke="white" stroke-width="0.9" stroke-opacity="0.55" stroke-linecap="round"/>
      <!-- Reflejo inferior del filo -->
      <line x1="5" y1="28" x2="23" y2="5" stroke="white" stroke-width="0.4" stroke-opacity="0.18" stroke-linecap="round"/>
    </svg>

    <div #ring class="cursor-ring"></div>
  `,
  styleUrls: ['./cursor.css']
})
export class Cursor implements AfterViewInit, OnDestroy {
  @ViewChild('dot') dotRef!: ElementRef<HTMLElement>;
  @ViewChild('ring') ringRef!: ElementRef<HTMLElement>;

  private mouse = { x: -200, y: -200 };
  private ringPos = { x: -200, y: -200 };
  private rafId!: number;
  private initialized = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMove);
      document.addEventListener('mouseleave', this.onLeave);
      document.addEventListener('mouseover', this.onOver);
      document.addEventListener('mouseout', this.onOut);
      this.rafId = requestAnimationFrame(this.loop);
    });
  }

  // Offset: tip del blade está en (2,28) dentro del SVG de 24x30
  // translate(-2px, -28px) alinea el tip exactamente al cursor
  private onMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    if (!this.initialized) {
      this.ringPos.x = e.clientX;
      this.ringPos.y = e.clientY;
      this.initialized = true;
    }

    const dot = this.dotRef.nativeElement;
    dot.style.opacity = '1';
    dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-2px, -28px)`;
  };

  private onLeave = () => {
    this.dotRef.nativeElement.style.opacity = '0';
    this.ringRef.nativeElement.style.opacity = '0';
  };

  private onOver = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) {
      this.dotRef.nativeElement.classList.add('cursor-blade--hover');
      this.ringRef.nativeElement.classList.add('cursor-ring--hover');
    }
  };

  private onOut = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) {
      this.dotRef.nativeElement.classList.remove('cursor-blade--hover');
      this.ringRef.nativeElement.classList.remove('cursor-ring--hover');
    }
  };

  private loop = () => {
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.1;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.1;

    const ring = this.ringRef.nativeElement;
    if (this.initialized) ring.style.opacity = '1';
    ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;

    this.rafId = requestAnimationFrame(this.loop);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseleave', this.onLeave);
    document.removeEventListener('mouseover', this.onOver);
    document.removeEventListener('mouseout', this.onOut);
  }
}
