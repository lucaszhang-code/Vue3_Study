<template>
  <div class="app">
    <h2>我是App组件</h2>
    <Suspense>
      <template #default>
        <Child></Child>
      </template>
      <template #fallback>
        <h2>等待中……</h2>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts" name="App">
import Child from "@/Child.vue";
import {Suspense} from "vue";
</script>

<style>
.app {
  background-color: rgb(165, 165, 165);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px;
}
</style>