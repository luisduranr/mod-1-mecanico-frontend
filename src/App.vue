<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Gestión de Categorías</a>
        <div class="navbar-nav">
          <router-link to="/categorias" class="nav-link">Categorías</router-link>
        </div>
      </div>
    </nav>
  </div> -->
  </header>

  <RouterView />

</template>

<style scoped>
.router-link-active {
  font-weight: bold;
}
body {
  padding-top: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
