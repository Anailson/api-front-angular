import { ConfirmacaoDialogComponent } from './../../components/confirmacao-dialog/confirmacao-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, config, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Curso } from '../../model/curso';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos$: Observable<Curso[]> | null = null;

  //cursosService: CursosService;
  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) // private router: Router,
  // private route : ActivatedRoute //referencia para rota atual
  {
    //this.cursosService = new CursosService();
    // this.cursos$ = this.cursosService.listaDados()
    // .pipe(
    //   catchError(error => {
    // console.log(error);
    ///  this.onError('Erro ao carregar cursos.');
    //   return of([])
    //  })
    //);
    this.refresch();
  }

  refresch() {
    //carregar os registros apos ação de deletar
    this.cursos$ = this.cursosService.listaDados().pipe(
      catchError((error) => {
        // console.log(error);
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  adicionarCurso() {
    //console.log('onAddCurso');
    this.router.navigate(['novo'], { relativeTo: this.route });
  }
  editarCurso(curso: Curso) {
    this.router.navigate(['editar', curso._id], { relativeTo: this.route });
  }

  removeCurso(curso: Curso) {
    //confirmação antes de remover algum arquivo
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso? ',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        //remove registros
        this.cursosService.remove(curso._id).subscribe(
          () => {
            this.refresch();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          (error) => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }
}
