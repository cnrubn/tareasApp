import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCM9Gx9f8dtm9hIzQoOSLSZb2Wb7CeRdow';

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { }

  logout() {

  }

  login( usuario: Usuario ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.apikey }`, authData
    )

  }

  nuevoUsuario( usuario: Usuario ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${ this.apikey }`, authData
    );
    
  }
  
}
