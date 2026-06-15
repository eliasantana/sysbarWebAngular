import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatSelect, MatOption } from "@angular/material/select";
import {MatIconModule} from '@angular/material/icon';
import { FuncionarioServices } from 'src/app/services/funcionario-services';
import { Empresa } from 'src/app/modelo/Empresa';
import { EmpresaServices } from 'src/app/services/empresa-services';
import { Funcionario } from '../funcionario';




//Interface responsável por receber os dados do formulário
export interface ModalTransferirData{
  cdEmpresaLogada:number;
  cdFuncionario:number;
  cdEmpresaDestino:number;
  nome:string
}

@Component({
  selector: 'app-modal-transferir',
  imports: [MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, 
    MatSelect, 
    MatOption, 
    MatFormFieldModule,
    MatIconModule
],
  templateUrl: './modal-transferir.html',
  styleUrl: './modal-transferir.css',
})


export class ModalTransferir{

  private dialogRef=inject(MatDialogRef<ModalTransferir>);
  public data = inject<ModalTransferirData>(MAT_DIALOG_DATA);
  
  empresas:Empresa[]=[];

  cdEmpDestino:number=0;
  cdEmpresaAtual:number=0;
  cdFuncionario:number=0;

  constructor(private empresaServices:EmpresaServices){}
  
  
  ngOnInit(){
    this.listarEmpresas();
  }
  onCancelar():void{
    this.dialogRef.close(false);    
  }

  onConfirmar():void{
    this.dialogRef.close(true);
  }

  listarEmpresas():void{
    this.empresaServices.listar().subscribe({
       next:(dados)=>{
          this.empresas=dados;
       },
       error:(erro)=>{
          console.log('Erro ao consultar lista de empresas!',erro);
       }
    });
  }

  selecionarEmpresa(cdEmpresa:number, cdEmpresaAtual:number, cdFuncionario:number){      
      console.log('EMPRESA DE DESTINO -> '+ cdEmpresa);
      console.log('EMPRESA ATUAL  -> ' + cdEmpresaAtual);
      console.log('FUNCIONARIO  -> ' +  cdFuncionario);
  }

}
