import { Component } from '@angular/core';
import { DeseosService } from '../../providers/deseos.providers';
import { Lista } from '../../models';
import { NavController, AlertController } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar.component';

@Component({
  selector: 'page-pendientes',
  templateUrl: 'pendientes.component.html'
})
export class PendientesPage {

  constructor( public deseosService: DeseosService,
               private navCtrl : NavController,
               private alertCtrl : AlertController ){
  }

  addList(){
    const alerta = this.alertCtrl.create({
      title : 'Nueva Lista',
      message : 'Nombre de la nueva lista q desea',
      inputs : [{
        name : 'titulo',
        placeholder : 'nombre de la lista'
      }],
      buttons : [
        {
          text : 'Cancel',
          handler : data => {
            console.log('Cancel Button');
          }
        },
        {
          text : 'Save',
          handler : data => {
            if( data.titulo.length === 0 ){
              return;
            }else{
              this.navCtrl.push( AgregarPage, {
                  titulo : data.titulo
              });
            }
          }
        }
      ]
    });

    alerta.present();

  }



}
