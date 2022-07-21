import s from './Reviews.module.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

const KEY = '35d12bb42e646b3da19939eafb14620b';

function Reviews() {
    const [comments, setComments] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}`).then((res) => {
            if (res.data.results.length > 0) {
                setComments(res.data.results);
            }
            return;
        }).catch((error) => {
            console.log(error)
        })
    }, [movieId])

    return (
        <>
            {comments ? comments.map(({author, content, id}) => {
                return <div key={id} className={s.containerContent}>
                    <h2 className={s.title}>Author: {author}</h2>
                    <p className={s.comment}>{content}</p>
                </div>
            }) : <p>We don't have any reviews for this movie</p>}
        </>
        
    )
}

export default Reviews;