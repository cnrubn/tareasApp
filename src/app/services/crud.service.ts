import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  urlApi: string = 'https://netberryapp-default-rtdb.firebaseio.com/'

  usuario: any;

  localId: string | null = 'nono';

  constructor( private http: HttpClient ) { }

  getLocalId() {
    
    this.localId = localStorage.getItem( 'localId' );
    
  }

  // Crear instancia usuario.
  getIdDatos( data: any ) {

    this.usuario = {
      localId: data.localId,
      nombre: data.usuario,
      tareas: [
        {
          tit: "Hola",
          txt: "tarea",
          tags: "uno, dos, tres"
        }
      ]
    }
   

    
      return this.http.post<any>( `${ this.urlApi }.json`, this.usuario)
        .subscribe();



  }


  // Obtener tareas
  getTareas() {



    
    this.getLocalId();



    return this.http.get<any>( `${ this.urlApi }/.json` )
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

  actualizarDb( tarea: any ) {

    const idu = tarea.idu;

    // console.log(this.usuario)

    return this.http.put( `${ this.urlApi }/${ idu }.json`, tarea ).subscribe();
    
  }

  eliminarDb( index: number ) {

    this.usuario.tareas.splice( index, 1 );

    return this.http.put( `${ this.urlApi }/${ this.usuario.idu }.json`, this.usuario ).subscribe();    

  }


}
