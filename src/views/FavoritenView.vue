<template>
<div class="favoriten">
<h1>⭐ Meine Favoriten</h1>
<div v-if="favoriten.length === 0" class="empty">
<p>Noch keine Favoriten gespeichert!</p>
<router-link to="/">Filme entdecken</router-link>
</div>
<div v-else class="movie-grid">
<MovieCard v-for="movie in favoriten" :key="movie.imdbID" :movie="movie" />
</div>
</div>
</template>
 
<script>
import MovieCard from '../components/MovieCard.vue'
 
export default {
  name: 'FavoritenView',
  components: { MovieCard },
  data() {
    return { favoriten: [] }
  },
  mounted() {
    this.favoriten = JSON.parse(localStorage.getItem('favoriten') || '[]')
  }
}
</script>
 
<style scoped>
.favoriten { padding: 30px; }
h1 { font-size: 28px; margin-bottom: 30px; }
.empty { text-align: center; padding: 80px; color: #aaa; }
.empty a { color: #e50914; display: block; margin-top: 15px; }
.movie-grid { display: flex; flex-wrap: wrap; gap: 20px; }
</style>