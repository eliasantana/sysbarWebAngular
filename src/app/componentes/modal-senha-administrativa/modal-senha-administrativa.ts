import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

export interface ModalSenhaDataInterface {
  mensagem:string
}

@Component({
  selector: 'app-modal-senha-administrativa',
  imports: [MatFormFieldModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatButtonModule, ReactiveFormsModule ],
  templateUrl: './modal-senha-administrativa.html',
  styleUrl: './modal-senha-administrativa.css',
})


export class ModalSenhaAdministrativa {

  private dialogRef = inject(MatDialogRef<ModalSenhaAdministrativa>);
  public data = inject<ModalSenhaDataInterface>(MAT_DIALOG_DATA);
  private cd = inject(ChangeDetectorRef);

  mensagem:string='';

  constructor(){
    
  }

  ngOnInit(){
    
  }
  formulario = new FormGroup({
    codigo:new FormControl(''),
    password: new FormControl('')
  })

  onCancelar():void{
   console.log('Cancelado');
    
  }

  onConfirmar():void{
    this.dialogRef.close(this.formulario.value);
    this.cd.detectChanges();
  }
}
