import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface UsuarioLogado {
  cdEmpresa: number;
  nmEmpresa: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  cnpj: string;
  cdFuncionario: number;
  nmFuncionario: string;
  cdCargo: number;
  dsCargo: string;
}

@Injectable({
  providedIn: 'root',
})


export class LoginServices {

  private  urlAuth='http://localhost:8081/autentica';
  
  private usuarioLogado='';
  
  constructor(private http:HttpClient){}
  
  login(obj:any):Observable<any>{
    return this.http.post<any>(this.urlAuth, obj);
  }
  //Adiciona um Json na sessão até que a aba seja fechada.
  //Author:Elias Silva
  //Data:09-06-2026
  adicionaNaSessao(obj:any):void{
     sessionStorage.setItem('usuarioLogado',JSON.stringify(obj));
  }

  recuperaDaSessao():UsuarioLogado | null{
    this.usuarioLogado = this.usuarioLogado =  sessionStorage.getItem('usuarioLogado') ||'';
    console.log('sessão: ' + sessionStorage.getItem('usuarioLogado'));
    return this.usuarioLogado ? JSON.parse(this.usuarioLogado) as UsuarioLogado:null;
  }

  //Limpa toda a sessão
  public limparSessao(){
    sessionStorage.clear();
  }




  
}
