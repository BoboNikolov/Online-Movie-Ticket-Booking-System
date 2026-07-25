"use strict";

const parameters = new URLSearchParams(window.location.search);
const selectedMovie = getMovieById(parameters.get("movie"));
const selectedShowtime = parameters.get("showtime") || selectedMovie.showtimes[0];
const selectedSeats = (parameters.get("seats") || "")
    .split(",")
    .map((seat) => seat.trim())
    .filter(Boolean);
let promoApplied = false;

const movieName = document.getElementById("movieName");
const showtimeText = document.getElementById("showtimeText");
const selectedSeatText = document.getElementById("selectedSeatText");
const subtotalText = document.getElementById("subtotalText");
const discountText = document.getElementById("discountText");
const totalText = document.getElementById("totalText");
const promoCode = document.getElementById("promoCode");
const promoFeedback = document.getElementById("promoFeedback");
const paymentFeedback = document.getElementById("paymentFeedback");
const confirmation = document.getElementById("confirmation");
const confirmationDetails = document.getElementById("confirmationDetails");
const ticketList = document.getElementById("ticketList");

movieName.textContent = selectedMovie.title;
showtimeText.textContent = selectedShowtime;
selectedSeatText.textContent = selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";
document.title = `Payment | ${selectedMovie.title}`;

function getSubtotal() {
    return selectedSeats.length * selectedMovie.price;
}

function getDiscount() {
    return promoApplied ? getSubtotal() * 0.1 : 0;
}

function getTotal() {
    return getSubtotal() - getDiscount();
}

function updateSummary() {
    subtotalText.textContent = `€${getSubtotal().toFixed(2)}`;
    discountText.textContent = `-€${getDiscount().toFixed(2)}`;
    totalText.textContent = `€${getTotal().toFixed(2)}`;
}

function normalizedCardNumber() {
    return document.getElementById("cardNumber").value.replace(/\D/g, "");
}

function generateReference(prefix) {
    const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `${prefix}-${randomPart}`;
}

document.getElementById("applyPromo").addEventListener("click", () => {
    if (promoCode.value.trim().toUpperCase() === "SAVE10") {
        promoApplied = true;
        promoFeedback.textContent = "Promo code accepted. A 10% discount has been applied.";
        promoFeedback.className = "feedback success";
    } else {
        promoApplied = false;
        promoFeedback.textContent = "Promo code not recognised.";
        promoFeedback.className = "feedback error";
    }
    updateSummary();
});

document.getElementById("paymentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    paymentFeedback.textContent = "";
    paymentFeedback.className = "feedback";
    confirmation.classList.add("hidden");

    if (selectedSeats.length === 0) {
        paymentFeedback.textContent = "No seats are attached to this booking attempt. Return to seat selection.";
        paymentFeedback.className = "feedback error";
        return;
    }

    const customerName = document.getElementById("customerName").value.trim();
    const cardNumber = normalizedCardNumber();
    const expiry = document.getElementById("expiry").value.trim();
    const securityCode = document.getElementById("securityCode").value.trim();

    if (!customerName || cardNumber.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiry) || !/^\d{3}$/.test(securityCode)) {
        paymentFeedback.textContent = "Enter a name, a 16-digit test card, expiry in MM/YY format, and a 3-digit security code.";
        paymentFeedback.className = "feedback error";
        return;
    }

    if (cardNumber === "4111111111110000") {
        paymentFeedback.textContent = "Payment declined by the simulated gateway. No booking or ticket was created.";
        paymentFeedback.className = "feedback error";
        return;
    }

    if (cardNumber !== "4242424242424242") {
        paymentFeedback.textContent = "Use the approved or declined demonstration card number from the README.";
        paymentFeedback.className = "feedback error";
        return;
    }

    const bookingReference = generateReference("BK");
    confirmationDetails.innerHTML = `
        <div class="summary-row"><span>Booking reference</span><strong>${bookingReference}</strong></div>
        <div class="summary-row"><span>Customer</span><strong>${customerName}</strong></div>
        <div class="summary-row"><span>Movie</span><strong>${selectedMovie.title}</strong></div>
        <div class="summary-row"><span>Showtime</span><strong>${selectedShowtime}</strong></div>
        <div class="summary-row"><span>Seats</span><strong>${selectedSeats.join(", ")}</strong></div>
        <div class="summary-row total"><span>Paid</span><strong>€${getTotal().toFixed(2)}</strong></div>
    `;

    ticketList.innerHTML = selectedSeats
        .map((seatId) => `
            <div class="ticket">
                <span>Seat ${seatId}</span>
                <strong>${generateReference("TKT")}</strong>
            </div>
        `)
        .join("");

    paymentFeedback.textContent = "Payment approved by the simulated gateway.";
    paymentFeedback.className = "feedback success";
    confirmation.classList.remove("hidden");
    confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
});

updateSummary();
