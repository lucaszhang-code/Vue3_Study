<script lang="ts" setup name="Person">

import {ref, watch, watchEffect} from "vue";

// 数据
let tmp = ref(10)
let height = ref(0)

// 方法
function changeSum() {
  tmp.value += 10
}

function changeHeight() {
  height.value += 10
}

// // watch实现
// watch([tmp, height], (value) => {
//   // console.log(value)
//   let [newTmp, newHeight] = value // 从value中获取最新的水温水位
//   if (newTmp >= 60 || newHeight >= 80) {
//     console.log('给服务器发请求')
//   } else console.log(newTmp, newHeight)
// })

// 监视 --watchEffect实现
watchEffect(()=>{
  if(tmp.value >= 60 || height.value >= 80) {
    console.log('给服务发送请求')
  }
})

</script>

<template>
  <div class="person">
    <h2>需求：当水温达到60时，或水位达到80，给服务器发请求</h2>
    <h2>当前水温：{{ tmp }}</h2>
    <h2>当前水位：{{ height }}</h2>
    <button @click="changeSum">水温+1</button>
    <button @click="changeHeight">水位+10</button>

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