import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../modelo/Empresa';
import { Funcionario } from '../componentes/funcionario/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioServices {

  constructor(private http:HttpClient){}
  urlFuncionarioEmpresa='http://localhost:8081/funcionario/listar/';

  pesquisafuncionarioPorEmpresa(cdEmpresa:number):Observable<any>{
      return this.http.get<Funcionario>(this.urlFuncionarioEmpresa+cdEmpresa);
  }

}
