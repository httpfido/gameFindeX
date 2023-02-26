import { useDispatch } from "react-redux";
import { useState } from "react";
import { cleanGames, cleanOrder, cleanSource, resetPage, searchGame } from "../../redux/actions";
import style from "./SearchBar.module.css";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/search.svg"

const SearchBar = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const location = useLocation() 
  const [name, setName] = useState(); //Estado Local

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    console.log("hola");
    dispatch(resetPage())
    dispatch(cleanGames());
    dispatch(cleanSource())
    dispatch(cleanOrder())
    if(location.pathname === "/home") {  
      dispatch(searchGame(name));
      console.log(name);
    }else{
      console.log("else");
      dispatch(searchGame(name));
      history.push("/home");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      HandleSubmit(event);
    }
  };

  return (
    <div className={style.searchbar}>
      <img src={logo} alt="Search Icon" className={style.searchIcon}/>
      <input
      img={logo}
        className={style.search}
        type="text"
        placeholder="Search among more than 917655 games around the globe..."
        onChange={handleInputChange}
        value={name}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
