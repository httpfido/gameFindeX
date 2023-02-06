import { useDispatch } from "react-redux";
import { useState } from "react";
import { cleanGames, getGames, resetPage, searchGame } from "../../redux/actions";
import style from "./SearchBar.module.css";
import { useHistory, useLocation } from "react-router-dom";

const SearchBar = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  // const gamesName = useSelector((state) => state.games); //Estado Global
  const location = useLocation() 
  const [name, setName] = useState(); //Estado Local

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    
    // setName("");
    dispatch(resetPage())
    dispatch(cleanGames());

    if(location.pathname === "/home") {  
      dispatch(getGames(name))   
    }else{
      dispatch(searchGame(name));
      history.push("/home");
    }


    // if(gamesName.length === 0) return <h1>Cargando</h1>;





    // e.preventDefault();
    // dispatch(getGame(name));
    // setName("");
    // dispatch(cleanGames())
    // dispatch(resetPage())
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      HandleSubmit(event);
    }
  };

  return (
    <div className={style.searchbar}>
      <input
        className={style.search}
        type="text"
        placeholder="Search among more than 917655 games around the globe..."
        onChange={handleInputChange}
        value={name}
        onKeyPress={handleKeyPress}
      />

      {/* <button type="submit" onClick={handleSubmit}>
        <p>Search</p>
      </button> */}
    </div>
  );
};

export default SearchBar;
