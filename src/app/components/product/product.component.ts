import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { Product}  from '../../models/products.model'; /*Importamos el modelo*/

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private disabled:boolean = false;
  public accionCompra:string ='';

  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };
  @Output() addedProduct =new EventEmitter<Product>();/*Nombre del evento que transmite informacion de tipo product */
  @Output() substractProduct =new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void{
    this.accionCompra = `AÑADIR AL CARRITO`;
  }

  onAddtoCar(){
      this.disabled = true;
      this.accionCompra = `ADDED TO CART`;
      this.addedProduct.emit(this.product);//Emitimos el producto
  }
  onSubstractcar(){
      this.substractProduct.emit(this.product);
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id); //Emitimos el producto y devolvera el id del producto
  }
  isDisabled(){
    return !!this.disabled;
  }
}
