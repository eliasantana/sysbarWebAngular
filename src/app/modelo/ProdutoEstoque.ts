import { Estoque } from "./Estoque";
import { Produto } from "./Produto";

export class ProdutoEstoque {
    produto!:Produto;
    estoque!:Estoque;
    qtd!:number;
    qtdMax!:number;
    qtdMin!:number;
    snAtivo: 'S' | 'N' | String='';
    dtInclusao:Date | String='';
    vlVenda: 0 | Number=0;
}
