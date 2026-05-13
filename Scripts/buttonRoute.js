const screens = {// define all screens
	main: document.getElementById('main-screen'),// main screen
	sub: document.getElementById('sub'),// subjective screen
	obj: document.getElementById('obj'),// objective screen
	play: document.getElementById('play'),// play screen
	dataScreen: document.getElementById('dataScreen'),// data screen
	continueScreen: document.getElementById('continueScreen')// interactive game map screen
};

let objectiveCompleted = false;// objective completion status
let subjectiveCompleted = false;// subjective completion status
let playCompleted = false;// play completion status

function showScreen(screenName) {// function to show a specific screen
	// Hide all screens
	Object.values(screens).forEach(screen => screen.style.display = 'none');
	// Show requested screen
	screens[screenName].style.display = 'flex';// use flex to maintain layout
}

// Navigation buttons
document.getElementById('Subjective').addEventListener('click', () => showScreen('sub'));// shows subjective screen
document.getElementById('Objective').addEventListener('click', () => showScreen('obj'));// shoes objective screen
document.getElementById('play-off').addEventListener('click', () => showScreen('play'));// shows play screen

document.getElementById('continueBtn').addEventListener('click', () => showScreen('continueScreen'));// shows interactive game map screen

document.getElementById('robotData').addEventListener('click', () => {// robot data completion logic
	if (subjectiveCompleted && objectiveCompleted) {// check if both subjective and objective are completed
		showScreen('dataScreen');// gives user acsess to robot data screen
	} else {// if not completed
		alert("Please complete both Objective and Subjective screens before proceeding to Robot Data.");// alert user
	}
});


document.addEventListener("DOMContentLoaded", () => {
	// Back buttons return to main
	document.querySelectorAll('.back-btn').forEach(button => {
		button.addEventListener('click', () => showScreen('main'));
	});

	document.querySelectorAll(".back-btn2").forEach(button => {
		button.addEventListener('click' , ()=> showScreen('main'));
	});
});

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
	  navigator.serviceWorker.register('/sw.js')
		.then(reg => console.log('Service Worker Registered'))
		.catch(err => console.log('Service Worker Registration Failed', err));
	});
  }
  

// Glow effect on buttons
document.addEventListener("DOMContentLoaded", function () {// on document load
	const buttons = document.querySelectorAll("button");// select all buttons
	buttons.forEach(button => {// for each button
		button.addEventListener("mouseenter", () => {// on mouse enter
			button.classList.add("glow");// add glow class
		});

		button.addEventListener("mouseleave", () => {// on mouse leave
			setTimeout(() => {// delay removal of glow class
				button.classList.remove("glow");// remove glow class
			}, 1000); // Glows for 1 second after leaving
		});
	});
});
