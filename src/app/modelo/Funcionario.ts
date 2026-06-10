export class Funionario{
    cdFuncionario:number=0;
    nome: string='';
    caminhoImagem: string='';
    telefone:string='';
    login:string='';
    senha:string='';
    snAtivo: 'S' | 'N' | string='';
    nrRg: string='';
    nrCpf: string=''; 
    nrCnh: string='';
    observacao: string='';
    dtvalidadeCNH: Date | string=''; 
    dtDesligamento: Date | string='';
    dtAdmissao: Date | string ='';
    dtNascimento:Date | string='';
    dtInclusao: Date | string='';
}