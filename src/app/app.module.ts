import { ConfiguracoesComponent } from './views/configuracoes/configuracoes.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ListasComponent } from './views/listas/listas.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { FavoritosComponent } from './views/favoritos/favoritos.component';
import { GastosComponent } from './views/gastos/gastos.component';
import { ArquivoComponent } from './views/arquivo/arquivo.component';
import { ListaComponent } from './views/lista/lista.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { HttpClientModule } from "@angular/common/http";

import { environment } from "../environments/environment";
import { DialogComponent } from './components/fragments/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    ListasComponent,
    CategoriasComponent,
    FavoritosComponent,
    GastosComponent,
    ArquivoComponent,
    ConfiguracoesComponent,
    ListaComponent,
    CadastroComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
