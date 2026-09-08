import { Component } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { MatCard, MatCardContent, MatCardModule } from "@angular/material/card";
import { EmpresaServices } from 'src/app/services/empresa-services';
import { Empresa } from 'src/app/modelo/Empresa';
import { DashboardServices } from 'src/app/services/dashboard-services';
import { Estatistica } from 'src/app/modelo/Estatistica';

@Component({
  selector: 'app-dashboard',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatCard, MatCardContent, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  empresas:Empresa[]=[];
  
  Estatistica={
    qtdOcupada:0,
    percentOcupada:0,
    percentLivre:0,
    qtdMesa:0, 
    qtdLivre:0,
    cdEmpresa:0
  }

  constructor(private empresaServices:EmpresaServices, private service:DashboardServices){ }
  ngOnInit(){
    this.listarEmpresas();
  }

  listarEmpresas(){
    this.empresaServices.listar().subscribe({
      next:(dados)=>{
        this.empresas=[...dados];
        console.log('Dados Recebidos com sucesso!', dados);
      },
      error:(erro)=>{
        console.log('Erro ao tentar carregar a lista de empresas!');
      }
    });
  }

  getEstatistica(cdEmpresaLogada:number){
    console.log('Empresa Selecionada -> ',cdEmpresaLogada);
    this.service.getEstatistica(cdEmpresaLogada).subscribe({      
        next:(dados)=>{           
           console.log('Estatistica recebida com sucesso! ', dados);
           this.Estatistica=dados;
           console.log(Estatistica);
        },
        error:(erro)=>{
          console.log('Erro ao tentar carregar a estatística da empresa -> ', cdEmpresaLogada);          
        }
    })
  }
}
