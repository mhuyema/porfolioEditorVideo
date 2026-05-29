import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services {
  lang = inject(LanguageService);
}
