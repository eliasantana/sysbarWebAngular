import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../modelo/Pedido';
import { LoginServices } from './login-services';
import { ItemPedido } from '../modelo/ItPedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoServices {
  constructor(private http:HttpClient){}

  urlLocalizarPedido='http://10.0.0.102:8081/pedido/localizarpedido/';
  urlListarItensPedido='http://10.0.0.102:8081/pedido/itens/';
  urlAdicionarItens='http://10.0.0.102:8081/pedido/incluir/';
  urlRemoverItem='http://10.0.0.102:8081/pedido/remover/';
  urlCriarPedido='http://10.0.0.102:8081/pedido/adicionar/';
  urlCancelarPedido='http://10.0.0.102:8081/pedido/cancelar/';
  
  


  localizarPedido(cdEmpresaLogada:number, nrMesa:number):Observable<Pedido>{
     
      return this.http.get<Pedido>(this.urlLocalizarPedido+cdEmpresaLogada+'/'+nrMesa);
  }

  listarItesnPedido(cdEmpresaLogada:number, nrMesa:number):Observable<ItemPedido[]>{
    return this.http.get<ItemPedido[]>(this.urlListarItensPedido+cdEmpresaLogada+'/'+nrMesa);
  }
  
  adicionarItem(cdEmpresaLogada:number, cdPedido:number, cdProduto:number, qtd:number):Observable<any>{
      return this.http.post<any>(this.urlAdicionarItens+cdEmpresaLogada+'/'+cdPedido+'/'+cdProduto+'/'+qtd,null);
  }
  
  remover(cdEmpresaLogada:number, nrPedido:number, passwordAdm:string, cdItPedido:number):Observable<any>{
    return this.http.post<any>(this.urlRemoverItem+cdEmpresaLogada+'/'+nrPedido, null, {
        params:{
          passwordadm:passwordAdm,
          cditpedido:cdItPedido
        }
      }
    );
  }
  
  criarPedido(cdEmpresaLogada:number, cdFuncionario:number, idmesa:number):Observable<any>{
    return this.http.post(this.urlCriarPedido+cdEmpresaLogada+'/'+cdFuncionario+'/'+idmesa, null);
  }

  cancelarPedido(cdEmpresaLogada:number, idMesa:number):Observable<any>{
    console.log('URL->',this.urlCancelarPedido+cdEmpresaLogada+'/'+idMesa);
    return this.http.post(this.urlCancelarPedido+cdEmpresaLogada+'/'+idMesa,null);
  }
  

}
