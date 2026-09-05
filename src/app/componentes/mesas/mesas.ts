import { Component, inject } from '@angular/core';
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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadasroMesa, ModalCadastroMesaInterfaceOut } from './modal-cadasro-mesa/modal-cadasro-mesa';
import { DialogRef } from '@angular/cdk/dialog';
import { convertCompilerOptionsFromJson } from 'typescript';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-mesas',
  standalone:true,
  imports: [MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule, MatChipsModule, MatIconModule],
  templateUrl: './mesas.html',
  styleUrl: './mesas.css',
})

export class Mesas {

constructor(private funcionarioServices:FuncionarioServices,
            private services:MemesasServices,
            private empresasServices:EmpresaServices,  
            private cdr: ChangeDetectorRef){}
 
vetorFuncionarios:Funcionario[]=[];
vetorEmpresas:Empresa[]=[];
vetorMesas:Mesa[]=[];
funcionarioSelecioando:number=0;
private nomeFuncionarioSelecionado:string='';
empresaFuncionarioSelecionado:number=0;
botaoListarDesabilitado:boolean=true;
mensagemErro:string='';
mesa:Mesa=new Mesa();
nrMesa!:number;
mensagem:string='';

//injeta o Modal
private dialog = inject(MatDialog);

//Formulário cadastro de mesas
formulario=new FormGroup({
  cdFuncionario:new FormControl<number | null>(null),
  cdEmpresa:new FormControl(''),
  nrMesa:new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
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
  console.log('Funcionário Selecionado -> ',this.funcionarioSelecioando)
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

listarMesasFuncionario() {
    this.services.listarMesaFuncionario(this.empresaFuncionarioSelecionado, this.funcionarioSelecioando).subscribe({
      next: (dados) => {
        this.vetorMesas = [...dados];
        this.cdr.detectChanges();
      },  
      error: (erro) => {
        this.mensagemErro = erro.error.message;
        this.vetorMesas = [];
        console.log(
          'Não foi possível localizar as mesas deste Funcionário -> ',
          erro.error.message
        );
      }
    });
}

abrirModalCadastroMesa(){
  const dialogref = this.dialog.open(ModalCadasroMesa, {
    width:'600px',
    height:'400px',
    data:{
       titulo:'Cadastro de Mesas',
       cdFuncionario:this.funcionarioSelecioando,
       cdEmpresaFuncionario:this.empresaFuncionarioSelecionado,
       nrMesa:null,
       mensagem:this.mensagem
    }
  });
  dialogref.afterClosed().subscribe((formulario)=>{
     console.log('Dados recebido pela confirmação ', formulario);
     if (formulario){
        console.log('Enviando dados!');
        this.services.adicionarMesa(formulario.cdEmpresa, formulario.nrMesa, formulario.cdFuncionario).subscribe({
          next:(dados)=>{                  
              this.empresaFuncionarioSelecionado=formulario.cdEmpresa;
              this.funcionarioSelecioando=formulario.cdFuncionario;               
              this.listarMesasFuncionario();              
          },
          error:(erro)=>{
              console.log('Erro ao tentar adicionar uma mesa!',erro);
              this.mensagem=erro.error.message;
              console.log('msg->',this.mensagem);
              this.abrirModalCadastroMesa();
          }
       });
     }
    })
}

excluirMesa(nrMesa:number){
    //Desenvolver método de exclusão na api
}
}
