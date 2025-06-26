export function initChoice() {
  const choice = document.createElement("section");
  choice.classList.add("choice");

  choice.innerHTML = `
  <counter-time></counter-time>
  <p class="alert hidden">Elige una opción!</p>
  <button-hands is-big></button-hands>
  `;

  setTimeout(() => {
    const alert = document.querySelector(".alert");
    alert?.classList.remove("hidden");
  }, 4000);

  document.querySelector("#app")!.replaceChildren(choice);
}