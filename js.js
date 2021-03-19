const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
//number of the ticket in the paragraph
const count = document.getElementById("count");
//the total of price in the paragraph
const total = document.getElementById("total");
//selected move
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = Number(movieSelect.value);

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update total and count in the paragraph
const updateSelectedFunction = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //1copy selected seats into arr
  //Map through array
  //return a new array indexes
  //(using spread operator to do it)
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log([...selectedSeats]);
  console.log([...seats]);
  console.log(seatIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
};

//Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // selectedSeats !== null (check if its in the localStorage)
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedFunction();
});

//seat click event
container.addEventListener("click", (e) => {
  //(e.target) giving result for anything when click it
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedFunction();
  }
});

//intitial count and total set
updateSelectedFunction();
