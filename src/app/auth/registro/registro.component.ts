import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  recordame: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    email: [ 'co12@co.com', [ Validators.required, Validators.email ] ],
    nombre: [ 'Rubén', [ Validators.required, Validators.minLength(3) ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(3) ] ] 

  });

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  guardar(){

    // console.log( this.miFormulario.value );

    // SweetAlert2 | Esperando respuesta servidor.
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.miFormulario.value )
      .subscribe({

        next: ( resp ) => {

          // console.log( resp );
          Swal.close();

          if( this.recordame ) {
            localStorage.setItem( 'email', this.miFormulario.value.email )
          }
          
          this.router.navigateByUrl( '/home' );

        },
        error: ( err ) => {
          console.error( err.error.error.message );

          // SweetAlert2 | Error login.
          Swal.fire({
            title: 'Error al registrarse',
            icon: 'error',
            text: 'El correo usado ya existe'
          });          
          
        },

      });
    
  }

  recordameAccion() {
    this.recordame = !this.recordame;
  }

}
