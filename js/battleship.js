var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

	// ships: [
	// 	{ locations: ["06", "16", "26"], hits: ["", "", ""] },
	// 	{ locations: ["24", "34", "44"], hits: ["", "", ""] },
	// 	{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	// ],


	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === "hit") {
				view.displayMessage("Вы уже попали в этo место!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("ПОПАЛ!");

				if (this.isSunk(ship)) {
					view.displayMessage("Ты потопил мой Линкор!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Вы промахнулись!");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
}; 


var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

}; 

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("Ты потопил все мои Линкоры за " + this.guesses + " попыток");
			}
		}
	}
};



function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Пожалуйста введите букву и номер на доске.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Неправильное значение!Введите в форму значение: буква + цифра(A0)");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Такие значения не могут быть приняты так как они не существуют на игровом поле");
		} else {
			return row + column;
		}
	}
	return null;
}

function handleFireButton(){
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);

	guessInput.value = "";
}
function handleKeyPress(e){
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

window.onload = init;

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}






















// // Тест объекта view

// // view.displayMiss("00");
// // view.displayHit("34");
// // view.displayMiss("55");
// // view.displayHit("12");
// // view.displayMiss("25");
// // view.displayHit("26");
// // view.displayMessage("Победа");

// var model ={
// 	boardSize: 7,
// 	numShips: 3,
// 	shipLength: 3,
// 	shipsSunk: 0,

// 	ships: [{locations: ["06","16","26"],hits: ["","",""]},
// 			{locations: ["24","34","44"],hits: ["","",""]},
// 			{locations: ["10","11","12"],hits: ["","",""]}],

// 	fire: function(guess){

// 		for (var i = 0; i < this.numShips; i++){
// 			var ship = this.ships[i];
// 			var index = ship.locations.indexOf(guess);
// 			if (ship.hits[index] === "hit") {
// 				view.displayMessage("Вы уже попали в эту место!");
// 				return true;
// 			} else if (index >= 0) {
// 				ship.hits[index] = "hit";
// 				view.displayHit(guess);
// 				view.displayMessage("Попал!");
				
// 				if (this.isSunk(ship)){
// 					view.displayMessage("Ты потопил мой Линкор!");
// 					this.shipsSunk++;
// 				}
// 				return true;
// 			}
// 		}
// 		view.displayMiss(guess);
// 		view.displayMessage("Вы промахнулись!");
// 		return false;
// 	},

// 	isSunk: function(ship){
// 		for (var i = 0; i < this.shiplength; i++){
// 			if(ship.hits[i] !== "hit"){
// 				return false;
// 			}
// 		}
// 		return true;
// 	}
// };
// var view = {
// 	displayMessage: function(msg) {
// 		var messageArea = document.getElementById("messageArea");
// 		messageArea.innerHTML = msg;
// 	},

// 	displayHit: function(location) {
// 		var cell = document.getElementById(location);
// 		cell.setAttribute("class", "hit");
// 	},

// 	displayMiss: function(location) {
// 		var cell = document.getElementById(location);
// 		cell.setAttribute("class", "miss");
// 	}

// }; 

// var controller = {
// 	guesses:0,

// 	processGuess: function(guess){
// 		var location = parseGuess(guess);
// 		if (location){
// 			this.guesses++;
// 			var hit = model.fire(location);
// 			if (hit && model.shipsSunk === model.numShips){
// 				view.displayMessage("Ты потопил все мои линкоры за " + this.guesses + " "  +  " попыток");
// 			}
// 		}
// 	}
// };

// function parseGuess(guess){

// 	var alphabet = ["A","B","C","D","E","F","G"];

// 	if(guess === null || guess.length !== 2){
// 		alert("Пожалуйста введите букву и номер на доске.");
// 	}else{
// 		firstChar = guess.charAt(0);
// 		var row = alphabet.indexOf(firstChar);
// 		var column = guess.charAt(1);

// 		if (isNaN(row) || isNaN(column)) {
// 			alert("Неправильное значение!Введите в форму значение: буква + цифра(A0)");
// 		}else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
// 			alert("Такие значения не могут быть приняты так как они не существуют на игровом поле");
// 		}else{
// 			return row + column;
// 		}
// 	}
// 	return null;
// }

// // Тест функции parseGuess
// // console.log(parseGuess("A0"));
// // console.log(parseGuess("B6"));
// // console.log(parseGuess("G3"));
// // console.log(parseGuess("H0"));
// // console.log(parseGuess("A7"));
// // console.log(parseGuess("AA"));


// // Тест controller

// controller.processGuess("A0");

// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");

// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");

// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");



