<template>
  <div class="tictactoe">
    <div class="board">
      <div
        v-for="(cell, index) in board"
        :key="index"
        class="cell"
        @click="makeMove(index)">
        {{ cell }}
      </div>
    </div>

    <p v-if="winner" class="winner">
      🎉 Pemenang: {{ winner }}
    </p>

    <button class="reset-btn" @click="resetGame">Reset Game</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const board = ref(Array(9).fill(''))
const currentPlayer = ref('X')
const winner = ref(null)

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

function makeMove(index) {
  if (board.value[index] || winner.value) return
  board.value[index] = currentPlayer.value

  if (checkWinner()) {
    winner.value = currentPlayer.value
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function checkWinner() {
  return winningCombos.some(([a,b,c]) =>
    board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]
  )
}

function resetGame() {
  board.value = Array(9).fill('')
  winner.value = null
  currentPlayer.value = 'X'
}
</script>

<style scoped>
.tictactoe { text-align: center; margin-top: 2rem; }
.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 5px;
  justify-content: center;
  margin-bottom: 1rem;
}
.cell {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: #eee;
  cursor: pointer;
  border-radius: 5px;
}
.cell:hover { background: #ddd; }
.winner { font-size: 1.2rem; margin: 1rem 0; }
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
