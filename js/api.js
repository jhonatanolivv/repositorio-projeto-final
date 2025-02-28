// import { inject } from "@vercel/analytics"
// import { injectSpeedInsights } from '@vercel/speed-insights';


const apiKey = '8167cc74';
const formPesquisa = document.querySelector("#search-box");

function resetForm() {
  formPesquisa.reset();
}

formPesquisa.onsubmit = (ev) => {
  ev.preventDefault(); // Evita o carregamento padrão da página

  const pesquisa = ev.target.pesquisa.value; // Obtendo o valor da pesquisa feita pelo usuário

  if (pesquisa === "") {
    alert('Preencha o campo!');
    return;
  }

  // Fazer a requisição na API
  fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => carregaLista(json));
}

// Função para carregar a lista de filmes
const carregaLista = (json) => {
  const lista = document.querySelector("#list");
  lista.innerHTML = ""; // Isso limpa a lista 

  if (json.Response === 'False') {
    alert('Nenhum filme encontrado.');
    return;
  }

  json.Search.forEach(element => {
    let item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `<img src="${element.Poster}" /> <h2>${element.Title}</h2>`;

    lista.appendChild(item);
  });
}

// Função de randomização para seleção de filmes e séries
function randomico_inteiro(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("keydown", function(event) {
  if (event.key === 'Escape') { // Tecla Esc
    const lista = document.querySelector("#list");
    if (lista) {
      lista.innerHTML = ""; // Limpa a lista
    }
  }
});

function carregarImagemInicial() {
  let lista_filmes_destaques_intime = [...lista_filmes_destaques];
  let lista_series_destaques_intime = [...lista_series_destaques];
  let lista_melhores_filmes_intime = [...lista_filmes_2023];
  let lista_melhores_series_intime = [...lista_series_2023];
  
  let filmes_escolhidos = [];
  let index_filme_escolhido, filme_escolhido, index_serie_escolhida, serie_escolhida;
  
  // Selecionando filmes e séries aleatoriamente e exibindo
  for (let i = 1; i < 25; i++) {
    index_filme_escolhido = randomico_inteiro(0, lista_filmes_destaques_intime.length - 1);
    filme_escolhido = lista_filmes_destaques_intime.splice(index_filme_escolhido, 1)[0];  // Remove e seleciona
    filmes_escolhidos.push(filme_escolhido);
    fetch(`https://www.omdbapi.com/?t=${filme_escolhido}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => exibirImagemInicial(json, i));
  }

  for (let i = 25; i < 49; i++) {
    index_serie_escolhida = randomico_inteiro(0, lista_series_destaques_intime.length - 1);
    serie_escolhida = lista_series_destaques_intime.splice(index_serie_escolhida, 1)[0]; // Remove e seleciona
    filmes_escolhidos.push(serie_escolhida);
    fetch(`https://www.omdbapi.com/?t=${serie_escolhida}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => exibirImagemInicial(json, i));
  }

  return filmes_escolhidos;
}

// Função para exibir a imagem inicial
function exibirImagemInicial(json, index) {
  if (json.Response === 'False') {
    console.error('Erro na resposta da API ao carregar a imagem inicial.');
    return;
  }

  let primeiroFilme = json;
  let imagemInicial = document.querySelector(".pag-movies-imagem-" + index);
  imagemInicial.innerHTML = `<img src="${primeiroFilme.Poster}" alt="${primeiroFilme.Title}" width="100%">`;

  let nomesInicial = document.getElementById("lista-de-films" + index);
  nomesInicial.innerHTML = `
    <li class="list-group-item list-group-item1" style="padding: 0px 0px 0px 0px; border-bottom: 2px solid orange">
      ${primeiroFilme.Title}
    </li>
    <li class="list-group-item list-group-item2" style="padding-top: 5px">
      <div>Rating: ${primeiroFilme.imdbRating}</div>
      <div class="barra-avaliacao">
        <div class="barra-avaliacaoo" id="barraAvaliacao-${index}"></div>
      </div>
    </li>
  `;

  // Função para criar barra de avaliação
  function criarBarraAvaliacao(avaliacao) {
    let escala05 = (avaliacao / 10) * 100;
    return `${Math.min(Math.max(escala05, 0), 100)}%`;
  }

  document.getElementById('barraAvaliacao-' + index).style.width = criarBarraAvaliacao(primeiroFilme.imdbRating);
}

// Função de tradução
function f_traduzir(textToTranslate, callback) {
  const fromLanguage = 'en';
  const toLanguage = 'pt';

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${fromLanguage}|${toLanguage}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const translation = data.responseData.translatedText;
      callback(null, translation);
    })
    .catch(error => {
      console.error('Erro na tradução:', error);
      callback(error, null);
    });
}

// Função para mostrar as informações detalhadas do filme ou série
function showChild(childId) {
  let childDiv = document.getElementById("child");
  childDiv.style.display = "block";

  fetch(`https://www.omdbapi.com/?t=${filmes_escolhidoss[String(parseInt(childId) - 1)]}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => showChildInfos(json));
}

// Exibir as informações do filme ou série
function showChildInfos(json) {
  let fotoChild = document.getElementById("child-foto");
  let infoChild = document.getElementById("child-conteudo--ul");

  if (json.Type === "movie") {
    fotoChild.innerHTML = `<img src="${json.Poster}" alt="${json.Title}" width="100%">`;
    infoChild.innerHTML = `
      <li><span class="tipo-child">Nome:</span>  ${json.Title}.</li>
      <li><span class="tipo-child">Data de lançamento:</span> ${json.Released}.</li>
      <li><span class="tipo-child">Duração do filme:</span> ${json.Runtime}.</li>
      <li><span class="tipo-child">Rating MetaCritic/Imdb:</span> ${json.Metascore}/100. | ${json.imdbRating}/10.0.</li>
      <li><span class="tipo-child">Bilheteira em dólares (U$):</span> ${json.BoxOffice}.</li>
      <li><span class="tipo-child">Premiações:</span> ${json.Awards}.</li>
      <li><span class="tipo-child">Diretor:</span> ${json.Director}.</li>
    `;
  } else if (json.Type === "series") {
    f_traduzir(json.Plot, function (error, resposta) {
      if (!error) {
        fotoChild.innerHTML = `<img src="${json.Poster}" alt="${json.Title}" width="100%">`;
        infoChild.innerHTML = `
          <li><span class="tipo-child">Nome:</span>  ${json.Title}.</li>
          <li><span class="tipo-child">Data de lançamento:</span> ${json.Released}.</li>
          <li><span class="tipo-child">Rating Imdb:</span>  ${json.imdbRating}/10.0.</li>
          <li><span class="tipo-child">Total de temporadas:</span> ${json.totalSeasons}.</li>
          <li><span class="tipo-child">Gênero:</span> ${json.Genre}.</li>
          <li><span class="tipo-child">Plot da série:</span> ${resposta}.</li>
        `;
      } else {
        console.error('Erro na tradução do Plot:', error);
      }
    });
  }
}

// Função para esconder as informações detalhadas
function hideChild() {
  let childDiv = document.getElementById('child');
  childDiv.style.display = "none";
}



var btn_artigos = document.getElementById("header-link-artigos"),
  btn_movies = document.getElementById("header-link-movies"),
  btn_news = document.getElementById("header-link-news"),
  btn_login = document.getElementById("header-link-login"),
  btn_abrir = document.getElementById("header-botao-abrir"),
  btn_fechar = document.getElementById("header-botao-fechar"),
  search_bar = document.getElementById("search-box_header");

function ajustarLayout() {
  var larguraTela = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (larguraTela <= 1117) {
    // Tamanho de tela pequeno, exibir botão de abrir e ocultar os outros
    btn_abrir.style.display = "inline-block";
    search_bar.style.display = "inline-block";
    btn_artigos.style.display = "none";
    btn_movies.style.display = "none";
    btn_news.style.display = "none";
    btn_login.style.display = "none";
    btn_fechar.style.display = "none";
  } else {
    // Tamanho de tela grande, exibir botões e ocultar botão de abrir
    btn_abrir.style.display = "none";
    search_bar.style.display = "inline-block";
    btn_artigos.style.display = "inline-block";
    btn_movies.style.display = "inline-block";
    btn_news.style.display = "inline-block";
    btn_login.style.display = "inline-block";
    btn_fechar.style.display = "none";
  }
}

function f_header_abrir() {
  btn_abrir.style.display = "none";
  search_bar.style.display = "none";
  btn_fechar.style.display = "inline-block";
  btn_artigos.style.display = "inline-block";
  btn_movies.style.display = "inline-block";
  btn_news.style.display = "inline-block";
  btn_login.style.display = "inline-block";
}

function f_header_fechar() {
  btn_fechar.style.display = "none";
  btn_abrir.style.display = "inline-block";
  search_bar.style.display = "inline-block";
  btn_artigos.style.display = "none";
  btn_movies.style.display = "none";
  btn_news.style.display = "none";
  btn_login.style.display = "none";
}

// Adiciona um ouvinte de evento para redimensionamento da janela
window.addEventListener("resize", ajustarLayout);

// Chama ajustarLayout inicialmente para configurar o layout no carregamento da página
ajustarLayout();

// injectSpeedInsights();
// inject();



