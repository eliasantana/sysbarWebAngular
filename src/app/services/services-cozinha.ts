import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cozinha } from '../modelo/Cozinha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesCozinha {

  urlStatusCozinha='http://10.0.0.102:8081/cozinha/status/';
  urlListarCozinha='http://10.0.0.102:8081/cozinha/listar';
  urlIniciar='http://10.0.0.102:8081/cozinha/iniciar/';
  urlLiberar='http://10.0.0.102:8081/cozinha/liberar/';
  ///cozinha/liberar/{idemplogada}/{idfuncionario}/{idcozinha}

  
  constructor(private http:HttpClient){}

  statusCozinha(cdEmpresaLogada:number, nrMesa:number):Observable<Cozinha[]>{
    return   this.http.get<Cozinha[]>(this.urlStatusCozinha+cdEmpresaLogada+'/'+nrMesa);
  }

  listarCozinha(cdEmpresaLogada:number):Observable<Cozinha[]>{
      return this.http.get<Cozinha[]>(this.urlListarCozinha+"/"+cdEmpresaLogada);
  }

  preparar(cdCozinha:number, cdEmpresaLogada:number, cdFuncionarioLogado:number){
    return this.http.post<any>(this.urlIniciar+cdEmpresaLogada+'/'+cdFuncionarioLogado+'/'+cdCozinha,null);
  }

  liberar(cdCozinha:number, cdEmpresaLogada:number, cdFuncionarioLogado:number):Observable<any>{
      return this.http.post(this.urlLiberar+cdEmpresaLogada+'/'+cdFuncionarioLogado+'/'+cdCozinha,null);
  }
}
