import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption, MatSelectModule } from "@angular/material/select";
import { Funcionario } from '../funcionario';
import { Service } from 'src/app/services/service';
import { Cargo } from 'src/app/modelo/Cargo';

export interface ModalPromoverData{
  cdEmpresaLogada:number,
  cdFuncionario:number,
  cdNovoCargo: number,
  nome:string
}

@Component({
  selector: 'app-modal-promover',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatSelect, MatOption, MatSelectModule],
  templateUrl: './modal-promover.html',
  styleUrl: './modal-promover.css',
})

export class ModalPromover {

  private dialogRef=inject(MatDialogRef<ModalPromover>);
  public data = inject<ModalPromoverData>(MAT_DIALOG_DATA);
  cargos:Cargo[]=[];
  constructor(private cargoServices:Service){}
  private cargoSelecionado:number=0;
  
  ngOnInit(){
    this.listarCargos();
  }

  onCancelar():void{
    this.dialogRef.close(false);
  }

  onConfirmar():void{
    this.dialogRef.close(this.cargoSelecionado);    
  }

  listarCargos():void{
      this.cargoServices.listar().subscribe({
        next:(dados)=>{
            console.log('Dados Carregados com sucesso!');
            this.cargos=dados;
        },
        error:(erro)=>{
          console.log('Erro ao tentar carregar a lista de cargos!');
        }
      });
  }

  selecionarCargo(cdCargo:number){     
      this.cargoSelecionado = cdCargo;
  }

}
