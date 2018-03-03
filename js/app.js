/*
 * Create a list that holds all of your cards
 * Use Array.from method in order to transform an HTML collection in an Array. Only works in ES6.
 */
//const listCards = Array.from(document.querySelectorAll(".card "));

const listCards = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt", 
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"
];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//shuffle the list of cards
shuffle(listCards);


const UlContainer = document.getElementById("deck"); // set #deck as a container

//Insert the sorted itens into HTML
listCards.forEach(function(cardItem) {	    
	const list = document.createElement("li");             // Create a <li> node
	const listItem = document.createElement("i");          // create a <i> node
	list.appendChild(listItem);
	UlContainer.appendChild(list);
	list.setAttribute('class', 'card show');                    // set a class to <li>
	listItem.setAttribute('class', cardItem);              // set a class to <i>	
})


// Set the time for memorize cards - hide cards after "X" time
setTimeout(function() {		
	const allCards = document.getElementsByClassName('card');	
	for (var i = 0; i < allCards.length; i++) {
		allCards[i].setAttribute('class', 'card'); 
	}	
}, 5000);		




let openCards = [];
let moves = 0;
let matches = document.querySelectorAll(".card match").length;
console.log(matches);

function start(event) {
	event.target.classList.toggle('show');	
	pushArr();
	//console.log(openCards);	
	if (openCards.length > 1) {			
		let leng = openCards.length -1;		
			if(openCards[leng] === openCards[leng - 1]) {
				console.log('match');	
				//console.log(openCards);	
				// Change Class for the event target item			
				event.target.classList.remove('show');
				event.target.classList.add('match');
				openCards.splice(0, openCards.length);
				//Change classes for the first item clicked
				const cardShow = document.querySelector('.card.show');				
				cardShow.classList.remove('show');
				cardShow.classList.add('match');
				//APPLY MOVES and MATCHES				
				moves++;
				matches++;
				allMatches();
			} else {
				//empty array
				openCards.splice(0, openCards.length);
				// Change Class for the event target item to wrong
				event.target.setAttribute('class', 'card wrong');
				// Change Class for the open card item to wrong	
				const cardShow = document.querySelector('.card.show');
				cardShow.setAttribute('class', 'card wrong');
				// Hide cards after time			
				setTimeout(function() {
					event.target.classList.toggle('wrong');	
					cardShow.classList.toggle('wrong');	
				 }, 800);				
				console.log(' doesnt match');
				console.log(openCards);
				//APPLY MOVES
				moves++;											
			}
		countMoves();
		rating();
		//console.log(matches);

	}	
}

// EVENT LISTENER
UlContainer.addEventListener("click", start);

function pushArr() {
	let elClass = event.target.firstChild.className;
	if(elClass) {
		openCards.push(event.target.firstChild.className);
	}
}


function countMoves() {
	const insertMoves = document.querySelector('.moves');
	insertMoves.innerHTML = moves;
}

function allMatches() {
	const pairs = listCards.length / 2;
	if(matches === pairs) {
		console.log(alert('CONGRATS!! You completed this game with just ' + moves + ' moves'));
	}
}

function rating() {
	const lastStar = document.querySelector('.stars li:last-child')	
	if(moves === 13) {
		lastStar.remove();
	} else if(moves === 18) {
		lastStar.remove();
	} 
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
