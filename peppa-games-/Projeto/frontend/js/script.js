// ===========================================================================
// ARA0062 — comportamento da página Peppa Games
//
// Ligado ao index.html por <script src="js/script.js" defer></script>.
// O JavaScript decide QUANDO algo muda; o CSS (estilo.css) decide COMO fica.
//
// Seções:
//   1. Saudação pela hora ............ if / else if / else      (aula 06)
//   2. Botão que troca o tema ........ evento click, função      (aula 06)
//   3. Busca e filtro dos jogos ...... for, &&, switch           (aulas 06 e 07)
//   4. Formulário de contato ......... submit, if, ||, &&, for, break, while (aulas 06 e 07)
// ===========================================================================


// ---------------------------------------------------------------------------
// 1. SAUDAÇÃO PELA HORA
// Roda uma vez, quando a página carrega. A hora é a do computador de quem visita.
// ---------------------------------------------------------------------------
const saudacao = document.querySelector("#saudacao");

const hora = new Date().getHours();
let cumprimento;

if (hora < 12) {
  cumprimento = "Bom dia";
} else if (hora < 18) {
  cumprimento = "Boa tarde";
} else {
  cumprimento = "Boa noite";
}

saudacao.textContent = `${cumprimento}, gamer! Bem-vindo à comunidade Peppa Games.`;


// ---------------------------------------------------------------------------
// 2. BOTÃO QUE TROCA O TEMA
// O <link> do tema2.css começa com "disabled". O clique liga e desliga.
// ---------------------------------------------------------------------------
const botaoTema = document.querySelector("#botao-tema");
const temaClaro = document.querySelector("#tema-claro");

function trocarTema() {
  temaClaro.disabled = !temaClaro.disabled;   // ! = "o contrário": é um interruptor

  if (temaClaro.disabled) {
    botaoTema.textContent = "Tema claro";
  } else {
    botaoTema.textContent = "Tema escuro";
  }
}

// trocarTema SEM parênteses: entregamos a função ao navegador, que chama a cada clique.
botaoTema.addEventListener("click", trocarTema);


// ---------------------------------------------------------------------------
// 3. BUSCA E FILTRO DOS JOGOS
// Cada jogo é um <article class="jogo" data-genero="...">. O script percorre todos
// e esconde (classe "oculto") os que não combinam com a busca E com o gênero.
// ---------------------------------------------------------------------------
const campoBusca = document.querySelector("#busca");
const campoGenero = document.querySelector("#filtro-genero");
const resultadoBusca = document.querySelector("#resultado-busca");
const cartoesJogos = document.querySelectorAll(".jogo");

function filtrarJogos() {
  const busca = campoBusca.value.trim().toLowerCase();
  const genero = campoGenero.value;
  let visiveis = 0;

  for (let i = 0; i < cartoesJogos.length; i++) {
    const cartao = cartoesJogos[i];
    const nomeDoJogo = cartao.querySelector("h3").textContent.toLowerCase();

    const bateNome = nomeDoJogo.includes(busca);
    const bateGenero = genero === "todos" || cartao.dataset.genero === genero;

    if (bateNome && bateGenero) {          // && : os DOIS precisam ser verdadeiros
      cartao.classList.remove("oculto");
      visiveis++;
    } else {
      cartao.classList.add("oculto");
    }
  }

  switch (visiveis) {
    case 0:
      resultadoBusca.textContent = "Nenhum jogo encontrado.";
      break;
    case 1:
      resultadoBusca.textContent = "1 jogo encontrado.";
      break;
    default:
      resultadoBusca.textContent = `${visiveis} jogos encontrados.`;
  }
}

campoBusca.addEventListener("input", filtrarJogos);    // a cada tecla
campoGenero.addEventListener("change", filtrarJogos);  // quando a escolha termina
filtrarJogos();                                        // COM parênteses: roda já, ao abrir


// ---------------------------------------------------------------------------
// 4. FORMULÁRIO DE CONTATO
// ---------------------------------------------------------------------------
const formulario = document.querySelector("#form-contato");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoAssunto = document.querySelector("#assunto");
const campoMensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");
const aviso = document.querySelector("#aviso");

// 4.1 — dica da mensagem muda conforme o assunto (switch)
function trocarDica() {
  switch (campoAssunto.value) {
    case "duvida":
      campoMensagem.placeholder = "Qual é a sua dúvida?";
      break;
    case "sugestao":
      campoMensagem.placeholder = "Qual jogo você quer ver no catálogo e por quê?";
      break;
    case "feedback":
      campoMensagem.placeholder = "Conte sua experiência com o jogo: o que gostou e o que não gostou.";
      break;
    default:
      campoMensagem.placeholder = "Escreva a sua mensagem.";
  }
}

campoAssunto.addEventListener("change", trocarDica);
trocarDica();

// 4.2 — contador de caracteres (evento input)
function contarCaracteres() {
  const restam = campoMensagem.maxLength - campoMensagem.value.length;
  contador.textContent = `Restam ${restam} caracteres`;

  if (restam < 50) {
    contador.classList.add("alerta");
  } else {
    contador.classList.remove("alerta");
  }
}

campoMensagem.addEventListener("input", contarCaracteres);

// 4.3 — função que devolve true/false: o nome tem algum número? (for + break + return)
function temNumero(texto) {
  let achou = false;

  for (let i = 0; i < texto.length; i++) {
    if ("0123456789".includes(texto[i])) {
      achou = true;
      break;               // achou o primeiro número: não precisa olhar o resto
    }
  }

  return achou;
}

// 4.4 — mostra a mensagem na tela. "erro" liga a cor de erro no CSS.
function mostrarAviso(texto, ehErro) {
  aviso.textContent = texto;

  if (ehErro) {
    aviso.classList.add("erro");
  } else {
    aviso.classList.remove("erro");
  }
}

// 4.5 — a conferência, quando o formulário vai ser enviado (evento submit)
// O HTML já confere o que ele sabe (required, type="email", maxlength).
// Aqui ficam as regras que só o JavaScript sabe conferir.
function conferirFormulario(evento) {
  evento.preventDefault();   // não envia e não recarrega: a função decide primeiro

  // tira espaços das pontas e transforma espaços duplos em um só (while)
  let nome = campoNome.value.trim();
  while (nome.includes("  ")) {
    nome = nome.replace("  ", " ");
  }
  campoNome.value = nome;

  const email = campoEmail.value.trim();
  const depoisDoArroba = email.split("@")[1];   // o que vem depois do @
  const mensagem = campoMensagem.value.trim();

  // fila de regras: o if para no primeiro verdadeiro, então o aviso mostra UM problema por vez
  if (nome.length < 3 || nome.length > 60) {
    mostrarAviso("O nome precisa ter entre 3 e 60 letras.", true);
  } else if (temNumero(nome)) {
    mostrarAviso("O nome não pode ter números.", true);
  } else if (!depoisDoArroba || !depoisDoArroba.includes(".")) {
    mostrarAviso("O e-mail precisa ter um domínio, como nome@exemplo.com.", true);
  } else if (campoAssunto.value === "feedback" && mensagem.length < 20) {
    mostrarAviso("Conte mais sobre a sua experiência (mínimo 20 caracteres).", true);
  } else {
    // Tudo certo. Quando o PHP entrar (ciclo 8), é aqui que o formulário será enviado
    // de verdade, e o action vai apontar para ../backend/processa-contato.php
    mostrarAviso("Tudo certo! Sua mensagem foi conferida. (No ciclo 8, ela vai para o PHP.)", false);
  }
}

formulario.addEventListener("submit", conferirFormulario);
