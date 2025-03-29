const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Producto {
  id?: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoriaId: number
  categoria?: {
    id: number
    nombre: string
    descripcion?: string
  }
}

export const getProductos = async (): Promise<Producto[]> => {
  const response = await fetch(`${API_BASE_URL}/productos`)
  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }
  return await response.json()
}

export const getProductoById = async (id: number): Promise<Producto> => {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`)
  if (!response.ok) {
    throw new Error('Producto no encontrado')
  }
  return await response.json()
}

export const createProducto = async (producto: Omit<Producto, 'id'>): Promise<Producto> => {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
  if (!response.ok) {
    throw new Error('Error al crear el producto')
  }
  return await response.json()
}

export const updateProducto = async (id: number, producto: Partial<Producto>): Promise<Producto> => {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
  if (!response.ok) {
    throw new Error('Error al actualizar el producto')
  }
  return await response.json()
}

export const deleteProducto = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Error al eliminar el producto')
  }
}

export const getCategorias = async (): Promise<{id: number, nombre: string}[]> => {
  const response = await fetch(`${API_BASE_URL}/categorias`)
  if (!response.ok) {
    throw new Error('Error al obtener las categorías')
  }
  return await response.json()
}