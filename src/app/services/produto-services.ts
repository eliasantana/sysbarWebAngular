import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../modelo/Produto';
import { EmptyError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProdutoServices {

  private urlListarProduto='http://localhost:8081/produto/listar';
  
  constructor(private http:HttpClient){}

  listar():Observable<Produto[]>{
    console.log('END POINT -> ', this.urlListarProduto)
    return  this.http.get<Produto[]>(this.urlListarProduto);
  };

 
}
