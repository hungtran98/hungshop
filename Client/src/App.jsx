import Home from "./pages/Home"
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import Success from './pages/Success'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux"





const App = () =>{
  const user = useSelector(state => state.user.currentUser)

  const router = createBrowserRouter([
    {
      path: "/",
      element: (user !== null) ? <Home /> : <Navigate to='/login'/>
    },
    {
      path: "/products/:category",
      element: <ProductList />
    },
    {
      path: "/product/:id",
      element: <Product />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: (user !== null) ? <Navigate to="/"/> : <Login />
    },
    {
      path: '/success',
      element: <Success />
    }
  ])
  
  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
