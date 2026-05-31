import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaServices {

  private urlAdicionar='http://localhost:8081/empresa/adicionar';

  constructor(private http:HttpClient){}

  adicionar(obj:any):Observable<any>{
    return this.http.post<any>(this.urlAdicionar,obj);
}

}
