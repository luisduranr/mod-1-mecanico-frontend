<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductoById, updateProducto, getCategorias, type Producto } from '@/services/productos.service'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const producto = ref<Producto>({
  id: 0,
  nombre: '',
  descripcion: '',
  precio: 0,
  imagen: '',
  categoriaId: 0
})
const categorias = ref<{id: number, nombre: string}[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchData = async () => {
  try {
    isLoading.value = true
    const [productoData, categoriasData] = await Promise.all([
      getProductoById(id),
      getCategorias()
    ])
    producto.value = productoData
    categorias.value = categoriasData
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar datos'
    if (error.value.includes('no encontrado')) {
      router.push({ name: 'productos' })
    }
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  if (!producto.value.nombre || !producto.value.categoriaId) {
    error.value = 'Nombre y categoría son requeridos'
    return
  }

  try {
    isLoading.value = true
    await updateProducto(id, producto.value)
    router.push({ name: 'productos' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al actualizar el producto'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container mt-4">
    <h1>Editar Producto</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form @submit.prevent="handleSubmit" v-if="!isLoading">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="producto.nombre"
          required
        >
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          id="descripcion"
          v-model="producto.descripcion"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input
          type="number"
          class="form-control"
          id="precio"
          step="0.01"
          min="0"
          v-model="producto.precio"
          required
        >
      </div>

      <div class="mb-3">
        <label for="imagen" class="form-label">Imagen (URL)</label>
        <input
          type="text"
          class="form-control"
          id="imagen"
          v-model="producto.imagen"
        >
      </div>

      <div class="mb-3">
        <label for="categoria" class="form-label">Categoría</label>
        <select
          class="form-select"
          id="categoria"
          v-model="producto.categoriaId"
          required
        >
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {{ isLoading ? 'Guardando...' : 'Guardar' }}
      </button>

      <router-link to="/productos" class="btn btn-secondary ms-2">
        Cancelar
      </router-link>
    </form>

    <div v-else class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  </div>
</template>