import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective,provideNgxMask } from "ngx-mask";
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-funcionario',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, NgxMaskDirective], 
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

}
