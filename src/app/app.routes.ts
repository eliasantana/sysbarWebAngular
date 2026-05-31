import { Routes } from '@angular/router';
import { Nav } from './componentes/nav/nav';
import { Crud } from './crud/crud';
import { Empresa } from './componentes/empresa/empresa';
import { Pesquisar } from './componentes/empresa/pesquisar/pesquisar';

export const routes: Routes = [
    
    {path:'', component:Nav, children:[
       { path:'cargos', component:Crud},
       { path: 'empresa', component:Empresa},
       { path: 'pesquisar', component:Pesquisar}
    ]},
    
];
