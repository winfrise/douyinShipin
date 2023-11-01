<template>
    <div class="wrapper">
        <van-button :disabled="loading" :loading="loading" type="primary" loading-text="扫描中..." block @click="handleScanDir()">扫描目录</van-button>

        <van-button type="primary" plain icon="wap-home" to="/short-video/list">跳转首页</van-button>

        <van-form @submit="handleSearch">
            <van-field v-model="keywords" label="关键字" placeholder="请输入关键字" :rules="[{ required: true, message: '请输入关键字' }]" />
            <van-button round block type="primary" native-type="submit">
            搜索
            </van-button>
        </van-form>

        <van-list
            :finished="true"
            finished-text="没有更多了"
        >
            <van-cell v-for="(item, index) in shortVideoStore.fileList" :key="item" @click.enter="jumpVideo(index)">
                <template #title>
                    {{item.videoUrl || item.imgUrl || item.fileUrl }}
                </template>
            </van-cell>
        </van-list>

    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useShortVideoStore } from '@/store/short-video'

const shortVideoStore = useShortVideoStore()
const router = useRouter()

const keywords = ref('')
const loading = ref(false)

const handleScanDir = async () => {
    debugger
    loading.value = true
    await shortVideoStore.scanDir({path: './uploads'})
    loading.value = false
}

const jumpVideo = (index) => {
    shortVideoStore.navName = 'fileList'
    shortVideoStore.fileIndex = index
    router.push({path: '/short-video/list'})
}
</script>

<style lang="less" scoped>
.wrapper {
    padding: 10px;
}
</style>