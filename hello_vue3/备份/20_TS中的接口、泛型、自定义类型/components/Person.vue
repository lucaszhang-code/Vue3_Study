<script lang="ts" setup name="Person">
import {ref} from 'vue';
import {type PersonInter, PersonList} from '../types'


let person = <PersonList>[
  {
    id: '12321',
    name: '张三',
    age: 60
  },
  {

    id: '12321',
    name: '张三',
    age: 60
  }
]

</script>

<template>
  <div class="person">
    ？？？
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