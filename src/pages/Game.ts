import { goTo } from "../router/router";
import { state } from "../state/state";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomHand() {
  const choices = ["piedra", "papel", "tijera"];
  return choices[randomIntFromInterval(0, 2)];
}
function whoWins(player: string, pc: string) {
  // 0 empate, 1 player, 2 pc
  let win: number;
  if (player === pc) {
    win = 0;
  } else if (
    (player === "piedra" && pc === "tijera") ||
    (player === "papel" && pc === "piedra") ||
    (player === "tijera" && pc === "papel")
  ) {
    win = 1;
  } else {
    win = 2;
  }
  return win;
}

const stringsWin = [
  "Empate en la ronda",
  "Ganaste la ronda",
  "Perdiste la ronda",
];

export function runGameOptions() {
  const data = state.getState();
  let { pcWins, playerWins } = data;
  const { playerChoice } = data;
  const pcChoice: string = getRandomHand();
  const winner: number = whoWins(playerChoice, pcChoice);
  if (winner != 0) {
    winner == 1 ? playerWins++ : pcWins++;
  }

  initGame(pcWins, playerWins, winner, pcChoice, playerChoice);

  setTimeout(() => {
   
    if (winner != 0) {
      state.setWinnerRound(winner);
      if (playerWins == 3 || pcWins == 3) {
        state.setWinnerGame();
        goTo("/result");
      } else {
        goTo("/choice");
      }
    } else {
      goTo("/choice");
    }
  }, 3000);
}

function initGame(
  pcWins: number,
  playerWins: number,
  winner: number,
  pcChoice: string,
  playerChoice: string
) {
  const game = document.createElement("section");
  game.classList.add("game");

  //estrella de la pc
  const startTop = document.createElement("div");
  startTop.classList.add("lifes", "lifes-top");
  for (let i = 0; i < pcWins; i++) {
    startTop.innerHTML += `<img src="/star.png" />`;
  }

  //estrella del jugador
  const startBottom = document.createElement("div");
  startBottom.classList.add("lifes", "lifes-bottom");
  for (let i = 0; i < playerWins; i++) {
    startBottom.innerHTML += `<img src="/star.png" />`;
  }

  //agregamos al DOM
  game.appendChild(startTop);
  game.appendChild(startBottom);

  game.innerHTML += `
  <img src="/${pcChoice}.png" class="hand hand-machine" />
  <h2>${stringsWin[winner]}</h2>
  <img src="/${playerChoice || "papel"}.png" class="hand hand-player" />
  `;

  document.querySelector("#app")!.replaceChildren(game);
}