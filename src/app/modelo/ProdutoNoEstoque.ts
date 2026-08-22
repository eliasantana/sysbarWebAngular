import { Empresa } from "./Empresa";
import { Estoque } from "./Estoque";
import { Produto } from "./Produto";

export class ProdutoNoEstoque{

    cdProdutoEstoque!:number | null;
    empresa:Empresa=new Empresa();
    estoque:Estoque=new Estoque();
    produto:Produto=new Produto();
    qtd:number=0;
    qtdMin:number=0;
    qtdMax:number=0;
    snAtivo:string='';
    dtInclusao:Date=new Date();
    vlVenda:number=0;
    
}