<script lang="ts" setup name=App>
import Person from "./components/Person.vue";
import {ref} from "vue";

let beijing = ref()

let ren = ref()

function showLog() {
  console.log(beijing.value)
  console.log(ren.value)
}

</script>

<template>
  <div class="app">你好啊！
    <Person ref="ren"></Person>
    <h2 ref="beijing">北京</h2>
    <button @click="showLog">点我</button>
  </div>

</template>

<style scoped>
.app {
  background-color: #f5f5f5;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 20px;
}
</style>