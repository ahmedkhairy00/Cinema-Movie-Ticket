'use strict'
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const price = document.getElementById('total');
const NumbersOfSeats = document.getElementById('count');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice =+movieSelect.value;
/* 
const movieTicketValue = +movie.value;
const SelectedMovieName = movie.options[movie.selectedIndex].text;
*/
//
//set Movie Data
function setMovieData(movieIndex , moviePrice){
   localStorage.setItem('selectedMovieIndex', movieIndex);
   localStorage.setItem('selectedMoviePrice', moviePrice);


}
//Update total and count
function updateSelectedCount(){
     const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
     const seatsIndex = [...selectedSeats].map(seat =>  [...seats].indexOf(seat));

      localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); 


    const selectedSeatCount = selectedSeats.length;
    NumbersOfSeats.textContent = selectedSeatCount;
    price.textContent = ticketPrice * selectedSeatCount;

}

function populateUI(){
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 

      if(selectedSeats !== null && selectedSeats.length > 0){
         seats.forEach((seat, index) => {
         if(selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
         }
         });
      }

      const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
      if(selectedMovieIndex !== null) {
         movieSelect.selectedIndex = selectedMovieIndex;
      }

   };
// movie select event
movie.addEventListener('change', e => {
   ticketPrice = +e.target.value;
   setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount()
});


// seat select event
container.addEventListener('click' , function(e){
// if seat have class occupied return dont do any thing
if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
   updateSelectedCount();
};
});

// Initial count and total
updateSelectedCount();