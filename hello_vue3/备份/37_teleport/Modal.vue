<script setup lang="ts">
import {ref} from 'vue'

let isShow = ref(false)
</script>

<template>
  <button @click="isShow = true">展示弹窗</button>
 <teleport to="body">
   <div v-show="isShow" class="modal">
     <h2>我是弹窗的标题</h2>
     <p>我是弹窗的内容</p>
     <button @click="isShow = false">关闭弹窗</button>
   </div>
 </teleport>
</template>

<style scoped lang="less">
.modal {
  width: 200px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 5px;
  text-align: center;
  position: fixed;
  //left: 50%;
  //margin-left: -100px;
  left: calc(50% - 100px);
  top: 20px;
}
</style>