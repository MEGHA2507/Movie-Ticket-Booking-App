const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateselectedSeatsUI();

let ticketPrice = parseInt(movieSelect.value);

// save selected movie index and price.
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update number of seats and amount to be paid.
function selectedSeatCount() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");

  // copy selected seats into an array.
  // map through array.
  // retrun a new array index.

  const seatsIndex = [...selectedSeat].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedCount = selectedSeat.length;

  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}
//Get data from localStorage and populate UI
function populateselectedSeatsUI() {
  const selectedSeatsUi = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeatsUi !== null && selectedSeatsUi.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsUi.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndexUi = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndexUi !== null) {
    movieSelect.selectedIndex = selectedMovieIndexUi;
  }
}

// movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  selectedSeatCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    selectedSeatCount();
  }
});

//initial count and total amount

selectedSeatCount();
