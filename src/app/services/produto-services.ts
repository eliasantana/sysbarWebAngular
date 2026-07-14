import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../modelo/Produto';
import { EmptyError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProdutoServices {

  private urlListarProduto='http://localhost:8081/produto/listar';
  private urlAdicionarProduto='http://localhost:8081/produto';
  
  constructor(private http:HttpClient){}

  listar():Observable<Produto[]>{    
    return  this.http.get<Produto[]>(this.urlListarProduto);
  };

  adicionar(obj:any):Observable<any>{
      return this.http.post<any>(this.urlAdicionarProduto,obj);
  }


 
}
