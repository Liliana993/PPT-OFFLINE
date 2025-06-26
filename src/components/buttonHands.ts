import { goTo } from "../router/router";
import { state } from "../state/state";

function handleChoice(choice: string) {
  state.addChoice(choice);
  goTo("/game");
}

class ButtonHands extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    // Styles
    this.shadowRoot!.innerHTML = `
    <style>
      .button-hands {
        width: 100%;
        display: flex;
        gap: 40px;
        align-items: end;
        justify-content: space-evenly;
        overflow-y: hidden;
      }

      .button-hands img {
          cursor: pointer;
          transition: all .5s;
      }
    </style>
    `;

    if (this.hasAttribute("is-big")) {
      this.shadowRoot!.innerHTML += `
      <style>
        .button-hands {
          overflow-y: hidden;
          height: 250px;
        }

        .button-hands img {
          transform: translateY(30px) scale(1.4);
        }
        
        .button-hands:hover img {
          opacity: 0.8;
        }

        .button-hands img:hover {
          transform: translateY(-10px) scale(2.2);
          opacity: 1;
        }
      </style>
      `;
    } else {
      this.shadowRoot!.innerHTML += `
      <style>
        
        .button-hands img {
          transform: translateY(30px);
        }

        .button-hands img:hover {
          transform: translateY(2px);
        }
      </style>
      `;
    }
    // Logic
    this.shadowRoot!.innerHTML += `
    <div class="button-hands">
      <img src="./piedra.png" data-type="stone" alt="Icono Piedra">
      <img src="./papel.png" data-type="paper" alt="Icono Papel">
      <img src="./tijera.png" data-type="scissor" alt="Icono Tijera">
    </div>
    `;

    if (this.hasAttribute("is-big")) {
      //? Stone Listener
      const stone = this.shadowRoot!.querySelector('[data-type="stone"]')!;
      stone.addEventListener("click", function () {
        handleChoice("piedra");
      });

      //? Paper Listener
      const paper = this.shadowRoot!.querySelector('[data-type="paper"]')!;
      paper.addEventListener("click", function () {
        handleChoice("papel");
      });

      //? Scissor Listener
      const scissor = this.shadowRoot!.querySelector('[data-type="scissor"]')!;
      scissor.addEventListener("click", function () {
        handleChoice("tijera");
      });
    }
  }
}

customElements.define("button-hands", ButtonHands);