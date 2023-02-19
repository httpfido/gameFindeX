import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { cleanDetail, getProfessionalDetail } from "../../Redux/Actions";

import style from "./ProfessionalPage.module.css";

const ProfessionalPage = () => {
  const { id } = useParams();
  const professional = useSelector((state) => state.profDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <>
      <NavbarTwo />
      <div className={style.container}>
        <div className={style.detailContainer}>
        <p>Professional Page</p>
        <h1>{professional?.name}</h1>
        <h2>{professional?.category}</h2>
        <h4>{professional?.phone}</h4>
        <h4>{professional?.adress}</h4>
        <p>{professional?.description}</p>
        </div>
      </div>
        <Footer />
    </>
  );
};

export default ProfessionalPage;
