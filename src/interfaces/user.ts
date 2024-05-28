export interface IUser {
  id?: number;
  name: string;
  phone: string;
  email: string;
  dateBirth?: string;
  address: string;
  password: string;
  gender: string;
  image?: string;
}

export interface IUserData {
  name?: string;
  gender?: string;
  email: string;
  dateBirth?: string;
  address?: string;
  phone?: string;
  password: string;
  image?: string;
}

export interface IUserLogout {
  email: string;
}
