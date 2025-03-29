<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductoById, type Producto } from '@/services/productos.service'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const producto = ref<Producto | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchProducto = async () => {
  try {
    producto.value = await getProductoById(id)
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar el producto'
    if (error.value.includes('no encontrado')) {
      router.push({ name: 'productos' })
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducto()
})
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Detalles del Producto</h1>
      <button @click="router.push({ name: 'productos' })" class="btn btn-secondary">
        Volver
      </button>
    </div>

    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="producto" class="card">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="producto.imagen || 'https://via.placeholder.com/300'"
            class="img-fluid rounded-start"
            :alt="producto.nombre"
          >
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">{{ producto.nombre }}</h2>
            <p class="card-text">{{ producto.descripcion }}</p>
            <p class="card-text">
              <strong>Precio:</strong> ${{ producto.precio.toFixed(2) }}
            </p>
            <p class="card-text">
              <strong>Categoría:</strong> {{ producto.categoria?.nombre }}
            </p>
            <div class="mt-4">
              <router-link
                :to="{ name: 'edit-producto', params: { id: producto.id } }"
                class="btn btn-warning me-2"
              >
                Editar
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>