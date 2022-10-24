import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarea } from 'src/app/interfaces/interfaces';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  @Input() tareasEnvio: Tarea[] | undefined;
  @Output() indexMod: EventEmitter<number> = new EventEmitter();

  modoModificar: boolean = false;

  constructor( private crudSv: CrudService ) { }

  ngOnInit(): void { }

  eliminar( index: number ) {

    this.crudSv.eliminarDb( index );
    
  }

  modificar( index: number ) {
    this.indexMod.emit( index );

    this.modoModificar = true;

    setTimeout(() => {

      this.modoModificar = false;

    }, 2000 );

  }

}
