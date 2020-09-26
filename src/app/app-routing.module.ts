import { ListaComponent } from './views/lista/lista.component';
import { ConfiguracoesComponent } from './views/configuracoes/configuracoes.component';
import { ListasComponent } from './views/listas/listas.component';
import { ArquivoComponent } from './views/arquivo/arquivo.component';
import { GastosComponent } from './views/gastos/gastos.component';
import { FavoritosComponent } from './views/favoritos/favoritos.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/listas',
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'listas',
        component: ListasComponent
      },
      {
        path: 'lista',
        component: ListaComponent
      },
      {
        path: 'categorias',
        component: CategoriasComponent
      },
      {
        path: 'favoritos',
        component: FavoritosComponent
      },
      {
        path: 'gastos',
        component: GastosComponent
      },
      {
        path: 'arquivo',
        component: ArquivoComponent
      },
      {
        path: 'config',
        component: ConfiguracoesComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }