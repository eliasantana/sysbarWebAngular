import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../modelo/Produto';
import { EmptyError, Observable } from 'rxjs';
import { signal } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class ProdutoServices {

  private urlListarProduto='http://localhost:8081/produto/listar';
  private urlAdicionarProduto='http://localhost:8081/produto';
  private urlAlterarProduto='http://localhost:8081/produto/alterar';
  private urlExcluirProduto='http://localhost:8081/produto/excluir/';
  
  constructor(private http:HttpClient){}
   
  listar():Observable<Produto[]>{    
    return  this.http.get<Produto[]>(this.urlListarProduto);
  };

  adicionar(obj:any):Observable<any>{
      return this.http.post<any>(this.urlAdicionarProduto,obj);
  }

  alterar(obj:any):Observable<any>{
    return this.http.put<any>(this.urlAlterarProduto,obj);
  }
  
  excluir(cdProduto:number):Observable<any>{     
    return this.http.delete<any>(this.urlExcluirProduto+cdProduto);
  }
  
 
}
