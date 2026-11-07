import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { LoginServices } from 'src/app/services/login-services';
import { Router } from '@angular/router'
import { MatCard } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { ServicesCozinha } from 'src/app/services/services-cozinha';
import { Cozinha } from 'src/app/modelo/Cozinha';
@Component({
  selector: 'app-cozinha',
  imports: [MatButtonModule, MatCard, MatIcon, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './cozinha.html',
  styleUrl: './cozinha.css',
})
export class CozinhaComponente {
  colunas:string[]=['cdCozinha','cdProduto','nmPrato','horaSolicitacao','horaPrepacacao','tempoPreparacao','nmFuncionario','nrMesa','observacao','status', 'acao' ];
  horaAtual:Date = new Date();
  private intervalo:ReturnType<typeof setInterval>| undefined;
  private atualizatela:ReturnType<typeof setInterval>| undefined;
  private cdr =inject(ChangeDetectorRef);
  public vetorCozinha:Cozinha[]=[];
  public msg:string='';

  private cdFuncionario:number=0;
  private cdEmpresaLogada:number=0;
  
  constructor(private loginServices:LoginServices, 
              private router:Router, 
              private cozinhaServices:ServicesCozinha){}

  ngOnInit(){
    this.cdEmpresaLogada= this.loginServices.getEmpresaLogada()??0;
    this.cdFuncionario = this.loginServices.getCdFuncionario()??0;
    this.horaAtual = new Date();
    this.listar();

    this.intervalo = setInterval(()=>{
      this.horaAtual = new Date();
      this.cdr.markForCheck(); 
    },1000);   

    //Atualiza a tela a cada 1 min
    this.atualizatela = setInterval(()=>{
      console.log('Atualizando tela ');
      this.listar();
     
    },60000);
    
    
    console.log('Chamou!');
  }

  ngOnDestroy():void{
    if(this.intervalo){
      clearInterval(this.intervalo);
    }
  }

  logout(){
     this.loginServices.limparSessao();     
     this.router.navigate(['principal/cozinha']);
  }

  listar(){
    this.cozinhaServices.listarCozinha(Number(this.loginServices.getEmpresaLogada())).subscribe({
      next:(dados)=>{
        console.log(dados);
        this.vetorCozinha=dados;
        this.cdr.markForCheck(); //solicita ao angular que verifique o componente no próximo ciclo
      },error:(erro)=>{
        console.log('Erro ao retornar itens da cozinha!');
      }
    })
  }

  statusClasse(itemStatus:string):string{    
    switch (itemStatus) {
      case 'P':
        return 'status-aguardando';
  
      case 'E':
        return 'status-preparando';
  
      case 'L':
        return 'status-liberado';
  
      default:
        return '';
    }
  }

  preparar(cdCozinha:number){
      
      console.log('cdEmpresa Logada -> ', this.cdEmpresaLogada);
      console.log('cdFuncionario logado ->',this.cdFuncionario);
      console.log('cdcozinha -> ', cdCozinha);
      
      this.cozinhaServices.preparar(cdCozinha, this.cdEmpresaLogada,this.cdFuncionario).subscribe({
          next:(dados)=>{
              console.log('Sucesso!');
              this.listar();
          },
          error:(erro)=>{
              this.msg=erro.error.message;
              console.log(erro.error.message);
              this.cdr.markForCheck();
          }
      });
    }

  liberar(cdCozinha:number){
      this.cozinhaServices.liberar(cdCozinha, this.cdEmpresaLogada, this.cdFuncionario).subscribe({
          next:(dados)=>{
              console.log('Sucesso!');
              this.listar();
          },
          error:(erro)=>{
              console.log(erro.error.message);
              this.msg=erro.error.message;
          }
      });
  }
}
