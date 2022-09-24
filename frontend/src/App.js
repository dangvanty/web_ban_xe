// import library
import {BrowserRouter as Router ,Routes, Route, } from "react-router-dom"

//import component: 
import './App.css';
import NotFound from "./component/layout/Not Found/NotFound.js";
import Begin from "./Begin";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Begin/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

      {/* <Footer/>      */}
    </Router>
  );
}

export default App;
