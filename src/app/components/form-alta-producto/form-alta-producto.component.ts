import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Iproducto } from '../../interfaces/iproducto';

@Component({
  selector: 'app-form-alta-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-alta-producto.component.html',
  styleUrl: './form-alta-producto.component.css'
})
export class FormAltaProductoComponent {

    @Output() productAdded= new EventEmitter<any>();
   modelForm:FormGroup;
   
addProduct() {
    if (this.modelForm.valid) {
      const newProduct: Iproducto = this.modelForm.value;
      this.productAdded.emit(newProduct); // Emitir el producto al padre
      this.modelForm.reset({ id: 0, active: true }); // Reiniciar el formulario
    }
}

constructor(private fb: FormBuilder) {
  this.modelForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    active: [true],
  });
}



checkControl(formControlName: string, validador: string): boolean | undefined{
  return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched
}
  
}
