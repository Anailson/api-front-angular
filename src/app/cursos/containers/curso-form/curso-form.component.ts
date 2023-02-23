import { Curso } from './../../model/curso';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {FormControl, Validators, NonNullableFormBuilder} from '@angular/forms';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id:[''],
    nome: [' ', [Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)]],
    categoria: ['', [Validators.required]]
});

  constructor(private formBuilder: NonNullableFormBuilder,
      private service: CursosService,
      private msgErro: MatSnackBar,
      private location: Location,
      private route: ActivatedRoute) {
     // this.form
  }


  ngOnInit(): void {
    const curso: Curso = this.route.snapshot.data['curso'];
    console.log(curso);
    this.form.setValue({
      _id: curso._id,
      nome: curso.nome,
      categoria: curso.categoria
    })
    //this.form.value.nome.
  }

  onSubmit(){
     console.log(this.form.value);
     this.service.salvar(this.form.value)
     .subscribe(result => this.mensagemSucesso(), error => this.mensagemErro());
  }

  onCancel(){
      this.location.back(); //voltando a página
  }

  private mensagemSucesso(){
    this.msgErro.open('Curso Salvo com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private mensagemErro(){
    this.msgErro.open('Erro ao salvar curso.', '', {duration: 5000});
  }

  getErrorMessage(nomeCampo: string){
      const field = this.form.get(nomeCampo);

      if(field?.hasError('required')){
        return 'Campo obrigatório';
      }
      if(field?.hasError('minlength')){
        const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
        return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
      }
      if(field?.hasError('maxlength')){
        const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
        return `Tamanho máximo excedido precisa ser de ${requiredLength} caracteres.`;
      }

      return 'Campo Inválido';
  }

}

