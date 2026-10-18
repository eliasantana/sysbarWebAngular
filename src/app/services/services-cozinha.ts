import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cozinha } from '../modelo/Cozinha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesCozinha {

  urlStatusCozinha='http://localhost:8081/cozinha/status/';
  ///cozinha/status/{idemplogada}/{nrmesa}
  
  constructor(private http:HttpClient){}

  statusCozinha(cdEmpresaLogada:number, nrMesa:number):Observable<Cozinha[]>{
    return   this.http.get<Cozinha[]>(this.urlStatusCozinha+cdEmpresaLogada+'/'+nrMesa);
  }

}
