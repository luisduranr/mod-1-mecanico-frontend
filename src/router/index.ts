import { createRouter, createWebHistory } from 'vue-router'
import CategoriaList from '@/views/categorias/CategoriaList.vue'
import CategoriaCreate from '@/views/categorias/CategoriaCreate.vue'
import CategoriaEdit from '@/views/categorias/CategoriaEdit.vue'
import CategoriaDetail from '@/views/categorias/CategoriaDetail.vue'
import Home from '@/views/Home.vue'
import ProductoList from '@/views/productos/ProductoList.vue'
import ProductoCreate from '@/views/productos/ProductoCreate.vue'
import ProductosDetail from '@/views/productos/ProductosDetail.vue'
import ProductoEdit from '@/views/productos/ProductoEdit.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/categorias',
      name: 'categoria-list',
      component: CategoriaList
    },
    {
      path: '/categorias/create',
      name: 'categoria-create',
      component: CategoriaCreate
    },
    {
      path: '/categorias/:id/edit',
      name: 'categoria-edit',
      component: CategoriaEdit,
      props: true
    },
    {
      path: '/categorias/:id',
      name: 'categoria-detail',
      component: CategoriaDetail,
      props: true
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductoList
    },
    {
      path: '/productos/create',
      name: 'create-producto',
      component: ProductoCreate
    },
    {
      path: '/productos/:id',
      name: 'view-producto',
      component: ProductosDetail,
      props: true
    },
    {
      path: '/productos/:id/edit',
      name: 'edit-producto',
      component: ProductoEdit,
      props: true
    }
  ],
})

export default router
