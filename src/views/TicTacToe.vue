<template>
  <div :class="['page', theme]">
    <h1 class="title" :class="theme">Tic Tac Toe</h1>
    <router-link to="/" class="back-btn">⬅ Kembali ke Menu</router-link>

    <TicTacToeBoard />
  </div>
</template>

<script setup>
import TicTacToeBoard from '../components/TicTacToeBoard.vue'
import { useTheme } from '../composables/useTheme.js'

const { theme } = useTheme()
</script>

<style scoped>
.page {
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}
.light { background: #f7f7f7; color: #333; }
.dark { background: #222; color: #f7f7f7; }

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: text-shadow 0.3s;
}
.title.light { text-shadow: 2px 2px 0 #42b883; }
.title.dark { text-shadow: 2px 2px 0 #f1c40f; }

.back-btn { display: block; margin-bottom: 1rem; color: #ab92d4; }
</style>
