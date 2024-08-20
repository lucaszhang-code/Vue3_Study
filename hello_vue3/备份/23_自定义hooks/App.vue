<script lang="ts" setup name=App>
import Person from "./components/Person.vue";
import { ref } from "vue";


</script>

<template>
  <div class="app">
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