<script lang="ts">
import Person from "./components/person.vue";

export default {
  name: 'App', // 组件名
  components: {
    Person
  }
}
</script>

<template>
  <div class="app">你好啊！
    <Person></Person>
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