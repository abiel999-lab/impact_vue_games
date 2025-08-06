import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import TicTacToe from '../views/TicTacToe.vue'
import MemoryBoard from '../views/MemoryBoard.vue'

const routes = [
  { path: '/', component: MainMenu },
  { path: '/tictactoe', component: TicTacToe },
  { path: '/memory', component: MemoryBoard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
