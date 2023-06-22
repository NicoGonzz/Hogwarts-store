import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { Product}  from '../../models/products.model'; /*Importamos el modelo*/

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input('myProduct') product: Product = { /*Iniciamos todo en vacio */
    id: '',
    price: 0,
    image: '',
    name: '',
  };
  @Output() addedProduct =new EventEmitter<Product>();/*Nombre del evento que transmite informacion de tipo product */
  @Output() substractProduct =new EventEmitter<Product>();

  constructor() {}
  ngOnInit(): void{}

  onAddtoCar(){
      this.addedProduct.emit(this.product);//Emitimos el producto
  }
  onSubstractcar(){
      this.substractProduct.emit(this.product);
  }
}
