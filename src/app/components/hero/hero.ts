import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  lang = inject(LanguageService);

  private thumbnails = [
    'https://img.youtube.com/vi/8VcKVLTbako/hqdefault.jpg',
    'https://img.youtube.com/vi/UKoglYLAf9Y/hqdefault.jpg',
    'https://img.youtube.com/vi/sWgxyE-_Pdw/hqdefault.jpg',
    'https://img.youtube.com/vi/vb6agVg0N9A/hqdefault.jpg',
    'https://img.youtube.com/vi/Iau1xChBFYk/hqdefault.jpg',
    'https://img.youtube.com/vi/oHtZaXthrwg/hqdefault.jpg',
  ];

  row1 = [...this.thumbnails, ...this.thumbnails, ...this.thumbnails];
  row2 = [...this.thumbnails].reverse().concat([...this.thumbnails].reverse(), [...this.thumbnails].reverse());
  row3 = [...this.thumbnails, ...this.thumbnails, ...this.thumbnails];
}
