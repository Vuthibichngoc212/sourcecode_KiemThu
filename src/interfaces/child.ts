import { IProducts } from "./products";

export interface IsChildPage {
  itemById?: IProducts;
  checked: boolean;
  handleShow: () => void;
}
