import CardContainer from "../../components/CardContainer/CardContainer";
import style from "./Home.module.css";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className={style.body}>
      <CardContainer/>
      <Footer/>
    </div>
  );
};

export default Home;
