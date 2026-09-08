import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmptyError, Observable } from 'rxjs';
import { Estatistica } from '../modelo/Estatistica';

@Injectable({
  providedIn: 'root',
})
export class DashboardServices {

  urlEstatisticas:string='http://localhost:8081/estatistica/ocupacao/';
  
  constructor(private http:HttpClient){}

  getEstatistica(cdEmpresaLogada:number):Observable<Estatistica>{
    return this.http.get<Estatistica>(this.urlEstatisticas+cdEmpresaLogada);
  }


}
