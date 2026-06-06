import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmpresaServices } from 'src/app/services/empresa-services';
import {  MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,  
  MatDialogModule,  
  MatDialogTitle
} from '@angular/material/dialog';
import { ConfirmeDialog } from 'src/app/confirme-dialog/confirme-dialog';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-pesquisar',
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule,MatSlideToggleModule
     ],
  templateUrl: './pesquisar.html',
  styleUrl: './pesquisar.css',
})

export class Pesquisar {

  constructor(private service:EmpresaServices){}
 
  private dialog = inject(MatDialog);
  private route=inject(Router);
  public selecionado:boolean=false;

  
  colunas=[]=['cdEmpresa',
              'nomeEmpresa',              
              'telefone',
              'celular',
              'email',
              'tetoDesconto',
              'snAtivo',
              'acao'
            ];

  vetor=new MatTableDataSource<any>();
  
    ngOnInit(){
      this.listar();
    }

    filtro(event:Event){
      const filtroValue = (event.target as HTMLInputElement).value;
      this.vetor.filter=filtroValue.trim().toLowerCase();
    }

    listar():void{
        this.service.listar().subscribe({
          next:(dados)=>{
              this.vetor.data=[...dados];
              console.log('Dados Carregados com sucesso!');
          }
        });
    }

   
    confirma(empresa:any):void{
      const dialogRef = this.dialog.open(ConfirmeDialog,{
          width:'400px',
          data:{
            titulo:'Confirma a Excelusão?',
            mensagem:`Deseja realmente excluir a empresa ${empresa.nomeEmpresa}?`
          }
      });

      dialogRef.afterClosed().subscribe((confirmado:boolean) =>{
          if (confirmado){
            console.log(`Excluindo a empresa ${empresa.cdEmpresa}`);
            this.service.excluir(empresa.cdEmpresa).subscribe({
              next:()=>{
                console.log("Empresa excluida ")
                this.listar();
              },
              error:(erro)=>{
                alert('erro ao tentar excluir a empresa!');
              }
            });
          }
      });

    }

    selecionar(id:number):void{
      this.service.localizar(id).subscribe({
        next:(empresa)=>{
           console.log(empresa);
           //repassando a rota e mandando a empresa localizada no state.
           this.route.navigate(['/empresa'],{
                state:{'dadosempresa':empresa}
           });
        },error:(erro)=>{
          alert('Erro ao localizar a empresa informada!');
        }
      })
    }
    isAtivo(snAtivo:string):void{
      if (snAtivo=='S'){
        this.selecionado=true;
      }
    }
    

}
