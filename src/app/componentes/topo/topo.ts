import { Component } from '@angular/core';
import { LoginServices, UsuarioLogado } from 'src/app/services/login-services';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-topo',
  imports: [MatIconModule, CommonModule],
  templateUrl: './topo.html',
  styleUrl: './topo.css',
})
//Interface para armazenar os dados retornados da sessão

export class Topo {
  
  
  nome:string='';
  empresa:string='';
  dataAtual =  new Date();
  constructor(private loginServices:LoginServices){}

  ngOnInit():void{
    const usuario = this.loginServices.recuperaDaSessao(); 
    this.nome = usuario?.nmFuncionario ?? '';
    this.empresa = usuario?.nmEmpresa?? '';
    console.log('Nome'+this.nome);
  }

  
  


}
