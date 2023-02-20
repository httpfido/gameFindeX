import { Landing, Home, Detail, Form } from './pages'
import axios from 'axios'

import {  Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
axios.defaults.baseURL = "pi-videogames-production-f655.up.railway.app"

// import "./App.css";

function App() {
  const location = useLocation();


  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/> }

      <Route exact path="/" render={()=><Landing/>}/>
      <Route exact path="/home" render={()=><Home/>}/>
      <Route exact path="/home/:id" render={()=><Detail/>}/>
      <Route exact path="/create" render={()=><Form/>}/>
    </div>
  );
}

export default App;
