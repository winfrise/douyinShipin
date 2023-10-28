<template>
    <div class="navtop-content">
        <!-- 左上角图标 -->
        <van-icon @click="showToast('暂未开放')" name="apps-o" size="22" color="#fff" />

        <!-- 如果位于首页显示这个 -->
        <div class="nav-list" v-if="homeFlag">
            <!-- 
            <i v-for="(item, i) in navData" 
                :key="i" 
                :class="i === douyinStore.navIndex ? 'activeColor' : ''" 
                @click="handleTabs(i)"
            >{{ item }}</i> 
            -->

            <i class="nav-item" v-for="(item) in douyinStore.navList" :key="item.name"
                :class="{activeColor: item.name === douyinStore.navName}" 
                @click="handleTabNav(item.name)"
            >{{ item.label }}</i>
        </div>

        <!-- 右上角图标 -->
        <van-icon @click="router.push({path: '/douyin/scan-dir'})" name="setting-o" size="22" color="#fff" />
    </div>
    <div></div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useVideoStore } from '../store/videos'
import { useDouyinStore } from '@/store/douyin'
import { showToast } from 'vant';

const douyinStore = useDouyinStore()
const router = useRouter()


// 定义数据
const navData = reactive(['音乐类', '风景类', '看剧类', '推荐'])

// 子组件接收父组件传来的值
const props = defineProps({
    homeFlag: Boolean
})
// 子组件向父组件传值
const emits = defineEmits(['changeTabs', 'chatFlag'])

// 获取store里的数据
let videoStore = useVideoStore()
videoStore.handleRecom() // 触发actions

// 监听视频分类的值做出相应操作
watch(() => (douyinStore.navIndex), (newValue) => {
    videoStore.$patch(() => {
        // 推荐
        if (newValue === 3) {
            videoStore.playsData = videoStore.recomData
        } else if (newValue === 2) { //看剧类
            // videoStore.playsData = videoStore.dramaData
            videoStore.playsData = {
                ...videoStore.dramaData,
                videos: douyinStore.fileList
            }
        } else if (newValue === 1) { //风景类
            videoStore.playsData = videoStore.landscapeData
        } else if (newValue === 0) { //音乐类
            videoStore.playsData = videoStore.musicData
        } else {
            console.log('没有咯');
        }
    })

}, { deep: true })


const handleTabNav = (navName) => {
    douyinStore.navName = navName
}
function handleTabs(i) {
    //将当前点击的标签传给父组件
    emits('changeTabs', true) 

    videoStore.$patch(() => {
        douyinStore.navIndex = i
    })
}

</script>

<style scoped lang="less">
.navtop-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
    opacity: 0.7;
    width: 100%;
    height: 50px;

    .nav-list {
        width: 68%;
        display: flex;
        justify-content: center;

        .nav-item {
            font-family: cursive;
            color: #fff;
            font-size: 16px;
            margin: 0 10px;
        }
    }


}

// 选中样式
.activeColor {
    color: #7EE9F2 !important;
    transform: scale(1.2);
    font-weight: 800;
}
</style>
