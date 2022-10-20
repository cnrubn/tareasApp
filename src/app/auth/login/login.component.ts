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
    email: [ 'co@co.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(3) ] ] 

  });

  constructor( private fb: FormBuilder,
               private auth: AuthService, 
               private router: Router ) { }

  ngOnInit(): void {
  }

  login(){

    // console.log( this.miFormulario.value );

    // SweetAlert2 | Esperando respuesta servidor.
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.miFormulario.value )
    .subscribe({

      next: ( resp ) => {

        console.log( resp );
        Swal.close();
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

}
