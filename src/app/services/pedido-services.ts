import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoServices {
  constructor(private http:HttpClient){}

  urlLocalizarPedido='http://localhost:8081/pedido/localizarpedido/';

  localizarPedido(cdEmpresaLogada:number, nrMesa:number):Observable<any>{
      return this.http.get<any>(this.urlLocalizarPedido+cdEmpresaLogada+'/'+nrMesa);
  }
  
}
