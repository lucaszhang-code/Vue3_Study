<script setup lang="ts">
import {useRoute} from 'vue-router'
import {toRefs} from "vue";
const route = useRoute()
</script>

<template>
  <ul class="news-list">
    <li>编号：{{ route.params.id }}</li>
    <li>标题：{{ route.params.title }}</li>
    <li>内容：{{ route.params.content }}</li>
  </ul>
</template>

<style scoped>
.news-list {
  list-style: none;
  padding-left: 20px;
}

.news-list > li {
  line-height: 30px;
}
</style>