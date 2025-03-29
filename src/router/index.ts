import { createRouter, createWebHistory } from 'vue-router'
import CategoriaList from '@/views/categorias/CategoriaList.vue'
import CategoriaCreate from '@/views/categorias/CategoriaCreate.vue'
import CategoriaEdit from '@/views/categorias/CategoriaEdit.vue'
import CategoriaDetail from '@/views/categorias/CategoriaDetail.vue'
import Home from '@/views/Home.vue'
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
    }
  ],
})

export default router
