const form = document.querySelector("#form-esqueci");
const aviso = document.querySelector("#aviso-esqueci");
const areaLink = document.querySelector("#link-dev");
const botao = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  areaLink.replaceChildren();

  const email = document.querySelector("#email").value.trim();
  if (!emailParece(email)) {
    mostrarAviso(aviso, "Informe um e-mail válido, como nome@exemplo.com.", true);
    return;
  }

  const dados = new FormData();
  dados.append("email", email);

  botao.disabled = true;
  mostrarAviso(aviso, "Enviando...", false);
  const resposta = await postar("esqueci-senha.php", dados);
  botao.disabled = false;

  mostrarAviso(aviso, resposta.mensagem, !resposta.sucesso);

  // Só existe em modo de desenvolvimento (XAMPP não envia e-mail).
  if (resposta.sucesso && resposta.link_dev) {
    const a = document.createElement("a");
    a.href = resposta.link_dev;
    a.textContent = "Clique aqui para criar a nova senha";
    areaLink.append(a);
  }
});
