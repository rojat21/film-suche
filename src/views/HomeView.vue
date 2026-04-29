<template>
  <div class="home">
    <!-- Suchfeld -->
    <div class="search-section">
      <input
        v-model="searchQuery"
        @keyup.enter="searchMovies"
        type="text"
        placeholder="🔍 Film suchen..."
        class="search-input"
      />
      <button @click="searchMovies" class="search-btn">Suchen</button>
      <button @click="randomMovie" class="random-btn">🎲 Überrasch mich</button>
    </div>

    <!-- Suchergebnisse -->
    <div v-if="searchResults.length > 0">
      <h2 class="section-title">Suchergebnisse</h2>
      <div class="movie-grid">
        <MovieCard v-for="movie in searchResults" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>

    <!-- Beliebte Filme -->
    <div v-if="searchResults.length === 0">
      <h2 class="section-title">🔥 Beliebte Filme</h2>
      <div class="movie-grid">
        <MovieCard v-for="movie in popularMovies" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

const API_KEY = 'c7501fee'

export default {
  name: 'HomeView',
  components: { MovieCard },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      popularMovies: []
    }
  },
  mounted() {
    this.loadPopularMovies()
  },
  methods: {
    async loadPopularMovies() {
      const titles = ['Avengers', 'Inception', 'Interstellar', 'Batman', 'Spider-Man', 'Iron Man', 'Joker', 'Matrix']
      const results = []
      for (const title of titles) {
        const res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`)
        const data = await res.json()
        if (data.Response === 'True') results.push(data)
      }
      this.popularMovies = results
    },
    async searchMovies() {
      if (!this.searchQuery) return
      const res = await fetch(`https://www.omdbapi.com/?s=${this.searchQuery}&apikey=${API_KEY}`)
      const data = await res.json()
      if (data.Response === 'True') {
        this.searchResults = data.Search
      } else {
        this.searchResults = []
        alert('Keine Filme gefunden!')
      }
    },
    randomMovie() {
      const titles = ['Avengers', 'Inception', 'Interstellar', 'Batman', 'Joker', 'Matrix', 'Titanic', 'Avatar']
      const random = titles[Math.floor(Math.random() * titles.length)]
      this.$router.push('/detail/' + random)
    }
  }
}
</script>

<style scoped>
.home {
  padding: 30px;
}
.search-section {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  justify-content: center;
}
.search-input {
  width: 400px;
  padding: 12px 20px;
  border-radius: 25px;
  border: none;
  font-size: 16px;
  background: #333;
  color: white;
}
.search-input::placeholder {
  color: #aaa;
}
.search-btn {
  padding: 12px 25px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}
.search-btn:hover {
  background: #b20710;
}
.random-btn {
  padding: 12px 25px;
  background: #333;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}
.random-btn:hover {
  background: #555;
}
.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: white;
}
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>