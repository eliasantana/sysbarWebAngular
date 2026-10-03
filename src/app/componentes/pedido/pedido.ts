import { Component, inject,ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FormsModule, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { PedidoServices } from 'src/app/services/pedido-services';
import { LoginServices, UsuarioLogado } from 'src/app/services/login-services';
import { ItemPedido } from 'src/app/modelo/ItPedido';
import { ProdutoServices } from 'src/app/services/produto-services';
import { ProdutoEstoqueServices } from 'src/app/services/produto-estoque-services';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalSenhaAdministrativa } from '../modal-senha-administrativa/modal-senha-administrativa';
import { form } from '@angular/forms/signals';

export interface DadosSenha{
  codigo:number,
  password:string
}

@Component({
  selector: 'app-pedido',
  imports: [MatCard, MatFormField, MatIcon, FormsModule, MatCardModule, 
           MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, 
           MatTableModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
          CurrencyPipe],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css',
})
export class Pedido {

  constructor(private services:PedidoServices, 
              private loginServices:LoginServices,
              private produtoEstoque:ProdutoEstoqueServices){}
  
  //Injetando o ActiveRoute para receber o parametro enviado na rota
  private route = inject(ActivatedRoute);
  public nrMesa:number=0;
  public nrPedido:number=0;
  public usuarioLogado:UsuarioLogado  | null=null;
  private cdEmpresaLogada:number=0;  
  private cd = inject(ChangeDetectorRef);
  public vlUnitario:string='';
  public totalPedido:number=0;
  public mensagem:string='';
  public senhaAdministrativa='202649';
  private dialogRef = inject(MatDialog);

  formulario = new FormGroup({
      cdProduto: new FormControl <number | null> (null, Validators.required),
      dsProduto:new FormControl<string | null>(null),
      qtd:new  FormControl <number | null> (null, Validators.required)
  });
  
  @ViewChild('campoQtd')
  campoQtd!:ElementRef<HTMLInputElement>;

  vetorItensPedido = new MatTableDataSource<ItemPedido>([]);
  colunas:string[]=['cdProduto','dsProduto','qtd','vlUnit','total','acao'];

 ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.nrMesa = Number(params.get('nrMesa'));
      console.log('Número da mesa antes da Requisição -> ', this.nrMesa);     
      this.usuarioLogado=this.loginServices.recuperaDaSessao();
      this.cdEmpresaLogada=Number(this.usuarioLogado?.cdEmpresa);
      this.localizarPedido(this.nrMesa);            
    });
  }
  
  localizarPedido( nrMesa:number):void{
     console.log('Código da Empresa antes de localizar o pedido -> ' , this.cdEmpresaLogada);
     console.log(' empresa logada ao localizar o pedido -> ',this.cdEmpresaLogada);
      this.services.localizarPedido(this.cdEmpresaLogada,nrMesa).subscribe({
        next:(p)=>{
            console.log('Pedido Localizado',p);
            this.nrPedido=p.cdPedido;            
            this.listarItens(this.cdEmpresaLogada, nrMesa);           
            this.cd.detectChanges();
        },
        error:(erro)=>{
          console.log('Erro ao tentar localizar o pedido informado!');
        }
      })
  }

  listarItens(cdEmpresaLogada:number, nrMesa:number){
    this.totalPedido=0;
    this.services.listarItesnPedido(cdEmpresaLogada, nrMesa).subscribe({
        next:(item)=>{
            console.log('Itens Retornados com sucesso!');
            console.log(' Itens do Pedido -> ',item);
            
            console.log('Itens recebidos:', item);
            console.log('Primeiro item:', item[0]);
            console.log('cdItemPedido:', item[0]?.cdItemPedido);

            this.vetorItensPedido.data=[...item];
            for(const i of item){
                this.totalPedido=this.totalPedido+i.total;
            }
        },
        error:(erro)=>{
          console.log('Erro ao tentar listar os itens do pedido!')
        }
    });
  }

  getProduto(){
    const cdProduto = this.formulario.get('cdProduto')?.value 
      this.limparMensagem();
      this.produtoEstoque.getProduto(Number(cdProduto)).subscribe({
        next:(produto)=>{
          this.formulario.patchValue({
              dsProduto:produto.dsProduto,
          });
          setTimeout(() => {
            this.campoQtd.nativeElement.focus();
          },);  
          this.cd.detectChanges();         
            console.log('Produto localizado com sucesso!')
        },
        error:(msg)=>{
          this.formulario.patchValue({
            dsProduto:'Produto não localizado!'            
          });
          this.mensagem=msg.error.message;
          this.mensagem =
          msg.error?.message ??
          msg.error ??
          'Erro ao adicionar o item ao pedido!';
          console.log(this.mensagem);
          console.log('Erro ao tentar localizar o produto!')
          this.cd.detectChanges();
        }
        
      });

  }

  adicionarItensAoPedido(){
      const dados = this.formulario.value;
      if (dados.cdProduto==null){
        console.log('Código do Produto não informado');
      };
      this.services.adicionarItem(this.cdEmpresaLogada, this.nrPedido, dados.cdProduto!, dados.qtd!).subscribe({
          next:(dados)=>{
              console.log('Item adicionado com sucesso!');
              this.listarItens(this.cdEmpresaLogada, this.nrMesa) ;             
          },
          error:(erro)=>{
              this.mensagem=erro.error.message;
              this.cd.detectChanges();
          }
      });      
  }

  limparMensagem(){
    this.mensagem='';
  }

  autorizacao(cdItemPedido:number){
    
    const dialogRef = this.dialogRef.open(ModalSenhaAdministrativa, {
        width:'600px',
        height:'250px',
        data:{
           mensagem:this.mensagem
        }
    });

    dialogRef.afterClosed().subscribe((formulario:DadosSenha | undefined)=>{
       if (!formulario){
        return;
       }
       if (this.senhaAdministrativa==formulario.password){
        this.services.remover(this.cdEmpresaLogada, 
                              this.nrPedido, 
                              formulario.password, 
                              cdItemPedido).subscribe({
                                  next:(dados)=>{
                                      console.log('Item Removido com Sucesso!');
                                      this.listarItens(this.cdEmpresaLogada, this.nrMesa);
                                      this.cd.detectChanges();
                                  },
                                  error:(erro)=>{
                                      this.mensagem=erro.error.message;
                                      console.log('Erro ao tentar excluir o produto!', this.mensagem);
                                      this.listarItens(this.cdEmpresaLogada, this.nrMesa);                                                                    
                                  }
                              });
       }else{
        console.log('Código do Produto-> ', cdItemPedido);
        this.mensagem='Senha inválida!';
        this.autorizacao(cdItemPedido);
       }
    });

  }

  
}
