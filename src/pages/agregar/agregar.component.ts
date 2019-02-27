import { Component } from '@angular/core';
import { DeseosService } from '../../providers/deseos.providers';
import { NavParams } from 'ionic-angular';
import { Lista, ListaItem } from '../../models/index';

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarPage {

  lista : Lista;
  nombreItem : String = '';

  constructor( public deseosService: DeseosService,
               private navParams : NavParams ){
      const titulo = this.navParams.get('titulo');

      if( this.navParams.get('lista') ){
        this.lista = this.navParams.get('lista');
      }
      else{
        this.lista = new Lista( titulo );
        this.deseosService.agregarLista( this.lista );
      }

  }

  agregarItem(){
    const newItem = new ListaItem( this.nombreItem );

    if( this.nombreItem.length === 0 ){
      return;
    }
    else{
      this.nombreItem = '';
      this.lista.Items.push( newItem );

      this.deseosService.saveStorage();
    }
  }

  actualizarTarea( item : ListaItem ){
    item.completado = !item.completado;

    const pendientes = this.lista.Items.filter( itemData => {
        return !itemData.completado;
    }).length;

    if(pendientes == 0){
      this.lista.IsClosed = true;
      this.lista.ClosedDate = new Date();
    }else{
      this.lista.IsClosed = false;
      this.lista.ClosedDate = null;
    }

    this.deseosService.saveStorage();
  }

  borrarTarea( idx : number ){
    this.lista.Items.splice( idx, 1 );
    this.deseosService.saveStorage();
  }

}
