import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getGame, resetPage } from "../../redux/actions";
import style from "./SearchBar.module.css"


const SearchBar = () => {

  const dispatch = useDispatch();
  const gamesName = useSelector((state) => state.games); //Estado Global
  
  const [name, setName] = useState(); //Estado Local


  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getGame(name));
    dispatch(resetPage())
    setName("");
  }

  if (gamesName.length === 0) return <h1>Cargando</h1>;

  return (
    <div className={style.searchbar}>
      <input
        className={style.search}
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        // onChange={handleSearchGame}
        // onBlur={(e) => blurInpuTextSearch(e)}
        value={name}
        // value={inputSearch}
      />
      
      <button type="submit" onClick={handleSubmit}>
        <p>Search</p>
      </button>
    </div>
  );
};

export default SearchBar;