import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from '../modelo/Cargo';

@Injectable({
  providedIn: 'root',
})
export class Service {
  
  //Url do EndPoint
  private url:string='http://localhost:8081/cargo/listar';

  private urlAdicionar:string='http://localhost:8081/cargo/adicionar';

  private urlExcluir:string='http://localhost:8081/cargo/excluir/';

  private urlLocalizar:string='http://localhost:8081/cargo/listar/';



  //Construtor
  constructor(private http:HttpClient){}

  //Listar Cargos
  listar():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.url);
  }

  //Enviar os dados para a API
  enviar(obj:any):Observable<any>{   
    return this.http.post<any>(this.urlAdicionar,obj);
  }
  
  excluir(id:string):Observable<any>{
    return this.http.delete<any>(this.urlExcluir+id);
  }

  localizar(id:string):Observable<any>{
    return this.http.get<Cargo>(this.urlLocalizar+id);
  }

}
