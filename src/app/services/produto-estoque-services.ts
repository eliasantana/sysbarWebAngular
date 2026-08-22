import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../modelo/Produto';
import { ProdutoNoEstoque } from '../modelo/ProdutoNoEstoque';

@Injectable({
  providedIn: 'root',
})
export class ProdutoEstoqueServices {

  urlAdicionarProdEstoque='http://localhost:8081/produto/adicionaestoque/';
  urlGetProduto='http://localhost:8081/produto/listar/';
  urlGetProdutoEStoque='http://localhost:8081/estoque/produtoestoque/';

  constructor(private http:HttpClient){}

  adicionarProdutoNoEstoqeu(obj:any, cdEmpresa:number):Observable<any>{   
    return this.http.post(this.urlAdicionarProdEstoque+cdEmpresa, obj);
  }

  getProduto(cdProduto:number):Observable<any>{   
    return this.http.get<Produto>(this.urlGetProduto+cdProduto);
  }

  ListarProdutoDoEstoque(cdEstoque:number):Observable<ProdutoNoEstoque[]>{
    console.log('URL -> ',this.urlGetProdutoEStoque+cdEstoque);
    return this.http.get<ProdutoNoEstoque[]>(this.urlGetProdutoEStoque+cdEstoque);
  }

}
