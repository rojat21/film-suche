<template>
<div class="watchlist">
<h1>📋 Meine Watchlist</h1>
<div v-if="watchlist.length === 0" class="empty">
<p>Noch keine Filme in der Watchlist!</p>
<router-link to="/">Filme entdecken</router-link>
</div>
<div v-else class="movie-grid">
<MovieCard v-for="movie in watchlist" :key="movie.imdbID" :movie="movie" />
</div>
</div>
</template>
 
<script>
import MovieCard from '../components/MovieCard.vue'
 
export default {
  name: 'WatchlistView',
  components: { MovieCard },
  data() {
    return { watchlist: [] }
  },
  mounted() {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
  }
}
</script>
 
<style scoped>
.watchlist { padding: 30px; }
h1 { font-size: 28px; margin-bottom: 30px; }
.empty { text-align: center; padding: 80px; color: #aaa; }
.empty a { color: #e50914; display: block; margin-top: 15px; }
.movie-grid { display: flex; flex-wrap: wrap; gap: 20px; }
</style>