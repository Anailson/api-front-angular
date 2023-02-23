import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfirmacaoDialogComponent } from '../cursos/components/confirmacao-dialog/confirmacao-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoriaPipe } from './pipes/categoria.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoriaPipe,
    ConfirmacaoDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports:[
     ErrorDialogComponent,
     ConfirmacaoDialogComponent,
     CategoriaPipe,
    ]
})
export class SharedModule { }
