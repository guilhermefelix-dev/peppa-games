const API = "../backend/";
const LIMITE_FOTO = 3 * 1024 * 1024;
const MENSAGEM_CONEXAO = "Erro de conexão: não foi possível alcançar o servidor. Verifique se o XAMPP está ligado.";

const parametros = new URLSearchParams(window.location.search);
const jogo = JOGOS.find(function (item) {
  return item.slug === parametros.get("id");
});

const botaoTema = document.querySelector("#botao-tema");
const temaClaro = document.querySelector("#tema-claro");
const tituloJogo = document.querySelector("#titulo-jogo");
const detalhes = document.querySelector("#detalhes");

function lerLocal(chave) {
  try {
    return localStorage.getItem(chave);
  } catch (erro) {
    return null;
  }
}

function gravarLocal(chave, valor) {
  try {
    localStorage.setItem(chave, valor);
  } catch (erro) {
    return;
  }
}

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

function mostrarAviso(elemento, texto, ehErro) {
  elemento.textContent = texto;

  if (ehErro) {
    elemento.classList.add("erro");
  } else {
    elemento.classList.remove("erro");
  }
}

function aplicarTema(claro) {
  temaClaro.disabled = !claro;
  botaoTema.textContent = claro ? "Tema escuro" : "Tema claro";
}

aplicarTema(lerLocal("peppa_tema") === "claro");

botaoTema.addEventListener("click", function () {
  const claro = temaClaro.disabled;
  aplicarTema(claro);
  gravarLocal("peppa_tema", claro ? "claro" : "escuro");
});

function obterToken() {
  let token = lerLocal("peppa_token");

  if (!token) {
    if (window.crypto && window.crypto.randomUUID) {
      token = window.crypto.randomUUID();
    } else {
      token = "t" + Date.now().toString(16) + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
    }

    gravarLocal("peppa_token", token);
  }

  return token;
}

function nomeSalvo() {
  return lerLocal("peppa_nome") || "";
}

function limparNome(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function formatarData(texto) {
  const data = new Date(texto.replace(" ", "T"));

  if (isNaN(data.getTime())) {
    return texto;
  }

  return data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

async function pedirJson(url, opcoes) {
  const resposta = await fetch(url, opcoes);
  return resposta.json();
}

function mostrarJogoNaoEncontrado() {
  document.title = "Jogo não encontrado — Peppa Games";
  tituloJogo.textContent = "Jogo não encontrado";

  const aviso = criar("p", "aviso erro", "Não encontramos esse jogo no catálogo. ");
  const link = criar("a", null, "Voltar para a lista de jogos");
  link.href = "index.html#jogos";
  aviso.append(link);
  detalhes.append(aviso);

  document.querySelectorAll(".so-com-jogo").forEach(function (secao) {
    secao.classList.add("oculto");
  });
}

function mostrarDetalhes() {
  document.title = jogo.titulo + " — Peppa Games";
  tituloJogo.textContent = jogo.titulo;

  const capa = criar("img", "capa-jogo");
  capa.src = jogo.capa;
  capa.alt = "Capa do jogo " + jogo.titulo;

  const info = criar("div");
  const ficha = criar("dl", "ficha");

  [
    ["Gênero", jogo.genero],
    ["Plataformas", jogo.plataformas],
    ["Desenvolvedora", jogo.desenvolvedora],
    ["Lançamento", jogo.lancamento]
  ].forEach(function (par) {
    ficha.append(criar("dt", null, par[0]), criar("dd", null, par[1]));
  });

  const descricao = criar("div", "descricao-jogo");
  jogo.descricao.forEach(function (paragrafo) {
    descricao.append(criar("p", null, paragrafo));
  });

  info.append(ficha, descricao);
  detalhes.append(capa, info);
}

function iniciarFotos() {
  const galeria = document.querySelector("#galeria");
  const formFoto = document.querySelector("#form-foto");
  const campoNome = document.querySelector("#foto-nome");
  const campoArquivo = document.querySelector("#foto-arquivo");
  const avisoFoto = document.querySelector("#aviso-foto");
  const visualizador = document.querySelector("#visualizador");
  const fotoAmpliada = document.querySelector("#foto-ampliada");
  const legendaFoto = document.querySelector("#legenda-foto");
  const botaoFechar = document.querySelector("#fechar-foto");

  campoNome.value = nomeSalvo();

  function ampliar(foto) {
    fotoAmpliada.src = foto.url;
    fotoAmpliada.alt = "Foto enviada por " + foto.autor;
    legendaFoto.textContent = "Enviada por " + foto.autor;
    visualizador.showModal();
  }

  function mostrarFotos(fotos) {
    galeria.replaceChildren();

    if (fotos.length === 0) {
      galeria.append(criar("p", "contador vazio", "Ainda não há fotos deste jogo. Seja o primeiro a enviar uma!"));
      return;
    }

    fotos.forEach(function (foto) {
      const figura = criar("figure", "foto");
      const botao = criar("button", "foto-botao");
      botao.type = "button";
      botao.setAttribute("aria-label", "Ampliar foto enviada por " + foto.autor);

      const imagem = criar("img");
      imagem.src = foto.url;
      imagem.alt = "Foto enviada por " + foto.autor;
      imagem.loading = "lazy";

      botao.append(imagem);
      botao.addEventListener("click", function () {
        ampliar(foto);
      });

      figura.append(botao, criar("figcaption", null, "por " + foto.autor));
      galeria.append(figura);
    });
  }

  async function carregarFotos() {
    try {
      const dados = await pedirJson(API + "fotos.php?jogo=" + encodeURIComponent(jogo.slug));

      if (!dados.sucesso) {
        throw new Error(dados.mensagem);
      }

      mostrarFotos(dados.fotos);
    } catch (erro) {
      galeria.replaceChildren(criar("p", "contador vazio", "Não foi possível carregar as fotos agora."));
    }
  }

  async function enviarFoto(evento) {
    evento.preventDefault();

    const nome = limparNome(campoNome.value);
    const arquivo = campoArquivo.files[0];

    if (nome.length < 2 || nome.length > 40) {
      mostrarAviso(avisoFoto, "O nome precisa ter entre 2 e 40 caracteres.", true);
      return;
    }

    if (!arquivo) {
      mostrarAviso(avisoFoto, "Escolha uma imagem para enviar.", true);
      return;
    }

    if (arquivo.type.indexOf("image/") !== 0) {
      mostrarAviso(avisoFoto, "O arquivo escolhido não é uma imagem.", true);
      return;
    }

    if (arquivo.size > LIMITE_FOTO) {
      mostrarAviso(avisoFoto, "A imagem é grande demais. O limite é 3 MB.", true);
      return;
    }

    gravarLocal("peppa_nome", nome);

    const dados = new FormData();
    dados.append("jogo", jogo.slug);
    dados.append("autor", nome);
    dados.append("foto", arquivo);

    mostrarAviso(avisoFoto, "Enviando foto...", false);

    try {
      const resposta = await pedirJson(API + "fotos.php", { method: "POST", body: dados });

      if (resposta.sucesso) {
        mostrarAviso(avisoFoto, resposta.mensagem, false);
        formFoto.reset();
        campoNome.value = nome;
        carregarFotos();
      } else {
        mostrarAviso(avisoFoto, resposta.mensagem, true);
      }
    } catch (erro) {
      mostrarAviso(avisoFoto, MENSAGEM_CONEXAO, true);
    }
  }

  formFoto.addEventListener("submit", enviarFoto);
  botaoFechar.addEventListener("click", function () {
    visualizador.close();
  });
  visualizador.addEventListener("click", function (evento) {
    if (evento.target === visualizador) {
      visualizador.close();
    }
  });

  carregarFotos();
}

function iniciarComentarios() {
  const token = obterToken();
  const lista = document.querySelector("#lista-comentarios");
  const total = document.querySelector("#total-comentarios");
  const avisoLista = document.querySelector("#aviso-lista");
  const seletorOrdem = document.querySelector("#ordem-comentarios");
  const formComentario = document.querySelector("#form-comentario");
  const campoNome = document.querySelector("#comentario-nome");
  const campoTexto = document.querySelector("#comentario-texto");
  const contador = document.querySelector("#comentario-contador");
  const avisoComentario = document.querySelector("#aviso-comentario");

  let comentarios = [];

  campoNome.value = nomeSalvo();

  function contarCaracteres() {
    const restam = campoTexto.maxLength - campoTexto.value.length;
    contador.textContent = "Restam " + restam + " caracteres";

    if (restam < 100) {
      contador.classList.add("alerta");
    } else {
      contador.classList.remove("alerta");
    }
  }

  async function enviarComentario(autor, texto, paiId) {
    const dados = new FormData();
    dados.append("jogo", jogo.slug);
    dados.append("autor", autor);
    dados.append("texto", texto);

    if (paiId !== null) {
      dados.append("parent_id", paiId);
    }

    return pedirJson(API + "comentarios.php", { method: "POST", body: dados });
  }

  function validar(autor, texto) {
    if (autor.length < 2 || autor.length > 40) {
      return "O nome precisa ter entre 2 e 40 caracteres.";
    }

    if (texto.length < 1) {
      return "Escreva alguma coisa antes de enviar.";
    }

    if (texto.length > 1000) {
      return "O texto pode ter no máximo 1000 caracteres.";
    }

    return "";
  }

  function pintarVotos(comentario, botaoLike, botaoDislike) {
    botaoLike.textContent = "👍 " + comentario.likes;
    botaoDislike.textContent = "👎 " + comentario.dislikes;

    botaoLike.classList.toggle("ativo", comentario.meu_voto === "like");
    botaoDislike.classList.toggle("ativo", comentario.meu_voto === "dislike");

    botaoLike.setAttribute("aria-pressed", String(comentario.meu_voto === "like"));
    botaoDislike.setAttribute("aria-pressed", String(comentario.meu_voto === "dislike"));
  }

  async function votar(comentario, tipo, botaoLike, botaoDislike) {
    const dados = new FormData();
    dados.append("comentario_id", comentario.id);
    dados.append("tipo", tipo);
    dados.append("token", token);

    try {
      const resposta = await pedirJson(API + "votar.php", { method: "POST", body: dados });

      if (resposta.sucesso) {
        comentario.likes = resposta.likes;
        comentario.dislikes = resposta.dislikes;
        comentario.meu_voto = resposta.meu_voto;
        pintarVotos(comentario, botaoLike, botaoDislike);
        mostrarAviso(avisoLista, "", false);
      } else {
        mostrarAviso(avisoLista, resposta.mensagem, true);
      }
    } catch (erro) {
      mostrarAviso(avisoLista, MENSAGEM_CONEXAO, true);
    }
  }

  function criarFormResposta(comentario, area) {
    const form = criar("form", "form-resposta");
    form.noValidate = true;

    const linhaNome = criar("div");
    const nome = criar("input");
    nome.type = "text";
    nome.maxLength = 40;
    nome.placeholder = "Seu nome";
    nome.value = nomeSalvo();
    nome.setAttribute("aria-label", "Seu nome");
    linhaNome.append(nome);

    const linhaTexto = criar("div");
    const texto = criar("textarea");
    texto.maxLength = 1000;
    texto.placeholder = "Responder a " + comentario.autor;
    texto.setAttribute("aria-label", "Sua resposta para " + comentario.autor);
    linhaTexto.append(texto);

    const botoes = criar("div", "botoes-resposta");
    const enviar = criar("button", null, "Enviar resposta");
    enviar.type = "submit";
    const cancelar = criar("button", "cancelar", "Cancelar");
    cancelar.type = "button";
    botoes.append(enviar, cancelar);

    const aviso = criar("p", "aviso");
    aviso.setAttribute("aria-live", "polite");

    form.append(linhaNome, linhaTexto, botoes, aviso);

    cancelar.addEventListener("click", function () {
      area.replaceChildren();
    });

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault();

      const autor = limparNome(nome.value);
      const conteudo = texto.value.trim();
      const problema = validar(autor, conteudo);

      if (problema) {
        mostrarAviso(aviso, problema, true);
        return;
      }

      gravarLocal("peppa_nome", autor);
      enviar.disabled = true;
      mostrarAviso(aviso, "Enviando resposta...", false);

      try {
        const resposta = await enviarComentario(autor, conteudo, comentario.id);

        if (resposta.sucesso) {
          await carregarComentarios();
        } else {
          mostrarAviso(aviso, resposta.mensagem, true);
          enviar.disabled = false;
        }
      } catch (erro) {
        mostrarAviso(aviso, MENSAGEM_CONEXAO, true);
        enviar.disabled = false;
      }
    });

    return form;
  }

  function criarComentario(comentario, filhos, nivel) {
    const item = criar("article", "comentario");
    item.id = "comentario-" + comentario.id;

    const corpo = criar("div", "comentario-corpo");

    const topo = criar("div", "comentario-topo");
    topo.append(criar("strong", "autor", comentario.autor), criar("span", "data", formatarData(comentario.data_envio)));

    const texto = criar("p", "comentario-texto", comentario.texto);

    const acoes = criar("div", "acoes-comentario");

    const botaoLike = criar("button", "voto voto-like");
    botaoLike.type = "button";
    botaoLike.setAttribute("aria-label", "Gostei deste comentário");

    const botaoDislike = criar("button", "voto voto-dislike");
    botaoDislike.type = "button";
    botaoDislike.setAttribute("aria-label", "Não gostei deste comentário");

    const botaoResponder = criar("button", "responder", "Responder");
    botaoResponder.type = "button";

    pintarVotos(comentario, botaoLike, botaoDislike);

    botaoLike.addEventListener("click", function () {
      votar(comentario, "like", botaoLike, botaoDislike);
    });

    botaoDislike.addEventListener("click", function () {
      votar(comentario, "dislike", botaoLike, botaoDislike);
    });

    acoes.append(botaoLike, botaoDislike, botaoResponder);

    const area = criar("div", "area-resposta");

    botaoResponder.addEventListener("click", function () {
      if (area.firstChild) {
        area.replaceChildren();
        return;
      }

      const form = criarFormResposta(comentario, area);
      area.append(form);
      form.querySelector("textarea").focus();
    });

    corpo.append(topo, texto, acoes, area);
    item.append(corpo);

    const respostas = filhos[comentario.id] || [];

    if (respostas.length > 0) {
      const caixa = criar("div", nivel >= 4 ? "respostas sem-recuo" : "respostas");

      respostas.forEach(function (resposta) {
        caixa.append(criarComentario(resposta, filhos, nivel + 1));
      });

      item.append(caixa);
    }

    return item;
  }

  function mostrarComentarios() {
    lista.replaceChildren();

    total.textContent = comentarios.length === 1 ? "1 comentário" : comentarios.length + " comentários";

    const filhos = {};
    const raizes = [];

    comentarios.forEach(function (comentario) {
      if (comentario.parent_id === null) {
        raizes.push(comentario);
      } else {
        if (!filhos[comentario.parent_id]) {
          filhos[comentario.parent_id] = [];
        }

        filhos[comentario.parent_id].push(comentario);
      }
    });

    if (seletorOrdem.value === "curtidos") {
      raizes.sort(function (a, b) {
        const saldo = (b.likes - b.dislikes) - (a.likes - a.dislikes);
        return saldo !== 0 ? saldo : b.id - a.id;
      });
    } else {
      raizes.sort(function (a, b) {
        return b.id - a.id;
      });
    }

    if (raizes.length === 0) {
      lista.append(criar("p", "contador vazio", "Ainda não há comentários. Deixe a primeira dica!"));
      return;
    }

    raizes.forEach(function (comentario) {
      lista.append(criarComentario(comentario, filhos, 0));
    });
  }

  async function carregarComentarios() {
    try {
      const dados = await pedirJson(
        API + "comentarios.php?jogo=" + encodeURIComponent(jogo.slug) + "&token=" + encodeURIComponent(token)
      );

      if (!dados.sucesso) {
        throw new Error(dados.mensagem);
      }

      comentarios = dados.comentarios;
      mostrarAviso(avisoLista, "", false);
      mostrarComentarios();
    } catch (erro) {
      mostrarAviso(avisoLista, "Não foi possível carregar os comentários agora. Verifique se o XAMPP está ligado.", true);
    }
  }

  formComentario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const autor = limparNome(campoNome.value);
    const conteudo = campoTexto.value.trim();
    const problema = validar(autor, conteudo);

    if (problema) {
      mostrarAviso(avisoComentario, problema, true);
      return;
    }

    gravarLocal("peppa_nome", autor);
    mostrarAviso(avisoComentario, "Enviando comentário...", false);

    try {
      const resposta = await enviarComentario(autor, conteudo, null);

      if (resposta.sucesso) {
        mostrarAviso(avisoComentario, resposta.mensagem, false);
        campoTexto.value = "";
        contarCaracteres();
        await carregarComentarios();
      } else {
        mostrarAviso(avisoComentario, resposta.mensagem, true);
      }
    } catch (erro) {
      mostrarAviso(avisoComentario, MENSAGEM_CONEXAO, true);
    }
  });

  campoTexto.addEventListener("input", contarCaracteres);
  seletorOrdem.addEventListener("change", mostrarComentarios);

  contarCaracteres();
  carregarComentarios();
}

if (jogo) {
  mostrarDetalhes();
  iniciarFotos();
  iniciarComentarios();
} else {
  mostrarJogoNaoEncontrado();
}