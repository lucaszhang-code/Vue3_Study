<template>
  <div class="father">
    <!--    v-model用在html标签上-->
    <h3>父组件</h3>
    <!--    <input type="text" name="" id="" v-model="userName">-->
    <!--    <input type="text" :value="userName" @input="userName=(<HTMLInputElement>$event.target).value"/>-->

    <!--    v-model用在组件标签上-->
        <AtguiguInput v-model="userName"></AtguiguInput>
<!--    <AtguiguInput :modelValue="userName" @update:modelValue="userName=$event"></AtguiguInput>-->
  </div>
</template>

<script setup lang="ts" name="Father">
import {ref} from 'vue'
import AtguiguInput from "@/pages/04_v-model/AtguiguInput.vue";

let userName = ref('zhangsan')
</script>

<style scoped>
.father {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>
