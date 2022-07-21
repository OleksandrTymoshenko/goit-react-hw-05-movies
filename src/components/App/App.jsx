import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigations/Navigation";
const HomePage = lazy(() => import('../HomePage/HomePage' /* webpackChunkName: "HomePage" */));
const MoviesPage = lazy(() => import('../MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */));
const MovieDetailsPage = lazy(() => import('../MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */));

function App () {
  
  return (
    <>
      <Navigation />
      <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/*" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </Suspense>
    </>
  );
  
      
};

export default App;