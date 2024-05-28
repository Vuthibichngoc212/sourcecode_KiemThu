import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IDashboardState } from "./features/dashboard.slice";

export const cartPersistConfig: PersistConfig<IDashboardState> = {
  key: "dashboard",
  storage,
};
