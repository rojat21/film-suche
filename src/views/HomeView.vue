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

    <!-- Carousel -->
    <div class="carousel-section" v-if="carouselMovies.length > 0">
      <div class="carousel">
        <button class="carousel-btn left" @click="prevSlide">&#8249;</button>
        <div class="carousel-track">
          <div class="carousel-slide">
            <img :src="carouselMovies[currentSlide].Poster" :alt="carouselMovies[currentSlide].Title" />
            <div class="carousel-info">
              <h2>{{ carouselMovies[currentSlide].Title }}</h2>
              <p>{{ carouselMovies[currentSlide].Year }} | {{ carouselMovies[currentSlide].Genre }}</p>
              <button @click="goToDetail(carouselMovies[currentSlide].imdbID)" class="carousel-detail-btn">
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
        <button class="carousel-btn right" @click="nextSlide">&#8250;</button>
      </div>
      <div class="carousel-dots">
        <span
          v-for="(movie, index) in carouselMovies"
          :key="index"
          :class="['dot', index === currentSlide ? 'active' : '']"
          @click="currentSlide = index"
        ></span>
      </div>
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
        <MovieCard v-for="movie in paginatedMovies" :key="movie.imdbID" :movie="movie" />
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">
          &#8249; Zurück
        </button>
        <span class="page-info">Seite {{ currentPage }} von {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">
          Weiter &#8250;
        </button>
      </div>
    </div>

    <!-- Zurück nach oben Button -->
    <button v-if="showScrollBtn" @click="scrollToTop" class="scroll-top-btn">▲</button>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

const API_KEY = 'c7501fee'
const MOVIES_PER_PAGE = 20

export default {
  name: 'HomeView',
  components: { MovieCard },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      popularMovies: [],
      carouselMovies: [],
      currentSlide: 0,
      carouselTimer: null,
      currentPage: 1,
      showScrollBtn: false
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.popularMovies.length / MOVIES_PER_PAGE)
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * MOVIES_PER_PAGE
      const end = start + MOVIES_PER_PAGE
      return this.popularMovies.slice(start, end)
    }
  },
  mounted() {
    this.loadPopularMovies()
    this.loadCarouselMovies()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    clearInterval(this.carouselTimer)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    async loadCarouselMovies() {
      const titles = ['Inception', 'Interstellar', 'The Dark Knight', 'Avengers', 'Joker']
      const results = []
      for (const title of titles) {
        const res = await fetch('https://www.omdbapi.com/?t=' + title + '&apikey=' + API_KEY)
        const data = await res.json()
        if (data.Response === 'True') results.push(data)
      }
      this.carouselMovies = results
      this.carouselTimer = setInterval(() => {
        this.nextSlide()
      }, 4000)
    },
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
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.carouselMovies.length
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.carouselMovies.length) % this.carouselMovies.length
    },
    goToDetail(id) {
      this.$router.push('/detail/' + id)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        window.scrollTo(0, 0)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        window.scrollTo(0, 0)
      }
    },
    handleScroll() {
      this.showScrollBtn = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.home { padding: 30px; }
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
.search-input::placeholder { color: #aaa; }
.search-btn {
  padding: 12px 25px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}
.search-btn:hover { background: #b20710; }
.random-btn {
  padding: 12px 25px;
  background: #333;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}
.random-btn:hover { background: #555; }
.carousel-section { margin-bottom: 40px; }
.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 12px;
}
.carousel-track { width: 100%; height: 100%; }
.carousel-slide { position: relative; width: 100%; height: 100%; }
.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5);
}
.carousel-info {
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: white;
}
.carousel-info h2 { font-size: 32px; margin-bottom: 10px; }
.carousel-info p { font-size: 16px; color: #aaa; margin-bottom: 15px; }
.carousel-detail-btn {
  padding: 10px 25px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}
.carousel-detail-btn:hover { background: #b20710; }
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  font-size: 40px;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 10;
  border-radius: 8px;
}
.carousel-btn.left { left: 10px; }
.carousel-btn.right { right: 10px; }
.carousel-btn:hover { background: rgba(0,0,0,0.8); }
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #555;
  cursor: pointer;
}
.dot.active { background: #e50914; }
.section-title { font-size: 22px; margin-bottom: 20px; color: white; }
.movie-grid { display: flex; flex-wrap: wrap; gap: 20px; }
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.page-btn {
  padding: 10px 25px;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
.page-btn:hover:not(:disabled) { background: #e50914; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { color: #aaa; font-size: 16px; }
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  z-index: 999;
}
.scroll-top-btn:hover { background: #b20710; }
</style>