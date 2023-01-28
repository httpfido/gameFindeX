import style from './CardContainer.module.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';


const CardContainer = () => {

    const games = useSelector(state=>state.games)
    

    return(
        <div className={style.container}>
            {games.map(game=>{
                return <Card
                image={game.background_image}
                name={game.name}
                genres={game.genres}
                platforms={game.platforms}
                />
            })}
        </div>
    )
}

export default CardContainer
