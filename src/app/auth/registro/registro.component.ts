import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: [ 'co@co.com', [ Validators.required, Validators.email ] ],
    nombre: [ 'Rubén', [ Validators.required, Validators.minLength(3) ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(3) ] ] 

  });

  constructor( private fb: FormBuilder,
               private auth: AuthService ) { }

  ngOnInit(): void {
  }

  guardar(){

    console.log( this.miFormulario.value );

    this.auth.nuevoUsuario( this.miFormulario.value )
      .subscribe({

        next: ( resp ) => console.log( resp ),
        error: ( err ) => console.error( err.error.error.message ),

      });
    
  }

}
