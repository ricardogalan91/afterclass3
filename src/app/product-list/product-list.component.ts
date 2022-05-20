import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Vendedor } from './vendedor.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() productos:Vendedor[];
  @Output() vendedorToEdit= new EventEmitter<Vendedor>();
  @Output() productosUpdated = new EventEmitter<Vendedor[] | null>();
  displayedColumns=['producto', 'precio', 'vendedor', 'delete']
  @ViewChild('table') table: MatTable<any>;
  constructor() { }

  ngOnInit(): void {
  }

  onClickRow(el:Vendedor){
    /*Le avisa al componente padre el elemento a editar*/
    this.vendedorToEdit.emit(el);
  }

  onDeleteElement(el:any){
    /* Se busca el elemento por el id en el array de productos,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, emitimos el valor de productosUpdated al padre */
    let index=this.productos.findIndex(x=> x.id===el.id);
    this.productos.splice(index,1);
    this.table.renderRows();
    this.productosUpdated.emit(this.productos);
  }

}
