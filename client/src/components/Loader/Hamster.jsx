import style from "./Hamster.module.css"

const Hamster = () => {
  return (
    <div className={style["wheel-and-hamster"]}>
      <div className={style.wheel}></div>
      <div className={style.hamster}>
        <div className={style["hamster__body"]}>
          <div className={style["hamster__head"]}>
            <div className={style["hamster__ear"]}></div>
            <div className={style["hamster__eye"]}></div>
            <div className={style["hamster__nose"]}></div>
          </div>
          <div className={style["hamster__limb--fr"]}></div>
          <div className={style["hamster__limb--fl"]}></div>
          <div className={style["hamster__limb--br"]}></div>
          <div className={style["hamster__limb--bl"]}></div>
          <div className={style["hamster__tail"]}></div>
        </div>
      </div>
      <div className={style.spoke}></div>
    </div>
  );
};

export default Hamster