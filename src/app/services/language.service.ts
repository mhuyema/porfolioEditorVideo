import { Injectable, signal, computed } from '@angular/core';
import { translations, Lang } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  idioma = signal<Lang>('es');

  t = computed(() => translations[this.idioma()]);

  toggle() {
    this.idioma.set(this.idioma() === 'es' ? 'en' : 'es');
  }
}
