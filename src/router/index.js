import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import FavoritenView from '../views/FavoritenView.vue'
import WatchlistView from '../views/WatchlistView.vue'
import KategorienView from '../views/KategorienView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/detail/:id', component: DetailView },
  { path: '/favoriten', component: FavoritenView },
  { path: '/watchlist', component: WatchlistView },
  { path: '/kategorien', component: KategorienView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router