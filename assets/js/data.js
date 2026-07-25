"use strict";

const MOVIES = [
    {
        id: "interstellar",
        title: "Interstellar",
        genre: "Science Fiction / Drama",
        keywords: "space exploration future family",
        duration: 169,
        rating: 8.7,
        certificate: "12A",
        price: 12.5,
        description: "A team of explorers travels through a wormhole while searching for a future home for humanity.",
        gradient: "linear-gradient(135deg, #172554 0%, #1e3a8a 45%, #c2410c 100%)",
        showtimes: ["14:00", "17:30", "20:45"]
    },
    {
        id: "dark-knight",
        title: "The Dark Knight",
        genre: "Action / Crime",
        keywords: "superhero gotham crime thriller",
        duration: 152,
        rating: 9.0,
        certificate: "15",
        price: 12.5,
        description: "A masked vigilante faces a criminal mastermind who pushes Gotham City into chaos.",
        gradient: "linear-gradient(135deg, #111827 0%, #374151 52%, #7f1d1d 100%)",
        showtimes: ["13:30", "17:00", "21:00"]
    },
    {
        id: "inception",
        title: "Inception",
        genre: "Science Fiction / Action",
        keywords: "dream heist thriller mind",
        duration: 148,
        rating: 8.8,
        certificate: "12A",
        price: 13.0,
        description: "A specialist thief enters dreams to steal secrets and attempts the more dangerous task of planting an idea.",
        gradient: "linear-gradient(135deg, #164e63 0%, #0f766e 48%, #ca8a04 100%)",
        showtimes: ["15:00", "18:15", "20:30"]
    },
    {
        id: "dune-part-two",
        title: "Dune: Part Two",
        genre: "Science Fiction / Adventure",
        keywords: "desert empire war adventure",
        duration: 166,
        rating: 8.5,
        certificate: "12A",
        price: 14.0,
        description: "Paul Atreides unites with the Fremen while confronting the forces that destroyed his family.",
        gradient: "linear-gradient(135deg, #451a03 0%, #b45309 46%, #fde68a 100%)",
        showtimes: ["12:45", "16:20", "19:50"]
    }
];

function getMovieById(movieId) {
    return MOVIES.find((movie) => movie.id === movieId) || MOVIES[0];
}
