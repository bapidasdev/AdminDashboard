import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";


import User from "./pages/user/User";
import Users from "./pages/Categories/Categories"

import "./styles/global.scss"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,

} from "react-router-dom";
import Colour from "./pages/colour/Colour";
import Brand from "./pages/brand/Brand";
import Size from "./pages/size/Size";
import Uom from "./pages/uom/Uom";
import SubCategory from "./pages/subCategory/SubCategory";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";

const queryClient = new QueryClient();

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
            {/* <Outlet /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/products",
          element: <Products/>,
        },
        
        {
          path: "/categories",
          element: <Users />,
        },
        {
          path: "/subCategory",
          element: <SubCategory />,
        },
        {
          path: "/brand",
          element: <Brand />,
        },
        {
          path: "/colour",
          element: <Colour />,
        },
        {
          path: "/size",
          element: <Size />,
        },
        {
          path: "/uom",
          element: <Uom />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          // element: <Product />,
          element: <Product />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
