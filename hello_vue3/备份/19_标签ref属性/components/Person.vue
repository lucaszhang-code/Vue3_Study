<script lang="ts" setup name="Person">
import {ref} from 'vue';

// 创建一个title2
let beijing = ref()

let a = ref(0)
let b = ref(0)
let c = ref(0)

function showLog() {
  console.log(beijing.value)
}

defineExpose({
  a, b, c
})

</script>

<template>
  <div class="person">
    <h1>中国</h1>
    <h2 ref="beijing">北京</h2>
    <h3>天安门</h3>
    <button @click="showLog">点我</button>
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