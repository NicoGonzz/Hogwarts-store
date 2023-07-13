export interface User { /*Que esperamos que tenga el producto*/
  id: string;
  name: string,
  email: string;
  password: string;
}
export interface CreateUserDTO extends Omit<User, 'id'> {
  /*Nueva interfaz para enviar un producto extendida*/
}
