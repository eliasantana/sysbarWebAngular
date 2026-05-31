import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmpresaServices } from 'src/app/services/empresa-services';

@Component({
  selector: 'app-pesquisar',
  imports: [MatTableModule],
  templateUrl: './pesquisar.html',
  styleUrl: './pesquisar.css',
})
export class Pesquisar {

  constructor(private service:EmpresaServices){}

  colunas=[]=['cdEmpresa',
              'nomeEmpresa',
              'endereco',
              'numero',
              'bairro',
              'cep',
              'cidade',
              'uf',
              'telefone',
              'celular',
              'email',
              'logo',
              'cnpj',
              'localBackup',
              'chaveLicenca',
              'dtCadastro',
              'complemento',
              'snBackupAuto',
              'snAtivaDelivery',
              'snAtivaCozinha',
              'snAtivo',
              'tetoDesconto'
            ];

            vetor=new MatTableDataSource<any>();
  
    ngOnInit(){
      this.listar();
    }

    listar():void{
        this.service.listar().subscribe({
          next:(dados)=>{
              this.vetor.data=[...dados];
              console.log('Dados Carregados com sucesso!');
          }
        });
    }

}
