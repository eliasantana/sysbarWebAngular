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
  urlExcluir='http://localhost:8081/funcionario/excluir/'; 
  urlLocalizarFuncionario='http://localhost:8081/funcionario/get/'; 
  urlAdicionarFuncionario='http://localhost:8081/funcionario/adicionar/'; 
  private urlTransferir='http://localhost:8081/funcionario/transferir/';
  
  pesquisafuncionarioPorEmpresa(cdEmpresa:number):Observable<any>{
      return this.http.get<Funcionario>(this.urlFuncionarioEmpresa+cdEmpresa);
  }

  excluir(idEmpresaLogada:number, cdFuncionario:number):Observable<any>{      
     return this.http.delete<Funcionario>(this.urlExcluir+idEmpresaLogada + '/' + cdFuncionario);
  }

  localizarFuncionario(cdFuncionario:number):Observable<any>{
      return this.http.get<Funcionario>(this.urlLocalizarFuncionario+cdFuncionario);
  }

  adicionar(obj:any, cdEmpresa:number, cdCargo:number):Observable<any>{    
    return this.http.post(this.urlAdicionarFuncionario+cdEmpresa+'/'+cdCargo, obj);
  } 

  transferir(obj:any, idemplogada:number, idfuncionario:number, idempdestino:number):Observable<any>{
    return this.http.post<any>(this.urlTransferir+idemplogada+'/'+idfuncionario+'/'+idempdestino,obj);
  }
}
