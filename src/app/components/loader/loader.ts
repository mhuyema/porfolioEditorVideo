import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible) {
      <div class="loader-overlay" [class.loader-exit]="exiting">
        <div class="loader-logo">MH<span class="loader-dot">.</span></div>
        <div class="loader-bar-track">
          <div class="loader-bar-fill"></div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./loader.css']
})
export class Loader implements OnInit {
  visible = true;
  exiting = false;

  constructor(private cdr: ChangeDetectorRef) {
    document.documentElement.style.overflow = 'hidden';
  }

  ngOnInit() {
    setTimeout(() => {
      this.exiting = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.visible = false;
        document.documentElement.style.overflow = '';
        this.cdr.detectChanges();
      }, 650);
    }, 1600);
  }
}
