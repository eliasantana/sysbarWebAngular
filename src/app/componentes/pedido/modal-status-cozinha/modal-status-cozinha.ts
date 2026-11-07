import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ServicesCozinha } from 'src/app/services/services-cozinha';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { Cozinha } from 'src/app/modelo/Cozinha';
import { DatePipe, NgClass,CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface DadosStatusCozinha{
  titulo:string,  
  mensagem:string,
  cdEmpresa:number,
  nrMesa:string
}

@Component({
  selector: 'app-modal-status-cozinha',
  imports: [MatButtonModule, MatTableModule, MatCardModule, DatePipe, MatCheckboxModule, NgClass],
  templateUrl: './modal-status-cozinha.html',
  styleUrl: './modal-status-cozinha.css',
})
export class ModalStatusCozinha {

    private dialogRef = inject(MatDialogRef<ModalStatusCozinha>);
    public data = inject<DadosStatusCozinha>(MAT_DIALOG_DATA);
    private cd = inject(ChangeDetectorRef);

    vetorCozinha=new MatTableDataSource<Cozinha>([]);
    dadosCozinhaAux:Cozinha[]=[]; //Array auxiliar para armazenar todos os dados recebido pela API
    itensPedido:any[]=[];
    pedidoSelecionado:any=null;

    colunas:string[]=['selecionar','cdPedido','nrMesa','nmFuncionario','horaSolicitacao'];
    colunaItens:string[]=['cdProduto','horaPrepacacao','nmPrato','observacao','status'];

    constructor(private cozinhaServices:ServicesCozinha){}

    ngOnInit(){
      this.statusCozinha();
    }

    onCancelar():void{
      this.dialogRef.close();
      this.cd.detectChanges();
    }

    onConfirmar(confirmar:boolean){
        this.dialogRef.close();
    }

    statusCozinha(){
        this.cozinhaServices.statusCozinha(Number(this.data.cdEmpresa), 
                                           Number(this.data.nrMesa)).subscribe({
            next:(dados)=>{
              this.dadosCozinhaAux = dados; //Atribuindo a variável auxiliar os dados recebido originalmente da API para a tabela filha.
              this.vetorCozinha.data=[...dados]; //Tabela de pedido principal
                console.log('Dados Retornonados da cozinha. ', dados);
                this.criarTabelaCozinha(); // Utiliza o map para não permitir registros repetidos
            },
            error:(erro)=>{
              console.log('Erro ao retornar Dados da Cozinha ', erro.error.menssage);
            }
        })

    }

    //Evitar pedido repetidos
    criarTabelaCozinha(){
        const mapa = new Map<number, Cozinha>();
        this.vetorCozinha.data.forEach(cozinha => {
          if (!mapa.has(cozinha.cdPedido)){
              mapa.set(cozinha.cdPedido,{
                  cdCozinha:cozinha.cdCozinha,
                  cdEmpresa:cozinha.cdEmpresa,
                  cdFuncionario:cozinha.cdFuncionario,
                  cdProduto:cozinha.cdProduto,
                  cdPedido:cozinha.cdPedido,
                  horaSolicitacao:cozinha.horaSolicitacao,
                  horaPrepacacao:cozinha.horaPrepacacao,
                  nmFuncionario:cozinha.nmFuncionario,
                  nmPrato:cozinha.nmPrato,
                  nrMesa:cozinha.nrMesa,
                  observacao:cozinha.observacao,
                  qtd:cozinha.qtd,
                  status:cozinha.status,
                  tempoPreparacao:cozinha.tempoPreparacao
              });
          }
        });
        this.vetorCozinha.data=Array.from(mapa.values());
    }

  selecionarPedido(pedido:Cozinha){    
    this.pedidoSelecionado = pedido;
    this.itensPedido = this.dadosCozinhaAux.filter(//Filtrando os dados originais para que a tabela detalhe mostre todos os itens do pedido.
        cozinha=> cozinha.cdPedido === pedido.cdPedido  
    );
    this.cd.detectChanges();
    console.log('Pedido selecionado => ',this.pedidoSelecionado);
    console.log('Itens=>', this.itensPedido)
  }
  //O cultar a tabela filha quando os item não setiver selecionado no checkbox
  verificar(marcado:boolean):void{  
    if (!marcado){
      console.log('CheckBox desmarcado!');
      this.pedidoSelecionado=null;
    }else{
      this.criarTabelaCozinha();
    }
  }

  classeStatus(status:string):string{
      if (status==='P'){
         return 'status-aguardando'; 
      }else if (status==='L'){
        return 'status-liberado'; 
      }else{
        return 'status-preparando'; 
      }
  }
}