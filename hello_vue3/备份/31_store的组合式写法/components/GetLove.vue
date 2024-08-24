<script setup lang="ts" name="getLove">
import {reactive} from "vue";
import axios from 'axios'
import {nanoid} from "nanoid";
import {useTalkStore} from "../store/talk";

// let talkList = reactive([
//   {id: '001', title: '你好'},
//   {id: '002', title: '我好'},
//   {id: '003', title: '大家好'}
// ])

const talkStore = useTalkStore();
talkStore.$subscribe(() => {
  console.log('talkStore里面的数据发生变化')
  localStorage.setItem('talkList', JSON.stringify(talkStore.talkList));
})

function getLoveTalk() {
  talkStore.getATalk()
}

</script>

<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="talk in talkStore.talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.talk {
  background-color: orange;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  //height: 100px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  margin: auto;


}
</style>