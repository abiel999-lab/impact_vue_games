<template>
  <div class="page">
    <h1>Tic Tac Toe</h1>
    <router-link to="/" class="back-btn">⬅ Kembali ke Menu</router-link>

    <TicTacToeBoard />
  </div>
</template>

<script setup>
import TicTacToeBoard from '../components/TicTacToeBoard.vue'
</script>

<style scoped>
.page { text-align: center; padding: 2rem; }
.back-btn { display: inline-block; margin: 1rem; color: #42b883; }
.placeholder {
  margin: 2rem auto;
  padding: 3rem;
  border: 2px dashed #aaa;
  width: 200px;
  border-radius: 8px;
}
</style>
