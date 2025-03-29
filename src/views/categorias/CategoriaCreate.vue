<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Categoria } from '@/types/categoria'

const router = useRouter()
const categoria = ref<Omit<Categoria, 'id'>>({
  nombre: '',
  descripcion: ''
})
const error = ref<string | null>(null)
const isLoading = ref(false)

const submitForm = async () => {
  try {
    isLoading.value = true
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoria.value)
    })

    if (!response.ok) throw new Error('Error al crear categoría')

    router.push('/categorias')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1>Crear Nueva Categoría</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="categoria.nombre"
          required>
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          id="descripcion"
          v-model="categoria.descripcion"
          rows="3"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
        {{ isLoading ? 'Guardando...' : 'Guardar' }}
      </button>

      <router-link to="/categorias" class="btn btn-secondary ms-2">
        Cancelar
      </router-link>
    </form>
  </div>
</template>