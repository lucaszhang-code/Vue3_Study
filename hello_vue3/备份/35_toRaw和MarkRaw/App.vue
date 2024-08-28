<template>
  <div class="app">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeAge">修改年龄</button>
    <hr>
    <h2>{{ car2 }}</h2>
    <button @click="car2.price + 10">点我价格+10</button>
  </div>
</template>

<script setup lang="ts" name="App">
import {markRaw, reactive, toRaw} from "vue";

// toRaw
const person = reactive({
  name: 'Tony',
  age: 18
})

// 用于获取一个响应式对象的原始对象
const person2 = toRaw(person)
console.log('原始对象', person2)

function changeAge() {
  person.age = 20
}

// markRow
let car = markRaw({
  brand: '奔驰',
  price: 100
})

let car2 = reactive(car)
</script>

<style>

</style>