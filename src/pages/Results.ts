import { state } from "../state/state";

export function initResult() {
  //? Traemos la info del state y renderizamos
  const data = state.getState();

  let classOverlay = "overlay__win";
  if (data.pcWins === 3) classOverlay = "overlay__lose";

  const result = document.createElement("div");
  result.classList.add("overlay", classOverlay);

  result.innerHTML = `
   <div class="container overlay__container">
    <div class="star star--outside">
      <div class="star star--inside">${data.resultGame}</div>
    </div>
    <div class="score">
      <h3>Resultados</h3>
      <h4>Tú: ${data.playerWins}</h4>
      <h4>PC: ${data.pcWins}</h4>
    </div>
   
    <button-el to="/choice" reset>Volver a jugar</button-el> 
  </div>
  `;

  document.querySelector("#app")!.appendChild(result);
}