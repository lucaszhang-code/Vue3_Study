<script lang="ts" setup name="Person">
import {ref} from "vue";

let car = ref({brand: '奔驰', price: 100})
let games = ref([
  {id: 'wzry', name: '王者荣耀'},
  {id: 'ys', name: '原神'},
  {id: 'xqtd', name: '星穹铁道'}
])

let obj = ref({
  a: {
    b: {
      c: 666
    }
  }
})

const changePrice = () => {
  car.value.price += 10
}

const changeFirstName = () => {
  games.value[0].name = '绝区零'
}

</script>

// 模版里面不需要写.value
<template>
  <div class="person">
    <h2>一辆{{ car.brand }},价值{{ car.price }}万</h2>
    <button @click="changePrice">修改汽车价格</button>
    <hr>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="game in games" :key="game.id">{{ game.name }}</li>
    </ul>
    <button @click="changeFirstName">修改第一个游戏的名字</button>
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