<script lang="ts" setup name="Person">
import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';

let sum = ref(0)

function add() {
  sum.value++
}

// 创建
console.log('创建')

// 挂载
onBeforeMount(() => {
  console.log('挂载前')
})

onMounted(() => {
  console.log('挂载完毕')
})

onBeforeUpdate(() => {
  console.log('更新前')
})

onUpdated(() => {
  console.log('更新完毕')
})

onBeforeUnmount(() => {
  console.log('卸载前')
})

onUnmounted(() => {
  console.log('卸载后')
})

</script>

<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">点我+1</button>
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