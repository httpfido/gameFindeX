import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cleanDetail, getGame, resetPage, setPage, usePointer } from "../../redux/actions";
import style from "./SearchBar.module.css"


const SearchBar = () => {

  const dispatch = useDispatch();
  const gamesName = useSelector((state) => state.games); //Estado Global
  
  const [name, setName] = useState(); //Estado Local


  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
    
  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(getGame(name));
    setName("");
    dispatch(cleanDetail())
    dispatch(resetPage())
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      HandleSubmit(event);
    }
  };

  if (gamesName.length === 0) return <h1>Cargando</h1>;

  return (
    <div className={style.searchbar}>
      <input
        className={style.search}
        type="text"
        placeholder="Search..."
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