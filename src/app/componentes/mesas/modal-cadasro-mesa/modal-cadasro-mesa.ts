import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ModalCadastroMesaInterface{
  cdFuncionario:number,
  nomeFuncionario:string,
  cdEmpresaFuncionario:number,
  nrMesa:number,
  mensagem:string,
  titulo:string,
  intervalo:boolean
}
export interface ModalCadastroMesaInterfaceOut{
  nrMesa:number
}

@Component({
  selector: 'app-modal-cadasro-mesa',
  imports: [MatDialogModule,
    MatFormField,
    MatFormFieldModule,
    CommonModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule],
  templateUrl: './modal-cadasro-mesa.html',
  styleUrl: './modal-cadasro-mesa.css',
})
export class ModalCadasroMesa {

  private dialogRef=inject(MatDialogRef<ModalCadasroMesa>);
  public data = inject<ModalCadastroMesaInterface>(MAT_DIALOG_DATA);

  habilitaBtnConfirmar:boolean=false;
  nrMesa!:number;
  mensagem:string='';

  constructor(){
      this.mensagem=this.data.mensagem;
  }
 
  formCadMesa!:FormGroup;
  //mesaRecebida:Mesa = new Mesa();
  ngOnInit(){
    //Setando os dados com componente mesa.ts que foi enviado via MAT_DIALOG_DATA
    console.log('Dados -> ', this.data);
       this.formCadMesa= new FormGroup({
        cdEmpresa:new FormControl(this.data.cdEmpresaFuncionario),
        cdFuncionario:new FormControl(this.data.cdFuncionario),
        nrMesa:new FormControl(this.data.nrMesa,[Validators.required, Validators.min(1)])
      });
  }

  onConfirmar(nrmesa:Number):void{
    const dadosRecebidos = this.formCadMesa.getRawValue();
    //Passando os dados recebidos para o dialogRef isso irá retornar o valor para o componente que o chamou    
    this.dialogRef.close(dadosRecebidos);
  }
  onCancelar():void{
    this.dialogRef.close(false);
  }
  
  limpaMensagem(){
      this.mensagem='';
  }
}
