<script lang="ts" setup name="Person">
import {ref, reactive} from "vue";

let car = ref({brand: '奔驰', price: 100})
let sum = ref(0)

const changePrice = () => {
  car.value.price += 10
}

const changeSum = () => {
  sum.value += 10
}

const changeBrand = () => {
  car.value.brand = '奥迪'
}

const changeCar = () => {
  // car = {brand: '宝马', price: 100}
  // car = reactive({brand: '宝马', price: 200})
  // 下面这个写法页面可以更新
  // Object.assign(car, {brand: '宝马', price: 200})
  car.value = {brand: '宝马', price: 200}
}

</script>

// 模版里面不需要写.value
<template>
  <div class="person">
    <h2>一辆{{ car.brand }},价值{{ car.price }}万</h2>
    <button @click="changePrice">修改汽车价格</button>
    <button @click="changeBrand">修改汽车品牌</button>
    <button @click="changeCar">修改汽车</button>
    <hr>
    <div>当前求和为:{{ sum }}</div>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>


<style scoped>
.person {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
}
</style>