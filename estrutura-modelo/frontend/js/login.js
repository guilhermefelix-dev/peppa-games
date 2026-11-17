const campoSenha = document.querySelector("#senha");
const botaoMostrar = document.querySelector("#mostrar-senha");

function alternarSenha() {
  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    botaoMostrar.textContent = "Ocultar";
    botaoMostrar.setAttribute("aria-pressed", "true");
  } else {
    campoSenha.type = "password";
    botaoMostrar.textContent = "Mostrar";
    botaoMostrar.setAttribute("aria-pressed", "false");
  }
}

botaoMostrar.addEventListener("click", alternarSenha);

const formLogin = document.querySelector("#form-login");
const campoEmail = document.querySelector("#email");
const avisoLogin = document.querySelector("#aviso-login");

function mostrarAviso(texto, ehErro) {
  avisoLogin.textContent = texto;

  if (ehErro) {
    avisoLogin.classList.add("erro");
  } else {
    avisoLogin.classList.remove("erro");
  }
}

function conferirLogin(evento) {
  evento.preventDefault();

  const email = campoEmail.value.trim();
  const depoisDoArroba = email.split("@")[1];
  const senha = campoSenha.value;

  if (email === "" || senha === "") {
    mostrarAviso("Preencha o e-mail e a senha.", true);
  } else if (!depoisDoArroba || !depoisDoArroba.includes(".")) {
    mostrarAviso(
      "O e-mail precisa ter um domínio, como nome@exemplo.com.",
      true,
    );
  } else if (senha.length < 6) {
    mostrarAviso("A senha precisa ter pelo menos 6 caracteres.", true);
  } else {
    mostrarAviso("Login conferido! Entrando no Peppa Games...", false);

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  }
}

formLogin.addEventListener("submit", conferirLogin);
