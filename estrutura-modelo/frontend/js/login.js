const formLogin = document.querySelector("#form-login");
const campoEmail = document.querySelector("#email");
const campoSenha = document.querySelector("#senha");
const campoLembrar = document.querySelector("#lembrar");
const aviso = document.querySelector("#aviso-login");
const botaoEntrar = formLogin.querySelector('button[type="submit"]');

ligarMostrarSenha();

formLogin.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  if (email === "" || senha === "") {
    mostrarAviso(aviso, "Preencha e-mail e senha.", true);
    return;
  }
  if (!emailParece(email)) {
    mostrarAviso(aviso, "O e-mail precisa ter um domínio, como nome@exemplo.com.", true);
    return;
  }

  const dados = new FormData();
  dados.append("email", email);
  dados.append("senha", senha);
  dados.append("lembrar", campoLembrar.checked ? "1" : "0");

  botaoEntrar.disabled = true;
  mostrarAviso(aviso, "Entrando...", false);

  const resposta = await postar("login.php", dados);
  botaoEntrar.disabled = false;

  if (resposta.sucesso) {
    mostrarAviso(aviso, "Login realizado! Redirecionando...", false);
    setTimeout(function () { window.location.href = "index.html"; }, 800);
  } else {
    mostrarAviso(aviso, resposta.mensagem, true);
  }
});
