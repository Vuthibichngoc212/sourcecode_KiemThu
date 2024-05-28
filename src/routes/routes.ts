import { lazy } from "react";
import { PATH } from "~/constants/path";

const BoardDetailPage = lazy(() => import("~/pages/Boards/BoardDetail"));

const routerList = [
  {
    name: "HomePage",
    path: PATH.HOMEPAGE,
    page: BoardDetailPage,
  },
  {
    name: "ProductsPage",
    path: PATH.PRODUCTSPAGE,
    page: BoardDetailPage,
  },
];
export default routerList;
