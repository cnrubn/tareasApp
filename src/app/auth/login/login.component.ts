import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({

    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required ] ] 

  });

  recordame: boolean = false;
  emailStorage: string | null = '';

  constructor( private fb: FormBuilder,
               private auth: AuthService, 
               private router: Router ) { }

  ngOnInit(): void {

    if( localStorage.getItem( 'email' ) ) {

      this.emailStorage = localStorage.getItem( 'email' );

      this.recordame = true;
      
    }
    
  }

  login(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.miFormulario.value )
    .subscribe({

      next: ( resp ) => {

        Swal.close();

        // Funcionalidad "Recordarme", para mantener memorizado el correo o no del usuario.
        if( this.recordame ) {
          localStorage.setItem( 'email', this.miFormulario.value.email );
        } else {
          localStorage.setItem( 'email', '' )
        }
        
        this.router.navigateByUrl( '/home' );

      },
      error: ( err ) => {
        console.error( err.error.error.message );

        // SweetAlert2 | Error login.
        Swal.fire({
          title: 'Error al identificarse',
          icon: 'error',
          text: 'El correo o la contraseña no son correctos'
        });
        
      }

    });
    
  }

  recordameAccion() {
    this.recordame = !this.recordame;
  }

}
