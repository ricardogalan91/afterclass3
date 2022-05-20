import { Component } from '@angular/core';
import { Vendedor } from './product-list/vendedor.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data:any=[];
  dataSubmitted=false;
  vendedorToEdit:Vendedor|null;
  onItemAdd(e:any){
    /* En este metodo se hace un update de la data que además que se modifica el id manualmente por el front */
    let index=1;
    if(this.data.length>0){
      index=this.data.length+1;
      e['id']=index;
      this.data.push(e);
    }else{
      e['id']=index;
      this.data.push(e)
    }
    this.dataSubmitted=true;
  }

  onItemEdit(e:any){
    /*Una vez editado, se busca en la data que se le pasa a la tabla, cual es el elemento editado
    Y le cambia el valor*/
    let index=this.data.findIndex((x:Vendedor)=>x.id===e.id);
    this.data[index]=e;
    this.dataSubmitted=true;
  }

  onPassEdit(e:any){
    /*Le asigna a vendedorToEdit el valor del objeto a editar y pasa al formulario*/
    this.dataSubmitted=false;
    this.vendedorToEdit=e;
  }

  onClickAdd(){
    /*Pasa al formulario y además hace el valor a editar como null*/
    this.dataSubmitted=false;
    this.vendedorToEdit=null;
  }

  onUpdateDeleteProductos(el:any){
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    el.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.data=el;
  }
}
