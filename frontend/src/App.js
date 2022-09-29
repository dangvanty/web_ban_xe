// import library
import {BrowserRouter as Router ,Routes, Route, } from "react-router-dom"

//import component: 
import './App.css';
import NotFound from "./component/layout/Not Found/NotFound.js";
import Begin from "./Begin";
import LoginSignUp from "./component/User/LoginSignUp";
import { useSelector } from "react-redux";
import WebFont from "webfontloader"
import store from "./store";
import { useEffect } from "react";
import { loadUser } from './actions/userActions';
import UserOptions from'./component/layout/Header/UserOptions.js';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
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
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Begin/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <Footer/>      */}
    </Router>
  );
}

export default App;
