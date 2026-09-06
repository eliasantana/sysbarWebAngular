import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mesa } from '../modelo/Mesa';

@Injectable({
  providedIn: 'root',
})
export class MemesasServices {
    
  private urlMesasFuncionario='http://localhost:8081/mesa/garcom/';
  private urlAdicionarMesa='http://localhost:8081/mesa/adicionar/';
  private urlExcluirMesa='http://localhost:8081/mesa/excluir/';  

  constructor(private http:HttpClient){}

  listarMesaFuncionario(cdEmpresa:number, cdFuncionario:number):Observable<any>{    
    return this.http.get<Mesa[]>(this.urlMesasFuncionario+cdEmpresa+'/'+cdFuncionario);
  }

  adicionarMesa(cdEmpresa:number, nrMesa:number, cdFuncionario:number):Observable<any>{
    return this.http.post<any>(this.urlAdicionarMesa+cdEmpresa+'/'+nrMesa+'/'+cdFuncionario,null);
  }

  excluir(cdMesa:number):Observable<any>{
    return this.http.delete<any>(this.urlExcluirMesa+cdMesa);
  }
}
