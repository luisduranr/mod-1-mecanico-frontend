<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">Mi Taller</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/categorias" class="nav-link">Categorías</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="jumbotron bg-light p-5 rounded-3 mb-4">
        <h1 class="display-4">Bienvenido a la Gestión del taller Mecánico</h1>
        <p class="lead">
          Sistema para administrar mi taller mecánico
        </p>
        <hr class="my-4">
        <p>
          Navega a la sección de categorías para comenzar a gestionar.
        </p>
        <RouterLink
          to="/categorias"
          class="btn btn-primary btn-lg">
          Ver Categorías
        </RouterLink>
      </div>

      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Categorías</h5>
              <p class="card-text">
                Administra las diferentes categorías de productos en tu inventario.
              </p>
              <RouterLink
                to="/categorias"
                class="btn btn-outline-primary">
                Gestionar
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Productos</h5>
              <p class="card-text">
                Administra los productos asociados a tus categorías (próximamente).
              </p>
              <button class="btn btn-outline-secondary" disabled>
                Próximamente
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Reportes</h5>
              <p class="card-text">
                Genera reportes de tu inventario y categorías (próximamente).
              </p>
              <button class="btn btn-outline-secondary" disabled>
                Próximamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.jumbotron {
  background-color: #e9ecef;
}

.nav-link.router-link-active {
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>