const formulario = document.querySelector(".formulario");
const input = document.getElementById("AddItem");
const lista = document.getElementById("Minhalista");
const alerta = document.getElementById("alerta");
const fecharAlerta = document.getElementById("fechar-alerta");

let timer;

function adicionarItem(e) {
  e.preventDefault();

  const textoItem = input.value.trim();

  if (textoItem === "") {
    alert("Por favor, digite alguma coisa antes de adicionar!");
    input.focus();
    return;
  }

  const novoLi = document.createElement("li");
  novoLi.className = "item";
  novoLi.innerHTML = `
    <label class="item-left">
      <input type="checkbox" class="checkbox" />
      <span></span>
      <button type="button" class="delet" aria-label="Excluir item">
        <img src="./assets/trash.svg" alt="">
      </button>
    </label>
  `;

  novoLi.querySelector("span").textContent = textoItem;

  lista.appendChild(novoLi);
  input.value = "";
  input.focus();
}

formulario.addEventListener("submit", adicionarItem);

lista.addEventListener("click", (e) => {
  const btnExcluir = e.target.closest(".delet");
  if (!btnExcluir) return;

  btnExcluir.closest(".item").remove();

  alerta.classList.add("mostrar");
  clearTimeout(timer);
  timer = setTimeout(() => alerta.classList.remove("mostrar"), 1000);
});

fecharAlerta.addEventListener("click", () => {
  alerta.classList.remove("mostrar");
});

lista.addEventListener("change", (e) => {
  if (!e.target.classList.contains("checkbox")) return;

  e.target.closest(".item").classList.toggle("concluido", e.target.checked);
});