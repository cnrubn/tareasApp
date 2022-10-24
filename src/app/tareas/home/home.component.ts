import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  miTarea: FormGroup = this.fb.group({

    tit: [ '', [ Validators.required, Validators.minLength(3) ] ],
    txt: [ '', [ Validators.required, Validators.minLength(3) ] ], 
    tags: [ '', [ Validators.required, Validators.minLength(3) ] ], 

  });

  listadoTareas: any[] = [];
  listadoRespuesta: any;
  tareaModificar: any = {
    tit: '',
    txt: '',
    tags: ''
  };

  listadoTareasCopy: any;

  modificarActivacion: number = -1;

  constructor( private router: Router,
               private auth: AuthService,
               private fb: FormBuilder,
               private crudSv: CrudService,
               private http: HttpClient  ) { }

  ngOnInit(): void {

    setTimeout(() => {
  
      this.crudSv.getTareas().subscribe( resp => {
      
        this.listadoRespuesta = resp;
        this.listadoTareas = resp.tareas;
  
        console.log(this.listadoRespuesta)
        console.log(this.listadoTareas)
        
      })
      
    }, 1000 );


    
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl( '/auth/login' );
    
  }

  guardarTarea() {


    // Funcionalidad para eliminar la tarea cuando se confimra la modificación de una tarea existente.
    if ( this.modificarActivacion >= 0 ) {

      this.listadoRespuesta.tareas.splice( this.modificarActivacion, 1 );

      // this.modificar( this.modificarActivacion );

      this.modificarActivacion = -1;

    }
    // 

    this.listadoTareas.push( this.miTarea.value );

    this.listadoRespuesta.tareas =  this.listadoTareas ;

    this.crudSv.actualizarDb( this.listadoRespuesta )

    this.tareaModificar = '';
    this.miTarea.reset();

  }

  modificar( index: any ) {

    this.modificarActivacion = index;

    this.tareaModificar = this.listadoRespuesta.tareas[ index ];
    
  }

}
