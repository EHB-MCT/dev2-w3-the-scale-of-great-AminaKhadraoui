import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
	// 1 JSON inladen
	const data = getAdjectives();
	console.log(data);

	// 2 JSON object maken
	adjectives = JSON.parse(data);
	// 3 render functie oproepen
	render();
	// 4 addSortEvents oproepen
}

function addSortEvents() {}

function addVoteEvents() {
	const upVoteButtons = document.querySelectorAll(".upVoteButton");
	console.log(upVoteButtons);
	upVoteButtons.forEach(function (button) {
		console.log(button);
		button.addEventListener("click", function (event) {
			console.log(event.target.value);
			updateScore(event.target.value, 0.1);
		});
	});
}

function sort() {}

function render() {
	//3.1 foreach aan array toevoegen aan de html
	let html = "";

	adjectives.forEach(function (adjective) {
		let score = "bad";
		if (adjective.score >= 6) {
			score = "good";
		}
		html += `<div class="word-item">
            <span class= "word-score ${score}" >${adjective.score}</span>
            <span>${adjective.word}</span>
            <div class="vote-buttons">
                <button value="${adjective.word}" class="upvote-button">👍</button>
                <button value="${adjective.word}" class="downvote-button">👎</button>
            </div>
        </div>`;
	});
	//3.2 classe toevoegen voor elke score (>= 6 is 'good')

	//3.3 html string toevoegen aan container
	document.querySelector("#container").innerHTML = html;
	addVoteEvents();
}

function upVote(target) {}

function downVote(target) {}

function updateScore(word, scoreChange) {
	const foundIndex = adjectives.findIndex(function (item, index) {
		if (item.word == word) {
			return true;
		}
	});

	if (foundIndex != null) {
		let newScore = adjectives[foundIndex]["score"] + scoreChange;
		adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
	}
}

init();
