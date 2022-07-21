import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import s from './MoviesPage.module.css';

const KEY = '35d12bb42e646b3da19939eafb14620b';

function MoviesPage() {
  const [searchFilm, setSearchFilm] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const history = createBrowserHistory();

  const handleSubmit = e => {
    e.preventDefault();
    setInputValue(e.currentTarget.elements[0].value);
    setSearchFilm(true);
    history.push(`?query=${e.currentTarget.elements[0].value}`);
  };

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${inputValue}`
      )
      .then(res => {
        setSearchFilm(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [inputValue]);

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          placeholder="Please enter film name"
        />
        <button className={s.buttonSearchFilm} type="submit">
          Search
        </button>
      </form>
      <ul className={s.filmsList}>
        {searchFilm.length > 0
          ? searchFilm.map(({ release_date, original_title, id }) => {
              return (
                <li className={s.listItem} key={id}>
                  <Link className={s.navItem} to={`/movies/${id}`}>
                    {original_title}
                  </Link>
                  <p>
                    Release Date:
                    <span> {release_date ? release_date : 'No date'}</span>
                  </p>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}

export default MoviesPage;
