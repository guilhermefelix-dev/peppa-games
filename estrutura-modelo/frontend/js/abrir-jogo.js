const cartoesDoCatalogo = document.querySelectorAll(".jogo");
const listaDoCatalogo = document.querySelector(".lista-jogos");

function abrirPaginaDoJogo(slug) {
  window.location.href = "jogo.html?id=" + encodeURIComponent(slug);
}

function ligarCartao(cartao) {
  const titulo = cartao.querySelector("h3").textContent.trim();
  const jogo = JOGOS.find(function (item) {
    return item.titulo === titulo;
  });

  if (!jogo) {
    return;
  }

  cartao.tabIndex = 0;
  cartao.classList.add("jogo-clicavel");
  cartao.title = "Dê dois cliques para abrir a página do jogo";

  cartao.addEventListener("dblclick", function () {
    abrirPaginaDoJogo(jogo.slug);
  });

  cartao.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      abrirPaginaDoJogo(jogo.slug);
    }
  });
}

for (let i = 0; i < cartoesDoCatalogo.length; i++) {
  ligarCartao(cartoesDoCatalogo[i]);
}

const dicaDoCatalogo = document.createElement("p");
dicaDoCatalogo.className = "contador";
dicaDoCatalogo.textContent = "Dê dois cliques em um jogo para abrir a página dele e ver fotos, dicas e comentários.";
listaDoCatalogo.before(dicaDoCatalogo);

const botaoDoTema = document.querySelector("#botao-tema");
const linkDoTemaClaro = document.querySelector("#tema-claro");

try {
  if (localStorage.getItem("peppa_tema") === "claro") {
    linkDoTemaClaro.disabled = false;
    botaoDoTema.textContent = "Tema escuro";
  }
} catch (erro) {
  linkDoTemaClaro.disabled = true;
}

botaoDoTema.addEventListener("click", function () {
  try {
    localStorage.setItem("peppa_tema", linkDoTemaClaro.disabled ? "escuro" : "claro");
  } catch (erro) {
    return;
  }
});