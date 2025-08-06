<template>
  <div class="memory-game">
    <div class="grid">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ flipped: card.flipped || card.matched }"
        @click="flipCard(index)"
      >
        <span v-if="card.flipped || card.matched">{{ card.value }}</span>
      </div>
    </div>

    <p v-if="isWin" class="win-message">🎉 Kamu menang! Semua kartu cocok 🎉</p>
    <button class="reset-btn" @click="resetGame">Reset Game</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// simbol kartu (bisa ditambah)
const symbols = ['🍎','🍌','🍇','🍉','🍒','🍓']

// buat deck 2x lipat (pasangan) & acak
const createDeck = () => {
  return [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5)
    .map(value => ({ value, flipped: false, matched: false }))
}

const cards = ref(createDeck())
const flippedCards = ref([])

function flipCard(index) {
  const card = cards.value[index]
  if (card.flipped || card.matched || flippedCards.value.length === 2) return

  card.flipped = true
  flippedCards.value.push(index)

  // jika 2 kartu terbuka
  if (flippedCards.value.length === 2) {
    const [first, second] = flippedCards.value
    if (cards.value[first].value === cards.value[second].value) {
      cards.value[first].matched = true
      cards.value[second].matched = true
    } else {
      setTimeout(() => {
        cards.value[first].flipped = false
        cards.value[second].flipped = false
      }, 800)
    }
    flippedCards.value = []
  }
}

function resetGame() {
  cards.value = createDeck()
  flippedCards.value = []
}

const isWin = computed(() => cards.value.every(c => c.matched))
</script>

<style scoped>
.memory-game { text-align: center; margin-top: 2rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
  margin-bottom: 1rem;
}
.card {
  width: 80px;
  height: 80px;
  background: #3498db;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.card.flipped {
  background: #f1c40f;
  color: black;
}
.win-message { font-size: 1.2rem; margin-top: 1rem; }
.reset-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #42b883;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.reset-btn:hover { background: #2d8f6d; }
</style>
