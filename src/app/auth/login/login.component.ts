import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
               private auth: AuthService  ) { }

  ngOnInit(): void {
  }

  login(){
    console.log( this.miFormulario.value );

    this.auth.login( this.miFormulario.value )
    .subscribe({

      next: ( resp ) => console.log( resp ),
      error: ( err ) => console.error( err.error.error.message ),

    });
    
  }

}
