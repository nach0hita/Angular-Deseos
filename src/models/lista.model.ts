import { ListaItem } from './lista-item.model';

export class Lista {

  Id : number;
  Title : string;
  CreatedDate : Date;
  ClosedDate : Date;
  IsClosed : boolean;
  Items : ListaItem[];

  constructor( titulo : string ){
    this.Id = new Date().getTime();
    this.Title = titulo;
    this.IsClosed = false;
    this.CreatedDate = new Date();
    this.Items = [];
  }

}
