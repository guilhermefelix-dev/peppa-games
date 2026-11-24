const form = document.querySelector("#form-redefinir");
const aviso = document.querySelector("#aviso-redefinir");
const botao = form.querySelector('button[type="submit"]');
const token = new URLSearchParams(window.location.search).get("token") || "";

ligarMostrarSenha();

if (token === "") {
  mostrarAviso(aviso, "Link inválido. Peça um novo em \"Esqueci minha senha\".", true);
  botao.disabled = true;
}

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const senha = document.querySelector("#senha").value;
  const confirmar = document.querySelector("#confirmar").value;

  if (senha.length < 6) {
    mostrarAviso(aviso, "A senha precisa ter pelo menos 6 caracteres.", true);
    return;
  }
  if (senha !== confirmar) {
    mostrarAviso(aviso, "As senhas não são iguais.", true);
    return;
  }

  const dados = new FormData();
  dados.append("token", token);
  dados.append("senha", senha);

  botao.disabled = true;
  mostrarAviso(aviso, "Salvando...", false);
  const resposta = await postar("redefinir-senha.php", dados);

  if (resposta.sucesso) {
    mostrarAviso(aviso, resposta.mensagem + " Redirecionando para o login...", false);
    setTimeout(function () { window.location.href = "login.html"; }, 1800);
  } else {
    botao.disabled = false;
    mostrarAviso(aviso, resposta.mensagem, true);
  }
});
