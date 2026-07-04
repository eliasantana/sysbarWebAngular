export class Produto {
    cdProduto!: number;
    cdNCM!: string;
    cdInterno!: string;
    dsProduto!: string;
    tipo!: string;
    dtInclusao!: string;
    snAtivo!: string;
  
    constructor(init?: Partial<Produto>) {
      Object.assign(this, init);
    }
  }