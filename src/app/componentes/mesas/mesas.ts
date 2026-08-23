import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FuncionarioServices } from 'src/app/services/funcionario-services';
import { Funcionario } from 'src/app/modelo/Funcionario';
import { MemesasServices } from 'src/app/services/memesas-services';
import { EmpresaServices } from 'src/app/services/empresa-services';
import { Empresa } from 'src/app/modelo/Empresa';
import { Mesa } from 'src/app/modelo/Mesa';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-mesas',
  standalone:true,
  imports: [MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,  
    ReactiveFormsModule, MatChipsModule],
  templateUrl: './mesas.html',
  styleUrl: './mesas.css',
})
export class Mesas {

constructor(private funcionarioServices:FuncionarioServices,
            private services:MemesasServices,
            private empresasServices:EmpresaServices){}

vetorFuncionarios:Funcionario[]=[];
vetorEmpresas:Empresa[]=[];
vetorMesas:Mesa[]=[];
funcionarioSelecioando:number=0;
private nomeFuncionarioSelecionado:string='';
empresaFuncionarioSelecionado:number=0;
botaoListarDesabilitado:boolean=true;
mensagemErro:string='';

//Avalidar a necessidade desse form group
formulario=new FormGroup({
  cdFuncionario:new FormControl<number | null>(null),
  nomeFuncionario:new FormControl('')
});

ngOnInit(){
    this.listarFuncionarioCargo();
    this.listarEmpresas();   
}


listarFuncionarioCargo(){
    const cdCargo:number=1; // 1 Retornar apenas Garçom
    this.funcionarioServices.listarFuncionarioCargo(cdCargo).subscribe({
      next:(funcionarios)=>{        
        this.vetorFuncionarios=[...funcionarios];        
        console.log('Funcionários retornados com sucesso!');
      },
      error:(erro)=>{
        console.log('erro ao terntar localizar os funcionários pelo cargo informado', erro);
      }
    });
}

listarEmpresas(){
  this.empresasServices.listar().subscribe({
    next:(dados)=>{
      this.vetorEmpresas=dados;
      console.log('Empresas retornadas com sucesso');
    },
    error:(erro)=>{
      console.log('Erro ao tentar listar empresas.');
    }
  });
}

selecionaFuncionario(cdFuncionario:number){  
  this.funcionarioSelecioando=cdFuncionario; 
  this.mensagemErro='' ; 
  this.vetorMesas=[];   
}

selecionaEmpresa(cdEmpresa:number){  
  console.log('Empresa selecionada -> ', cdEmpresa);
  this.empresaFuncionarioSelecionado=cdEmpresa;
  this.botaoListarDesabilitado=false;
  this.listarMesasFuncionario();
}

listarMesasFuncionario(){
    this.services.listarMesaFuncionario(this.empresaFuncionarioSelecionado, this.funcionarioSelecioando).subscribe({
      next:(dados)=>{
        this.vetorMesas=[...dados];
        if (this.mensagemErro){
          this.mensagemErro='';
        }
        console.log('Mesas retornados com sucesso!', this.vetorMesas);
      }, 
      error:(erro)=>{
        this.mensagemErro=erro.error.message;
        this.vetorMesas=[];
        console.log('Não foi possivel localizar as mesas deste Funcionário -> ','erro:', erro.error.message);
      }
    });
}
}
