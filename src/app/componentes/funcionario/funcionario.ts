import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
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
import { MatIcon, MatIconModule } from "@angular/material/icon";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmeDialog } from 'src/app/confirme-dialog/confirme-dialog';
import { Service } from 'src/app/services/service';
import { Cargo } from 'src/app/modelo/Cargo';
import { ModalTransferir } from './modal-transferir/modal-transferir';
import { ModalPromover } from './modal-promover/modal-promover';



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
    MatButtonModule, 
    MatNativeDateModule, 
    MatTableModule, 
    MatIconModule, 
    MatSlideToggleModule], 
  providers:[provideNgxMask(), provideNativeDateAdapter()],
  templateUrl: './funcionario.html',
  styleUrl: './funcionario.css',
})
export class Funcionario implements OnInit {

  colunas:string[]=['cdFuncionario',
                      'nome',                      
                      'telefone',
                      'snAtivo',
                      'acao'
  ];
  funcionarios = new MatTableDataSource<any>();
  
  empresas:Empresa[]=[];
  cargos:Cargo[]=[];

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
  //Atribui o foco ao campo de nome filtro #campofiltro na view
  @ViewChild('campofiltro')
  campofiltro!:ElementRef<HTMLInputElement>;

  constructor(private dateAdapter:DateAdapter<Date>, 
              private empresaService:EmpresaServices, 
              private service:FuncionarioServices, 
              private cargoService:Service){}
  
  //Controla a exibição da grid
  btnExibirPesquisa:boolean=false;
  btnExibirFomulario:boolean=true;

  //Armazena a empresa selecionada
  empresaSelecionada:number=0;
  public cargoSelecionado:number=0;

  //injeta a janela de confirmação
  private dialog = inject(MatDialog);
  private funcionarioSelecionado:number=0;
  
  ngOnInit(){
    this.dateAdapter.setLocale('pt-BR');
    this.listarEmpresas();
    this.litartCargos();
  }
  
  //Retorna a lista de empresas no carregamento que prenchegar o componente filtro
  listarEmpresas():void{
    this.empresaService.listar().subscribe({
        next:(dados)=>{
            //this.empresas.push(...dados);                    
            this.empresas=[...dados];
        },
        error:(erro)=>{
          console.log('Erro ao tentar carrgerar a lista de empresas');
        }
    });
  }
  
  pesquisarFuncionarioEmpresa(cdEmpresa: number):void{
      this.service.pesquisafuncionarioPorEmpresa(cdEmpresa).subscribe({
          next:(funcionariosEmpresa)=>{            
           //teste
           // this.funcionarios.data=funcionariosEmpresa;
           this.funcionarios.data=[...funcionariosEmpresa];            
           //this.campofiltro.nativeElement.focus();
           this.empresaSelecionada=cdEmpresa;           
          },
          error:(erro)=>{
              console.log('Erro ao solicitar lista de funcionário');
          }
      });
  }
    
  exibePesquisa(){
    this.btnExibirPesquisa=true;
    this.btnExibirFomulario=false;    
  }

  exibeCadastro(){
    this.btnExibirPesquisa=false;
    this.btnExibirFomulario=true;    
  }

  filtro(evento:Event){
      const filtroValue = (evento.target as HTMLInputElement).value;
      this.funcionarios.filter = filtroValue.trim().toLowerCase();
  }

  excluirFuncionario(cdFuncionario:number){      
      this.service.excluir(this.empresaSelecionada, cdFuncionario).subscribe({
        next:(dados)=>{
            console.log('Excluíndo ->'+dados);
        },
        error(erro){
          console.log('Erro ao tentar Excluir o funcionário! ');
        }
      });
  }
  //Janela Modal Transferir Funcionário
  tranferir(cdFuncionario:number, nome:string):void{
    this.funcionarioSelecionado=cdFuncionario;
    
    const dialogRef=this.dialog.open(ModalTransferir,{
        width:'600px',
        height:'400px',
        data:{
           cdFuncionario:cdFuncionario,
           cdEmpresaLogada:this.empresaSelecionada,
           nome:nome
        }
    });
    
    dialogRef.afterClosed().subscribe((confirmado:boolean)=>{
      if (confirmado){
        this.pesquisarFuncionarioEmpresa(this.empresaSelecionada);
      }
    })
  }

  //Janela modal promover
  promover(cdFuncionario:number, nome:string):void{
    console.log('FUNCIONARIO LOGADO-> ' + cdFuncionario);
    console.log('EMPRESAL LOGADA-> ' + this.empresaSelecionada);
    console.log('FUNCIONÁRIO NOME-> ' + nome);

    const dialogRef = this.dialog.open(ModalPromover, {
      width:'600px',
      height:'400px',
      data:{
         cdFuncionario:cdFuncionario,
         cdEmpresaLogada:this.empresaSelecionada,
         nome:nome         
      }
    });

    dialogRef.afterClosed().subscribe((confirmado:number)=>{
      if (confirmado!=0){
         console.log('Dados enviados pela confirmação! ' + confirmado);
         this.service.promover(null, 
                               this.empresaSelecionada, 
                               cdFuncionario, 
                               confirmado).subscribe({                                  
                                next:()=>{
                                    console.log('Dados enviados com sucesso!');
                                  },
                                  error:(erro)=>{
                                    console.log('Erro ao tentar promover o funcioário!');
                                  }
                               });
      }
    });
  }

  //Janela de confirmação
  confirma(funcionario:any, titulo:string, mensagem:string, operacao:string):void{
      
      const dialogRef = this.dialog.open(ConfirmeDialog,{
        width:'400px',
        data:{
          titulo:titulo,
          mensagem:mensagem
        }        
      });
    
    dialogRef.afterClosed().subscribe((confirmado:boolean)=>{
        if (confirmado && operacao=='E'){
            this.service.localizarFuncionario(funcionario.cdFuncionario).subscribe({
              next:(dados)=>{                
                this.formularioFuncionario.patchValue(dados);                
              },
              error(erro){
                  console.log('Erro ao tentar localizar o funcionário,',erro);
              }
            });
        }
   });
   this.exibeCadastro();
  }

  litartCargos():void{
      this.cargoService.listar().subscribe({
        next:(dados)=>{
          this.cargos=dados;
          console.log(dados);
        },
        error:(erro)=>{
          console.log('Erro ao listar cargos! ', erro);
        }
      });
  }

  selecionarCargo(cdCargo:number):void{
      this.cargoSelecionado=cdCargo;
      console.log(' cargo selecionardo -> ' + this.cargoSelecionado);
      console.log(' Empresa selecionarda -> ' + this.empresaSelecionada);
  }
  
  //Salva o funcionario
  salvar():void {
    const dadosFormulario = this.formularioFuncionario.getRawValue();   
    this.service.adicionar(dadosFormulario, this.empresaSelecionada, this.cargoSelecionado).subscribe({
      next:(dados)=>{
          console.log('Dados enviados com sucesso!');
          this.formularioFuncionario.reset();
          this.empresaSelecionada=0;
          this.cargoSelecionado=0;
      },
      error:(erro)=>{
            console.log('Erro ao tentar salvar o funcionário!',erro);
          }
      });   
  }


  
}
