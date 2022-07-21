import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link, NavLink, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "Cast" */)
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "Reviews" */)
);
const KEY = '35d12bb42e646b3da19939eafb14620b';
const PATH = 'https://image.tmdb.org/t/p/w300';

function MovieDetailsPage() {
  const [filmDetails, setfilmDetails] = useState({
    id: 0,
    title: '',
    average: 0,
    img: '',
    overview: '',
    genres: [],
  });

  const { movieId } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`)
      .then(res => {
        setfilmDetails({
          id: res.data.id,
          title: res.data.original_title,
          average: res.data.vote_average,
          img: res.data.poster_path,
          overview: res.data.overview,
          genres: res.data.genres,
        });
      });
  }, [movieId]);
  const { title, img, average, overview, genres } = filmDetails;
  return (
    <section className={s.movieDetailsSection}>
      <button type="button" className={s.buttonBack}>
        <Link className={s.linkBack} to={'/'}>
          Go back
        </Link>
      </button>

      <div className={s.containerContent}>
        <div className={s.containerImage}>
          <img src={`${PATH}/${img}`} alt={title} width="300" height="400" />
        </div>
        <div>
          <h1 className={s.title}>{title}</h1>
          <p className={s.average}>User score: {average}</p>
          <h2 className={s.overview}>Overview</h2>
          <p className={s.overviewText}>{overview}</p>
          <h2 className={s.genres}>Genres</h2>
          <ul className={s.list}>
            {genres &&
              genres.map(({ id, name }) => {
                return (
                  <li key={id} className={s.listItem}>
                    {name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <hr />
      <p className={s.moreInfo}>Additional information</p>
      <ul className={s.moreItem}>
        <li>
          <NavLink className={s.listNavLink} to="cast">
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={s.listNavLink} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/cast" element={<Cast />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </section>
  );
}
export default MovieDetailsPage;
