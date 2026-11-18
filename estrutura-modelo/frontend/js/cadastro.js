const campoSenha = document.querySelector("#senha");
const campoConfirmar = document.querySelector("#confirmar-senha");
const botaoMostrar = document.querySelector("#mostrar-senha");

function alternarSenha() {
  let novoTipo;

  if (campoSenha.type === "password") {
    novoTipo = "text";
    botaoMostrar.textContent = "Ocultar";
    botaoMostrar.setAttribute("aria-pressed", "true");
  } else {
    novoTipo = "password";
    botaoMostrar.textContent = "Mostrar";
    botaoMostrar.setAttribute("aria-pressed", "false");
  }

  campoSenha.type = novoTipo;

  if (campoConfirmar) {
    campoConfirmar.type = novoTipo;
  }
}

botaoMostrar.addEventListener("click", alternarSenha);

const formCadastro = document.querySelector("#form-cadastro");
const campoUsuario = document.querySelector("#usuario");
const campoEmail = document.querySelector("#email");
const campoTermos = document.querySelector("#termos");
const avisoCadastro = document.querySelector("#aviso-cadastro");

function mostrarAviso(texto, ehErro) {
  avisoCadastro.textContent = texto;

  if (ehErro) {
    avisoCadastro.classList.add("erro");
  } else {
    avisoCadastro.classList.remove("erro");
  }
}

function conferirCadastro(evento) {
  evento.preventDefault();

  let usuario = campoUsuario.value.trim();
  while (usuario.includes("  ")) {
    usuario = usuario.replace("  ", " ");
  }
  campoUsuario.value = usuario;

  const email = campoEmail.value.trim();
  const depoisDoArroba = email.split("@")[1];
  const senha = campoSenha.value;
  const confirmar = campoConfirmar.value;

  if (usuario.length < 3 || usuario.length > 30) {
    mostrarAviso(
      "O nome de usuário precisa ter entre 3 e 30 caracteres.",
      true,
    );
  } else if (!depoisDoArroba || !depoisDoArroba.includes(".")) {
    mostrarAviso(
      "O e-mail precisa ter um domínio, como nome@exemplo.com.",
      true,
    );
  } else if (senha.length < 6) {
    mostrarAviso("A senha precisa ter pelo menos 6 caracteres.", true);
  } else if (senha !== confirmar) {
    mostrarAviso("As senhas não são iguais. Digite de novo.", true);
  } else if (!campoTermos.checked) {
    mostrarAviso("Você precisa aceitar os termos de uso.", true);
  } else {
    mostrarAviso("Conta criada! Agora é só entrar.", false);

    setTimeout(function () {
      window.location.href = "login.html";
    }, 1500);
  }
}

formCadastro.addEventListener("submit", conferirCadastro);
