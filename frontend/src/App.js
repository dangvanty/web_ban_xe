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
import Menu from "./component/layout/Header/Menu";
import Home from "./component/layout/Home/Home";
import Shop from "./component/layout/Shop/Shop";
import ProtectedRoute from "./component/helper/ProtectedRoute";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
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

        <Route path="/account" element={(<ProtectedRoute><Profile /></ProtectedRoute>)} />
        <Route path="/me/update" element={(<ProtectedRoute><UpdateProfile /></ProtectedRoute>)} />
        <Route path="/password/update" element={(<ProtectedRoute><UpdatePassword /></ProtectedRoute>)} />

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <Footer/>      */}
    </Router>
  );
}

export default App;
