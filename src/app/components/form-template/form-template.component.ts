import { ProductoService } from './../../services/producto.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Iproducto } from '../../interfaces/iproducto';
import { IFilter } from '../../interfaces/ifilter';

@Component({
  selector: 'app-form-template',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-template.component.html',
  styleUrl: './form-template.component.css'
})
export class FormTemplateComponent {

prodService=inject(ProductoService);

@Output() filtroAplicado= new EventEmitter<Iproducto[]>();

async getDataForm(miFormulario:NgForm):Promise<void>{
  
  console.log('formulario recibido: ',miFormulario.value);
  const productosFiltrados=await this.prodService.getDataForm(miFormulario.value);
  console.log('Productos filtrados: ',productosFiltrados);
  console.log('Método getDataForm llamado');
  console.log('Productos filtrados: ',productosFiltrados);
  this.filtroAplicado.emit(productosFiltrados);
}
}
