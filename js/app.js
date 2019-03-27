//Create a list that holds all of your cards
const allCards = document.querySelectorAll(".card")
const arrayOfCards = [];
for(let card of allCards){
    arrayOfCards.push(card);   
}

// shuffles the cards
const newDeck = document.querySelector(".deck")
let shuffleCard  = shuffle(arrayOfCards);
for(let shuffle of shuffleCard){
    newDeck.append(shuffle);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Timer section
let interval ;
let minutes = document.getElementById("min");
let seconds = document.getElementById("sec");
let totalTime = 0;

function time(){
    totalTime ++;
    seconds.innerHTML = "Secs: " + parseInt(totalTime % 60);
    minutes.innerHTML = "Mins: " + parseInt(totalTime / 60);  
}

// resets the time
function resetTime(){
    totalTime = 0;
    seconds.innerHTML = "Secs: " + totalTime;
    minutes.innerHTML = "Mins: " + totalTime;
    clearInterval(interval);
}

// Move Counter
let moveCounter = 0;
let moves = document.querySelector(".moves");

function counter(){
    // increment moves

    moveCounter++;
    moves.innerHTML = moveCounter;
    
    // scorePanel function

    scorePanel();

    // timer function
    if(moveCounter === 1){
        interval = setInterval(time, 1000);
    }

}


// score-panel's star

let stars  = document.querySelectorAll(".stars li");
function scorePanel(){
    if(moveCounter === 18){
        stars[0].style.display = "none";
    }
    if(moveCounter === 24){
        stars[1].style.display = "none";
    }
    if(moveCounter === 28){
        stars[2].style.display = "none";
    }
}

// Modal section
let modal = document.getElementById("win-modal");

// Play again button
let replayBtn = document.getElementById("btn");
replayBtn.addEventListener("click", restart);


let totalMoves = document.getElementById('total-moves');
let rating = document.getElementById("rating");
let totalMin = document.getElementById("total-mins");
let updateStar = document.querySelector(".stars");

// Pops up the modal
function popupModal (){
    modal.style.display = "block";
    totalMin.innerHTML = minutes.innerHTML + " and " + seconds.innerHTML;
    totalMoves.innerHTML = moveCounter;
    rating.innerHTML = updateStar.innerHTML;
}

// Removes the modal
function removeModal (){
    modal.style.display = "none";
}


// lock the cards
let lockCard = false;


// Click event
for(let clickCard of allCards){
    clickCard.addEventListener("click", displaySymbol)
}

// display card's symbol
function displaySymbol(evt){
    if (!lockCard){
        let card  = evt.target;

        // adds show, open to the target
        card.classList.add("show", "open");

        // calls openedCard function
        openedCards();
        
        // calls the win funtion
        win();
    }
}

// add the card to *list* of *open* card

function openedCards(){
    let openList = [];
    for(let card of arrayOfCards){
        if (card.classList.contains("show", "open")){
            openList.push(card);
        }

    } if (openList.length === 2) {
        // Moves counter
        counter();
        let firstCard = openList[0].querySelector("i").classList.item(1);
        let secondCard = openList[1].querySelector("i").classList.item(1);

        if (firstCard === secondCard){
            match(openList);
        } else {
            mismatch(openList);
        }
    }
}




// check if the cards are do match

function match(openList){
    for (let match of openList) {
        match.classList.remove("show", "open"); 
        match.classList.add("match", "disable-pointer"); 
    }
    // empty the list
    openList = [];
}

// if the cards don't match

function mismatch(openList) {
    lockCard = true;
    // adds the animation
    for (let vibrate of openList) {
        vibrate.classList.add("mismatch");
    }
    // removes the classes
    setTimeout(function(){
        for (let reset of openList) {
            reset.classList.remove("show","open","mismatch");   
        }
        // empty the list
        lockCard = false;
        openList = [];
    }, 1050)
}

// when all the cards do match

function win() {
    let matchedList = []
    let matched = document.querySelectorAll(".card.match");
    for(let matchedCard of matched){
        matchedList.push(matchedCard);
    }
    if (matchedList.length === 16) {
        clearInterval(interval);
        popupModal();
    }
}

// restart the game

let redo = document.querySelector(".restart")
redo.addEventListener("click", restart);

function restart () {
    // reShuffle the cards
    let reShuffle = shuffle(arrayOfCards);
    for (let reset of reShuffle) {
        reset.classList.remove("show", "open", "match", "disable-pointer");
        newDeck.append(reset);
    }

    // reset the moves
    moveCounter = 0;
    moves.innerHTML = moveCounter;

    //reset the stars
    for (let star of stars) {
        star.style.display = "inline-block";
    }
    // removes the modal
    removeModal();

    // reset the timer
    resetTime();
}
