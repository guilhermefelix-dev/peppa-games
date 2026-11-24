
const API_AUTH = "../backend/";

function mostrarAviso(elemento, texto, ehErro) {
  elemento.textContent = texto;
  elemento.classList.toggle("erro", ehErro);
}


async function postar(arquivo, dados) {
  try {
    const resposta = await fetch(API_AUTH + arquivo, { method: "POST", body: dados });
    return await resposta.json();
  } catch (e) {
    return { sucesso: false, mensagem: "Não foi possível falar com o servidor. Verifique se o XAMPP (Apache e MySQL) está ligado." };
  }
}

function ligarMostrarSenha() {
  document.querySelectorAll(".mostrar-senha").forEach(function (botao) {
    botao.addEventListener("click", function () {
      const campo = botao.parentElement.querySelector("input");
      const mostrando = campo.type === "text";
      campo.type = mostrando ? "password" : "text";
      botao.textContent = mostrando ? "Mostrar" : "Ocultar";
      botao.setAttribute("aria-pressed", String(!mostrando));
    });
  });
}

function emailParece(email) {
  const depois = email.split("@")[1];
  return email.includes("@") && depois && depois.includes(".");
}
