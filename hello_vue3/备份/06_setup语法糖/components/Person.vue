<!--<script lang="ts">-->
<!--export default {-->
<!--  name: "Person",-->
<!--}-->
<!--</script>-->

<script lang="ts" setup name = "Person">
// console.log(this) // setup中的this是undefined
// 数据：原来是写在data中的
// 这样写不是响应式数据
let name = '张三'
let age = 18
let tel = '13812345678'

// 方法
function changeName() {
  name = 'zhang_san' // 注意：这样修改name，页面是没有变化的
}

function changeAge() {
  age++
}

function showTel() {
  alert(tel)
}
</script>

<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改姓名</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>h


<style scoped>
.person {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
}
</style>