import { Component, signal } from '@angular/core';
import { Crud } from "./crud/crud";
import { TabelaCargos } from './tabela-cargos/tabela-cargos';

@Component({
  selector: 'app-root',
  imports: [Crud],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}
