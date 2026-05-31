import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDatepicker} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { EmpresaServices } from 'src/app/services/empresa-services';
import { AngularJSUrlCodec } from '@angular/common/upgrade';



@Component({
  selector: 'app-empresa',
  standalone:true,
  imports: [MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatSelectModule, MatDatepickerModule, MatDatepicker, MatButtonModule],
  providers:[provideNgxMask(), provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empresa.html',
  styleUrl: './empresa.css',
})
export class Empresa {

  btnCadastrar:boolean=true;

  formularioEmpresa = new FormGroup({
    cdEmpresa: new FormControl(''),
    nomeEmpresa: new FormControl('', [Validators.required, Validators.minLength(5)]),
    endereco: new FormControl(''),
    numero: new FormControl(''),
    bairro: new FormControl(''),
    cep: new FormControl(''),
    cidade: new FormControl(''),
    uf: new FormControl(''),
    telefone: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl(''),
    logo: new FormControl(''),
    cnpj: new FormControl('', Validators.required),
    localBackup: new FormControl(''),
    chaveLicenca: new FormControl(''),
    dtCadastro: new FormControl(''),
    complemento: new FormControl(''),
    snBackupAuto: new FormControl(''),
    snAtivaDelivery: new FormControl(''),
    snAtivaCozinha: new FormControl(''),
    snAtivo: new FormControl(''),
    tetoDesconto:new FormControl('')
  });

  constructor(private empresaService:EmpresaServices){}

  cadastrar():void{
    //Retorna todos os dados do formulário
    const formEmpresa = this.formularioEmpresa.getRawValue();

    if(this.formularioEmpresa.invalid){
      console.log('Dados Inválidos!');
    }else{

      this.empresaService.adicionar(formEmpresa).subscribe({
          next:(dadosSalvos)=>{
            alert('Dados enviados com sucesso!');
            this.limparFormulario();
          },          
           error:(erro)=>{
              console.error('Erro ao tentar cadastrar a empresa!',erro);
              alert('Erro ao tentar cadastrar a empresa!');
           }           
      });
        
      this.btnCadastrar=false;
      
      console.log('Dados enviados ao servidor!');
      console.log(this.formularioEmpresa.value);
      this.formularioEmpresa.reset();
    }
  }

  limparFormulario(){
    this.formularioEmpresa.reset();
    this.btnCadastrar=true;
  }

}
