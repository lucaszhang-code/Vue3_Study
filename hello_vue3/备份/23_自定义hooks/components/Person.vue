<script lang="ts" setup name="Person">
import {useDogs} from "../hooks/useDogs";
import {useSum} from "../hooks/useSum";

const {sum, add, bigSum} = useSum()
const {dogList, getDog} = useDogs()


</script>

<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}, 放大十倍后{{bigSum}}</h2>
    <button @click="add">点我+1</button>
    <hr>
    <img v-for="(dog, index) in dogList" :src="dog" :key="index" alt="">
    <hr>
    <button @click="getDog">再来一只小狗</button>
  </div>
</template>


<style scoped>
.person {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
}

img {
  width: 100px;
  margin: 10px;
}
</style>