"use strict";

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("movieSearch");
const clearSearchButton = document.getElementById("clearSearch");
const noResults = document.getElementById("noResults");

function movieCardMarkup(movie) {
    return `
        <article class="movie-card">
            <div class="poster" style="--poster-gradient: ${movie.gradient}">
                <span>Now showing</span>
            </div>
            <div class="movie-card-body">
                <h2>${movie.title}</h2>
                <div class="movie-meta">
                    <span>${movie.genre}</span>
                    <span>${movie.duration} min</span>
                    <span>${movie.rating}/10</span>
                </div>
                <p>${movie.description}</p>
                <a class="button" href="movie.html?id=${encodeURIComponent(movie.id)}">View details</a>
            </div>
        </article>
    `;
}

function renderMovies(searchTerm = "") {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const matchingMovies = MOVIES.filter((movie) => {
        const searchableText = `${movie.title} ${movie.genre} ${movie.keywords}`.toLowerCase();
        return searchableText.includes(normalizedTerm);
    });

    movieGrid.innerHTML = matchingMovies.map(movieCardMarkup).join("");
    noResults.classList.toggle("hidden", matchingMovies.length !== 0);
}

searchInput.addEventListener("input", () => {
    renderMovies(searchInput.value);
});

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    renderMovies();
});

renderMovies();
