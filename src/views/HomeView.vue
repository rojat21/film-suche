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
      const titles = [
        'Avengers', 'Inception', 'Interstellar', 'Batman', 'Spider-Man', 'Iron Man',
        'Joker', 'Matrix', 'Titanic', 'Avatar', 'Gladiator', 'The Dark Knight',
        'Pulp Fiction', 'Forrest Gump', 'The Lion King', 'Toy Story', 'Harry Potter',
        'Lord of the Rings', 'Fast and Furious', 'Mission Impossible', 'Shrek',
        'Finding Nemo', 'Up', 'Wall-E', 'Coco', 'Frozen', 'Moana', 'Zootopia',
        'Inside Out', 'Brave', 'Ratatouille', 'Cars', 'Monsters Inc', 'Mulan',
        'Aladdin', 'Hercules', 'Cinderella', 'Beauty and the Beast',
        'Goodfellas', 'The Godfather', 'Scarface', 'Casino', 'Taxi Driver',
        'Fight Club', 'Se7en', 'Silence of the Lambs', 'American Psycho', 'Gone Girl',
        'Shutter Island', 'Memento', 'Prestige', 'Donnie Darko', 'Black Swan',
        'Whiplash', 'La La Land', 'Parasite', 'Oldboy', 'Train to Busan',
        'Spirited Away', 'Princess Mononoke', 'Akira',
        'Terminator', 'Alien', 'Predator', 'RoboCop',
        'Total Recall', 'Blade Runner', 'ET', 'Jurassic Park',
        'Jaws', 'Back to the Future', 'Indiana Jones', 'Star Wars', 'Superman',
        'Wonder Woman', 'Aquaman', 'Black Panther', 'Thor', 'Captain America',
        'Doctor Strange', 'Guardians of the Galaxy', 'Ant-Man', 'Deadpool', 'Logan',
        'X-Men', 'Venom', 'Dune'
      ]
      const results = []
      for (const title of titles) {
        const res = await fetch('https://www.omdbapi.com/?t=' + title + '&apikey=' + API_KEY)
        const data = await res.json()
        if (data.Response === 'True') results.push(data)
      }
      this.popularMovies = results
    },
    async searchMovies() {
      if (!this.searchQuery) return
      const res = await fetch('https://www.omdbapi.com/?s=' + this.searchQuery + '&apikey=' + API_KEY)
      const data = await res.json()
      if (data.Response === 'True') {
        this.searchResults = data.Search
      } else {
        this.searchResults = []
        alert('Keine Filme gefunden!')
      }
    },
    async randomMovie() {
      const titles = ['Avengers', 'Inception', 'Interstellar', 'Batman', 'Joker', 'Matrix', 'Titanic', 'Avatar']
      const random = titles[Math.floor(Math.random() * titles.length)]
      const res = await fetch('https://www.omdbapi.com/?t=' + random + '&apikey=' + API_KEY)
      const data = await res.json()
      if (data.Response === 'True') {
        this.$router.push('/detail/' + data.imdbID)
      }
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