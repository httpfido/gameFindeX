import style from "./Filter.module.css";
import { Link } from "react-router-dom";

const Filters = () => {
  return (
    <div className={style.orderbox}>
      <div className={style.navbar}>
        <Link to="/home">
          <button className={style.button}>Home</button>
        </Link>
        <Link to="/create">
          <button className={style.button}>Add game</button>
        </Link>
      </div>
      <div className={style.filters}>
        <p className={style.text}> Aca van mis:</p>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <br />
        <select>
          <option value="created">Agregados</option>
          <option value="nocreated">Existentes</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
