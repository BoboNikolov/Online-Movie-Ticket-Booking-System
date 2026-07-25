"use strict";

const parameters = new URLSearchParams(window.location.search);
const selectedMovie = getMovieById(parameters.get("id"));

const movieTitle = document.getElementById("movieTitle");
const movieDescription = document.getElementById("movieDescription");
const moviePoster = document.getElementById("moviePoster");
const movieGenre = document.getElementById("movieGenre");
const movieDuration = document.getElementById("movieDuration");
const movieRating = document.getElementById("movieRating");
const movieCertificate = document.getElementById("movieCertificate");
const showtimeList = document.getElementById("showtimeList");

movieTitle.textContent = selectedMovie.title;
movieDescription.textContent = selectedMovie.description;
moviePoster.style.setProperty("--poster-gradient", selectedMovie.gradient);
movieGenre.textContent = selectedMovie.genre;
movieDuration.textContent = `${selectedMovie.duration} minutes`;
movieRating.textContent = `${selectedMovie.rating}/10`;
movieCertificate.textContent = selectedMovie.certificate;
document.title = `${selectedMovie.title} | Echo Cinema`;

showtimeList.innerHTML = selectedMovie.showtimes
    .map((showtime) => `
        <a class="button showtime-button" href="seats.html?movie=${encodeURIComponent(selectedMovie.id)}&showtime=${encodeURIComponent(showtime)}">
            ${showtime} — Select seats
        </a>
    `)
    .join("");
