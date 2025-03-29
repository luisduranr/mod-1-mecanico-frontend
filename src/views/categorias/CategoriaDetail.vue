<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Categoria, Producto } from '@/types/categoria'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const categoria = ref<Categoria>({
  id: 0,
  nombre: '',
  descripcion: '',
  productos: []
})
const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchCategoria = async () => {
  try {
    isLoading.value = true
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categorias/${props.id}`)
    if (!response.ok) throw new Error('Error al obtener categoría')
    categoria.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategoria()
})
</script>

<template>
  <div class="container mt-4">
    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="!isLoading && !error">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Detalle de Categoría</h1>
        <router-link to="/categorias" class="btn btn-secondary">
          Volver
        </router-link>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">{{ categoria.nombre }}</h5>
          <p class="card-text">{{ categoria.descripcion || 'Sin descripción' }}</p>
          <router-link
            :to="{ name: 'categoria-edit', params: { id: categoria.id } }"
            class="btn btn-warning">
            Editar
          </router-link>
        </div>
      </div>

      <h2 class="mb-3">Productos en esta categoría</h2>

      <div v-if="categoria.productos && categoria.productos.length > 0">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="producto in categoria.productos" :key="producto.id">
            <div class="card h-100">
              <img :src="producto.imagen" class="card-img-top" :alt="producto.nombre">
              <div class="card-body">
                <h5 class="card-title">{{ producto.nombre }}</h5>
                <p class="card-text">{{ producto.descripcion }}</p>
                <p class="card-text"><strong>Precio:</strong> ${{ producto.precio }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-info">
        No hay productos en esta categoría.
      </div>
    </div>
  </div>
</template>