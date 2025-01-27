import { Component, inject, Input } from '@angular/core';
import { Iproducto } from '../../interfaces/iproducto';
import { ProductoService } from './../../services/producto.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  ProdService = inject(ProductoService);

  @Input() prod!: Iproducto;

  deleteProducto(producto: Iproducto){
    this.ProdService.deleteByName(producto.name);
  }

}


