<template>
  <div class="kategorien">
    <h1>🎭 Kategorien</h1>

    <!-- Kategorie Buttons -->
    <div class="kategorie-buttons">
      <button
        v-for="kat in kategorien"
        :key="kat.name"
        :class="['kat-btn', aktiveKategorie === kat.name ? 'active' : '']"
        :style="{ backgroundColor: aktiveKategorie === kat.name ? kat.farbe : '' }"
        @click="ladeKategorie(kat.name)"
      >
        {{ kat.emoji }} {{ kat.name }}
      </button>
    </div>

    <!-- Filme -->
    <div v-if="loading" class="loading">
      <p>Filme werden geladen...</p>
    </div>
    <div v-else-if="filme.length > 0">
      <h2 class="section-title">{{ aktiveKategorie }} Filme</h2>
      <div class="movie-grid">
        <MovieCard v-for="movie in filme" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>
    <div v-else class="empty">
      <p>Wähle eine Kategorie aus!</p>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

const API_KEY = 'c7501fee'

export default {
  name: 'KategorienView',
  components: { MovieCard },
  data() {
    return {
      aktiveKategorie: '',
      filme: [],
      loading: false,
      kategorien: [
        { name: 'Action', emoji: '💥', farbe: '#e50914' },
        { name: 'Comedy', emoji: '😂', farbe: '#f5a623' },
        { name: 'Horror', emoji: '👻', farbe: '#7b2d8b' },
        { name: 'Romance', emoji: '💕', farbe: '#ff69b4' },
        { name: 'Drama', emoji: '🎭', farbe: '#1a73e8' },
        { name: 'Thriller', emoji: '😱', farbe: '#2ecc71' },
        { name: 'Animation', emoji: '🎨', farbe: '#ff9800' },
        { name: 'Documentary', emoji: '🎬', farbe: '#607d8b' }
      ]
    }
  },
  methods: {
    async ladeKategorie(name) {
      this.aktiveKategorie = name
      this.loading = true
      this.filme = []
      const res = await fetch('https://www.omdbapi.com/?s=' + name + '&apikey=' + API_KEY)
      const data = await res.json()
      if (data.Response === 'True') {
        this.filme = data.Search
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.kategorien {
  padding: 30px;
}
h1 {
  font-size: 32px;
  margin-bottom: 30px;
  color: white;
}
.kategorie-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
}
.kat-btn {
  padding: 12px 25px;
  background: #333;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
}
.kat-btn:hover {
  transform: scale(1.05);
}
.kat-btn.active {
  color: white;
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
.loading {
  text-align: center;
  padding: 50px;
  color: #aaa;
  font-size: 18px;
}
.empty {
  text-align: center;
  padding: 80px;
  color: #aaa;
  font-size: 18px;
}
</style>