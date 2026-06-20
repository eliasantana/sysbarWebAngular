import { Empresa } from "./Empresa";

export class Estoque {

    cdEstoque:number=0;
    dsEstoque:string='';
    dtInclusao:Date | string ='';
    empresa:Empresa = new Empresa();
    
}