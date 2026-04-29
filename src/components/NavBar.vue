<template>
  <nav class="navbar">
    <router-link to="/">🎬 FilmSuche</router-link>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/kategorien">Kategorien</router-link>
      <router-link to="/favoriten">⭐ Favoriten</router-link>
      <router-link to="/watchlist">📋 Watchlist</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  padding: 15px 30px;
}
.navbar a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 16px;
}
.navbar a:hover {
  color: #e50914;
}
.nav-links {
  display: flex;
  gap: 20px;
}
</style>