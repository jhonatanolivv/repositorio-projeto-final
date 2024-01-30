const apiKey = '8167cc74';
const frmPesquisa = document.querySelector(".search-box");

function resetForm() {
  document.getElementsByClassName(".search-box").reset();
}

frmPesquisa.onsubmit = (ev) => {
  ev.preventDefault();

  const pesquisa = ev.target.pesquisa.value;

  if (pesquisa == "") {
    alert('Preencha o campo!');
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => carregaLista(json));
}

const carregaLista = (json) => {
  const lista = document.querySelector("div.list");
  console.log(json)
  lista.innerHTML = "";

  if (json.Response == 'False') {
    alert('Nenhum filme encontrado.');
    return;
  }

  json.Search.forEach(element => {
    console.log(element);

    let item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `<img src="${element.Poster}" /> <h2>${element.Title}</h2>`

    lista.appendChild(item);
  });
}

// Página movies 
const lista_filmes_destaques = ["The+Shawshank+Redemption", "The+Godfather", "The+Dark+Knight", "The+Godfather+Part+II", "12+Angry+Men", "Schindler's+List", "The+Lord+of+the+Rings%3A+The+Return+of+the+King", "Pulp+Fiction", "The+Lord+of+the+Rings%3A+The+Fellowship+of+the+Ring", "The+Good%2C+the+Bad+and+the+Ugly", "Forrest+Gump", "Fight+Club", "The+Lord+of+the+Rings%3A+The+Two+Towers", "Inception", "Star+Wars%3A+Episode+V+-+The+Empire+Strikes+Back", "The+Matrix", "Goodfellas", "One+Flew+Over+the+Cuckoo's+Nest", "Se7en", "It's+a+Wonderful+Life", "Interstellar", "Seven+Samurai", "The+Silence+of+the+Lambs", "Saving+Private+Ryan", "City+of+God", "Life+Is+Beautiful", "The+Green+Mile", "Terminator+2%3A+Judgment+Day", "Star+Wars%3A+Episode+IV+-+A+New+Hope", "Spider-Man%3A+Across+the+Spider-Verse", "Back+to+the+Future", "Spirited+Away", "The+Pianist", "Parasite", "Psycho", "Gladiator", "The+Lion+King"]
const lista_series_destaques = ["Breaking+Bad", "Planet+Earth+II", "Planet+Earth", "Band+of+Brothers", "Chernobyl", "The+Wire", "Avatar%3A+The+Last+Airbender", "Blue+Planet+II", "The+Sopranos", "Cosmos%3A+A+Spacetime+Odyssey", "Cosmos", "Our+Planet", "Game+of+Thrones", "The+World+at+War", "Bluey", "Rick+and+Morty", "Fullmetal+Alchemist%3A+Brotherhood", "Life", "The+Last+Dance", "The+Twilight+Zone", "Sherlock", "The+Vietnam+War", "Batman%3A+The+Animated+Series", "Attack+on+Titan", "Scam+1992%3A+The+Harshad+Mehta+Story", "The+Office", "Arcane", "The+Blue+Planet", "Better+Call+Saul", "Human+Planet", "Firefly", "Frozen+Planet", "Clarkson's+Farm", "Hunter+x+Hunter", "Death+Note", "Only+Fools+and+Horses", "The+Civil+War", "True+Detective", "Seinfeld", "The+Decalogue"]
const lista_filmes_2023 = ["Saltburn", "Poor Things", "Killers+of+the+Flower+Moon", "Society+of+the+Snow", "Oppenheimer", "The Holdovers", "12th Fail", "Anyone But You", "Self Reliance", "Napoleon", "Wonka", "Barbie", "The+Iron+Claw", "Leave+the+World+Behind", "Rebel+Moon%3A+Part+One+-+A+Child+of+Fire", "The+Boys+in+the+Boat", "The Marvels", "The Creator", "Anatomy of a Fall", "Role Play", "I.S.S.", "Aquaman and the Lost Kingdom", "No Hard Feelings", "Animal", "The+Hunger+Games%3A+The+Ballad+of+Songbirds+%26+Snakes", "All of Us Strangers", "Godzilla Minus One", "Maestro", "The Boy and the Heron", "The Kitchen", "The Zone of Interest", "The Color Purple", "Past Lives", "May December", "American Fiction", "Priscilla", "Foe"]
const lista_series_2023 = ["The+Last+of+Us", "Blue+Eye+Samurai", "Beef", "The+Fall+of+the+House+of+Usher", "The+Artful+Dodger", "The+Traitors", "Percy+Jackson+and+the+Olympians", "The+Curse", "Monarch%3A+Legacy+of+Monsters", "Berlin", "My+Life+with+the+Walter+Boys", "Obliterated", "Echo", "The+Double+Life+of+My+Billionaire+Husband", "Severance", "The+Bear", "House+of+the+Dragon", "Reacher", "Slow+Horses", "The+Gilded+Age", "Halo", "The+Tourist", "Invincible", "Only+Murders+in+the+Building", "The+White+Lotus", "Yellowjackets", "Dr.+Death", "What+If...%3F", "Ted+Lasso", "Jujutsu+Kaisen", "The+Stranger", "The+Boys", "Euphoria", "The+Morning+Show", "For+All+Mankind", "Hazbin+Hotel", "Succession"]
function randomico_inteiro(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function carregarImagemInicial() {
  let lista_filmes_destaques_intime = lista_filmes_destaques.slice(); // Crie uma cópia para evitar modificar o array original
  let lista_series_destaques_intime = lista_series_destaques.slice()
  let lista_melhores_filmes_intime = lista_filmes_2023.slice()
  let lista_melhores_series_intime = lista_series_2023.slice()
  let index_filme_escolhido, filme_escolhido, index_serie_escolhida, serie_escolhida, index_melhor_filme, melhor_filme_escolhido, index_melhor_serie, melhor_serie_escolhida;
  let filmes_escolhidos = [];
  for (let i = 1; i < 25; i += 1) {
    index_filme_escolhido = randomico_inteiro(0, lista_filmes_destaques_intime.length - 1);
    filme_escolhido = lista_filmes_destaques_intime[index_filme_escolhido];
    filmes_escolhidos.push(filme_escolhido);
    console.log(filme_escolhido)
    lista_filmes_destaques_intime.splice(index_filme_escolhido, 1); // Remove o filme escolhido do array
    fetch(`https://www.omdbapi.com/?t=${filme_escolhido}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => exibirImagemInicial(json, i));
  }
  for (let i = 25; i < 49; i += 1) {
    index_serie_escolhida = randomico_inteiro(0, lista_series_destaques_intime.length - 1);
    serie_escolhida = lista_series_destaques_intime[index_serie_escolhida];
    filmes_escolhidos.push(serie_escolhida);
    lista_series_destaques_intime.splice(index_serie_escolhida, 1); // Remove o filme escolhido do array
    fetch(`https://www.omdbapi.com/?t=${serie_escolhida}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => exibirImagemInicial(json, i));
  }
  for (let i = 49; i < 73; i += 1) {
    index_melhor_filme = randomico_inteiro(0, lista_melhores_filmes_intime.length - 1);
    melhor_filme_escolhido = lista_melhores_filmes_intime[index_melhor_filme];
    filmes_escolhidos.push(melhor_filme_escolhido);
    lista_melhores_filmes_intime.splice(index_melhor_filme, 1); // Remove o filme escolhido do array
    fetch(`https://www.omdbapi.com/?t=${melhor_filme_escolhido}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => exibirImagemInicial(json, i));
  }
  for (let i = 73; i < 97; i += 1) {
    index_melhor_serie = randomico_inteiro(0, lista_melhores_series_intime.length - 1);
    melhor_filme_escolhido = lista_melhores_series_intime[index_melhor_serie];
    filmes_escolhidos.push(melhor_filme_escolhido);
    lista_melhores_series_intime.splice(index_melhor_serie, 1); // Remove o filme escolhido do array
    fetch(`https://www.omdbapi.com/?t=${melhor_filme_escolhido}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => exibirImagemInicial(json, i));
  }
  return filmes_escolhidos;
}

// Função para exibir a imagem do primeiro filme
function exibirImagemInicial(json, index) {
  if (json.Response === 'False') {
    console.error('Erro na resposta da API ao carregar a imagem inicial.');
    return;
  }

  
  let primeiroFilme = json;

  if (primeiroFilme) {
    let imagemInicial = document.querySelector(".pag-movies-imagem-" + index);
    imagemInicial.innerHTML = `<img src="${primeiroFilme.Poster}" alt="${primeiroFilme.Title}" width="100%">`;
    let nomesInicial = document.getElementById("lista-de-films" + index);
    nomesInicial.innerHTML = `<li class="list-group-item list-group-item1" style="padding: 0px 0px 0px 0px">${primeiroFilme.Title}</li><li class="list-group-item list-group-item2" style="padding-top: 5px"><div>Rating: ${primeiroFilme.imdbRating}</div><div class="barra-avaliacao" ><div class="barra-avaliacaoo" id="barraAvaliacao-${index}"></div><div></li>`;

    function criarBarraAvaliacao(avaliacao) {
      let escala05 = (avaliacao / 10) * 100;
      let percentagem = Math.min(Math.max(escala05, 0), 100);
      return `${percentagem}%`;
    }
    let avaliacao = primeiroFilme.imdbRating;
    document.getElementById('barraAvaliacao-' + index).style.width = criarBarraAvaliacao(avaliacao);
  } else {
    console.error('Nenhum filme encontrado na resposta da API ao carregar a imagem inicial.');
  }
}

// Chama a função para carregar a imagem inicial ao abrir a página  
var filmes_escolhidoss = carregarImagemInicial();

function showChild(childId) {
  let childDiv = document.getElementById("child");
  childDiv.style.display = "block";

  function showChildInfos(json, filmes) {
    let fotoChild = document.getElementById("child-foto")
    let infoChild = document.getElementById("child-conteudo--ul")
    if (json.Type == "movie") {
      fotoChild.innerHTML = `<img src="${json.Poster}" alt="${json.Title}" width="100%">`;
      infoChild.innerHTML = `<li><span class="tipo-child">Nome:</span>  ${json.Title}.</li><li><span class="tipo-child">Data de lançamento:</span> ${json.Released}.</li><li><span class="tipo-child">Duração do filme:</span> ${json.Runtime}.</li><li><span class="tipo-child">Rating MetaCritic/Imdb:</span> ${json.Metascore}/100. | ${json.imdbRating}/10.0.</li><li><span class="tipo-child">Bilheteria em dólares (U$):</span> ${json.BoxOffice}.</li><li><span class="tipo-child">Premiações:</span> ${json.Awards}.</li><li><span class="tipo-child">Diretor:</span> ${json.Director}.</li>`
    } else if (json.Type == "series") {
      fotoChild.innerHTML = `<img src="${json.Poster}" alt="${json.Title}" width="100%">`;
      infoChild.innerHTML = `<li><span class="tipo-child">Nome:</span>  ${json.Title}.</li><li><span class="tipo-child">Data de lançamento:</span> ${json.Released}.</li><li><span class="tipo-child">Duração do filme:</span> ${json.Runtime}.</li><li><span class="tipo-child">Rating Imdb:</span>  ${json.imdbRating}/10.0.</li><li><span class="tipo-child">Total de temporadas:</span> ${json.totalSeasons}.</li><li><span class="tipo-child">Gênero:</span> ${json.Genre}.</li><li><span class="tipo-child">Diretor:</span> ${json.Director}.</li>`
    }
  }

  fetch(`https://www.omdbapi.com/?t=${filmes_escolhidoss[String(parseInt(childId) - 1)]}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => showChildInfos(json));
}

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