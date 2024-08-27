<template>
  <div class="app">
    <h2>sum:{{ sum }}</h2>
    <h2>sum2:{{ sum2 }}</h2>
    <button @click="changeSum">sum + 1</button>
    <button @click="changeSum2">sum2 + 1</button>
  </div>

</template>

<script setup lang="ts">
import {ref, readonly} from 'vue'

let sum = ref(0)
let sum2 = readonly(sum)

function changeSum() {
  sum.value += 1
}

function changeSum2() {
  sum2.value += 1
}

</script>

<style scoped>
.app {
  background-color: orange;
  border-radius: 10px;
  box-shadow: 0 0 10px;

  button {
    height: 25px;
    margin-right: 5px;
  }
}
</style>