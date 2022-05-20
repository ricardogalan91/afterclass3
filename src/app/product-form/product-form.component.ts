import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vendedor } from '../product-list/vendedor.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  vendedorForm:FormGroup;
  @Input() vendedorToEdit:Vendedor|null;
  @Output() itemAdded = new EventEmitter<any>();  
  @Output() itemEdited = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    /*Se define el formulario y en caso de que sea un edit por el vendedorToEdit
    Se llenan los valores de formularios con un patchValue*/
    this.vendedorForm=this.fb.group({
      nombreVendedor:['', Validators.required],
      producto:['', Validators.required],
      precioProducto:[0, Validators.required]
    })
    if(this.vendedorToEdit){
      this.vendedorForm.get('nombreVendedor')?.patchValue(this.vendedorToEdit.nombreVendedor);
      this.vendedorForm.get('producto')?.patchValue(this.vendedorToEdit.producto);
      this.vendedorForm.get('precioProducto')?.patchValue(this.vendedorToEdit.precioProducto);
    }
  }

  onSubmit(){
    /*Evalua si el elemento es nuevo o a editar, si es nuevo => emite itemAdded.
    Si es a editar emite el itemEdited*/
    if(!this.vendedorToEdit){
      this.itemAdded.emit(this.vendedorForm.value);
    }else{
      this.vendedorForm.value['id']=this.vendedorToEdit.id
      let vendedorEdited=this.vendedorForm.value;
      this.itemEdited.emit(vendedorEdited);
    }
  }

}
