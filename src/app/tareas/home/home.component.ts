import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    txt: [ , [ Validators.required, Validators.minLength(3) ] ], 
    tags: this.fb.array( [], Validators.required ), 

  });

  nuevoTag: FormControl = this.fb.control( '', [ Validators.required, Validators.minLength(3), Validators.maxLength(15) ] );

  get tagsArr() {
    return this.miTarea.get( 'tags' ) as FormArray;
  }

  listadoTareas: Tarea[] = [];
  listadoRespuesta: infoUsuario = {};
  tareaModificar: any = {
    tit: '',
    txt: '',
    tags: ''
  };

  modificarActivacion: number = -1;
  cargando: boolean = true;
  modificacionActivo: boolean = false;

  tagInvalido: boolean = false;
  tagInvalidoEspacios: boolean = false;

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
      
    }, 500 );

  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl( '/auth/login' );
    
  }

  guardarTarea() {

    console.log(this.miTarea)

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

    // Reseteo tags.
    for ( let i of this.tagsArr.value ){

      this.tagsArr.removeAt( i );

    }

    this.modificacionActivo = false;

  }

  modificar( index: number ) {

    // En caso de pulsar 2 o más veces seguidas el botón modificar es necesario hacer un reset de tags.
    this.modificacionActivo = true;

    if ( this.modificacionActivo ) {

      for ( let i of this.tagsArr.value ){

        this.tagsArr.removeAt( i );

      }

    }

    this.modificarActivacion = index;

    this.tareaModificar = this.listadoRespuesta.tareas![ index ];

    // Preparando array tags.
    for( let tag of this.tareaModificar.tags ) {

      this.tagsArr.push( this.fb.control( tag, Validators.required ) );

    }

  }

  agregarTag() {

    this.tagInvalido = false;
    this.tagInvalidoEspacios = false;

    if ( this.nuevoTag.invalid ) { 
      this.tagInvalido = true;
      return; 
    }

    if ( this.nuevoTag.value.trim().length < 3 ) { 
      
      this.tagInvalidoEspacios = true;
      return; 
      
    }

    // this.tagsArr.push( new FormControl( this.nuevoTag.value, Validators.required ) );
    this.tagsArr.push( this.fb.control( this.nuevoTag.value, Validators.required ) );

    this.nuevoTag.reset();

  }

  eliminarTag( index: number ) {

    this.tagsArr.removeAt( index );
    
  }

  // COMPROBACIONES VISOR TAREAS
  campoTamValido( data: string ) {
   
    return this.miTarea.controls[data].errors &&
    this.miTarea.controls[data].touched;
    
  }

  campoTagValido( data: string ) {
   
    return this.miTarea.errors &&
    this.miTarea.touched;
    
  }

}
