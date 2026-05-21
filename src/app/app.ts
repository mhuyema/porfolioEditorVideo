import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Showreel } from './components/showreel/showreel';
import { Works } from './components/works/works';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Footer,Hero,Navbar,Showreel,Works],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('porfolioM');
}
