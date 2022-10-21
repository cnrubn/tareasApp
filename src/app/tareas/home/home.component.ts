import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  miTarea: FormGroup = this.fb.group({

    tit: [ 'Tit 1', [ Validators.required, Validators.minLength(3) ] ],
    txt: [ 'Texto tarea', [ Validators.required, Validators.minLength(3) ] ], 
    tags: [ 'tag 1, tag 2, tag 3', [ Validators.required, Validators.minLength(3) ] ], 

  });

  listadoTareas: Tarea[] = [];


  constructor( private router: Router,
               private auth: AuthService,
               private fb: FormBuilder, ) { }

  ngOnInit(): void {
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl( '/auth/login' );
    
  }

  guardarTarea() {
    console.log( this.listadoTareas );
    console.log( this.miTarea.value );
    
    this.listadoTareas.push( this.miTarea.value );
    
  }

}
