"use strict";

let userScore = 0;
let botScore = 0;

const userScoreEl = document.querySelector("#user-score");
const botScoreEl = document.querySelector("#bot-score");
const scoresEl = document.querySelector(".scores");
const resultEl = document.querySelector(".result");
const rockEl = document.querySelector("#rock");
const scissorsEl = document.querySelector("#scissors");
const paperEl = document.querySelector("#paper");
const modal = document.getElementById("myModal");
const span = document.querySelector(".close");
const button = document.querySelector("button");
const modalHeader = document.querySelector(".modal-header");
const table = document.querySelector(".table-inner");
let roundResult = "";
let resultCount = 0;
resultEl.innerHTML = "Су - ли - фа";

function getBotChoice() {
  const choices = ["rock", "scissors", "paper"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function rename(choice) {
  switch (choice) {
    case "paper":
      return "Бумага";
    case "scissors":
      return "Ножницы";
    case "rock":
      return "Камень";
  }
}

function win(user, bot) {
  userScore++;
  userScoreEl.innerHTML = userScore;
  botScoreEl.innerHTML = botScore;
  resultEl.innerHTML =
    rename(user) + " круче, чем " + rename(bot) + ". Победа!";
  roundResult = "1:0";
  addToTable(roundResult);
  score();
}
function lose(user, bot) {
  botScore++;
  userScoreEl.innerHTML = userScore;
  botScoreEl.innerHTML = botScore;
  resultEl.innerHTML =
    rename(user) + " хуже, чем " + rename(bot) + ". Проигрыш!";
  roundResult = "0:1";
  addToTable(roundResult);
  score();
}
function draw(user, bot) {
  userScore++;
  botScore++;
  userScoreEl.innerHTML = userScore;
  botScoreEl.innerHTML = botScore;
  resultEl.innerHTML = rename(user) + " = " + rename(bot) + ". Ничья!";
  roundResult = "1:1";
  addToTable(roundResult);
  score();
}

function game(choice) {
  const botChoice = getBotChoice();
  switch (choice + botChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win(choice, botChoice);
      break;
    case "scissorsrock":
    case "rockpaper":
    case "paperscissors":
      lose(choice, botChoice);
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      draw(choice, botChoice);
      break;
  }
}

function main() {
  rockEl.addEventListener("click", function () {
    game("rock");
  });

  scissorsEl.addEventListener("click", function () {
    game("scissors");
  });

  paperEl.addEventListener("click", function () {
    game("paper");
  });
}
main();

function score() {
  if (userScore >= 10 || botScore >= 10) {
    modal.style.display = "block";

    if (userScore === botScore) {
      modalHeader.innerHTML = `Конец игры - ничья. ${userScore}:${botScore} `;
    } else if (userScore > botScore) {
      modalHeader.innerHTML = `Конец игры - побеждает игрок. ${userScore}:${botScore}`;
    } else {
      modalHeader.innerHTML = `Конец игры - побеждает бот. ${userScore}:${botScore}`;
    }

    span.onclick = function () {
      modal.style.display = "none";
      setInitial();
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        setInitial();
      }
    };
    button.onclick = function () {
      setInitial();
      modal.style.display = "none";
    };
  }
}

function setInitial() {
  userScore = 0;
  botScore = 0;
  userScoreEl.innerHTML = userScore;
  botScoreEl.innerHTML = botScore;
  table.innerHTML = "";
}

function addToTable(res) {
  table.innerHTML += `<div class="row">${res}</div>`;
}
