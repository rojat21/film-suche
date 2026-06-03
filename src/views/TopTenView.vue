<template>
  <div class="topten">
    <h1>🏆 Top 10 Filme</h1>
    <div class="movie-list">
      <div
        v-for="(movie, index) in topMovies"
        :key="movie.imdbID"
        class="movie-item"
        @click="goToDetail(movie.imdbID)"
      >
        <div class="rank">{{ index + 1 }}</div>
        <img
          :src="movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120?text=Kein+Bild'"
          :alt="movie.Title"
          class="poster"
        />
        <div class="info">
          <h2>{{ movie.Title }}</h2>
          <p class="year">{{ movie.Year }} | {{ movie.Genre }}</p>
          <div class="stars">
            <span
              v-for="n in 10"
              :key="n"
              :class="['star', n <= Math.round(parseFloat(movie.imdbRating)) ? 'filled' : '']"
            >★</span>
            <span class="rating-num">{{ movie.imdbRating }}/10</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_KEY = 'c7501fee'

export default {
  name: 'TopTenView',
  data() {
    return {
      topMovies: []
    }
  },
  mounted() {
    this.loadTopMovies()
  },
  methods: {
    async loadTopMovies() {
      const titles = [
        'The Shawshank Redemption',
        'The Godfather',
        'The Dark Knight',
        'Schindlers List',
        'Pulp Fiction',
        'Forrest Gump',
        'Inception',
        'Interstellar',
        'Goodfellas',
        'Fight Club'
      ]
      const results = []
      for (const title of titles) {
        const res = await fetch('https://www.omdbapi.com/?t=' + title + '&apikey=' + API_KEY)
        const data = await res.json()
        if (data.Response === 'True') results.push(data)
      }
      this.topMovies = results
    },
    goToDetail(id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style scoped>
.topten {
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
}
h1 {
  font-size: 32px;
  margin-bottom: 30px;
  color: white;
}
.movie-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.movie-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #1f1f1f;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s;
}
.movie-item:hover {
  transform: scale(1.02);
  background: #2a2a2a;
}
.rank {
  font-size: 48px;
  font-weight: bold;
  color: #e50914;
  width: 60px;
  text-align: center;
}
.poster {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
.info { flex: 1; }
.info h2 { font-size: 20px; margin-bottom: 8px; }
.year { color: #aaa; font-size: 14px; margin-bottom: 10px; }
.stars { display: flex; align-items: center; gap: 3px; font-size: 18px; }
.star { color: #555; }
.star.filled { color: #f5a623; }
.rating-num { color: #aaa; font-size: 14px; margin-left: 8px; }
</style>