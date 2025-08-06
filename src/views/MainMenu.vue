<template>
  <div :class="theme">
    <header class="header">
      <h1>Impact Vue Games</h1>
      <button class="theme-btn" @click="toggleTheme">
        {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
      </button>
    </header>

    <main class="menu">
      <router-link to="/tictactoe" class="game-btn">🎮 Tic Tac Toe</router-link>
      <router-link to="/memory" class="game-btn">🧠 Memory Board</router-link>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
.light { background: #f7f7f7; color: #333; min-height: 100vh; }
.dark { background: #222; color: #f7f7f7; min-height: 100vh; }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #42b883;
  color: white;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
}

.game-btn {
  padding: 1rem 2rem;
  background: #35495e;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: 0.3s;
}

.game-btn:hover { background: #42b883; }

.theme-btn {
  background: white;
  color: #42b883;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
