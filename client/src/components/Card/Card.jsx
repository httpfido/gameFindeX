import style from './Card.module.css'

const Card = (props) => {
    // console.log(props.background_image);
    return(
        <div className={style.card}>
            <p className={style.name}>{props.name}</p>
            <img classname="img" src={props.image} alt='My'/>
            <p className={style.genres}>{props.genres}</p>
            <p className={style.genres}>{props.platforms}</p>
            <p>{props.released}</p>

        </div>
    )
}

export default Card