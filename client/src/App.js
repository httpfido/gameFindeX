import { Landing, Home, Detail, Form } from './pages'
import axios from 'axios'

import {  Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer';
axios.defaults.baseURL = "https://pi-videogames-production-f655.up.railway.app"

// import "./App.css";

function App() {
  const location = useLocation();


  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/> }
      {location.pathname !== '/' && <Footer/> }

      <Route exact path="/" render={()=><Landing/>}/>
      <Route exact path="/home" render={()=><Home/>}/>
      <Route exact path="/home/:id" render={()=><Detail/>}/>
      <Route exact path="/create" render={()=><Form/>}/>
    </div>
  );
}

export default App;
