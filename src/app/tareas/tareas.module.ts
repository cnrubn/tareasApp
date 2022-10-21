import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { HomeComponent } from './home/home.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoTagsPipe } from './pipe/listado-tags.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    TareaComponent,
    ListadoTagsPipe
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    ReactiveFormsModule

  ]
})
export class TareasModule { }
