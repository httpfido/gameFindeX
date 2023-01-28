import style from "./Filter.module.css";

const Filters = () => {
  return (
      <div className={style.orderbox}>
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
  )
};

export default Filters