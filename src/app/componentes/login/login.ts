import { Component, signal } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router'
import { MatIcon } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Topo } from "../topo/topo";
import { LoginServices } from 'src/app/services/login-services';
import { Cargo } from 'src/app/modelo/Cargo';





@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatIcon,
    MatButtonModule,
    MatIconModule,
    MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private loginBanco:string='123456';
  private passwordBanco:string='123456'
  mensagem:string='';

  constructor(private route:Router, private services:LoginServices){}

  formLogin = new FormGroup({
    login:new FormControl('',Validators.required),
    senha:new FormControl('',Validators.required)
  });   

  hide = signal(true);
    clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login():void{
    if (this.formLogin.valid){
       const dadosLogin = this.formLogin.getRawValue();       
       console.log(dadosLogin)
       this.services.login(dadosLogin).subscribe({
          next:(login)=>{            
            this.services.adicionaNaSessao(login);
            console.log('Usuário autenticado com sucesso');
            this.route.navigate(['principal'])
          },error:(erro)=>{
              console.log('Erro ao solicitar o dado!',erro);
              this.mensagem='Usuário ou senha inválidos!';   
          }
       });          
    }  
  }

}
