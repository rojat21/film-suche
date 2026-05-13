<template>
  <div class="detail" v-if="movie">
    <div
      class="backdrop"
      :style="movie.Poster && movie.Poster !== 'N/A' ? { backgroundImage: 'url(' + movie.Poster + ')' } : {}"
    ></div>
    <div class="content">
      <div class="poster-section">
        <img
          :src="movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/280x420?text=Kein+Bild'"
          :alt="movie.Title"
          class="poster"
        />
        <div class="action-buttons">
          <button @click="toggleFavorit" :class="['btn', isFavorit ? 'btn-active' : '']">
            ⭐ {{ isFavorit ? 'Aus Favoriten' : 'Favoriten' }}
          </button>
          <button @click="toggleWatchlist" :class="['btn', isWatchlist ? 'btn-active' : '']">
            📋 {{ isWatchlist ? 'Aus Watchlist' : 'Watchlist' }}
          </button>
          <button @click="openTrailer" class="btn btn-trailer">
            ▶ Trailer
          </button>
        </div>
      </div>
      <div class="info-section">
        <h1>{{ movie.Title }}</h1>
        <div class="meta">
          <span class="year">{{ movie.Year }}</span>
          <span class="runtime">{{ movie.Runtime }}</span>
          <span class="rated">{{ movie.Rated }}</span>
        </div>
        <div class="genres">
          <span
            v-for="genre in movie.Genre ? movie.Genre.split(',') : []"
            :key="genre"
            class="genre-badge"
            :style="{ backgroundColor: genreColor(genre.trim()) }"
          >
            {{ genre.trim() }}
          </span>
        </div>
        <div class="rating">
          <div class="stars">
            <span
              v-for="n in 10"
              :key="n"
              :class="['star', n <= Math.round(parseFloat(movie.imdbRating)) ? 'filled' : '']"
            >★</span>
          </div>
          <p class="rating-text">{{ movie.imdbRating }} / 10 (IMDb)</p>
        </div>
        <p class="plot">{{ movie.Plot }}</p>
        <div class="extra-info">
          <p><strong>Regisseur:</strong> {{ movie.Director }}</p>
          <p><strong>Schauspieler:</strong> {{ movie.Actors }}</p>
          <p><strong>Land:</strong> {{ movie.Country }}</p>
          <p><strong>Sprache:</strong> {{ movie.Language }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Film wird geladen...</p>
  </div>
</template>

<script>
const API_KEY = 'c7501fee'

export default {
  name: 'DetailView',
  data() {
    return {
      movie: null,
      isFavorit: false,
      isWatchlist: false
    }
  },
  mounted() {
    this.loadMovie()
  },
  methods: {
    async loadMovie() {
      const id = this.$route.params.id
      const res = await fetch('https://www.omdbapi.com/?i=' + id + '&apikey=' + API_KEY)
      const data = await res.json()
      if (data.Response === 'True') {
        this.movie = data
        this.checkLists()
      }
    },
    checkLists() {
      const favoriten = JSON.parse(localStorage.getItem('favoriten') || '[]')
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
      this.isFavorit = favoriten.some(f => f.imdbID === this.movie.imdbID)
      this.isWatchlist = watchlist.some(w => w.imdbID === this.movie.imdbID)
    },
    toggleFavorit() {
      let favoriten = JSON.parse(localStorage.getItem('favoriten') || '[]')
      if (this.isFavorit) {
        favoriten = favoriten.filter(f => f.imdbID !== this.movie.imdbID)
      } else {
        favoriten.push(this.movie)
      }
      localStorage.setItem('favoriten', JSON.stringify(favoriten))
      this.isFavorit = !this.isFavorit
    },
    toggleWatchlist() {
      let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
      if (this.isWatchlist) {
        watchlist = watchlist.filter(w => w.imdbID !== this.movie.imdbID)
      } else {
        watchlist.push(this.movie)
      }
      localStorage.setItem('watchlist', JSON.stringify(watchlist))
      this.isWatchlist = !this.isWatchlist
    },
    openTrailer() {
      window.open('https://www.youtube.com/results?search_query=' + this.movie.Title + '+trailer', '_blank')
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
.detail {
  position: relative;
  min-height: 100vh;
}
.backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(20px) brightness(0.3);
  z-index: -1;
}
.content {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 40px;
  padding: 40px;
  max-width: 1100px;
  margin: 0 auto;
}
.poster {
  width: 280px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  background: #333;
  color: white;
  text-align: center;
  text-decoration: none;
}
.btn:hover { background: #555; }
.btn-active { background: #e50914; }
.btn-trailer { background: #ff0000; }
.btn-trailer:hover { background: #cc0000; }
.info-section { flex: 1; }
.info-section h1 { font-size: 36px; margin-bottom: 10px; }
.meta { display: flex; gap: 15px; color: #aaa; margin-bottom: 15px; }
.genres { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.genre-badge {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 13px;
  color: white;
}
.rating { margin-bottom: 20px; }
.stars { display: flex; gap: 4px; font-size: 24px; }
.star { color: #555; }
.star.filled { color: #f5a623; }
.rating-text { color: #aaa; margin-top: 5px; }
.plot { font-size: 16px; line-height: 1.7; margin-bottom: 25px; color: #ddd; }
.extra-info p { margin-bottom: 8px; color: #ccc; }
.extra-info strong { color: white; }
.loading { text-align: center; padding: 100px; font-size: 20px; }
</style>