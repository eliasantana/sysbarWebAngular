import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Empresa } from 'src/app/modelo/Empresa';
import { EmpresaServices } from 'src/app/services/empresa-services';
import {MatButtonModule} from '@angular/material/button';
import { EstoqueServices } from 'src/app/services/estoque-services';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmeDialog } from 'src/app/confirme-dialog/confirme-dialog';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-estoque',
  imports: [
            MatFormFieldModule, 
            FormsModule, 
            MatIconModule,
            MatInputModule, 
            ReactiveFormsModule, 
            MatSelectModule,
            MatButtonModule,
            MatTableModule,
            MatDividerModule
            
          ],
  templateUrl: './estoque.html',
  styleUrl: './estoque.css',
})
export class Estoque {
  

  estoque:Estoque[]=[];
  exibeCadastro:boolean=true;
  exbibePesquisa:boolean=false;
  empresas:Empresa[]=[];
  empresaLogada:number=0;

  colunas:string[]=[
    'cdEstoque',
    'dsEstoque',
    'dtInclusao',
    'acao'    
  ];
  
  estoques=new MatTableDataSource<any>();
  private confirmeDialog = inject(MatDialog);
  constructor(private empresaServices:EmpresaServices, private services:EstoqueServices){}

  ngOnInit(){
    this.listarEmpresa();
  }

  formularioEstoque = new FormGroup({
      cdEstoque:new FormControl(null),
      dsEstoque:new FormControl('', Validators.required),
      dtInclusao:new FormControl( new Date().toISOString().split('T')[0], Validators.required),
      empresa: new FormGroup({
          cdEmpresa:new FormControl('', Validators.required)
      })
  });

  listarEmpresa(){
    this.empresaServices.listar().subscribe({
        next:(dados)=>{
          this.empresas=dados;
          console.log('Dados carregados com sucesso!');
        },
        error:(erro)=>{
          console.log('Erro ao tentar listar as empresas!');
        }
    });
  }

  adicionar():void{
      console.log('EMPRESA LOGADA SELECIONADA NO COMBOBOX-> ' + this.empresaLogada);
      console.log(this.formularioEstoque.value);
      const estoque = this.formularioEstoque.getRawValue();
      if (this.formularioEstoque.valid){
        this.services.adicionar(estoque, this.empresaLogada).subscribe({
            next:(dados)=>{
              console.log('Dados enviados com sucesso!');              
              this.limparFormulario();
            },
            error:(erro)=>{
              console.log('Erro ao tentar cadastrar o estoque!',erro);            
            }
        });
      }
  }

  selecionaEmpresa(cdEmpresaLogada:number){
    console.log('Você selecionou a seuinte empresa: ' + cdEmpresaLogada);
    this.empresaLogada=cdEmpresaLogada;
    this.listarEstoque(this.empresaLogada);    
  }

  limparFormulario(){
    this.formularioEstoque.reset();
  }

  pesquisar(){
    this.exibeCadastro=false;
    this.exbibePesquisa=true;
    this.listarEstoque(this.empresaLogada);
  }
  cadastro(){
    this.exibeCadastro=true;
    this.exbibePesquisa=false;    
  }
  listarEstoque(cdEmpresaLogada:number){
      this.services.listar(cdEmpresaLogada).subscribe({
        next:(dados)=>{
            console.log('Dados recebidos com sucesso!');
            this.estoques.data = [...dados];
            console.log('dados:'+this.estoque.values);
            console.log('EMPRESA LOGADA ->', this,this.empresaLogada);
        },
        error:(erro)=>{
            console.log('Não foi possível listar os estoques cadastrados!');
        }
      });
  }

  confirmacao(cdestoque:number):void{
    const dialogRef = this.confirmeDialog.open(ConfirmeDialog, {
        width:'400px',
        data:{
          titulo:'Confirma a exclusão?',
          mensagem:`Deseja realmente excluir o estoque? `
        }
    });

    dialogRef.afterClosed().subscribe((confirmado:boolean)=>{
      if (confirmado){
        this.excluir(cdestoque);
      }
    });
  }
  excluir(cdEstoque:number){
    this.services.excluir(this.empresaLogada, cdEstoque).subscribe({
        next:(dados)=>{
            console.log('Estoque Excluído com sucesso!');
            this.listarEstoque(this.empresaLogada);
        },
        error:(erro)=>{
          console.log('Erro ao tentar excluir o estoque selecionado!', erro);
        }
    });
  }

 filtro(event:Event){
    const filtroValue = (event.target as HTMLInputElement).value;
    this.estoques.filter=(filtroValue.trim().toLowerCase());
 }

}
