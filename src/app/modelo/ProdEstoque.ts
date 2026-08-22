import { Estoque } from "./Estoque";
import { Produto } from "./Produto";

export class ProdEstoque {
  cdProduto!: number;
  cdEstoque!: number;
  cdEmpresa!: number;
  qtd!: number;
  qtdMax!: number;
  qtdMin!: number;
  snAtivo: 'S' | 'N' = 'S';
  dtInclusao: Date | string = '';
  vlVenda: number = 0;
}
