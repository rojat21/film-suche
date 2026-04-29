<template>
  <div class="movie-card" @click="goToDetail">
    <div class="poster-wrapper">
      <img
        :src="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'"
        :alt="movie.Title"
        class="poster"
      />
      <div class="overlay">
        <p class="overview">{{ movie.Year }}</p>
        <template v-if="movie.Genre">
          <span
            v-for="genre in movie.Genre.split(',')"
            :key="genre"
            class="genre-badge"
            :style="{ backgroundColor: genreColor(genre.trim()) }"
          >
            {{ genre.trim() }}
          </span>
        </template>
      </div>
    </div>
    <div class="movie-info">
      <h3>{{ movie.Title }}</h3>
      <p class="year">{{ movie.Year }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  methods: {
    goToDetail() {
      this.$router.push('/detail/' + this.movie.imdbID)
    },
    genreColor(genre) {
      const colors = {
        Action: '#e50914',
        Comedy: '#f5a623',
        Horror: '#7b2d8b',
        Romance: '#ff69b4',
        Drama: '#1a73e8',
        Thriller: '#2ecc71',
        Animation: '#ff9800',
        Documentary: '#607d8b'
      }
      return colors[genre] || '#555'
    }
  }
}
</script>

<style scoped>
.movie-card {
  cursor: pointer;
  width: 180px;
  transition: transform 0.3s ease;
}
.movie-card:hover {
  transform: scale(1.08);
}
.poster-wrapper {
  position: relative;
}
.poster {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 8px;
}
.overlay {
  position: absolute;
  bottom: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  width: 100%;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.movie-card:hover .overlay {
  opacity: 1;
}
.genre-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  margin: 2px;
  color: white;
}
.movie-info {
  padding: 8px 0;
}
.movie-info h3 {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.year {
  color: #aaa;
  font-size: 12px;
}
</style>