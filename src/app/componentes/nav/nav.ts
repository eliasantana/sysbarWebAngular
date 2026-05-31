import { Component } from '@angular/core';
import { MatDrawerContainer, MatDrawer } from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatDrawerContainer, MatDrawer, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, RouterOutlet, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {}
