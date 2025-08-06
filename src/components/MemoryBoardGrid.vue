<template>
  <div class="memory-container">
    <!-- Pilih jumlah tiles -->
    <div class="tile-select">
      <span>Jumlah Tiles:</span>
      <div class="mode-buttons">
        <button
          v-for="size in tileOptions"
          :key="size"
          @click="selectTiles(size)"
          :class="['mode-btn', { active: tiles === size }]"
        >
          {{ size }}
        </button>
      </div>
      <button class="start-btn" @click="startGame">Start Game</button>
    </div>

    <!-- Timer & Status -->
    <p v-if="timeLeft > 0 && !status" class="timer">Waktu: {{ timeLeft }} detik</p>
    <p v-if="status" class="status">{{ status }}</p>

    <!-- Grid -->
    <div
      class="grid"
      :style="{ gridTemplateColumns: `repeat(${gridCols}, 70px)` }"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="[theme, { flipped: card.flipped || card.matched }]"
        @click="flipCard(index)"
      >
        <span v-if="card.flipped || card.matched">{{ card.emoji }}</span>
      </div>
    </div>

    <button class="reset-btn" @click="resetGame">Reset Game</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme } = useTheme()

const tileOptions = [16, 32, 48, 64]
const tiles = ref(16)
const cards = ref([])
const emojis = [
  '🍎','🍌','🍇','🍉','🍓','🥝','🍑','🍒','🥑','🍍',
  '🍋','🥥','🥭','🫐','🍈','🍐','🍔','🍟','🌭','🍕',
  '🍿','🥗','🥪','🌮','🌯','🥙','🥞','🧇','🍗','🥩',
  '🥓','🧀'
]
const timeLeft = ref(0)
const status = ref(null)
let timer = null
let flippedIndices = []

// Kolom grid dinamis
const gridCols = computed(() => {
  switch (tiles.value) {
    case 16: return 4   // 4x4
    case 32: return 8   // 8x4
    case 48: return 8   // 8x6
    case 64: return 8   // 8x8
    default: return Math.sqrt(tiles.value)
  }
})

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function selectTiles(size) {
  tiles.value = size
  resetGame() // langsung update grid
}

function startGame() {
  resetGame()
  startTimer()
}

function startTimer() {
  clearInterval(timer)
  status.value = null
  const durations = { 16: 60, 32: 120, 48: 180, 64: 300 }
  timeLeft.value = durations[tiles.value] || 60

  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      endGame('⏰ Waktu Habis! Kamu Cupu')
    }
  }, 1000)
}

function resetGame() {
  clearInterval(timer)
  timeLeft.value = 0
  status.value = null

  const pairCount = tiles.value / 2
  const selectedEmojis = emojis.slice(0, pairCount)
  cards.value = shuffle([...selectedEmojis, ...selectedEmojis]).map(e => ({
    emoji: e,
    flipped: false,
    matched: false,
  }))
  flippedIndices = []
}

function flipCard(index) {
  if (status.value || timeLeft.value <= 0) return

  const card = cards.value[index]
  if (card.flipped || card.matched || flippedIndices.length === 2) return

  card.flipped = true
  flippedIndices.push(index)

  if (flippedIndices.length === 2) {
    const [first, second] = flippedIndices
    if (cards.value[first].emoji === cards.value[second].emoji) {
      cards.value[first].matched = true
      cards.value[second].matched = true
      flippedIndices = []

      // Cek kemenangan
      if (cards.value.every(c => c.matched)) {
        endGame('🎉 Kamu Menang!')
      }
    } else {
      setTimeout(() => {
        cards.value[first].flipped = false
        cards.value[second].flipped = false
        flippedIndices = []
      }, 800)
    }
  }
}

function endGame(message) {
  clearInterval(timer)
  status.value = message
}
</script>

<style scoped>
.memory-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tile-select {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #ab92d4;
}

.mode-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.mode-btn {
  padding: 0.4rem 0.8rem;
  border: 2px solid #ab92d4;
  border-radius: 6px;
  background: transparent;
  color: #ab92d4;
  cursor: pointer;
  transition: 0.3s;
}
.mode-btn:hover,
.mode-btn.active {
  background: #ab92d4;
  color: white;
}

.start-btn {
  padding: 0.4rem 0.8rem;
  background: #ab92d4;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-gap: 10px;
  margin-bottom: 1rem;
}

.card {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}
.card.light { background: #3498db; color: white; }
.card.dark { background: #2980b9; color: white; }
.card.flipped { background: white !important; color: black !important; transform: rotateY(180deg); }

.reset-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #ab92d4;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.reset-btn:hover {
  background: #9677c4;
}

.timer {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ab92d4;
}
.status {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ffcc00;
}
</style>
