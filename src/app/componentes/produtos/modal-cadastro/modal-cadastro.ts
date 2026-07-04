import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoServices } from 'src/app/services/produto-services';
import { MatOption, MatOptionModule } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';

//Interface responsável por receber os dados do formulário
export interface ModalCadastroData{
    cdProduto: number;
    cdNCM: string;
    cdInterno: string;
    dsProduto: string;
    tipo: string;
    dtInclusao: string;
    snAtivo: string;
}

@Component({
  selector: 'app-modal-cadastro',
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule, MatOptionModule, MatSelect, MatInputModule],
  templateUrl: './modal-cadastro.html',
  styleUrl: './modal-cadastro.css',
})
export class ModalCadastro {

    private dialogRef = inject(MatDialogRef<ModalCadastro>);
    public data = inject<ModalCadastroData>(MAT_DIALOG_DATA);

    constructor(private services:ProdutoServices){}

    onConfirmar():void{
      this.dialogRef.close(true);
    }
    
    onCancelar():void{
      this.dialogRef.close(true);
    }

}
