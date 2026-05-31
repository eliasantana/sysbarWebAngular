import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatSidenavModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}
