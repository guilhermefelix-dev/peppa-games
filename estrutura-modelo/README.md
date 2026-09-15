# Equipe Peppa — Peppa Games

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#equipe-peppa--peppa-games)

**Equipe:**
<Nome 1> Guilherme Henrique Félix Gomes
<Nome 2> Pedro Henrique Pereira Gomes
<Nome 3> Gabriel Henrique Freitas Andrade
<Nome 4> Arthur Eduardo Nascimento Silva
<Nome 5> Pedro Augusto dos Santos
<Nome 6> Pedro Augusto dos Santos

**Disciplina:** WYD7324 — Desenvolvimento Web em HTML5, CSS, JavaScript e PHP
**Centro Universitário Newton Paiva · 2026/2**

## Sobre o projeto

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#sobre-o-projeto)

Site de uma rede de jogos. Os usuários poderão deixar os seus relatos, suas dicas para outros usuários que precisem, usuários podem descobrir novos jogos através do nosso amplo catálogo de jogos. Durante o desenvolvimento, o Peppa Games contará com páginas individuais para os jogos, sistema de busca e filtros, formulário para envio de dicas e comentários dos usuários, além de avaliações. Futuramente, essas informações poderão ser armazenadas em um banco de dados, permitindo maior interação entre os usuários e o conteúdo do site.

## Equipe

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#equipe)

**Líder:** Guilherme Henrique Félix Gomes

| Nome completo                    | Matrícula    | GitHub                     | Papel      |
| -------------------------------- | ------------ | -------------------------- | ---------- |
| Gabriel Henrique Freitas Andrade | 202603022307 | @G4BR13L035                | integrante |
| Pedro Henrique Pereira Gomes     | 202509153118 | @Pedro-HPG                 | integrante |
| Guilherme Henrique Félix         | 202601506447 | @guilhermefelix-dev        | **líder**  |
| Arthur Eduardo Nascimento Silva  | 202602195895 | @arthureduardo260207-criar | integrante |
| Yago Arthur Fernandes de Souza   | 202603256782 | @yago799-sudo              | integrante |
| Pedro Augusto dos Santos         | 202601567063 | @pedroecom7                | integrante |

## Estrutura do projeto

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#estrutura-do-projeto)

```text
├─ README.md                  este arquivo
├─ frontend/                  tudo o que roda no navegador
│  ├─ index.html              a página principal
│  ├─ css/
│  │  └─ estilo.css           estilos do site (a partir da aula 04)
│  ├─ js/
│  │  └─ script.js            comportamento da página (a partir do ciclo 6)
│  └─ img/
│     └─ .gitkeep             arquivo vazio que segura a pasta no Git
└─ backend/                   tudo o que roda no servidor
   ├─ config/
   │  └─ conexao.php          conexão com o banco (a partir do ciclo 8)
   └─ processa-contato.php    recebe o formulário (a partir do ciclo 8)
```

## Identidade visual

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#identidade-visual)

Estas são as decisões que o frontend/css/estilo.css aplica. Elas estão aqui para quem lê o repositório entender por que o site tem essa cara — e para a equipe não mudar de ideia a cada aula.

## Paleta

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#paleta)

```css
--fundo: #0F111A;                /* cor de fundo do site */
--fundo-secundario: #171B2B;     /* cor de fundo do "cartão" */
--cor-principal: #7C3AED;        /* cor em que aparecerá links */
--destaque: #EC4899;             /* para dar um diferencial no site */
--destaque-secundario: #38BDF8;  /* para dar um diferencial no site */
--texto: #F1F5F9;                /* cor dos textos */
--texto-secundario: #94A3B8;     /* cor dos textos */
--bordas: #293044;               /* cor das bordas */
```

Contraste conferido em https://webaim.org/resources/contrastchecker/:

```text
--texto sobre --superficie ......... __,*:1
--principal sobre --superficie ..... __,*:1
--sobre-principal sobre --principal __,_:1
```

Todos precisam ficar em 4,5:1 ou acima.

### Tipografia

Fonte: <"Nome da fonte">, com plano B, sans-serif
Pesos: 400 e <600 ou 700>
Por que esta:

Escala: h1 2.5rem · h2 1.75rem · h3 1.25rem · corpo 1rem

### Segundo tema

Arquivo: frontend/css/tema-.css

O que é: <em que situação este tema seria usado — modo escuro, uma data comemorativa, uma campanha>

Para ligá-lo, tire o comentário da linha do no frontend/index.html. Ela vem depois do estilo.css.

## Como abrir

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#como-abrir)

Abra a pasta inteira no VS Code (Arquivo → Abrir Pasta). Abra frontend/index.html e clique em Go Live (extensão Live Server).

## Quem fez o quê

[svg](https://github.com/guilhermefelix-dev/peppa-games/tree/main/estrutura-modelo#quem-fez-o-qu%C3%AA)

Uma linha por integrante. É o mapa de quem procurar quando algo quebra — e bate com o histórico de commits.

| Integrante      | Parte da folha de estilo                   |
| --------------- | ------------------------------------------ |
| Guilherme Félix | o `:root`, o `box-sizing` e o segundo tema |
| Arthur Eduardo  | tipografia: web font, escala e entrelinha  |
| pessoa 3        | página e conteúdo                          |
| Pedro Henrique  | cabeçalho e menu                           |
| Yago Arthur     | tabela                                     |
| Pedro Augusto   | formulário e rodapé                        |
