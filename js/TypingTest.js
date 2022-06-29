let TIME_LIMIT = 60;

let typingText_array = [
	"The greatest glory in living lies not in never falling, but in rising every time we fall.",
	"The way to get started is to quit talking and begin doing.",
	"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
	"If life were predictable it would cease to be life, and be without flavor.",
	"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
	"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
	"Life is what happens when you're busy making other plans."
];

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let typing_text = document.querySelector(".typingText");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_text = "";
let textNo = 0;
let timer = null;

function updateText() {
	typing_text.textContent = null;
	current_text = typingText_array[textNo];

	current_text.split('').forEach(char => {
		const charSpan = document.createElement('span');
		charSpan.innerText = char;
		typing_text.appendChild(charSpan);
	});

	if (textNo < typingText_array.length - 1)
		textNo++;
	else
		textNo = 0;
}

function processCurrentText() {
	curr_input = input_area.value;
	curr_input_array = curr_input.split('');

	characterTyped++;

	textSpanArray = typing_text.querySelectorAll('span');
	textSpanArray.forEach((char, index) => {
		let typeChar = curr_input_array[index];

		if (typeChar == null) {
			char.classList.remove('correct_char');
			char.classList.remove('incorrect_char');
		}
		else if (typeChar === char.innerText) {
			char.classList.add('correct_char');
			char.classList.remove('incorrect_char');
		}
		else {
			char.classList.add('incorrect_char');
			char.classList.remove('correct_char');
			errors++;
		}
	});

	error_text.textContent = total_errors + errors;

	let correctCharacters = (characterTyped - (total_errors + errors));
	let accuracyVal = ((correctCharacters / characterTyped) * 100);
	accuracy_text.textContent = Math.round(accuracyVal);

	if (curr_input.length == current_text.length) {
		updateText();
		total_errors += errors;
		input_area.value = "";
	}
}

function start() {
	restart();
	updateText();

	clearInterval(timer);
	timer = setInterval(updateTimer, 1000);
}

function restart() {
	timeLeft = TIME_LIMIT;
	timeElapsed = 0;
	errors = 0;
	total_errors = 0;
	accuracy = 0;
	characterTyped = 0;
	textNo = 0;
	input_area.disabled = false;

	input_area.value = "";
	typing_text.textContent = 'Click on the area below to start the typing test.';
	accuracy_text.textContent = 100;
	timer_text.textContent = timeLeft + "s";
	error_text.textContent = 0;
	restart_btn.style.display = "none";
	cpm_group.style.display = "none";
	wpm_group.style.display = "none";
}

function updateTimer() {
	if (timeLeft > 0) {
		timeLeft--;

		timeElapsed++;

		timer_text.textContent = timeLeft + "s";
	}
	else {
		finiishTest();
	}
}

function finiishTest() {
	clearInterval(timer);

	input_area.disabled = true;

	typing_text.textContent = "Click on restart to start again.";

	restart_btn.style.display = "block";

	cpm = Math.round(((characterTyped / timeElapsed) * 60));
	wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

	cpm_text.textContent = cpm;
	wpm_text.textContent = wpm;

	cpm_group.style.display = "block";
	wpm_group.style.display = "block";
}