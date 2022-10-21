import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listadoTags'
})
export class ListadoTagsPipe implements PipeTransform {

  transform( value: string ) {

    let listadoTags = value.split( ',' );
        
    return listadoTags;

  }

}
