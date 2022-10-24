import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'
import { infoUsuario, respFirebase, Usuario, Tarea } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  urlApi: string = 'https://netberryapp-default-rtdb.firebaseio.com/'

  usuario!: infoUsuario;
  localId: string | null = 'nono';

  constructor( private http: HttpClient ) { }

  getLocalId() {
    
    this.localId = localStorage.getItem( 'localId' );
    
  }

  // Crear instancia usuario.
  getIdDatos( data: respFirebase ) {
    
    this.usuario = {
      localId: data.localId,
      nombre: data.usuario,
      tareas: [
        {
          tit: "Bienvenido/a a Tareas",
          txt: "Añade o modifica tus tareas desde el visor de tareas o elimínalas directamente desde el botón eliminar. No olvides separar con comas los tags que desee crear.",
          tags: "Tareas"
        }
      ]
    }
    
      return this.http.post<infoUsuario>( `${ this.urlApi }.json`, this.usuario)
        .subscribe();

  }

  // Obtener tareas
  getTareas() {

    this.getLocalId();

    return this.http.get<Tarea>( `${ this.urlApi }/.json` )
    .pipe( 
      map( resp => {    
        
        const listado = this.crearArreglo( resp ) 

        for( let usuario of listado ) {

          if( usuario.localId === this.localId ) {

            this.usuario = usuario;

            return usuario;

          } 

        }

      })

    );
      
  }

  // Manipular respuesta Firebase para poderla manipular.
  private crearArreglo( listadoObj: any ) {

    const personas: any[] = [];

    if( listadoObj === null ) { return [] };

    Object.keys( listadoObj ).forEach( key => {

      const persona: any = listadoObj[ key ];
      persona.idu = key;

      personas.push( persona );

    })

    return personas;

  }

  actualizarDb( tarea: infoUsuario ) {

    const idu = tarea.idu;

    return this.http.put( `${ this.urlApi }/${ idu }.json`, tarea ).subscribe();
    
  }

  eliminarDb( index: number ) {

    this.usuario.tareas!.splice( index, 1 );

    return this.http.put( `${ this.urlApi }/${ this.usuario.idu }.json`, this.usuario ).subscribe();    

  }

}
