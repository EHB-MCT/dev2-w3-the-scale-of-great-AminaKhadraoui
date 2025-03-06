import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
	//JSON inladen
	const data = getAdjectives();
	console.log(data);
	//JSON in object veranderen
	adjectives = JSON.parse(data);
	//reder functie oproepen
	render();
	//addsortevents oproepen
	addSortEvents();
}

function addSortEvents() {
	//code van Joni uit GitHub
	document
		.querySelector("#sort-up")
		.addEventListener("click", function (event) {
			this.classList.add("active");
			document.querySelector("#sort-down").classList.remove("active");
			console.log("Sort up!");
			sortDirection = "up";
			sort();
		});

	document.querySelector("#sort-down").addEventListener("click", function () {
		this.classList.add("active");
		document.querySelector("#sort-up").classList.remove("active");
		console.log("Sort down!");
		sortDirection = "down";
		sort();
	});
}

function addVoteEvents() {
	/*const upVoteButtons = document.querySelectorAll(".upvote-button");
	console.log(upVoteButtons);
	upVoteButtons.forEach(function (button) {
		button.addEventListener("click", function (event) {
			console.log(event.target.value);
			updateScore(event.target.value, 0.1);
		});
	});*/

	//code van Joni uit GitHub
	const upvoteButtons = document.querySelectorAll(".upvote-button");
	upvoteButtons.forEach(function (button) {
		button.addEventListener("click", function (event) {
			console.log(event.target);
			upVote(event.target);
		});
	});

	const downvoteButtons = document.querySelectorAll(".downvote-button");
	downvoteButtons.forEach(function (button) {
		button.addEventListener("click", function (event) {
			console.log(event.target);
			downVote(event.target);
		});
	});
}

function sort() {
	//code van joni uit GitHub
	console.log("This is the sorting function");

	if (sortDirection == "down") {
		adjectives.sort(function (a, b) {
			if (a.score > b.score) {
				return -1;
			} else {
				return 1;
			}
		});
	} else {
		adjectives.sort(function (a, b) {
			if (a.score > b.score) {
				return 1;
			} else {
				return -1;
			}
		});
	}

	render();
}

function render() {
	// foreach voor de array toevoegen aan de html
	let html = "";
	let score;
	console.log(adjectives);

	adjectives.forEach(function (adjective) {
		// classe toevoegen voor elke score (>= 6 is 'good')
		let scoreClass = "bad";
		if (adjective.score >= 6) {
			scoreClass = "good";
		}

		html += `  
        <div class="word-item">
            <span class= "word-score ${scoreClass}" >${adjective.score}</span>
            <span>${adjective.word}</span>
            <div class="vote-buttons">
                <button value="${adjective.word}" class="upvote-button">👍</button>
                <button value="${adjective.word}" class="downvote-button">👎</button>
            </div>
        </div>
        `;
	});

	// HTML string toevoegen aan #container
	document.querySelector("#container").innerHTML = html;
	//addVoteEvents oproepen
	addVoteEvents();
}

function upVote(target) {
	//code van Joni uit GitHub
	console.log("Upvote", target.value);
	updateScore(target.value, 0.1);
	render();
}

function downVote(target) {
	//code van Joni uit GitHub
	console.log("Downvote", target.value);
	updateScore(target.value, -0.1);
	render();
}

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
