import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective,provideNgxMask } from "ngx-mask";
import { provideNativeDateAdapter, MatOption, DateAdapter } from '@angular/material/core';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatDatepickerModule, MatDatepicker, MatDatepickerActions } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-funcionario',
  imports: [MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    MatOption,
    MatSelect, 
    MatSelectModule, 
    MatDatepicker, 
    MatDatepickerActions, 
    MatNativeDateModule, 
    MatDatepickerModule,
    MatButtonModule, MatNativeDateModule], 
  providers:[provideNgxMask(), provideNativeDateAdapter()],
  templateUrl: './funcionario.html',
  styleUrl: './funcionario.css',
})
export class Funcionario {

   formularioFuncionario = new FormGroup({
      cdFuncionario:new FormControl(''),
      nome:new FormControl(''),
      caminhoImagem:new FormControl(''),
      telefone:new FormControl(''),
      login:new FormControl(''),
      senha:new FormControl(''),
      snAtivo:new FormControl(''),
      nrRg:new FormControl(''),
      nrCpf:new FormControl(''),
      nrCnh:new FormControl(''),
      observacao :new FormControl(''),
      dtvalidadeCNH:new FormControl(''),
      dtDesligamento:new FormControl(''),
      dtAdmissao:new FormControl(''),
      dtNascimento:new FormControl(''),
      dtInclusao:new FormControl('')
  });

  constructor(private dateAdapter:DateAdapter<Date>){}

  ngOnInit(){
    this.dateAdapter.setLocale('pt-BR');
  }

}
