<template>
  <div class="app">
    <input type="text" v-model="message">
    <h2>数据：{{ message }}</h2>
  </div>
</template>

<script setup lang="ts" name="App">
import {ref, customRef} from 'vue'
import useMsgRef from "@/hooks/useMsgRef";

// 使用vue提供的默认ref实现界面更新
// let message = ref('你好')

// 使用messageRef来定义响应式数据，且有延迟
let {message} = useMsgRef('你好', 1000)

</script>

<style>

</style>