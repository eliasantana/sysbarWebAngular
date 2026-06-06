import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmptyError, Observable } from 'rxjs';
import { Empresa } from '../modelo/Empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaServices {

  private urlAdicionar='http://localhost:8081/empresa/adicionar';
  private urlListar='http://localhost:8081/empresa/listar';
  private urlExcluir='http://localhost:8081/empresa/delete/';
  private urlLocalizar='http://localhost:8081/empresa/';

  constructor(private http:HttpClient){}

  adicionar(obj:any):Observable<any>{
    return this.http.post<any>(this.urlAdicionar,obj);
  }

  listar():Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.urlListar);
  }

  excluir(cdEmpresa:number):Observable<any>{
    return this.http.delete(this.urlExcluir+cdEmpresa);
  }

  localizar(id:number):Observable<any>{
    return this.http.get<Empresa>(this.urlLocalizar+id);
    }

  
}
