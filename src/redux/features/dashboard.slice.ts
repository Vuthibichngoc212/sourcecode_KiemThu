import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Cart,
  CartList,
  IChecked,
  IProductsData,
  IProductsSearch,
} from "~/interfaces/products";
import { IUserData } from "~/interfaces/user";
import bcrypt from "bcryptjs";

export interface IDashboardState {
  userList: IUserData[];
  cartItem: IProductsData[];
  isAppear: boolean;
  totalQuantity: number;
  totalPrice: number;
}

const initialState: IDashboardState = {
  userList: [],
  cartItem: [],
  isAppear: false,
  totalQuantity: 0,
  totalPrice: 0,
};
const salt = bcrypt.genSaltSync(10);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProductsData>) => {
      const { id, totalPrice, title, image, price, brand, quantity } =
        action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);

      if (existingItem) {
        const listItem = state.cartItem.map((item) => {
          if (item.id === id) {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              quantity: quantity,
              totalPrice: price * quantity,
              price: item.price,
              brand: item.brand,
            };
          }
          // console.log(item.quantity);
          return item;
        });
        state.cartItem = [...listItem];
      } else {
        state.cartItem.push({
          id: id,
          title: title,
          image: image,
          quantity,
          totalPrice: totalPrice * quantity,
          price: price,
          brand: brand,
        });
      }
    },
    increasItemCart: (state, action: PayloadAction<IProductsData>) => {
      const { id, totalPrice, title, image, price, brand } = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);

      if (existingItem) {
        const abc = state.cartItem.map((item) => {
          const { quantity, price } = item;
          const newQuantity = quantity + 1;

          if (item.id === id) {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              quantity: newQuantity,
              totalPrice: price * newQuantity,
              price: item.price,
              brand: item.brand,
            };
          }
          // console.log(item);
          return item;
        });
        state.cartItem = [...abc];
      } else {
        state.cartItem.push({
          id: id,
          title: title,
          image: image,
          quantity: 1,
          totalPrice: totalPrice,
          price: price,
          brand: brand,
        });
      }
    },
    subtractItemCart: (state, action: PayloadAction<CartList>) => {
      const { id } = action.payload;
      const subtractItem = state.cartItem.find((item) => item.id === id);
      const removeItem = state.cartItem.filter((item) => item.id !== id);
      // state.totalQuantity--;
      // state.totalPrice -= totalPrice;

      if (subtractItem && subtractItem.quantity !== 1) {
        const abc = state.cartItem.map((item) => {
          const { quantity, price } = item;
          const newQuantity = quantity - 1;
          // console.log(newQuantity, totalPrice);

          if (item.id === id) {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              quantity: newQuantity,
              totalPrice: price * newQuantity,
              price: item.price,
              brand: item.brand,
            };
          }
          return item;
        });
        state.cartItem = [...abc];
      } else {
        state.cartItem = removeItem;
      }
    },
    updateCart: (state, action: PayloadAction<CartList>) => {
      const { id, quantity, checked } = action.payload;
      const subtractItem = state.cartItem.find((item) => item.id === id);
      const removeItem = state.cartItem.filter((item) => item.id !== id);

      if (subtractItem && subtractItem.quantity !== 1) {
        const result = state.cartItem.map((item) => {
          // const { quantity, price } = item;
          const subtract = quantity - 1;
          // console.log(subtract, totalPrice);
          const newQuantity = quantity + 1;

          if (!checked && item.id === id) {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              quantity: subtract,
              totalPrice: item.price * subtract,
              price: item.price,
              brand: item.brand,
            };
          } else {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
              price: item.price,
              brand: item.brand,
            };
          }
        });
        state.cartItem = [...result];
      } else {
        state.cartItem = removeItem;
      }
    },

    deleteCartItem: (state, action: PayloadAction<Cart>) => {
      const { id, totalPrice } = action.payload;
      const deleteCart = state.cartItem.filter((item) => item.id !== id);
      state.cartItem = deleteCart;
      state.totalPrice -= totalPrice;
    },

    searchItem: (state, action: PayloadAction<IProductsSearch>) => {
      const { title } = action.payload;
      const searchItem = state.cartItem.filter((item) => item.title === title);
      state.cartItem = searchItem;
    },

    filterItem: (state, action: PayloadAction<IChecked>) => {
      const { brand } = action.payload;
      const filterItem = state.cartItem.filter((item) => item.brand === brand);
      state.cartItem = [...filterItem];
      console.log(filterItem);
    },

    handleAppearCart: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAppear: action.payload };
    },

    handleUserLogin: (state, action: PayloadAction<IUserData>) => {
      const { email, password, image } = action.payload;
      const findUser = state.userList.find((user) => user.email === email);
      const hash = bcrypt.hashSync(password, salt);
      console.log("hash: " + hash);

      if (findUser) {
        const listUser = state.userList.map((user) => {
          if (user.email === email && bcrypt.compareSync(password, hash)) {
            return {
              email: user.email,
              password: hash,
              image: user.image,
            };
          }
          return user;
        });
        state.userList = [...listUser];
      } else {
        state.userList.push({
          email,
          password,
          image,
        });
      }
    },
    handleUserLogout: (state) => {
      state.userList = [];
    },
  },
});

export const {
  addToCart,
  increasItemCart,
  subtractItemCart,
  updateCart,
  deleteCartItem,
  filterItem,
  handleAppearCart,
  handleUserLogin,
  handleUserLogout,
} = dashboardSlice.actions;

export const dashboardSelector = (state: RootState) => state.dashboard.cartItem;
export const isAppear = (state: RootState) => state.dashboard.isAppear;
export const userSelector = (state: RootState) => state.dashboard.userList;

export default dashboardSlice.reducer;
