<template>
  <div class="app">
    <h2>我是App组件</h2>
    <h2>{{x}}</h2>
    <Hello></Hello>
    <Child></Child>
  </div>
</template>

<script setup lang="ts" name="App">
import Child from "@/Child.vue";
</script>

<style>
.app {
  background-color: rgb(165, 165, 165);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px;
}
</style>