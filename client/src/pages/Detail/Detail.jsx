import { cleanDetail, filterByGenreDetail, getById } from "../../redux/actions";
import Card from "../../components/Card/Card";
import Circle from "../../components/Loader/Circle";
import imgDefault2 from "../../assets/img-default2.png";
import imgDefault from "../../assets/img-default.png";
import Footer from "../../components/Footer/Footer";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import style from "./Detail.module.css";
import star from "../../assets/star.svg";

const Detail = () => {
  const { id } = useParams();
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const related = useSelector((state) => state.related);
  useEffect(() => {
    if (game && game.genres) {
      let sources = {
        name: game.name,
        genres: game.genres,
      };
      dispatch(filterByGenreDetail(sources));
    }
  }, [dispatch, game]);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.pageYOffset > 0);
    });
    return () => {
      setScroll(0);
    };
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!game) return <h1>Cargando</h1>;
  if (!game.background_image)
    return (
      <div className={style.loadingImg}>
        <Circle />
      </div>
    );

  return (
    <div className={style.container}>
      {game ? (
        <div className={style.container}>
          <div className={style.imgContainer}>
            <img
              className={scroll ? style.imgScrolled : style.img}
              src={game.background_image ? game.background_image : imgDefault}
              alt="imgNotFound"
            />

            <div
              className={
                scroll ? style.dataContainerScrolled : style.dataContainer
              }
            >
              <div className={style.ratingContainer}>
                <p className={style.rating}>{game?.rating}</p>
                <img src={star} className={style.star} alt="" />
              </div>
              <div className={style.nameDescriptionContainer}>
                <h1 className={style.name}>
                  {game.name ? game.name : "404 - Not Found"}
                </h1>
                <h3 className={style.genres}>{game.genres?.join(", ")}</h3>
                {game.description ? (
                  <p
                    className={style.description}
                    dangerouslySetInnerHTML={{
                      __html: game.description,
                    }}
                  ></p>
                ) : (
                  <p>"Game detail not found in database"</p>
                )}
              </div>
            </div>
          </div>
          <div className={style.extraData}>
            <div className={style.extraDataText}>
              <div className={style.block}>
                <div className={style.blockTitle}>Release date</div>
                <div className={style.blockText}>
                  {game.released ? game.released : "not specified"}
                </div>
              </div>
              <div className={style.block}>
                <div className={style.blockTitle}>Developers</div>
                <div className={style.blockText}>
                  {game.developers?.join(", ")}
                </div>
              </div>
              <div className={style.block}>
                <div className={style.blockTitle}>Age rating</div>
                <div className={style.blockText}>
                  {game.esrb ? game.esrb : "not rated"}
                </div>
              </div>
              <div className={style.block}>
                <div className={style.blockTitle}>Comments</div>
                <div className={style.blockText}>
                  {game.comments ? game.comments.join(", ") : "not commented"}
                </div>
              </div>
              <div className={style.longBlock}>
                <div className={style.blockTitle}>Platform</div>
                <div className={style.blockText}>
                  {game.platform ? game.platform.join(", ") : "not available"}
                </div>
              </div>
              <div className={style.longBlock}>
                <div className={style.blockTitle}>Tags</div>
                <div className={style.blockText}>
                  {game.tags ? game.tags.join(", ") : "not taged"}
                </div>
              </div>
            </div>

            <div className={style.extraDataImg}>
              <img
                className={style.addImg}
                src={game.background_image_additional}
                alt="imgNotFound"
              />
            </div>
          </div>
          {related.length ? (
            <div>
              <h2 className={style.relatedTitle}>More games</h2>
              <div className={style.relatedCointaner}>
                {related.map((game) => {
                  return (
                    <div key={"CD MAP" + game.id}>
                      <Link
                        to={`/home/${game.id}`}
                        className={style.link}
                        key={"CO5"}
                      >
                        <Card
                          key={game.id}
                          image={
                            game.background_image
                              ? game.background_image
                              : imgDefault2
                          }
                          name={game.name}
                          genres={game.genres?.join(", ")}
                          platform={game.platform?.slice(0, 3).join(", ")}
                          rating={game.rating}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={style.bottomContainer}>
            <Link to="/home">
              <button className={style.back}>
                <h3>Back to Home</h3>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={style.loadingImg}>
          <Circle />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Detail;
