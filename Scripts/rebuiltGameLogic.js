const buttonContainer = document.getElementById("gameScoreButtons"); // constant variable that holds all the play off buttons into a container
if (!buttonContainer) {
	console.error("Error: 'gameScoreButtons' element not found in the DOM.");
}
let hubScore = 0; // define hubScore with an initial value

/*
	Makes a Score button
	DO NOT EDIT UNLESS YOU KNOW WHAT YOU'RE DOING.
*/
function makeButton(name)// function that makes a button with the naame passed in 
{
	console.log("Making button " + name);// logs to console the name of the button being made

	var btn = document.createElement("button");// creates a button element
	btn.className = "scoreButton";
	btn.innerText = name;// sets the text of the button to the name passed in 
	buttonContainer.append(btn);// appends the button to the button container
}

/*
	Initializes all buttons
	DO NOT EDIT UNLESS YOU KNOW WHAT YOU'RE DOING.
*/
function initButtons()// function that initializes all the buttons 
{
	const buttons = document.querySelectorAll('.scoreButton'); // selects all buttons with the class "scoreButton"
	buttons.forEach(button => {// for eaach button 
		button.dataset.count = 0;// sets the data count of the button to 0
		button.dataset.originalText = button.textContent;// sets the original text of the button to the text content of the button

		button.textContent = `${button.dataset.originalText}: 0`// sets the text content of the button to the original text of the button and the count of the button

		button.addEventListener('click', () => {// adds an event listener to the button that listens for a click
			let count = parseInt(button.dataset.count) + 1;// increments the count of the button by 1
			button.dataset.count = count;// sets the data count of the button to the new count 
			button.textContent = `${button.dataset.originalText}: ${count}`;// sets the text content of the button to the original text of the button and the new count 
		});
	});

	// Reset counts
	document.getElementById('resetCounts').addEventListener('click', () => {// adds an event listener to the reset counts button that listens for a click
		buttons.forEach(button => {// for each button
			button.dataset.count = 0;// sets the data count of the button to 0
			button.textContent = `${button.dataset.originalText}: 0`;// sets the text content of the button to the original text of the button and 0
		});
	});
}

// -- Buttons -- \\
makeButton(`Hub: ${hubScore}`);

// DO NOT REMOVE THIS LINE
initButtons()// calls the init buttons function to initialize all the buttons 