import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  //private readonly API = '/assets/cursos.json';
  private readonly API = 'api/cursos'; //API do angular(backend)
  ///testando o erro
  //private readonly API = '/assets/cursosS.json';
  constructor(private httpClient: HttpClient) { }

  listaDados(){
    return this.httpClient.get<Curso[]>(this.API)
    .pipe(
      first(), //ENVIAR A 1º LISTA NA REQUISIÇÃO
     // delay(5000),
      tap(listaRegistrosCursos => console.log(listaRegistrosCursos))
    );
  }

  //busca as informações no back-end
  carregarDadosBackEnd(id: string){
    return this.httpClient.get<Curso>(`${this.API}/${id}`);
  }

  salvar(record: Partial<Curso> ){
    console.log(record);
    if(record._id){ //Ser o registro tem ID é atualizado
      console.log('atualizar');
      return this.atualizar(record);
    }
    console.log('create');
   return this.create(record);
  }

  private create(record: Partial<Curso> ){
        //console.log(curso);
    return this.httpClient.post<Curso>(this.API, record).pipe(first());
  }

    //Atualizando registro
    private atualizar(record: Partial<Curso> ){
      return this.httpClient.put<Curso>(`${this.API}/${record._id}`, record).pipe(first());
    }

     //Atualizando registro
    remove(id: string ){
      return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
    }
}
