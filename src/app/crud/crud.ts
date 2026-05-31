import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Service } from '../services/service';
import { Cargo } from '../modelo/Cargo';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({  
  selector: 'app-crud',
  standalone: true,
  
  imports: [CommonModule, 
            MatButtonModule,
            MatFormFieldModule, 
            MatInputModule, 
            MatTableModule, 
            MatPseudoCheckboxModule, 
            MatCheckboxModule, 
            MatSelectModule,
            MatIconModule, 
            ReactiveFormsModule, 
            NgxMaskDirective],
  providers:[provideNgxMask()],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {
  cargos:Cargo[]=[];
  mensagem:string='';
  
  //Variárvel criada par receber dados do formulário reativo
  formularioCargo = new FormGroup({    
    dscargo: new FormControl('', [Validators.required]),
    vlbruto: new FormControl('',[Validators.required]),
    vlliquido: new FormControl('',Validators.required),
    vlinss:new FormControl('',Validators.required),
    vlfgts:new FormControl('',Validators.required),
    snativo:new FormControl('',Validators.required)
  });
  //Controlar a visibilidade dos Botões
  btnCadastrar:boolean=true;
  idCargoSelecionado:number=0;
  
  //Construtor que instancia o servico
  constructor(private servico:Service){}
  //Listando todos os cagos e populando o array
  
  ngOnInit(){
      this.listar();
  }
  
colunas:string[]=['cdcargo','dscargo','vlbruto','vlliquido','vlinss','vlfgts','snativo'];   
  
  //Vetor que armazenara os dados dos cargos listados
vetor=new MatTableDataSource<any>();

  //Filtar dados da tabela  
filtro(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.vetor.filter=filterValue.trim().toLowerCase();
}

listar():void{
  this.servico.listar().subscribe({
    next:(dados)=>{
        this.vetor.data = [...dados];
        console.log('Dados Carregados com sucesso!', this.vetor);
    },
    error:(erro)=>{
      console.error('Erro ao buscar dados ', erro);
    }
  });
}

cadastrar():void{
//Capturando dados do formulário    
const dadosFormulario = this.formularioCargo.getRawValue();
if(this.formularioCargo.invalid){      
    alert('Dados Inválido! Por favor revise os dados informados!');
}else{
    console.log('Dados enviados ao servidor ', dadosFormulario);
      this.servico.enviar(dadosFormulario).subscribe({
          next:(dadosSalvo) => {
              alert('Cargo cadastrado com sucesso!');
              this.formularioCargo.reset();
              this.listar();
          },
          error:(erro) => {
              console.error('Erro ao cadastrar cargo ', erro);
              alert('Erro ao tentar cadastrar o cargo');
              this.formularioCargo.reset();
          }            
      });
    }
  }

  excluirCargo(id:string):void{
      this.servico.excluir(id).subscribe({
        next:()=>{
          alert('Dados Excluídos com Sucesso!');
          this.listar();
          this.limparFomulario();
        },
        error:(erro) =>{
            alert('Erro ao tentar excluir o cargo.');
        }
      });
  }

  selecionar(id:string){
    this.servico.localizar(id).subscribe({

      next:(cargo)=>{
        this.idCargoSelecionado=cargo.cdcargo;
        console.log('ID Selecionador: ' + this.idCargoSelecionado);
        this.formularioCargo.patchValue(cargo);
        this.btnCadastrar = false;
      }
    });
  }

  limparFomulario(){
    this.formularioCargo.reset();
    this.btnCadastrar=true;
  }

  

}
