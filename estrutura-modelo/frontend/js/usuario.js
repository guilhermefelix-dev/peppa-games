
(async function () {
  const lista = document.querySelector("nav ul");
  if (!lista) return;

  let sessao = { logado: false };
  try {
    const r = await fetch("../backend/sessao.php");
    sessao = await r.json();
  } catch (e) {
    return; 
  }

  const item = document.createElement("li");
  if (sessao.logado) {
    const span = document.createElement("span");
    span.textContent = "Olá, " + sessao.usuario.nome + " · ";
    const sair = document.createElement("a");
    sair.href = "#";
    sair.textContent = "Sair";
    sair.addEventListener("click", async function (evento) {
      evento.preventDefault();
      await fetch("../backend/logout.php", { method: "POST" });
      window.location.reload();
    });
    item.append(span, sair);

    const saudacao = document.querySelector("#saudacao");
    if (saudacao) {
      saudacao.textContent = "Olá, " + sessao.usuario.nome + "! Bem-vindo à comunidade Peppa Games.";
    }
  } else {
    const entrar = document.createElement("a");
    entrar.href = "login.html";
    entrar.textContent = "Entrar";
    item.append(entrar);
  }
  lista.append(item);
})();
