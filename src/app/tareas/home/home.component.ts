import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { infoUsuario, Tarea } from '../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  miTarea: FormGroup = this.fb.group({

    tit: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ] ],
    txt: [ '', [ Validators.required, Validators.minLength(3) ] ], 
    tags: [ '', [ Validators.required, Validators.minLength(3) ] ], 

  });

  listadoTareas: Tarea[] = [];
  listadoRespuesta: infoUsuario = {};
  tareaModificar: any = {
    tit: '',
    txt: '',
    tags: ''
  };

  modificarActivacion: number = -1;
  cargando: boolean = true;

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

      })
      
    }, 1000 );

  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl( '/auth/login' );
    
  }

  guardarTarea() {

    const tarea = this.miTarea.value; 
      
    // Funcionalidad para eliminar la tarea cuando se confirma la modificación de una tarea existente.
    if ( this.modificarActivacion >= 0 ) {

      this.listadoRespuesta.tareas!.splice( this.modificarActivacion, 1 );

      this.modificarActivacion = -1;

    }
    // 

    // Para evitar fallo con push se diferencia cuando tareas está vacía o no.
    if ( this.listadoRespuesta.tareas === undefined ) {

      this.listadoRespuesta = {
        ...this.listadoRespuesta,
        tareas: [{
          tit: tarea.tit,
          txt: tarea.txt,
          tags: tarea.tags
        }]
      }

    } else {

      this.listadoTareas.push( this.miTarea.value );

      // this.listadoRespuesta.tareas =  this.listadoTareas;

    }

    this.crudSv.actualizarDb( this.listadoRespuesta )

    this.tareaModificar = '';
    this.miTarea.reset();

  }

  modificar( index: number ) {

    this.modificarActivacion = index;

    this.tareaModificar = this.listadoRespuesta.tareas![ index ];
    
  }

}
