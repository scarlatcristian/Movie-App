"use strict";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b964182d9ad0d2eae80588f7d2a4f3b5&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b964182d9ad0d2eae80588f7d2a4f3b5&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const popularBtn = document.querySelector(".popular");

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else return "red";
};

const showMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const vote_average = Number(movie.vote_average.toFixed(1));

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
            ${overview}
        </div>
    `;

    main.appendChild(movieEl);
  });
};

// Fetch the movies
const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
};

// Show popular movies
popularBtn.addEventListener("click", () => {
  getMovies(API_URL);
});

// Search for the movie title submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
