import { Component, inject } from '@angular/core';
import { Iproducto } from '../../interfaces/iproducto';
import { ProductoService } from '../../services/producto.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { FormTemplateComponent } from "../form-template/form-template.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, FormTemplateComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  arrProductos:Iproducto[]=[];
  productosFiltrados:Iproducto[]=[];
  prodService = inject(ProductoService);

  async ngOnInit():Promise<void>{
    this.arrProductos=await this.prodService.getAllProductos();
    this.productosFiltrados=this.arrProductos;
  }

  onFilterApplied(productosFiltrados:Iproducto[]):void{
    this.productosFiltrados=productosFiltrados;
  }
 
}
