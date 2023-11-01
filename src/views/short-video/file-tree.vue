<template>
<div>{{activeIndex}}|{{activeId}}</div>
    <van-tree-select
    v-model:main-active-index="activeIndex"
    v-model:active-id="activeId"
    height="55vw"
    :items="shortVideo.fileTree"
    >
    </van-tree-select>

</template>

<script setup>
import { ref } from 'vue'
import { useShortVideo } from '@/store/short-video.js'

const shortVideo = useShortVideo()

shortVideo.getFileTree({path: './uploads'})
const activeIndex = ref(0);
const activeId = ref([]);
</script>

<style lang="less" scoped>

</style>