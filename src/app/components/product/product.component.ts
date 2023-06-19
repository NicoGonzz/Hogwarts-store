import { Component ,Input} from '@angular/core';
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

  constructor() {}
  ngOnInit(): void{}
}
