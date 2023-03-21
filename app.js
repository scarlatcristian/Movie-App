"use strict";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b964182d9ad0d2eae80588f7d2a4f3b5&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b964182d9ad0d2eae80588f7d2a4f3b5&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");

// Fetch the movies
const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
};

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
