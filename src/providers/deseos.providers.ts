import { Injectable } from '@angular/core';
import { Lista } from '../models/index';

@Injectable()
export class DeseosService {

  listas : Lista[] = [];

  constructor(){
    this.loadStorage();
  }

  agregarLista( lista : Lista ){
    this.listas.push( lista );
    this.saveStorage();
  }

  deleteList( lista : Lista ){
    this.listas = this.listas.filter( listaData => {
      console.log(listaData);
      return listaData.Id !== lista.Id
    });

    this.saveStorage();
  }

  saveStorage(){
    localStorage.setItem( 'data', JSON.stringify(this.listas) );
  }

  loadStorage(){
    if( localStorage.getItem('data') ){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
    else{
      this.listas = [];
    }
  }
}
