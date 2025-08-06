<template>
  <div class="page">
    <h1>Memory Board</h1>
    <router-link to="/" class="back-btn">⬅ Kembali ke Menu</router-link>

    <MemoryBoardGrid />
  </div>
</template>

<script setup>
import MemoryBoardGrid from '../components/MemoryBoardGrid.vue'
</script>

<style scoped>
.page { text-align: center; padding: 2rem; }
.back-btn { display: inline-block; margin: 1rem; color: #42b883; }
</style>
