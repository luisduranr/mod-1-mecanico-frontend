<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Categoria } from '@/types/categoria'

const router = useRouter()
const categorias = ref<Categoria[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchCategorias = async () => {
  try {
    isLoading.value = true
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categorias`)
    console.log(response)
    if (!response.ok) throw new Error('Error al obtener categorías')
    categorias.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    isLoading.value = false
  }
}

const deleteCategoria = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar esta categoría?')) return

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categorias/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Error al eliminar categoría')
    fetchCategorias()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  }
}

onMounted(() => {
  fetchCategorias()
})
</script>

<template>
  <div class="container mt-4">
    <h1>Lista de Categorías</h1>

    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <router-link to="/categorias/create" class="btn btn-primary mb-3">
      Crear Nueva Categoría
    </router-link>

    <table class="table table-striped table-hover" v-if="!isLoading && !error">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>{{ categoria.descripcion || 'N/A' }}</td>
          <td>
            <router-link
              :to="{ name: 'categoria-detail', params: { id: categoria.id } }"
              class="btn btn-info btn-sm me-2">
              Ver
            </router-link>
            <router-link
              :to="{ name: 'categoria-edit', params: { id: categoria.id } }"
              class="btn btn-warning btn-sm me-2">
              Editar
            </router-link>
            <button
              @click="deleteCategoria(categoria.id!)"
              class="btn btn-danger btn-sm">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>