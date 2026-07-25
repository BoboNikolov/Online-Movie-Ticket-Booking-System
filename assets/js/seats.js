"use strict";

const parameters = new URLSearchParams(window.location.search);
const selectedMovie = getMovieById(parameters.get("movie"));
const selectedShowtime = parameters.get("showtime") || selectedMovie.showtimes[0];
const unavailableSeats = new Set(["A3", "A4", "B7", "C2", "D5"]);
const selectedSeats = new Set();

const movieName = document.getElementById("movieName");
const showtimeText = document.getElementById("showtimeText");
const seatGrid = document.getElementById("seatGrid");
const selectedSeatText = document.getElementById("selectedSeatText");
const totalText = document.getElementById("totalText");
const seatFeedback = document.getElementById("seatFeedback");

movieName.textContent = selectedMovie.title;
showtimeText.textContent = selectedShowtime;
document.title = `Select Seats | ${selectedMovie.title}`;

function createSeatButtons() {
    const rows = ["A", "B", "C", "D"];
    const seats = [];

    rows.forEach((row) => {
        for (let number = 1; number <= 8; number += 1) {
            const seatId = `${row}${number}`;
            const disabled = unavailableSeats.has(seatId);
            seats.push(`
                <button
                    class="seat"
                    type="button"
                    data-seat="${seatId}"
                    ${disabled ? "disabled" : ""}
                    aria-label="Seat ${seatId}${disabled ? ", unavailable" : ""}"
                    aria-pressed="false"
                >${seatId}</button>
            `);
        }
    });

    seatGrid.innerHTML = seats.join("");
}

function updateSummary() {
    selectedSeatText.textContent = selectedSeats.size > 0
        ? [...selectedSeats].join(", ")
        : "None";
    totalText.textContent = `€${(selectedSeats.size * selectedMovie.price).toFixed(2)}`;
}

seatGrid.addEventListener("click", (event) => {
    const seatButton = event.target.closest("button[data-seat]");
    if (!seatButton || seatButton.disabled) {
        return;
    }

    const seatId = seatButton.dataset.seat;
    if (selectedSeats.has(seatId)) {
        selectedSeats.delete(seatId);
        seatButton.classList.remove("selected");
        seatButton.setAttribute("aria-pressed", "false");
    } else {
        selectedSeats.add(seatId);
        seatButton.classList.add("selected");
        seatButton.setAttribute("aria-pressed", "true");
    }

    seatFeedback.textContent = "";
    seatFeedback.className = "feedback";
    updateSummary();
});

document.getElementById("continueToPayment").addEventListener("click", () => {
    if (selectedSeats.size === 0) {
        seatFeedback.textContent = "Select at least one available seat.";
        seatFeedback.className = "feedback error";
        return;
    }

    const seats = encodeURIComponent([...selectedSeats].join(","));
    window.location.href = `payment.html?movie=${encodeURIComponent(selectedMovie.id)}&showtime=${encodeURIComponent(selectedShowtime)}&seats=${seats}`;
});

createSeatButtons();
updateSummary();
