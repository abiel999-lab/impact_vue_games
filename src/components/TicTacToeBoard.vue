<template>
  <div class="board-container">
    <!-- Pilih mode game -->
    <div class="mode-select">
      <span>Pilih Mode:</span>
      <div class="mode-buttons">
        <button
          v-for="option in modes"
          :key="option.value"
          @click="selectMode(option.value)"
          :class="['mode-btn', { active: mode === option.value }]"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- Skor -->
    <div class="score-board">
      <div class="score">X: {{ scoreX }}</div>
      <div class="score">O: {{ scoreO }}</div>
    </div>

    <!-- Board -->
    <div class="board">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="cell"
        :class="[theme]"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>

    <!-- Info & Reset -->
    <div class="bottom-section">
      <p v-if="winner" class="winner">{{ winner }} menang!</p>
      <button class="reset-btn" @click="resetGame">Reset Game</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme } = useTheme()

// Mode permainan
const modes = [
  { label: 'PVP', value: 'pvp' },
  { label: 'AI Easy', value: 'easy' },
  { label: 'AI Medium', value: 'medium' },
  { label: 'AI Impossible', value: 'impossible' }
]

// State utama
const cells = ref(Array(9).fill(''))
const currentPlayer = ref('X')
const winner = ref(null)
const mode = ref('pvp')

// Skor X dan O
const scoreX = ref(0)
const scoreO = ref(0)

function selectMode(newMode) {
  mode.value = newMode
  resetGame()
}

// Main move handler
function makeMove(index) {
  if (!cells.value[index] && !winner.value) {
    cells.value[index] = currentPlayer.value
    if (checkWinner()) {
      winner.value = currentPlayer.value
      if (winner.value === 'X') scoreX.value++
      else if (winner.value === 'O') scoreO.value++
    } else if (isDraw()) {
      winner.value = 'Seri'
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
      if (mode.value !== 'pvp' && currentPlayer.value === 'O') {
        setTimeout(aiMove, 500)
      }
    }
  }
}

/* ---------------- AI Logic ---------------- */
function aiMove() {
  let move
  if (mode.value === 'easy') {
    move = getRandomMove()
  } else if (mode.value === 'medium') {
    move = getMediumMove()
  } else if (mode.value === 'impossible') {
    move = getBestMove()
  }
  makeMove(move)
}

// Easy: 100% random
function getRandomMove() {
  const available = cells.value
    .map((val, idx) => (val === '' ? idx : null))
    .filter((val) => val !== null)
  return available[Math.floor(Math.random() * available.length)]
}

// Medium: coba menang -> blok -> 60% best / 40% random
function getMediumMove() {
  const winMove = findWinningMove('O')
  if (winMove !== null) return winMove
  const blockMove = findWinningMove('X')
  if (blockMove !== null) return blockMove
  return Math.random() < 0.6 ? getBestMove() : getRandomMove()
}

// Cari langkah menang/blok
function findWinningMove(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ]
  for (let [a,b,c] of wins) {
    const line = [cells.value[a], cells.value[b], cells.value[c]]
    if (line.filter(v => v === player).length === 2 && line.includes('')) {
      return [a,b,c][line.indexOf('')]
    }
  }
  return null
}

// Impossible: Minimax
function getBestMove() {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < 9; i++) {
    if (cells.value[i] === '') {
      cells.value[i] = 'O'
      const score = minimax(cells.value, 0, false)
      cells.value[i] = ''
      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  return move
}

function minimax(board, depth, isMaximizing) {
  const result = getWinner(board)
  if (result === 'X') return -10 + depth
  if (result === 'O') return 10 - depth
  if (!board.includes('')) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O'
        const score = minimax(board, depth + 1, false)
        board[i] = ''
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X'
        const score = minimax(board, depth + 1, true)
        board[i] = ''
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

/* ---------------- Utility ---------------- */
function checkWinner() {
  return getWinner(cells.value) !== null
}

function getWinner(board) {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  for (let [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function isDraw() {
  return cells.value.every((cell) => cell !== '')
}

function resetGame() {
  cells.value = Array(9).fill('')
  currentPlayer.value = 'X'
  winner.value = null
}
</script>

<style scoped>
.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mode-select {
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

/* Skor */
.score-board {
  display: flex;
  gap: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #ab92d4;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-gap: 10px;
  justify-content: center;
  margin: 20px auto;
}

.cell {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.cell.light {
  background: #eee;
  color: #333;
}
.cell.dark {
  background: #555;
  color: #fff;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.winner {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.reset-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #ab92d4;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.reset-btn:hover {
  background: #2c9c6d;
}
</style>
