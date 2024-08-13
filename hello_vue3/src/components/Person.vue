<script lang="ts" setup name="Person">
import {reactive, toRefs, toRef} from 'vue';

let person = reactive({
  name: '张三',
  age: 18
})

let {name, age} = toRefs(person)
let nl = toRef(person, 'age')
console.log(nl.value)
// console.log(name)
// console.log(age)

function changeName(){
  name.value += '~'
}

function changeAge(){
  age.value += 1
}

</script>

// 模版里面不需要写.value
<template>
  <div class="person">
    <div>姓名:{{name}}</div>
    <div>年龄:{{age}}</div>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
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