import { Component, Input } from '@angular/core';
import { DeseosService } from '../providers/deseos.providers';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { Lista } from '../models';
import { AgregarPage } from '../pages/agregar/agregar.component';

@Component({
  selector: 'app-listas',
  templateUrl: 'listas.component.html'
})
export class ListasComponent {

  @Input() terminada : boolean = false ;

  constructor( public deseosService : DeseosService,
               private navCtrl : NavController,
               private alertCtrl : AlertController ){
  }

  listSelect( lista : Lista, slidingItem : ItemSliding ){
    this.navCtrl.push( AgregarPage, {
      titulo : lista.Title,
      lista : lista
    })
  }

  deleteList( lista : Lista ){
    this.deseosService.deleteList(lista);
  }

  renameList( lista : Lista, slidingItem : ItemSliding  ){
    const alerta = this.alertCtrl.create({
      title : 'Editar Nombre',
      message : 'Editar el nombre de la lista',
      inputs : [{
        name : 'Title',
        placeholder : 'Nombre de la lista',
        value: lista.Title
      }],
      buttons : [
        {
          text : 'Cancelar',
          handler : data => {
          }
        },
        {
          text : 'Guardar',
          handler : data => {
            if( data.Title.length === 0 ){
              return;
            }

            lista.Title = data.Title;

            this.deseosService.saveStorage();
            slidingItem.close();
          }
        }
      ]
    });

    alerta.present();
  }
}
