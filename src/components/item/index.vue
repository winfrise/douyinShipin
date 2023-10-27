<template>
    <div class="item">
        <template v-if="type === 'video'">
            <ItemVideo ref="itemVideoRef" 
                :src="videoUrl" 
                :muted="playMuted"
                @play="handlePlay()"
                @pause="handlePause()"
            />
        </template>

        <template v-else-if="type === 'img'">
            <van-image width="100px" height="100px" lazy-load :src="imgUrl" fit="contain" />
        </template>

        <template v-else>
            <ItemNoSupport />
        </template>

        <RightInfo />
    
        <!-- 简介 -->
        <div class="video-text">
            <div class="title">
                <h4 @click.stop="jump()">@{{ name }}</h4>
                <i>{{ time }}</i>
            </div>
            <p>{{ text }}</p>
        </div>

        <!-- 静音 -->
        <div class="muted"
            :class="playShow ? '' : 'roteActive'" 
            @click.stop="emits('muted')"
        >
            <van-icon name="volume" size="28" />
            <div class="moutedslash"></div>
            <div class="moutedslashs"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import ItemVideo from './ItemVideo.vue'
import ItemNoSupport from './ItemNoSupport.vue'
import RightInfo from './RightInfo.vue'

const props = defineProps({
    playShow: {
        type: Boolean,
        default: false
    },
    playMuted: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    imgUrl: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: '0'
    },
    text: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(['muted', 'play', 'pause'])

const itemVideoRef = ref()

const play = () => {
    if (props.type === 'video') {
        console.log(itemVideoRef.value)
        itemVideoRef.value.play()
    }
}

const handlePlay = () => {
    emits('play')
}

const pause = () => {
    if (props.type === 'video') {
        itemVideoRef.value.pause()
    }
}

const handlePause = () => {
    emits('pause')
}

// 跳转至作者详情页
function jump() {
    if (props.workFlag) {
        router.go(-1)
    } else {
        router.push({
            path: '/authorHome',
            query: {
                dataObj: JSON.stringify(props.playsData)
            }
        })
    }
}

defineExpose({play, pause})
</script>

<style lang="less" scoped>
.item {
    width: 100%;
    height: 100%;
}
// 静音
.muted {
    position: absolute;
    bottom: 12%;
    right: 15px;
    width: 50px;
    height: 50px;
    line-height: 56px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;

    :deep(.van-icon-volume) {
        vertical-align: 4%;
    }

    // 静音图标空白符
    .moutedslash {
        position: absolute;
        left: -8px;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        line-height: 100px;
        width: 2px;
        height: 30px;
        transform: rotate(140deg);
        background-color: #fff;
    }

    // 静音图标斜线
    .moutedslashs {
        position: absolute;
        left: -4px;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        line-height: 100px;
        width: 2px;
        height: 33px;
        transform: rotate(140deg);
        background-color: #000000;
    }
}

// 模板
.temp {
    position: absolute;
    bottom: 12%;
    right: 15px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        animation: rotateImg 8s linear 0s infinite forwards;
        animation-play-state: paused;
    }
    /* 开启图片旋转动画 */
    .roteActive {
        animation-play-state: running !important;
    }
    
}

/* 旋转动画 */
@keyframes rotateImg {
    0% {
        transform: rotateZ(0);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>