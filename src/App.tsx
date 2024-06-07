import Board from "~/pages/Boards/BoardDetail";
// import Authentication from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/ProductsPage/Product";
import BoardContent from "./pages/Boards/BoardContent";
import NoPage from "./pages/NoPage";
import NewsPage from "./pages/NewsPage";
import IntroductPage from "./pages/IntroductPage";
import ChildPage from "./pages/ChildPage";
import ChildRecipePage from "./pages/NewsPage/ChildRecipePage";
// import RegisterForm from "./pages/Auth/LogIn";
import LogInForm from "./pages/Auth/LogIn";
import RegisterForm from "./pages/Auth/Register";
import AdminPage from "./pages/Admin";
import MyAccount from "./pages/Component/Acccount/MyAccount";
function App() {
  return (
    <Routes>
      {/* Board Detail */}
      <Route path="*" element={<NoPage />} />
      <Route path="/" element={<Board />}>
        <Route index path="/" element={<BoardContent />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ChildPage />} />
        <Route path="/recipe" element={<NewsPage />} />
        <Route path="/recipe/:id" element={<ChildRecipePage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<IntroductPage />} />
        <Route path="/account" element={<MyAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
