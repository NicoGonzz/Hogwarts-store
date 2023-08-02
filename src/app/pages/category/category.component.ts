import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ProductsService} from './../../services/products.service'
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

    categoryId: string | null = null;
    limit = 10;
    offset = 0;
    products : Product[] = [];

        constructor(
          private route : ActivatedRoute,
          private productsService:ProductsService)
          {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params =>{
         this.categoryId = params.get('myID');
         if(this.categoryId){
          this.productsService.getByCategory( this.categoryId, this.limit, this.offset)
          .subscribe(data=>{
            this.products = data;
          })

         }
         console.log(this.categoryId);
      })
    }


}
