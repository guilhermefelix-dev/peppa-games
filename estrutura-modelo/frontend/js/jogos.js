const JOGOS = [
  {
    slug: "mvc2",
    apelidos: ["mvc2", "mvc 2", "marvel capcom"],
    titulo: "Marvel vs Capcom 2",
    capa: "img/Marvel Vs Capcom 2.jpg",
    genero: "Luta",
    plataformas: "PC, Console",
    desenvolvedora: "Capcom",
    lancamento: "2000 (arcade e Dreamcast)",
    descricao: [
      "Marvel vs. Capcom 2: New Age of Heroes foi lançado pela Capcom em 2000 e virou um dos jogos de luta mais lembrados da história. As partidas são em trios, com troca de personagem em tempo real, assistências e combos aéreos que deixam cada luta rápida e imprevisível.",
      "O elenco reúne lutadores da Marvel e da Capcom, de Ryu e Chun-Li a Wolverine e Homem de Ferro. É fácil de começar a jogar, mas tem muita profundidade para quem quer dominar combos e montar times."
    ]
  },
  {
    slug: "spider-man",
    apelidos: ["homem aranha", "spiderman", "peter parker"],
    titulo: "Marvel's Spider-Man",
    capa: "img/Spider-Man.jpg",
    genero: "Ação / Aventura",
    plataformas: "PlayStation, PC",
    desenvolvedora: "Insomniac Games",
    lancamento: "2018 (PlayStation 4) e 2022 (PC)",
    descricao: [
      "Marvel's Spider-Man foi desenvolvido pela Insomniac Games e chegou ao PlayStation 4 em 2018. Você controla um Peter Parker já experiente, que precisa equilibrar a vida pessoal com o trabalho de herói enquanto enfrenta vilões como o Rei do Crime e o Doutor Octopus.",
      "O grande destaque é balançar pelos prédios de Nova York, que deixa a exploração divertida do começo ao fim. O combate mistura socos, esquivas e gadgets, e a cidade tem missões principais, crimes espalhados pelo mapa e vários desafios extras."
    ]
  },
  {
    slug: "spider-man-2",
    apelidos: ["homem aranha 2", "spiderman 2", "peter parker", "miles morales"],
    titulo: "Marvel's Spider-Man 2",
    capa: "img/spiderman 2.jpg",
    genero: "Ação / Aventura",
    plataformas: "PlayStation, PC",
    desenvolvedora: "Insomniac Games",
    lancamento: "2023 (PlayStation 5) e 2025 (PC)",
    descricao: [
      "Marvel's Spider-Man 2 continua a história dos jogos anteriores e coloca Peter Parker e Miles Morales como protagonistas. Você alterna entre os dois heróis durante a aventura, cada um com habilidades próprias, enquanto Nova York enfrenta ameaças como Venom e Kraven, o Caçador.",
      "O mapa ficou maior e a movimentação ganhou as asas de teia, que deixam a travessia pela cidade mais rápida e fluida. A narrativa é um dos pontos fortes, com missões pensadas para mostrar a parceria e os conflitos entre os dois personagens."
    ]
  },
  {
    slug: "minecraft",
    apelidos: ["mine"],
    titulo: "Minecraft",
    capa: "img/mine.jpg.jpg",
    genero: "Exploração / Construção",
    plataformas: "PC, Console, Mobile",
    desenvolvedora: "Mojang Studios",
    lancamento: "2011 (versão completa)",
    descricao: [
      "Minecraft é um jogo de mundo aberto feito de blocos, onde você coleta recursos, constrói e sobrevive. No modo Sobrevivência é preciso lidar com fome, monstros e a falta de materiais; no modo Criativo você tem blocos ilimitados para construir o que imaginar.",
      "O jogo tem cavernas, biomas, a dimensão do Nether, a redstone para criar mecanismos e suporte a multiplayer e mods. Não existe um único jeito de jogar: dá para explorar, minerar, criar fazendas ou erguer cidades inteiras com os amigos."
    ]
  },
  {
    slug: "fortnite",
    apelidos: [],
    titulo: "Fortnite",
    capa: "img/fortnite.jpg",
    genero: "Battle Royale",
    plataformas: "PC, Console, Mobile",
    desenvolvedora: "Epic Games",
    lancamento: "2017",
    descricao: [
      "Fortnite é um jogo gratuito da Epic Games. No modo Battle Royale, até 100 jogadores caem em uma ilha, procuram armas e recursos e lutam enquanto a área segura do mapa vai diminuindo, até restar só um jogador ou uma equipe.",
      "O diferencial é a construção: dá para levantar paredes, rampas e torres no meio do tiroteio. O jogo também recebe temporadas com novidades, eventos ao vivo e outros modos além do Battle Royale."
    ]
  },
  {
    slug: "gta-san-andreas",
    apelidos: ["gta", "gta sa", "san andreas"],
    titulo: "Grand Theft Auto San Andreas",
    capa: "img/gta sa.jpg",
    genero: "Ação / Aventura (Mundo aberto)",
    plataformas: "PC, Console",
    desenvolvedora: "Rockstar North",
    lancamento: "2004 (PlayStation 2) e 2005 (PC)",
    descricao: [
      "Grand Theft Auto: San Andreas coloca você no papel de Carl Johnson, o CJ, que volta para Los Santos e se envolve em uma história de gangues, família e conflitos. O mapa reúne três cidades, Los Santos, San Fierro e Las Venturas, além de áreas rurais e desertos.",
      "Além das missões principais, o jogo deixa você dirigir, pilotar, treinar na academia, customizar o visual do personagem e explorar o mundo livremente. É um clássico pela liberdade e pela quantidade de coisas para fazer."
    ]
  },
  {
    slug: "gta-v",
    apelidos: ["gta", "gta 5", "gta online"],
    titulo: "Grand Theft Auto V",
    capa: "img/GTA V.jpg",
    genero: "Ação / Aventura (Mundo aberto)",
    plataformas: "PC, Console",
    desenvolvedora: "Rockstar North",
    lancamento: "2013 (consoles) e 2015 (PC)",
    descricao: [
      "Grand Theft Auto V se passa em Los Santos e região, e alterna entre três protagonistas: Michael, Franklin e Trevor. Cada um tem personalidade e habilidades diferentes, e você pode trocar de personagem durante as missões, principalmente nos grandes assaltos.",
      "Depois da história, o GTA Online segue como um mundo compartilhado com missões, corridas e atividades para jogar com outras pessoas. O mapa é enorme, com cidade, montanhas, estradas e mar para explorar."
    ]
  },
  {
    slug: "valorant",
    apelidos: ["valo", "vava"],
    titulo: "Valorant",
    capa: "img/vava.jpg",
    genero: "FPS tático",
    plataformas: "PC",
    desenvolvedora: "Riot Games",
    lancamento: "2020",
    descricao: [
      "Valorant é um FPS tático 5 contra 5 da Riot Games. Em cada rodada, uma equipe ataca tentando plantar a bomba, chamada de spike, e a outra defende. Quem perde o round não revive, então cada decisão e cada tiro contam.",
      "Cada jogador escolhe um agente com habilidades únicas, que ajudam a abrir caminho, coletar informações ou proteger a equipe. A economia entre os rounds, que define quais armas e habilidades você pode comprar, também faz parte da estratégia."
    ]
  },
  {
    slug: "league-of-legends",
    apelidos: ["lol", "liga das lendas"],
    titulo: "League of Legends",
    capa: "img/lol.jpg",
    genero: "MOBA",
    plataformas: "PC",
    desenvolvedora: "Riot Games",
    lancamento: "2009",
    descricao: [
      "League of Legends é um MOBA gratuito em que duas equipes de cinco jogadores disputam o mapa Summoner's Rift. O objetivo é destruir o Nexus, a base inimiga, passando por torres, tropas e monstros neutros pelo caminho.",
      "Cada jogador controla um campeão com habilidades próprias e escolhe uma função, como topo, meio, atirador, suporte ou selva. O jogo exige trabalho em equipe, boa leitura do mapa e muita prática, e tem uma cena competitiva grande."
    ]
  },
  {
    slug: "resident-evil-4",
    apelidos: ["re4", "resident evil", "leon kennedy"],
    titulo: "Resident Evil 4",
    capa: "img/Leon Kennedy.jpg",
    genero: "Survival Horror",
    plataformas: "PC, Console",
    desenvolvedora: "Capcom",
    lancamento: "2005 (original) e 2023 (remake)",
    descricao: [
      "Em Resident Evil 4, o agente Leon S. Kennedy é enviado para resgatar Ashley Graham, filha do presidente dos Estados Unidos, em uma região rural da Europa. Ele logo descobre que os moradores da área estão sob o controle de uma ameaça perigosa.",
      "O jogo marcou a série com a câmera sobre o ombro e combates cheios de tensão, em que munição e itens são limitados e o inventário precisa ser bem organizado. O remake de 2023 atualiza os gráficos e a jogabilidade mantendo a essência do original."
    ]
  },
  {
    slug: "counter-strike",
    apelidos: ["cs", "csgo", "cs go", "cs2", "counter strike"],
    titulo: "Counter-Strike Global Offensive",
    capa: "img/Cs2.jpg",
    genero: "FPS tático",
    plataformas: "PC",
    desenvolvedora: "Valve",
    lancamento: "2012 (CS:GO); substituído pelo CS2 em 2023",
    descricao: [
      "Counter-Strike: Global Offensive foi lançado pela Valve em 2012 e virou referência entre os jogos de tiro competitivos. Em 2023 ele foi substituído pelo Counter-Strike 2, que manteve a base do jogo com gráficos e sistemas atualizados.",
      "Terroristas e Contra-Terroristas se enfrentam em rodadas: uns tentam plantar a bomba e os outros precisam impedir ou desarmar. É preciso comprar armas e equipamentos a cada round, controlar o recuo dos tiros e jogar em equipe para vencer."
    ]
  }
];