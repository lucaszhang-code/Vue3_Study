<script lang="ts" setup name=App>
import Person from "./components/Person.vue";
import {type PersonList} from "./types";
import {reactive} from "vue";

let personList = reactive<PersonList>([
  {
    id: '0',
    name: '张三',
    age: 18
  },
  {
    id: '1',
    name: '李四',
    age: 20
  }]
)

</script>

<template>
  <div class="app">
    <Person a="哈哈" :list = "personList"></Person>
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