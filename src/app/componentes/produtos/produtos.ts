import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ProdutoServices } from 'src/app/services/produto-services';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCadastro } from './modal-cadastro/modal-cadastro';
import { MatIconModule } from '@angular/material/icon';
import { Empresa } from 'src/app/modelo/Empresa';
import { Produto } from 'src/app/modelo/Produto';

export class PaginatorConfigurableExample {
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

@Component({
  selector: 'app-produtos',
  imports: [RouterModule,
            MatCardModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatSelectModule,
            MatButtonModule, 
            MatTableModule, 
            CommonModule, 
            MatPaginatorModule,
            MatSlideToggleModule, 
            FormsModule, MatIconModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})


export class Produtos {

  formularioProduto = new FormGroup({
    cdProduto:new FormControl(''), 
    cdNCM:new FormControl(''), 
    cdInterno:new FormControl(''), 
    dsProduto:new FormControl('', Validators.required), 
    tipo:new FormControl('', Validators.required), 
    dtInclusao:new FormControl(new Date().toISOString().split('T')[0]), 
    snAtivo:new FormControl('', Validators.required) 
  });
  
  // Controle de Paginacao
  
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  // fim da configuração da paginação
  vetorProdutos = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  colunas:string[]=['cdProduto', 'cdNCM','cdInterno','dsProduto','tipo','dtInclusao','snAtivo','acao'];
  constructor(private service:ProdutoServices){}
  
  //Injetando o MatDialog responsável por acionar o modal
  private dialog = inject(MatDialog);
    
  ngOnInit(){
    this.listarTodosOsProdutos();
    this.formularioProduto;
  }
  ngAfterViewInit():void{
    this.vetorProdutos.paginator=this.paginator;
  };

  listarTodosOsProdutos():void{
    this.service.listar().subscribe({
      next:(dados)=>{
        this.vetorProdutos.data=[...dados];
        console.log('Dados retornados com sucesso!');
      },
      error:(erro)=>{
        console.log('Erro ao tentar carregar a lista de produtos!');
      }
    });
  }

  
  //Responsável por chamar o modal cadastro
  cadastro():void{
      const dialogRef = this.dialog.open(ModalCadastro, {
        width:'600px',
        height:'500px',
        data:{
            titulo:'Cadastrar Produto'
        }
      });
      //Recuperando os dados passados pelo componente modal Cadastro
      dialogRef.afterClosed().subscribe((formularioCadastroProduto)=>{        
            this.service.adicionar(formularioCadastroProduto).subscribe({
            next:(dados)=>{
              console.log('Produto enviado com sucesso!');
              this.listarTodosOsProdutos();
            },
            error:(erro)=>{
              console.log('Erro ao tentar enviar o produto!');
            }
        });
      });
  }

  alterar(objeto:Produto):void{
    const dialogRef = this.dialog.open(ModalCadastro, {
      width:'600px',
      height:'500px',
      data:{
          titulo:'Cadastrar Produto',
          produto:objeto
      }      
    });       
  }


}
