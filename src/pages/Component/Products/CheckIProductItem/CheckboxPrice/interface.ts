import { IProducts } from "~/interfaces/products";

export interface IPriceCheckbox {
  valueItem: IProducts[];
  setValueItem: React.Dispatch<React.SetStateAction<IProducts[]>>;
}
