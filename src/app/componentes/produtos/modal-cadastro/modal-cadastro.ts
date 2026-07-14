import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoServices } from 'src/app/services/produto-services';
import { MatOption, MatOptionModule, provideNativeDateAdapter } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Produto } from 'src/app/modelo/Produto';

//Interface responsável por receber os dados do formulário
export interface ModalCadastroData{
   titulo:String;
   produto:Produto
}

@Component({
  selector: 'app-modal-cadastro',
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule, MatOptionModule, MatSelect, MatInputModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './modal-cadastro.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './modal-cadastro.css',
})
export class ModalCadastro {

    private dialogRef = inject(MatDialogRef<ModalCadastro>);
    public data = inject<ModalCadastroData>(MAT_DIALOG_DATA);
    
  formularioCadastroProduto = new FormGroup({
        cdProduto: new FormControl<number | null>(null),
        cdNCM: new FormControl<String | null>(null),
        cdInterno: new FormControl<String | null>(null),
        dsProduto: new FormControl<String | null>(null),
        tipo: new FormControl<String | null>(null),
        dtInclusao: new FormControl<Date | null> (null),
        snAtivo: new FormControl<String | null>(null)
    })
    //Recebendo dados da view

    constructor(private services:ProdutoServices){ }
    ngOnInit(){
      //Recebe o objeto selecionado na view e adiciona ao formulário
      this.formularioCadastroProduto.patchValue({
        cdProduto:this.data.produto.cdProduto,
        cdNCM:this.data.produto.cdNCM,
        cdInterno:this.data.produto.cdInterno,
        dsProduto:this.data.produto.dsProduto,
        tipo:this.data.produto.tipo,
        dtInclusao:new Date(this.data.produto.dtInclusao),
        snAtivo:this.data.produto.snAtivo
      });
      
    }

    onConfirmar():void{
      const dadosFormularioCadastro = this.formularioCadastroProduto.getRawValue();  
      this.dialogRef.close(dadosFormularioCadastro);   
    }
    
    onCancelar():void{
      this.dialogRef.close(true);
    }

}
