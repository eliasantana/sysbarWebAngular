import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatFormFieldModule  } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

export interface interFaceProdEstoque{
  cdProduto:number,
  cdEmpresa:number,
  qtdMax:number,
  qtdMin:number,
  snAtivo:string,
  dtInclusao:String;  
}

@Component({
  selector: 'app-produto-estoque',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,MatSelectModule, MatButtonModule, MatIconModule
    
    
],
  templateUrl: './produto-estoque.html',
  styleUrl: './produto-estoque.css',
})
export class ProdutoEstoque {

  formulario = new FormGroup({    
    cdProduto:new FormControl<number |null>(null, Validators.required),
    cdEmpresa:new FormControl<number |null>(null, Validators.required),
    qtdMax:new FormControl<number |null>(null, Validators.required),
    qtdMin:new FormControl<number |null>(null, Validators.required),
    snAtivo:new FormControl<string |null>(null, Validators.required),
    dtInclusao:new FormControl( new Date().toISOString().split('T')[0], Validators.required)    
  });



}
