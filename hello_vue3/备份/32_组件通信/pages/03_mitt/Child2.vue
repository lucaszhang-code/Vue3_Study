<template>
  <div class="child2">
    <h3>子组件2</h3>
    <h4>电脑：{{ computer }}</h4>
    <h4>哥哥给的玩具 {{ toy }}</h4>
  </div>
</template>

<script setup lang="ts" name="Child2">
import {ref, onUnmounted} from 'vue'
import emitter from "@/utils/emitter";

let computer = ref('原神')
let toy = ref('')

emitter.on('send-toy', (value) => {
  // 给emitter绑定send-toy事件
  // console.log('send-toy', value)
  toy.value = value
})

// 在组建卸载时解绑事件
onUnmounted(() => {
  emitter.off('send-toy')
})


</script>

<style scoped>
.child2 {
  margin-top: 50px;
  background-color: orange;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>