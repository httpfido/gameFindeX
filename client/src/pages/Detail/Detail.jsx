// import { usestate } from "react";
// import { useDispatch } from 'react-redux';
// import { getGame } from "../../redux/actions";
// import axios from "axios";
// import style from "./Detail.module.css";

// const Detail = () => {
//     const dispatch = useDispatch();
//     useEffect(()=>{
//       dispatch(getGame())
//     }, [])

//     return(
        
//     )
// }



import axios from "axios";
import { useState, useEffect } from "react";
// import { useParams } from "react-router";
import { Link, useParams } from "react-router-dom";




/**
 * Shows the details of an specific genre
 * @param {String} id - route identifier to use in the genre API call
 */
export default function GenreDetail() {
  const [genre, setGenre] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/genres/${id}`)
      .then((x) => {
        setGenre(x.data);
      })
      .catch((e) => console.log("ERORR", e));
    return () => {
      setGenre(null);
    };
  }, [id]);

  return (
    <div>
      <div className="">
        {genre ? (
          <div>
            <img
              className=""
              src={genre.image_background}
              alt="imgNotFound"
            />

            <h1 className="">
              {genre.name ? genre.name : "404 - Not Found"}
            </h1>

            <div className="">
              <h3>Games count: {genre.games_count ? genre.games_count : 0}</h3>

              {genre.description ? (
                <p
                  className=""
                  dangerouslySetInnerHTML={{ __html: genre.description }}
                ></p>
              ) : (
                <p>"Genre detail not found in database"</p>
              )}
            </div>
          </div>
        ) : (
          <h1>Reloading</h1>
        )}

        <Link to="/home">
          <button className="">
            <h3>Back to Home</h3>
          </button>
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
}