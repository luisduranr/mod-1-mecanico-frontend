<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProductos, deleteProducto, type Producto } from '@/services/productos.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const productos = ref<Producto[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchProductos = async () => {
  try {
    isLoading.value = true
    productos.value = await getProductos()
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    isLoading.value = false
  }
}

const handleEdit = (id: number) => {
  router.push({ name: 'edit-producto', params: { id } })
}

const handleView = (id: number) => {
  router.push({ name: 'view-producto', params: { id } })
}

const handleDelete = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    try {
      await deleteProducto(id)
      await fetchProductos()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar el producto'
    }
  }
}

onMounted(() => {
  fetchProductos()
})
</script>

<template>
  <div class="container mt-4">
    <h1>Lista de Productos</h1>

    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="d-flex justify-content-end mb-3">
      <router-link to="/productos/create" class="btn btn-primary">
        Crear Producto
      </router-link>
    </div>

    <table class="table table-striped table-hover" v-if="!isLoading && !error">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>${{ producto.precio.toFixed(2) }}</td>
          <td>{{ producto.categoria?.nombre }}</td>
          <td>
            <button @click="handleView(producto.id!)" class="btn btn-info btn-sm me-2">Ver</button>
            <button @click="handleEdit(producto.id!)" class="btn btn-warning btn-sm me-2">Editar</button>
            <button @click="handleDelete(producto.id!)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>