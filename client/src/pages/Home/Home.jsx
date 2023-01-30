import CardContainer from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filter/Filters";
import { getGames } from "../../redux/actions";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./Home.module.css";



const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);


  return (
    <div className={style.body}>
      <Filters/>
      <CardContainer/>

    </div>
  );
};

export default Home;
