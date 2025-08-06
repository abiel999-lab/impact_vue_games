<template>
  <div :class="['page', theme]">
    <h1 class="title" :class="theme">Impact Vue Games</h1>

    <div class="menu">
      <router-link to="/tictactoe" class="game-btn">🎮 Tic Tac Toe</router-link>
      <router-link to="/memoryboard" class="game-btn">🧠 Memory Board</router-link>
    </div>

    <button class="theme-btn" @click="toggleTheme">
      {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'
const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}
.light { background: #f7f7f7; color: #333; }
.dark { background: #222; color: #f7f7f7; }

/* Title Outline */
.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-align: center;
  transition: text-shadow 0.3s;
}
.title.light { text-shadow: 2px 2px 0 #42b883; }
.title.dark { text-shadow: 2px 2px 0 #f1c40f; }

/* Game Menu */
.menu {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
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

/* Theme Switch */
.theme-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  color: #42b883;
  border-radius: 5px;
  cursor: pointer;
}
.theme-btn:hover { background: #eee; }
.dark .theme-btn {
  background: #333;
  color: #f1c40f;
}
.dark .theme-btn:hover { background: #444; }
</style>
