<script lang="ts" setup name="Person">
import {defineProps, withDefaults} from 'vue';
import {ref} from 'vue';
import {type PersonList} from "../types";

// 只接收
// defineProps(['a', 'list'])

// 接收a,同时将props保存起来
// let x = defineProps(['a', 'list'])
// console.log(x)

// 接收list+限制类型
defineProps<{ list: PersonList }>()

// 接收list+限制类型+限制必要性+指定默认值
withDefaults(defineProps<{ list?: PersonList }>(), {
  list: () => [{
    id: '001',
    name: '康师傅',
    age: 100
  }]
})


</script>

<template>
  <div class="person">
    <ul>
      <li v-for="person in list" :key="person.id">
        姓名:{{ person.name }}
        年龄:{{ person.age }}
      </li>
    </ul>
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