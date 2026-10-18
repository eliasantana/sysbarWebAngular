import { Component } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { LoginServices } from 'src/app/services/login-services';
import { Router } from '@angular/router'
@Component({
  selector: 'app-cozinha',
  imports: [MatButtonModule],
  templateUrl: './cozinha.html',
  styleUrl: './cozinha.css',
})
export class Cozinha {

  constructor(private loginServices:LoginServices, private router:Router){}

  logout(){
     this.loginServices.limparSessao();     
     this.router.navigate(['principal/cozinha']);
  }

}
