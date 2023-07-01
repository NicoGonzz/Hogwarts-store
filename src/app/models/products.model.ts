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
export interface CreateProductDTO extends Omit<Product, 'id'| 'category'> { /*Nueva interfaz para enviar un producto extendida*/
  categoryId: number,
}
//Omit evita que se clonen ciertos campos
