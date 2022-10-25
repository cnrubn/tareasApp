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
    email: [ '', [ Validators.required, Validators.email ] ],
    nombre: [ '', [ Validators.required, Validators.minLength(3) ] ],
    password: [ '', [ Validators.required ] ] 

  });

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  guardar(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.miFormulario.value )
      .subscribe({

        next: ( resp ) => {

          Swal.close();

          if( this.recordame ) {
            localStorage.setItem( 'email', this.miFormulario.value.email )
          }
          
          this.router.navigateByUrl( '/home' );

        },
        error: ( err ) => {
          console.error( err.error.error.message );

          if( err.error.error.message === "EMAIL_EXISTS" ) {
            
            // SweetAlert2 | Error correo.
            Swal.fire({
              title: 'Error al registrarse',
              icon: 'error',
              text: 'El correo usado ya existe'
            }); 
            
          } else {

            // SweetAlert2 | Error genérico.
            Swal.fire({
              title: 'Error al registrarse',
              icon: 'error',
              text: 'La contraseña debe ser de 6 caracteres o más, o pruebe de nuevo con otros datos'
            });             
            
          }
          
        },

      });
    
  }

  recordameAccion() {
    this.recordame = !this.recordame;
  }

}
