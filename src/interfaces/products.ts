export interface IProducts {
  id: number;
  title: string;
  body: {
    head: string;
    content: string;
  };
  image: string;
  quantity: number;
  totalPrice: number;
  name: string;
  price: number;
  discount: number;
  brand: string;
  type: string;
  idBrand: string;
  idPrice: number;
}
export interface Cart {
  id: number;
  totalPrice: number;
}

export interface CartList {
  id: number;
  quantity: number;
  totalPrice: number;
  checked?: boolean;
}

export interface IProductsData {
  id: number;
  title: string;
  image: string;
  quantity: number;
  totalPrice: number;
  price: number;
  brand: string;
}

export interface IProductsSearch {
  title: string;
}

export interface IChecked extends IProducts {
  brand: string;
}
