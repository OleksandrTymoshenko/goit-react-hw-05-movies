import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import s from './Cast.module.css';
import notImage from "../images/Упс.jpeg";

const KEY = '35d12bb42e646b3da19939eafb14620b';
const PATH = 'https://image.tmdb.org/t/p/w300';

function Cast() {
    const [acters, setacters] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`).then((res) => {
            setacters(res.data.cast)
        })
    }, [movieId])

    return (
    <>
        { acters && acters.map(({id, profile_path, name, character }) => {
            return <ul key={id}><li className={s.containerImage}>
                {profile_path ? <img
                    src={`${PATH}/${profile_path}`}
                    alt={name}
                    width="150"
                    height="250"
                /> : <img
                    src={notImage}
                    alt={name}
                    width="150"
                    height="250"
                />}
                
                    </li>
                <li className={s.listItem}>Name: {name}</li>
                <li className={s.listItem}>Character: {character}</li>
                </ul>
            })}
    </>
    )
}

export default Cast;