import CardContainer from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filter/Filters";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.body}>
      <Filters/>
      <CardContainer/>

    </div>
  );
};

export default Home;
