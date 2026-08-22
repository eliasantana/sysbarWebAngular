import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject, numberAttribute,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatFormFieldModule  } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { LoginServices } from 'src/app/services/login-services';
import { Estoque } from '../estoque/estoque';
import { EstoqueServices } from 'src/app/services/estoque-services';
import { EmpresaServices } from 'src/app/services/empresa-services';
import { Empresa } from 'src/app/modelo/Empresa';
import { ProdEstoque } from 'src/app/modelo/ProdEstoque';
import { Produto } from 'src/app/modelo/Produto';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProdutoEstoqueServices } from 'src/app/services/produto-estoque-services';
import { ProdutoNoEstoque } from 'src/app/modelo/ProdutoNoEstoque';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


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
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective,
    MatTableModule,
    MatPaginatorModule
],
  providers:[provideNgxMask(), provideNativeDateAdapter()],
  templateUrl: './produto-estoque.html',
  styleUrl: './produto-estoque.css',
})

export class ProdutoEstoque {
  
  constructor(private loginServices:LoginServices, 
              private empresaServices:EmpresaServices,
              private produtoEstoqueServices:ProdutoEstoqueServices){}
   cdEstoque:number=0;
   dsEstoque:string='';
   cdEmpresa:number=0;
   empresas:Empresa[]=[]; 
   exibeForm:boolean=true;
   colunas:string[]=['cdProduto', 
                     'cdInterno',
                     'cdNCM',
                     'dsProduto', 
                     'dtInclusao',
                     'snAtivo',
                     'qtd',
                     'qtdMax',
                     'qtdMin',
                     'vlVenda',
                     'dsEstoque',
                     'nomeEmpresa',
                     'acao'
                    ];  
   // fim da configuração da paginação
  vetorProdutos = new MatTableDataSource<any>();

  produtonoestoque:ProdutoNoEstoque=new ProdutoNoEstoque();    
  // Controle de Paginacao  
 
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];

  private _paginator!: MatPaginator;

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {  
    this._paginator = paginator;  
    if (paginator) {
      this.vetorProdutos.paginator = paginator;
    }
  }

  ngOnInit(){
    
    //Configurando o filtro personalizado 
    this.vetorProdutos.filterPredicate = (produto: any, filtro: string) => {

      const texto = `
        ${produto.produto?.cdProduto ?? ''}
        ${produto.produto?.cdInterno ?? ''}
        ${produto.produto?.cdNCM ?? ''}
        ${produto.produto?.dsProduto ?? ''}
        ${produto.dtInclusao ?? ''}
        ${produto.snAtivo ?? ''}
        ${produto.qtd ?? ''}
        ${produto.qtdMax ?? ''}
        ${produto.qtdMin ?? ''}
        ${produto.vlVenda ?? ''}
        ${produto.estoque?.dsEstoque ?? ''}
        ${produto.estoque?.empresa?.nomeEmpresa ?? ''}
      `.toLowerCase();
  
      return texto.includes(filtro);
    };
    //Adiciona o valor ao formulário
    this.formulario.get('cdProduto')?.valueChanges.subscribe(codigo=>{
      if (codigo!==null){
         this.getProduto(codigo); 
      }
    });

    
    const dadosEstoque=this.loginServices.recuperarDadosDoEstoque();
    
    this.loginServices.recuperaDaSessao();
    
    if (dadosEstoque){
      
      this.dsEstoque=String(dadosEstoque.dsEstoque);
      this.cdEstoque = Number(dadosEstoque.cdEstoque);
      
      console.log('Código do Estoque ',this.cdEstoque, ' - ',' desEstoque -> ', this.dsEstoque);
      
      this.listarEmpresas(); 
      this.setaDadosEstoque();
      this.listarProdutoEstoque(this.cdEstoque);  
    }
  }
    formulario = new FormGroup({    
    cdProduto:new FormControl<number |null>(null, Validators.required),
    cdEstoque:new FormControl<number |null>(null, Validators.required),
    cdEmpresa:new FormControl<number |null>(null, Validators.required),
    dsEstoque:new FormControl<String | null> (null),
    qtd:new FormControl<number |null>(null, Validators.required),
    qtdMax:new FormControl<number |null>(null, Validators.required),
    qtdMin:new FormControl<number |null>(null, Validators.required),
    snAtivo:new FormControl<string |null>(null, Validators.required),
    dtInclusao:new FormControl( new Date().toISOString().split('T')[0], Validators.required),    
    vlVenda:new FormControl<number | null>(null, Validators.required),
    dsProduto:new FormControl<String | null> (null)
  });

  listarEmpresas(){
    this.empresaServices.listar().subscribe({
        next:(dados)=>{
          this.empresas=dados;
          console.log('Dados retornados com sucesso!');
        },
        error:(erro)=>{
          console.log('Ouve um erro ao tentar  retornar a lista de empresas!');
        }
    });

  }
  

  adicionar():ProdutoNoEstoque | null {
      
      const dados = this.formulario.getRawValue();
       
      console.log('Dados Recebidos dos formulário - >',dados);
      //Necessário validar antes se é nulo pois a variável só aceita o valor não nullo
      if (dados.cdEstoque===null){
        console.log('Código do Estoqque não informado!');
        return null;
      }
      this.produtonoestoque.estoque.cdEstoque=dados.cdEstoque;
      
      if (dados.cdEmpresa===null){
        console.log('Código da Empresa não informado!');
        return null;
      }      
      this.produtonoestoque.empresa.cdEmpresa=dados.cdEmpresa;
      //Guarda o dado da empresa selecionada para usu posterior 
      this.cdEmpresa=dados.cdEmpresa;
      if (dados.cdProduto===null){
        console.log('Código do Produto não informado!');
        return null;
      }            
      this.produtonoestoque.qtd=dados.qtd??0;
      this.produtonoestoque.qtdMin=dados.qtdMin??0;
      this.produtonoestoque.qtdMax=dados.qtdMax??0;
      this.produtonoestoque.vlVenda=dados.vlVenda??0;
      this.produtonoestoque.snAtivo=dados.snAtivo??'S';
      this.produtonoestoque.produto.cdProduto=dados.cdProduto;
      console.log('Produto ',this.produtonoestoque);
      this.produtoEstoqueServices.adicionarProdutoNoEstoqeu(this.produtonoestoque,dados.cdEmpresa).subscribe({
          next:(dados)=>{
            console.log('Produto Adicionado com Sucesso!');
            this.listarProdutoEstoque(this.cdEmpresa);
          },
          error:(erro)=>{
            console.log('Erro ao tentar adicionar o produto ao etoque->',erro);
          }
      });
      this.limparForm();
      
      return this.produtonoestoque;
  }


  getProduto(cdProduto:number){
      this.produtoEstoqueServices.getProduto(cdProduto).subscribe({        
          next:(dados)=>{
            console.log(dados);
            this.formulario.patchValue({
                dsProduto:dados.dsProduto,
            });
            console.log('Dados recebidoscom sucesso!');
          },
          error:(erro)=>{
            this.formulario.patchValue({
              dsProduto:'Produto não localizado!',
          });
          }
      });
  }

  pesquisar(){
    if(this.exibeForm){
      this.exibeForm=false;
    }else{
      this.exibeForm=true;
    }    
  }

  limparForm(){
    this.formulario.reset();
    this.setaDadosEstoque();
  }

  setaDadosEstoque():void{
    //Passando valor para o formulário
    this.formulario.patchValue({
      cdEstoque:this.cdEstoque,
      dsEstoque:this.dsEstoque,
      cdEmpresa:this.cdEmpresa
    }); 
  }

  listarProdutoEstoque(cdEStoque:number){
      this.produtoEstoqueServices.ListarProdutoDoEstoque(cdEStoque).subscribe({
          next:(produtoEstoque)=>{
              this.vetorProdutos.data=[...produtoEstoque];
              this.vetorProdutos.paginator = this.paginator;
          },
          error:(erro)=>{
            console.log('Erro ao retornar os produto do estoque informado!');
          }
      });
  }

 //Filtra o valor informado no input 
 filtrar(event:Event){
  const filtroValue = (event.target as HTMLInputElement).value;
  this.vetorProdutos.filter=filtroValue.trim().toLowerCase();
}

}
