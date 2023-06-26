export interface Category {
  id: string;
  name: string;
}
export interface Product { /*Que esperamos que tenga el producto*/
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category:Category;
}
