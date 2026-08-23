import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mesa } from '../modelo/Mesa';

@Injectable({
  providedIn: 'root',
})
export class MemesasServices {
    
  private urlMesasFuncionario='http://localhost:8081/mesa/garcom/';

  constructor(private http:HttpClient){}

  listarMesaFuncionario(cdEmpresa:number, cdFuncionario:number):Observable<any>{    
    return this.http.get<Mesa[]>(this.urlMesasFuncionario+cdEmpresa+'/'+cdFuncionario);
  }
}
