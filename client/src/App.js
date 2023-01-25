import {  Route } from "react-router-dom";
import { Landing, Home, Detail, Form } from './pages'
import NavBar from "./components/NavBar/NavBar";

// import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path="/" render={()=><Landing/>}/>
      <Route exact path="/home" render={()=><Home/>}/>
      <Route exact path="/home/:id" render={()=><Detail/>}/>
      <Route exact path="/create" render={()=><Form/>}/>
    </div>
  );
}

export default App;
