<script setup lang="ts" name = "getSum">
import { ref } from "vue";
import {useCountStore} from "../store/count";

const countStore = useCountStore()

console.log(countStore.sum)
console.log(countStore.$state.sum)

let getSelectedValue = ref(1);

function addSum() {

}

function subSum() {

}
</script>

<template>
  <div class="getSum" name="getSum">
    <h3>当前求和为: {{ countStore.sum }}</h3>
    <select v-model.number="getSelectedValue" name="" id="selectNum">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="addSum">加</button>
    <button @click="subSum">减</button>
  </div>
</template>

<style scoped lang="less">
.getSum {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  height: 100px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  margin: auto;

  #selectNum,button {
    height: 25px;
    //width: 50px;
    margin-right: 10px;
  }


}
</style>
