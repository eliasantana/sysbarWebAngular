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
tituloJanela:string='';
exibeIntervalo:boolean=false;
btnVisivel:boolean=false; //Controla a visibilidade dos botões de Cadastro
exibetransferencia:boolean=false; //Controla a visibiliade do campo novoGarçom no modo de transferência

//injeta o Modal
private dialog = inject(MatDialog);

//Formulário cadastro de mesas
formulario=new FormGroup({
  cdFuncionario:new FormControl<number | null>(null),
  cdEmpresa:new FormControl(''),
  nrMesa:new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  nrMesaFinal:new FormControl<number | null>(null),
  cdNovoFuncionario:new FormControl<number | null >(null)
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
  this.btnVisivel=true;
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
          this.btnVisivel=false;
      }
    });
}

abrirModalCadastroMesa(modo:string){
  if (modo==='C'){
      this.exibeIntervalo=true;
      this.tituloJanela='Cadastro de Mesas'; 
  }else if(modo ==='I'){
      this.exibeIntervalo=false;
      this.tituloJanela='Cadastro de Mesas por Intervalo'; 
  }else{
    this.exibeIntervalo=true;
    this.tituloJanela='Transferir Mesa para novo Garçom';
    this.exibetransferencia=true; 
  }

  const dialogref = this.dialog.open(ModalCadasroMesa, {
    width:'500px',
    height:'320px',
    data:{
       titulo:this.tituloJanela,
       cdFuncionario:this.funcionarioSelecioando,
       cdEmpresaFuncionario:this.empresaFuncionarioSelecionado,
       nrMesa:null,
       mensagem:this.mensagem,
       intervalo:this.exibeIntervalo,
       transferencia:this.exibetransferencia
    }
  });

  dialogref.afterClosed().subscribe((formulario)=>{
    console.log('Dados recebido pela confirmação ', formulario);
    if (modo==='C'){ //C - Cadastro | I - Intervalo      
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
                this.abrirModalCadastroMesa('C');
            }
         });
       }
    }else if (modo==='I'){
      //Mesas por Intervalo      
      if (formulario){
        console.log('Enviando dados!');
        this.services.adicionarMesaIntervalo(formulario.cdEmpresa, formulario.nrMesa, formulario.nrMesaFinal,formulario.cdFuncionario).subscribe({
          next:(dados)=>{                  
              this.empresaFuncionarioSelecionado=formulario.cdEmpresa;
              this.funcionarioSelecioando=formulario.cdFuncionario;               
              this.listarMesasFuncionario();              
          },
          error:(erro)=>{
              console.log('Erro ao tentar adicionar o intervalo de mesas!',erro);
              this.mensagem=erro.error.message;
              console.log('msg->',this.mensagem);
              this.abrirModalCadastroMesa('I');
          }
       });
     }
    }else{
      //Transferencia de mesa 
      if (formulario){
        console.log('Enviando dados!');
        console.log('Formulário transferir ',formulario)
        this.services.transgeferirMesa(formulario.cdEmpresa, formulario.nrMesa, formulario.cdNovoFuncionario).subscribe({
          next:(dados)=>{                  
              this.empresaFuncionarioSelecionado=formulario.cdEmpresa;
              this.funcionarioSelecioando=formulario.cdFuncionario;               
              this.listarMesasFuncionario();              
          },
          error:(erro)=>{
              console.log('Erroao tentar transferir a mesa para o novo funcionário',erro);
              this.mensagem=erro.error.message;
              console.log('msg->',this.mensagem);
              this.abrirModalCadastroMesa('T');
          }
       });
     }
       this.exibetransferencia=false;       
    }
    });
}

excluirMesa(cdMesa:number){
    this.services.excluir(cdMesa).subscribe({
      next:()=>{        
        console.log("Mesa Excluída con sucesso!", cdMesa);
        this.listarMesasFuncionario();
      },
      error:(erro)=>{
        this.mensagemErro=erro.error.message;
        console.log("Erro ao tentar excluir a mesa informada!", cdMesa);
      }
    });
  }
}
