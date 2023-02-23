import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Curso } from '../../model/curso';


@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss']
})
export class CursosListComponent implements OnInit{

  @Input() cursos: Curso[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly mostrarColunas = ['nome','categoria', 'acoes'];

  constructor(){}

  ngOnInit(): void {

  }

  adicionarCurso(){
      console.log('onAddCurso');
      this.add.emit(true);
  }

  editarCurso(curso: Curso){
    console.log('onEditCurso');
    this.edit.emit(curso);
  }

  deletarCurso(curso: Curso){

      this.remove.emit(curso);
  }

}
