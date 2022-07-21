import axios from 'axios';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = '35d12bb42e646b3da19939eafb14620b';

function HomePage() {
  const [homeMovies, setHomeMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`)
      .then(res => {
        setHomeMovies(res.data.results);
      });
  }, []);
  return (
    <>
      <h1 className={s.title}>Top 20 films</h1>
      <ul className={s.movieList}>
        {homeMovies.map(data => {
          return (
            <li key={data.id} className={s.movieItem}>
              <Link className={s.item} to={`movies/${data.id}`}>
                {data.title || data.original_name}
              </Link>
              <p>
                Release Date:
                <span>
                  {' '}
                  {data.release_date ? data.release_date : 'No date'}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HomePage;
