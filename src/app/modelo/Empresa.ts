export class Empresa {
    cdEmpresa: number = 0;
    nomeEmpresa: string = '';
    endereco: string = '';
    numero: number = 0;
    bairro: string = '';
    cep: string = '';
    cidade: string = '';
    uf: string = '';
    telefone: string = '';
    celular: string = '';
    email: string = '';
    logo: string = '';
    cnpj: string = '';
    localBackup: string = '';
    chaveLicenca: string = '';
    dtCadastro: Date | string = '';
    complemento: string = '';
    snBackupAuto: 'S' | 'N' | string = 'N'; // Geralmente 'S' ou 'N' para Sim/Não
    snAtivaDelivery: 'S' | 'N' | string = 'N';
    snAtivaCozinha: 'S' | 'N' | string = 'N';
    snAtivo: 'S' | 'N' | string = 'S';
    tetoDesconto: number = 0;
  
    // Construtor opcional para permitir clonar ou instanciar passando dados
    constructor(init?: Partial<Empresa>) {
      Object.assign(this, init);
    }
  }