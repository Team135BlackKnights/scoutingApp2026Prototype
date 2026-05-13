// Subjective submit logic and objective logic
document.getElementById('submitSubjective').addEventListener('click', () => {
	const ObjectiveMatchNumber = document.getElementById("ObjectiveMatchNumber").value; // Added to get Objective Match Number 
	const ScoutersNameObjective = document.getElementById("ScoutersNameObjective").value;// Added to get Scouters Name
	const ObjectiveTeamNumber = document.getElementById("ObjectiveTeamNumber").value;// Added to get Objective Team Number

	const teamNumber = document.getElementById('teamNumber').value;// Get Team Number
	const teamNumber2 = document.getElementById('teamNumber2').value;// Get the second Team Number
	const teamNumber3 = document.getElementById('teamNumber3').value;// get the third Team Number
	const matchNumber = document.getElementById('matchNumber').value;// get the match number

	const strategyNotes = document.getElementById('strategyNotes').value;// get the strategy notes from subjective
	const driverSkill = document.getElementById('driverSkill').value;// get the driver skill from sunjective
	const communication = document.getElementById('communication').value;//get the communication from subjective
	const reliability = document.getElementById('reliability').value;// get the reliability from subjective



	const selectedAlliance = document.getElementById('redAlliance').classList.contains('selected') ? 'Red' :// check if red alliance is selected subjective
		document.getElementById('blueAlliance').classList.contains('selected') ? 'Blue' :// check if blue alliance is selected subjective
			'None';// if none are selected, return none

	const selectedAlliance2 = document.getElementById('ObjectiveRedAllience').classList.contains('selected') ? 'Red' :// check if red alliance is selected objective
		document.getElementById('ObjectiveBlueAllience').classList.contains('selected') ? 'Blue' :// check if blue alliance is slected objective
			'None';// if none are slected , return none


	if (!teamNumber) {// if team number is not entered
		alert("Please enter a team number.");// alert user
		return;// makes the user fill out the required feilds
	} else if (!strategyNotes) {// if strategy notes is not enterd 
		alert("Please enter the team's strategy.");// alert user
		return;// makes the user fill out the required feilds
	}
	else if (selectedAlliance === 'None') {// if no alliance is selected
		alert("Please select an alliance color.");// alert user
		return;// makes the user fill out the required feilds
	}
	else if (!matchNumber) {// if match number is not entered
		alert("please enter a match number.");// alert user
		return;// makes the user fill out the required feilds
	}
	else if (!ObjectiveTeamNumber) {// if objective team number is not entered
		alert("please enter the Objective Team Number.");// alert user
		return;// makes the user fill out the requried feilds
	}
	else if (!ObjectiveMatchNumber) {// if objective match number is not entered
		alert("please enter the Objective Match Number.");// alert user
		return;// makes the user fill out the required fields
	}
	else if (selectedAlliance2 === 'None') {// if no objective alliance is slected
		alert("please select the Objective alliance color.");// alert user
		return;// makes the user fill out the required fields
	}
	else if (!ScoutersNameObjective) {// if scouters name is not entered
		alert("please enter the Scouters Name.");// alert user
		return;// makes the user fill out the requred fields
	}

	// Score buttons
	const scores = Array.from(document.querySelectorAll('#score-buttons button'))// sekects all buttons within the score-buttons container and creates an array from the nodelist
		.map(button => ({// maps each button to an object with the original text and count of the button
			name: button.dataset.originalText,// gets the original text of the button from the data atribute 
			count: parseInt(button.dataset.count)// gets the count of the button from the data atribute and parses it to an integer
		}))
		.reduce((acc, { name, count }) => {// reduces the array of button objects to an object with the button names as keys and counts as values
			acc[name] = count;// sets the key of the button name to the count of the button in the accumulator object 
			return acc;// returns the accumulator object for the next iteration of the reduce function 
		}, {}
		);

	/* 
		Something about this data we should mention, if you add TOO MUCH data, the QRCode will fail to scan (at least for my Samsung S23 Phone)
		The QRCode Module we're using is a bit outdated so it can't make a QRCode if it's above a certain threshold despite having space.
			- Eliana
	*/

	// Had to seperate the QR Codes so they can be scanable easily
	// - Eliana
	const subjectiveData = {// creates list of data to be stored in qr code
		teamInfo: {
			matchNumber,
			teamNumber,
			teamNumber2,
			teamNumber3,
			selectedAlliance,
			strategyNotes,
			driverSkill,
			communication,
			reliability,
		},
		scores
	};

	const objectiveData = {
		ObjectiveMatchNumber,
		ObjectiveTeamNumber,
		ScoutersNameObjective,
		selectedAlliance2,
	}


	console.log("Subjective Data Submitted:", subjectiveData);// log the data to console for testing
	alert("Subjective data saved!");// alert user
	subjectiveCompleted = true;// set subjective completed to true

	console.log("Updating QRCodes!")// log to console for testing

	// Clear previous QR code
	const objectiveContainer = document.getElementById('objQRCode');// get the objective qr code container
	const subjectiveContainer = document.getElementById('subQRCode');// get the subjective qr code container 
	objectiveContainer.innerHTML = '';// clear the objective qr code container 
	subjectiveContainer.innerHTML = '';// clear the subjective qr code container 

	// Subjective QR Code
	new QRCode(subjectiveContainer, {// creates a new qr code in the subjective qr code container with the data from subjectiveData
		text: JSON.stringify(subjectiveData),// converts the subjectiveData object to a JSON string to be stored in the qr code 
		width: 208,// sets the width of thr qr code to 208 pixels
		height: 228,// sets the height of the qr code to 228 pixels
		colorDark: "#000000",// sets the dark color of the qr code to black
		colorLight: "#ffffff",// sets the light color of the qr code to white
		correctLevel: QRCode.CorrectLevel.L// sets the error correction level of the qr code to Low, wich can store more data but is less resistant to damage than higher error correction levels 
	});

	// Objective QR Code
	new QRCode(objectiveContainer, {
		text: JSON.stringify(objectiveData),
		width: 208,
		height: 228,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.L
	});
});

// Objective submit logic
document.getElementById('submitObjective').addEventListener('click', () => {// objective submit button logic
	// Add validation here if needed
	alert("Objective data saved!");// alert user
	objectiveCompleted = true;// set objective completed to true
	console.log("objective data submitted"); // log to console for testing
});