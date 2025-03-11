document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "8317c7bfd13b004d55dba9190620efef";
    const categories = [
        { query: "top_rated", containerId: "popular-movieshome", type: "movie" },
    ];

    // Função para buscar os filmes
    async function fetchMovies(query, type) {
        const apiUrl = `https://api.themoviedb.org/3/${type}/${query}?api_key=${apiKey}&language=pt-BR`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
            return [];
        }
    }

    // Função para buscar trailer do filme
    async function fetchTrailer(movieId, type) {
        const trailerUrl = `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${apiKey}&language=pt-BR`;
        try {
            const response = await fetch(trailerUrl);
            const data = await response.json();
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
        } catch (error) {
            console.error("Erro ao buscar trailer: ", error);
            return null;
        }
    }

    for (let category of categories) {
        const container = document.getElementById(category.containerId);
        if (!container) continue;

        const movies = await fetchMovies(category.query, category.type);

        if (movies.length > 0) {
            container.innerHTML = ""; 

            for (let movie of movies.slice(0, 6)) {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card-home");

                const trailerLink = await fetchTrailer(movie.id, category.type);

                movieCard.innerHTML = `
                    <div class="movie-image">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title || movie.name}">
                        ${trailerLink ? `<a href="${trailerLink}" target="_blank" class="play-button"><i class="fas fa-play"></i></a>` : ""}
                    </div>
                    <h3>${movie.title || movie.name}</h3>
                    <p>${movie.release_date ? new Date(movie.release_date).getFullYear() : (movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : "Data desconhecida")}</p>
                `;

                container.appendChild(movieCard);
            }
        } else {
            container.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
        }
    }
});
