import { Routes } from '@angular/router';
import { Nav } from './componentes/nav/nav';
import { Crud } from './crud/crud';
import { Empresa } from './componentes/empresa/empresa';
import { Pesquisar } from './componentes/empresa/pesquisar/pesquisar';
import { Login } from './componentes/login/login';
import { Funcionario } from './componentes/funcionario/funcionario';

export const routes: Routes = [
    
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:Login},
    {path:'principal',component:Nav,
     children:[
       { path:'cargos', component:Crud},
       { path: 'empresa', component:Empresa},
       { path: 'pesquisar', component:Pesquisar},
       { path: 'funcionario', component:Funcionario}
     ]}
    
];
