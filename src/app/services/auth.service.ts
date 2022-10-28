import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respFirebase, Usuario } from '../interfaces/interfaces';

import { map } from 'rxjs/operators';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCM9Gx9f8dtm9hIzQoOSLSZb2Wb7CeRdow';

  userToken: string | null = '';

  localId: string = '';

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient,
               private crudSv: CrudService ) { 

    this.leerToken();
    
  }

  logout() {

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'localId' );
    
  }

  login( usuario: Usuario ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post<respFirebase>(
      `${ this.url }/accounts:signInWithPassword?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {

        this.guardarToken( resp['idToken'] );
        this.guardarlocalId( resp['localId'] );

        return resp;
        
      })
    );

  }

  nuevoUsuario( usuario: Usuario ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post<respFirebase>(
      `${ this.url }/accounts:signUp?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {

        this.guardarToken( resp['idToken'] );
        this.guardarlocalId( resp['localId'] );

        // Envio de los datos para identificar al usuario y crear su listado personal.
        const crudData = {
          ...resp,
          usuario: usuario.nombre
        }

        this.crudSv.getIdDatos( crudData );
        
        return resp;
        
      })
    );
    
  }

  private guardarToken( idToken: string ) {
    
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

    // Operaciones de cara a seguridad. Comprobar si el token ha caducado o no.
    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );

  }

  private guardarlocalId( idToken: string ) {
    
    this.localId = idToken;
    localStorage.setItem( 'localId', this.localId );

  }

  leerToken() {

    if( localStorage.getItem( 'token' ) ) {
      this.userToken = localStorage.getItem( 'token' );
    } else {
      this.userToken = '';
    }

    return this.userToken;
    
  }

  // Método para las comprobaciones de los Guards.
  estarAutenticado(): boolean {

    if( this.userToken!.length < 2 ) {
      return false;
    }

    // Comprobación expiración token.
    const expira = Number( localStorage.getItem( 'expira' ) );
    const expiraDate = new Date();
    expiraDate.setTime( expira );

    if( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }
    
  }
  
}
