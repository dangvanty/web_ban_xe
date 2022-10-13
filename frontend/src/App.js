// import library
import {BrowserRouter as Router ,Routes, Route, } from "react-router-dom"

//import component: 
import './App.scss';
import NotFound from "./component/layout/Not Found/NotFound.js";
import LoginSignUp from "./component/User/LoginSignUp";
import { useSelector } from "react-redux";
import WebFont from "webfontloader"
import store from "./store";
import { useEffect } from "react";
import { loadUser } from './actions/userActions';
import ForgotPassword  from './component/User/ForgotPassword'
import ResetPassword  from './component/User/ResetPassword'
import Menu from "./component/layout/Home/Header/Menu";
import Home from "./component/layout/Home/Home";
import Shop from "./component/layout/Shop/Shop";
import ProtectedRoute from "./component/helper/ProtectedRoute";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ProductList from './component/admin/ProductList'
import NewProduct from './component/admin/NewProduct'
import DashBoard from './component/admin/DashBoard'
import ProtectedRouteAdmin from "./component/helper/ProtectedRouteAdmin";
import UpdateProduct from "./component/admin/UpdateProduct";
import ProductDetails from "./component/layout/Product/ProductDetails";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderDetails from "./component/Order/OrderDetails";
import EditOrder from "./component/admin/EditOrder";
import OrderList from "./component/admin/OrderList";
import RegisterService from "./component/layout/Contact/Contact";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const fake={avatar:{url:null}}
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
  },[]);
  return (
    <Router>
      {isAuthenticated ===true ? <Menu user={user}/> : <Menu user={fake}/>}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/password/forgot' element = {<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element = {<ResetPassword/>}/>

        <Route path="/Shop" element={<Shop/>}/>
        <Route path="/Shop/:keyword" element={<Shop/>}/>
        <Route path="/Shop/product/:slug.:id.html" element={<ProductDetails/>}/>
        
        <Route element={<ProtectedRoute/>}>
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route path="/success" element={<OrderSuccess/>} />
        <Route path="/orders" element={<MyOrders/>} />
        <Route path="/order/:id" element={<OrderDetails/>} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>


        <Route  path='/cart' element = {<Cart/>}/>
        <Route  path='/contact' element = {<RegisterService/>}/>
        
        <Route element={<ProtectedRouteAdmin/>}>
        <Route path="/admin/dashboard" element={<DashBoard/>} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct/>} />
        <Route path="/admin/product/:id" element={<UpdateProduct/>} />
        <Route path="/admin/orders" element={<OrderList/>} />
        <Route path="/admin/order/:id" element={<EditOrder/>} />
        </Route>


        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <Footer/>      */}
    </Router>
  );
}

export default App;
