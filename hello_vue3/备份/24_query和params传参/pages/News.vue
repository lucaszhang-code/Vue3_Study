<template>
  <div class="news">
    <!--    导航区-->
    <ul>
      <li v-for="news in newsList" :key="news.id">
        <!--         第一种写法-->
        <!--        <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}-->
        <!--        </RouterLink>-->
        <RouterLink :to="{
                 name:'xiangqing',
                  params:{
                    id:news.id,
                    title:news.title,
                    content:news.content
                  }
                }">{{ news.title }}
        </RouterLink>
      </li>
    </ul>
    <!--    展示区-->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="News">
import {reactive} from "vue";
import {RouterView, RouterLink} from 'vue-router'

let newsList = reactive([
  {id: '001', title: '十种抗癌实物', content: '西蓝花'},
  {id: '002', title: '如何一夜暴富', content: '学IT'},
  {id: '003', title: '震惊', content: '明天是周四'},
  {id: '004', title: '好消息！', content: '快开学了'},
])

</script>

<style scoped>
/* 新闻 */
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.news ul {
  margin-top: 30px;
  list-style: none;
  padding-left: 10px;
}

.news li > a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967E;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}

.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
</style>