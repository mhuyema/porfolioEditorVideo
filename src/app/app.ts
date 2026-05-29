import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Showreel } from './components/showreel/showreel';
import { Works } from './components/works/works';
import { Motion } from './components/motion/motion';
import { About } from './components/about/about';
import { LanguageService } from './services/language.service';
import { Cursor } from './components/cursor/cursor';
import { Loader } from './components/loader/loader';
import { Services } from './components/services/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Hero, Navbar, Showreel, Works, Motion, About, Cursor, Loader, Services],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('porfolioM');
  lang = inject(LanguageService);
}
