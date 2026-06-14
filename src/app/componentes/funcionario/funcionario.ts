import { Component, OnInit } from '@angular/core';
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
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EmpresaServices } from 'src/app/services/empresa-services';
import { Empresa } from '../../modelo/Empresa';
import { FuncionarioServices } from 'src/app/services/funcionario-services';



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
    MatButtonModule, MatNativeDateModule, MatTableModule], 
  providers:[provideNgxMask(), provideNativeDateAdapter()],
  templateUrl: './funcionario.html',
  styleUrl: './funcionario.css',
})
export class Funcionario implements OnInit {

  colunas:string[]=['cdFuncionario',
                      'nome',                      
                      'telefone',
                      'snAtivo',
  ];
  funcionarios = new MatTableDataSource<any>();
  
  empresas:Empresa[]=[];

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

  constructor(private dateAdapter:DateAdapter<Date>, private empresaService:EmpresaServices, private service:FuncionarioServices){}

  ngOnInit(){
    this.dateAdapter.setLocale('pt-BR');
    this.listarEmpresas();
  }
  
  //Retorna a lista de empresas no carregamento que prenchegar o componente filtro
  listarEmpresas():void{
    this.empresaService.listar().subscribe({
        next:(dados)=>{
            this.empresas.push(...dados);                    
        },
        error:(erro)=>{
          console.log('Erro ao tentar carrgerar a lista de empresas');
        }
    });
  }
  
  pesquisarFuncionarioEmpresa(cdEmpresa: number):void{
      this.service.pesquisafuncionarioPorEmpresa(cdEmpresa).subscribe({
          next:(funcionariosEmpresa)=>{
            //this.funcionarios.data=[...funcionariosEmpresa];
            this.funcionarios.data=funcionariosEmpresa;
            console.log('Opção selecionada!' + cdEmpresa);
          },
          error:(erro)=>{
              console.log('Erro ao solicitar lista de funcionário');
          }
      });
  }
  
}
