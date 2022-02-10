const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = 0;
// score of two players: [1] for player1, [2] for player2
let score = [null, 0, 0]
// string representation of two players: [1] for player1, [2] for player2
let playerStates = [null, "p1", "p2"];
// 1 for player1, 2 for player2
let player = 1;

/**
 * Executed when hold button is clicked
 */
function hold() {
  // add hold value to player's score
  score[player] += holdValue;
  setScore(score[player], score[player], score[player])

  // reset holdValue to 0
  holdValue = 0;
  setHoldValue(holdValue);

  checkEndGame();
  swicthPlayer();
}

/**
 * Executed when roll button is clicked
 */
function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue  - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;
  
  // reset holdValue and switch player if 1 is rolled
  if (faceValue == 1) {
    holdValue = 0;
    setHoldValue(holdValue);
    
    swicthPlayer();
    return;
  }

  holdValue += faceValue;
  setHoldValue(holdValue);
  checkEndGame();
}

/**
 * Switch between 2 players
 */
function swicthPlayer() {
  player = player % 2 + 1;
  document.getElementById("result").innerText = "Player-" + player + " turn!";
}

/**
 * Check if score+hold >= 100, end game if true, do nothing otherwise
 */
function checkEndGame() {
  if (score[player] + holdValue >= 100) {
    document.getElementById("roll").disabled = true;
    document.getElementById("hold").disabled = true;
    document.getElementById("result").innerText = "Player-" + player + " won!";

    setHoldValue(0);
    score[player] = 100;

    setScore(score[player], score[player], score[player] + " 🎉");
    document.getElementById(playerStates[player] + "-score").classList.add("bg-success");
    return;
  }
  return;
}


/**
 * Set hold value bar accordingly
 * @param {Number} value Number updated to
 */
function setHoldValue(value) {
  document.getElementById(playerStates[player]+"-hold").style.width = value + "%";
  document.getElementById(playerStates[player]+"-hold").setAttribute("aria-valuenow", value);
  document.getElementById(playerStates[player]+"-hold").innerText = value;
}

/**
 * Set score value bar accordingly
 * @param {Number} width width of bar
 * @param {Number} value aria-valuenow of bar
 * @param {String} text innerText of bar
 */
function setScore(width, value, text) {
  document.getElementById(playerStates[player] + "-score").style.width = width + "%";
  document.getElementById(playerStates[player] + "-score").setAttribute("aria-valuenow", value);
  document.getElementById(playerStates[player] + "-score").innerText = text;
}