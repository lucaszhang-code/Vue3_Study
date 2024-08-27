<template>
  <div class="app">
    <h2>求和为：{{ sum }}</h2>
    <h2>名字为：{{ person.name }}</h2>
    <h2>年龄为：{{ person.age }}</h2>
    <h2>汽车：{{ car}}</h2>
    <button @click="changeSum">sum+1</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeName">修改姓名</button>
    <button @click="changePerson">修改整个人</button>
    <button @click="changeBrand">修改品牌</button>
    <button @click="changeEngine">修改引擎</button>
    <button @click="changeCar">修改整个车</button>
  </div>

</template>

<script setup lang="ts">
import {ref, shallowRef, reactive, shallowReactive} from 'vue'
import {valueOf} from "node";

let sum = shallowRef(0)
let person = shallowRef({
  name: '小明',
  age: 18
})

let car = reactive({
  brand: '奥迪',
  options: {
    color: 'red',
    engine: 'V8'
  }
})

function changeSum() {
  sum.value++
}

function changeAge() {
  person.value.age = 20
}

function changeName() {
  person.value.name = '张三'
}

function changePerson() {
  person.value = {
    name: '你好',
    age: 100
  }
}

function changeBrand(){
  car.brand = '奔驰'
}

function changeEngine(){
  car.options.engine = 'V4'
}

function changeCar(){

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