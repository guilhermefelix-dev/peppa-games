const form = document.querySelector("#form-cadastro");
const aviso = document.querySelector("#aviso-cadastro");
const botao = form.querySelector('button[type="submit"]');

ligarMostrarSenha();

form.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim().replace(/\s+/g, " ");
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value;
  const confirmar = document.querySelector("#confirmar").value;

  if (nome.length < 2 || nome.length > 40) {
    mostrarAviso(aviso, "O nome precisa ter entre 2 e 40 caracteres.", true);
  } else if (!emailParece(email)) {
    mostrarAviso(aviso, "Informe um e-mail válido, como nome@exemplo.com.", true);
  } else if (senha.length < 6) {
    mostrarAviso(aviso, "A senha precisa ter pelo menos 6 caracteres.", true);
  } else if (senha !== confirmar) {
    mostrarAviso(aviso, "As senhas não são iguais.", true);
  } else {
    const dados = new FormData();
    dados.append("nome", nome);
    dados.append("email", email);
    dados.append("senha", senha);

    botao.disabled = true;
    mostrarAviso(aviso, "Criando conta...", false);
    const resposta = await postar("registrar.php", dados);
    botao.disabled = false;

    if (resposta.sucesso) {
      mostrarAviso(aviso, "Conta criada! Redirecionando...", false);
      setTimeout(function () { window.location.href = "index.html"; }, 900);
    } else {
      mostrarAviso(aviso, resposta.mensagem, true);
    }
  }
});
