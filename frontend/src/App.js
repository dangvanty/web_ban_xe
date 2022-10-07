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
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <Footer/>      */}
    </Router>
  );
}

export default App;
