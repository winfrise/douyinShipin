<template>
    <div class="wrapper">
        <van-button :disabled="loading" :loading="loading" type="primary" loading-text="扫描中..." block @click="handleScanDir()">扫描目录</van-button>

        <van-button type="primary" plain to="/">路由跳转</van-button>

        <van-list
            :finished="true"
            finished-text="没有更多了"
        >
            <van-cell v-for="item in douyinStore.fileList" :key="item">
                <template #title>
                    {{item.videoUrl || item.imgUrl || item.fileUrl }}
                </template>
            </van-cell>
        </van-list>

    </div>
</template>

<script setup>
import { scanDir } from '@/api/douyin.js'
import { ref } from 'vue'
import { useDouyinStore } from '@/store/douyin'

let douyinStore = useDouyinStore()

const loading = ref(false)

const handleScanDir = async () => {
    loading.value = true
    await douyinStore.scanDir({path: './uploads'})
    loading.value = false
}

</script>

<style lang="less" scoped>
.wrapper {
    padding: 10px;
}
</style>