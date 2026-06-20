import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmptyError, Observable } from 'rxjs';
import { Estoque } from '../modelo/Estoque';

@Injectable({
  providedIn: 'root',
})
export class EstoqueServices {

  urlAdicionar='http://localhost:8081/estoque/adicionar/';
  urlListar='http://localhost:8081/estoque/listar/';
  urlExcluir='http://localhost:8081/estoque/excluir/';
  //estoque/excluir/{cdestoque}/{idemplocada}

  constructor(private http:HttpClient){}

  adicionar(obj:any, idemplogada:number):Observable<any>{
    console.log('END POINT -> ' + this.urlAdicionar+idemplogada);
    return this.http.post<any>(this.urlAdicionar+idemplogada,obj);
  }

  listar(cdEmpresaLogada:number):Observable<Estoque[]>{
    console.log('END POINT-> ', this.urlListar+cdEmpresaLogada);
    return this.http.get<Estoque[]>(this.urlListar+cdEmpresaLogada);
  }

  excluir(cdEmpresaLogada:number, cdEstoque:number):Observable<any>{
      return this.http.delete<any>(this.urlExcluir+cdEstoque+'/'+cdEmpresaLogada);
  }

  
  
}
