import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { CursosListComponent } from './components/cursos-list/cursos-list.component';
import { CursoFormComponent } from './containers/curso-form/curso-form.component';
import { CursosComponent } from './containers/cursos/cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';


@NgModule({
  declarations: [
    CursosComponent,
    CursoFormComponent,
    CursosListComponent,
  //  ConfirmacaoDialogComponent

  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    AppMaterialModule, //IMPORTANDO O ANGULAR MATERIAL QUE SERÁ UTILIZADO NO PROJETO
    SharedModule,
    ReactiveFormsModule

  ]
})
export class CursosModule { }
