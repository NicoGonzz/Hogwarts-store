import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { Product}  from '../../models/products.model'; /*Importamos el modelo*/

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

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

  constructor() {}
  ngOnInit(): void{}

  onAddtoCar(){
      this.addedProduct.emit(this.product);//Emitimos el producto
  }
  onSubstractcar(){
      this.substractProduct.emit(this.product);
  }
}
