import { IProducts } from "./products";

export interface IListItem {
  valueItem: IProducts[];
  setValueItem: React.Dispatch<React.SetStateAction<IProducts[]>>;
}
