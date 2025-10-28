/* ------------------------------
   DADOS DOS FILMES (INDEX E FILMES)
------------------------------- */
const paginas = [
  { titulo: "Bloco 181", arquivo: "bloco181.html" },
  { titulo: "Close To You", arquivo: "closetoyou.html", img: "img/Close-to-You.jpg", sinopse: "Sinopse de Close To You..." },
  { titulo: "Física o Química", arquivo: "fisicaoquimica.html" },
  { titulo: "Invisible Boys", arquivo: "invisibleboys.html" },
  { titulo: "Krass Klassenfahrt - Die Neue Generation", arquivo: "krass.html" },
  { titulo: "Oh Otto!", arquivo: "ohotto.html" },
  { titulo: "One Last Night Of You", arquivo: "onelastnightofyou.html", img: "img/One-Last-Night-of-You.jpg", sinopse: "Sinopse de One Last Night Of You..." },
  { titulo: "Riley", arquivo: "riley.html", img: "img/Riley.jpg", sinopse: "Sinopse de Riley..." },
  { titulo: "Straight", arquivo: "straight.html", img: "img/Straight.jpg", sinopse: "Sinopse de Straight..." },
  { titulo: "The Boy With Pink Pants", arquivo: "theboywithpinkpants.html", img: "img/The-Boy-With-Pink-Pants.jpg", sinopse: "Sinopse de The Boy With Pink Pants..." }
];

/* ------------------------------
   FUNÇÕES INDEX: BUSCA COM SUGESTÕES
------------------------------- */
const inputBusca = document.getElementById("busca");
const formBusca = document.getElementById("form-busca");
const sugestoes = document.querySelector(".sugestoes");

if (inputBusca && sugestoes && formBusca) {
  let indiceSelecionado = -1;

  inputBusca.addEventListener("input", () => {
    const termo = inputBusca.value.toLowerCase();
    sugestoes.innerHTML = "";
    indiceSelecionado = -1;

    if (termo.length === 0) {
      sugestoes.style.display = "none";
      return;
    }

    const filtradas = paginas.filter(p => p.titulo.toLowerCase().includes(termo));

    if (filtradas.length === 0) {
      sugestoes.style.display = "none";
      return;
    }

    filtradas.forEach(p => {
      const item = document.createElement("div");
      item.classList.add("item-sugestao");
      item.textContent = p.titulo;

      item.addEventListener("click", () => {
        window.location.href = p.arquivo;
      });

      sugestoes.appendChild(item);
    });

    sugestoes.style.display = "block";
  });

  inputBusca.addEventListener("keydown", (e) => {
    const itens = sugestoes.querySelectorAll(".item-sugestao");
    if (itens.length === 0) return;

    if (e.key === "ArrowDown") {
      indiceSelecionado = (indiceSelecionado + 1) % itens.length;
    } else if (e.key === "ArrowUp") {
      indiceSelecionado = (indiceSelecionado - 1 + itens.length) % itens.length;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (indiceSelecionado >= 0) itens[indiceSelecionado].click();
      return;
    }

    itens.forEach((item, i) => item.classList.toggle("selecionado", i === indiceSelecionado));
  });

  formBusca.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = inputBusca.value.toLowerCase();
    const pagina = paginas.find(p => p.titulo.toLowerCase().includes(termo));
    if (pagina) {
      window.location.href = pagina.arquivo;
    } else {
      alert("Título não encontrado! Verifique a grafia.");
    }
  });

  document.addEventListener("click", (e) => {
    if (!formBusca.contains(e.target)) {
      sugestoes.style.display = "none";
    }
  });
}

/* ------------------------------
   DADOS DOS FILMES
------------------------------- */
const filmes = [
  {
    titulo: "Close To You",
    arquivo: "closetoyou.html",
    img: "img/Close-to-You.jpg",
    sinopse: "Um homem trans retorna à sua cidade natal pela primeira vez em anos. Em sua jornada, ele confronta seu relacionamento com a família, reencontra o primeiro amor e descobre uma nova confiança em si mesmo."
  },
  {
    titulo: "One Last Night Of You",
    arquivo: "onelastnightofyou.html",
    img: "img/One-Last-Night-of-You.jpg",
    sinopse: "Quando seu carro quebra durante uma fatídica viagem, Evan, um jovem suicida, conhece Léo, um garoto misterioso que se oferece para levá-lo ao seu destino. Ao longo do caminho, a tensão romântica se instala enquanto o casal lida com traumas do passado, conflitos do presente e o potencial do futuro – juntos ou separados. Evan logo percebe que pode ter encontrado algo – ou alguém – por quem vale a pena viver."
  },
  {
    titulo: "Riley",
    arquivo: "riley.html",
    img: "img/Riley.jpg",
    sinopse: "A vida de um atleta disciplinado do ensino médio começa a desmoronar quando sua identidade queer compete com a ideia de quem ele deveria ser."
  },
  {
    titulo: "Straight",
    arquivo: "straight.html",
    img: "img/Straight.jpg",
    sinopse: "Ro é um banqueiro de investimentos que gosta de cerveja, esportes e de sua namorada Elia… e também gosta de Cris."
  },
  {
    titulo: "The Boy With Pink Pants",
    arquivo: "theboywithpinkpants.html",
    img: "img/The-Boy-With-Pink-Pants.jpg",
    sinopse: "Em 20 de novembro de 2012, Andrea Spezzacatena, um garoto que acabara de completar 15 anos, tirou a própria vida. Foi o primeiro caso de bullying e cyberbullying na Itália que levou ao suicídio de um menor. Este filme é baseado na história dele."
  }
];

/* ------------------------------
   ELEMENTOS DO DOM
------------------------------- */
const listaFilmes = document.querySelectorAll(".lista-filmes li");
const previewImg = document.getElementById("preview-img");
const sinopseContainer = document.getElementById("sinopse-filme");
let indiceFilmeSelecionado = -1;

/* ------------------------------
   FUNÇÕES DE INTERAÇÃO (MOUSE, TECLADO E TOUCH)
------------------------------- */
if (listaFilmes.length && previewImg && sinopseContainer) {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  listaFilmes.forEach((li, index) => {
    if (isTouch) {
      li.addEventListener("touchstart", () => {
        atualizarVisualizacao(index);
        atualizarSelecao(index);
      });
    } else {
      li.addEventListener("mouseenter", () => {
        atualizarVisualizacao(index);
        atualizarSelecao(index);
      });
    }

    li.addEventListener("click", () => {
      window.location.href = li.dataset.arquivo;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (listaFilmes.length === 0) return;

    if (e.key === "ArrowDown") {
      indiceFilmeSelecionado = (indiceFilmeSelecionado + 1) % listaFilmes.length;
      atualizarVisualizacao(indiceFilmeSelecionado);
      atualizarSelecao(indiceFilmeSelecionado);
    } else if (e.key === "ArrowUp") {
      indiceFilmeSelecionado = (indiceFilmeSelecionado - 1 + listaFilmes.length) % listaFilmes.length;
      atualizarVisualizacao(indiceFilmeSelecionado);
      atualizarSelecao(indiceFilmeSelecionado);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (indiceFilmeSelecionado >= 0) {
        window.location.href = listaFilmes[indiceFilmeSelecionado].dataset.arquivo;
      }
    }
  });
}

/* ------------------------------
   ATUALIZA VISUALIZAÇÃO DE IMAGEM E SINOPSE
------------------------------- */
function atualizarVisualizacao(index) {
  const filme = filmes[index];
  previewImg.src = filme.img;
  previewImg.alt = `Prévia de ${filme.titulo}`;
  sinopseContainer.textContent = filme.sinopse;
}

function atualizarSelecao(index) {
  listaFilmes.forEach((li, i) => li.classList.toggle("selecionado", i === index));
}


/* ------------------------------
   DADOS DAS SÉRIES
------------------------------- */
const series = [
  {
    titulo: "Bloco 181",
    arquivo: "bloco181.html",
    img: "img/Blocco-181.jpg",
    sinopse: "Ambientado em comunidades multiétnicas nos arredores de Milão, três adolescentes crescem e lidam com amor, conflitos geracionais, emancipação feminina e, acima de tudo, lutas por poder."
  },
  {
    titulo: "Física o Química",
    arquivo: "fisicaoquimica.html",
    img: "img/Fisica-o-quimica-La-nueva-generacion.jpg",
    sinopse: "A adolescência é a época das estreias: as primeiras bebedeiras, as primeiras festas, o primeiro eu te amo… E o primeiro luto. O novo ano letivo em Zurbarán começa marcado pela perda de um aluno, o que leva a cooperativa de pais que hoje administra a escola a tomar uma decisão: criar um grupo de apoio aos alunos. Assim, oito adolescentes muito diferentes acabam dividindo um espaço onde se chocam completamente, mas onde também acabam se conhecendo e compartilhando sua alegria de viver. E se apaixonar."
  },
  {
    titulo: "Invisible Boys",
    arquivo: "invisibleboys.html",
    img: "img/Invisible-Boys.jpg",
    sinopse: "Todos em uma cidade pequena acham que conhecem você, mas quando um adolescente gay enrustido se envolve com um cara casado, isso tem efeitos de longo alcance para um grupo de adolescentes que antes eram invisíveis."
  },
  {
    titulo: "Krass Klassenfahrt - Die Neue Generation",
    arquivo: "krass.html",
    img: "img/Krass-Klassenfahrt-Die-neue-Generation.jpg",
    sinopse: "Os alunos do último ano embarcam em uma jornada que os levará para longe de casa por vários dias: uma verdadeira excursão escolar. Mas, assim que chegam ao destino, o caos já está previsto."
  },
  {
    titulo: "Oh Otto!",
    arquivo: "ohotto.html",
    img: "img/Oh-Otto.jpg",
    sinopse: "Otto tem 26 anos e tem a vida em ordem. Ou assim ele pensa. Quando seu primeiro amor, Boris, o abandona e seu melhor amigo, Lente, deixa sua amada Bruxelas, ele se vê cheio de dúvidas e questionamentos. Ele decide preencher seu coração com um amor passageiro e busca seu lugar na vibrante cena queer de Bruxelas. Com seu alter ego online no bolso, ele mergulha em um mundo repleto de escapadas noturnas, bares gays e autodescoberta."
  }
];

/* ------------------------------
   ELEMENTOS DO DOM - SÉRIES
------------------------------- */
const listaSeries = document.querySelectorAll(".lista-series li");
const previewImgSeries = document.getElementById("preview-img");
const sinopseContainerSeries = document.getElementById("sinopse-filme");
let indiceSerieSelecionada = -1;



/* ------------------------------
   FUNÇÕES DE INTERAÇÃO - SÉRIES
------------------------------- */
if (listaSeries.length && previewImgSeries && sinopseContainerSeries) {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  listaSeries.forEach((li, index) => {
    if (isTouch) {
      li.addEventListener("touchstart", () => {
        atualizarVisualizacaoSerie(index);
        atualizarSelecaoSerie(index);
      });
    } else {
      li.addEventListener("mouseenter", () => {
        atualizarVisualizacaoSerie(index);
        atualizarSelecaoSerie(index);
      });
    }

    li.addEventListener("click", () => {
      window.location.href = li.dataset.arquivo;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (listaSeries.length === 0) return;

    if (e.key === "ArrowDown") {
      indiceSerieSelecionada = (indiceSerieSelecionada + 1) % listaSeries.length;
      atualizarVisualizacaoSerie(indiceSerieSelecionada);
      atualizarSelecaoSerie(indiceSerieSelecionada);
    } else if (e.key === "ArrowUp") {
      indiceSerieSelecionada = (indiceSerieSelecionada - 1 + listaSeries.length) % listaSeries.length;
      atualizarVisualizacaoSerie(indiceSerieSelecionada);
      atualizarSelecaoSerie(indiceSerieSelecionada);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (indiceSerieSelecionada >= 0) {
        window.location.href = listaSeries[indiceSerieSelecionada].dataset.arquivo;
      }
    }
  });
}

/* ------------------------------
   ATUALIZA VISUALIZAÇÃO DE IMAGEM E SINOPSE - SÉRIES
------------------------------- */
function atualizarVisualizacaoSerie(index) {
  const serie = series[index];
  previewImgSeries.src = serie.img;
  previewImgSeries.alt = `Prévia de ${serie.titulo}`;
  sinopseContainerSeries.textContent = serie.sinopse;
}

function atualizarSelecaoSerie(index) {
  listaSeries.forEach((li, i) => li.classList.toggle("selecionado", i === index));
}



