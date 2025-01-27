import { Injectable } from '@angular/core';
import { Iproducto } from '../interfaces/iproducto';
import { IFilter } from '../interfaces/ifilter';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
private arrProductos: Iproducto[]=[];
private arrProductosFiltrados:Iproducto[]=[];

constructor(){
 this.cargarProducts();

}

async cargarProducts(): Promise<Iproducto[]>{
  this.arrProductos=[];
  const response = await fetch('https://jsonblob.com/api/1332112546504826880');
  const prod = await response.json();
  console.log('Productos cargados:', prod.products);
  for (const producto of prod.products){
    this.arrProductos.push(producto as Iproducto)
  }
  this.arrProductosFiltrados=this.arrProductos.slice();
  return this.arrProductos;
  
}


async getAllProductos():Promise<Iproducto[]>
{ if(this.arrProductos.length === 0){
  await this.cargarProducts();
}
return this.arrProductos;
}

deleteByName(name:string):Iproducto[]{
  let i=this.arrProductos.findIndex(producto=>producto.name==name);
  if(i !=-1 && i>=0 && i< this.arrProductos.length){
    this.arrProductos.splice(i,1);
  }
  return this.arrProductos;
  
}

async getDataForm(filter: IFilter): Promise<Iproducto[]> {
  if (this.arrProductos.length === 0) {
    await this.getAllProductos();
  }
console.log('Filtro recibido: ',filter);
  let productosFiltrados = [...this.arrProductos];  // Se toma una copia de los productos originales
console.log('productos antes: ',productosFiltrados);
console.log('Categorías de productos:', productosFiltrados.map(p => p.category));
  if (!filter) {
    return productosFiltrados; // Si no hay filtro, devolvemos todos los productos
  }

  if (filter.name&&filter.name.trim() !=='') {
    const filterName = filter.name.toLowerCase();
    productosFiltrados = productosFiltrados.filter(producto =>
      producto.name.toLowerCase().includes(filterName)
    );
    console.log('Productos después de filtro de categoría:', productosFiltrados);
  }

  if (filter.price !== undefined) {
    const filterPrice = filter.price;
    productosFiltrados = productosFiltrados.filter(producto => producto.price <= filterPrice);
    console.log('Productos después de filtro de categoría:', productosFiltrados);
  }

  if (filter.category && filter.category.trim() !=='') {
    productosFiltrados = productosFiltrados.filter(producto => producto.category === filter.category);
    console.log('Productos después de filtro de categoría:', productosFiltrados);
  }

  if (filter.active !== undefined) {
    productosFiltrados = productosFiltrados.filter(producto => producto.active === filter.active);
    console.log('Productos después de filtro de categoría:', productosFiltrados);
  }

  console.log('Productos después de aplicar filtros:', productosFiltrados);
  return productosFiltrados;
}

}