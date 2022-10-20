import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaces';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCM9Gx9f8dtm9hIzQoOSLSZb2Wb7CeRdow';

  userToken: string | null = '';

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { 

    this.leerToken();
    
  }

  logout() {

  }

  login( usuario: Usuario ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post<any>(
      `${ this.url }/accounts:signInWithPassword?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {

        this.guardarToken( resp['idToken'] );

        return resp;
        
      })
    );

  }

  nuevoUsuario( usuario: Usuario ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post<any>(
      `${ this.url }/accounts:signUp?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {

        this.guardarToken( resp['idToken'] );

        return resp;
        
      })
    );
    
  }

  private guardarToken( idToken: string ) {
    
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

  }

  leerToken() {

    if( localStorage.getItem( 'token' ) ) {
      this.userToken = localStorage.getItem( 'token' );
    } else {
      this.userToken = '';
    }

    return this.userToken;
    
  }
  
}
