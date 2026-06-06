import { Component } from '@angular/core';
import { MatDrawerContainer, MatDrawer } from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatMenuModule} from '@angular/material/menu';
import { Topo } from "../topo/topo";
import { Rodape } from '../rodape/rodape';


@Component({
  selector: 'app-nav',
  imports: [MatDrawerContainer,
    MatDrawer,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    MatFormFieldModule, MatMenuModule, Topo, Rodape],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {}
