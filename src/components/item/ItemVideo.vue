<template>
    <div class="video-wrapper">
        <video ref="videoRef" preload="metadata" class="video" loop controls
            :src="src"
            :muted="muted"
            @play="handlePlay()" 
            @pause="handlePlause()"
            @click="togglePlay()"
        >
            当前设备不支持该视频播放
        </video>

        <!-- 播放与暂停按钮 -->
        <div v-if="!playing" @click.stop="play()" class="conPlay">
            <van-icon name="play" color="#fff" size="50" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    muted: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits(['play', 'pause'])

const videoRef = ref()
const playing = ref(false)

const play = () => {
    videoRef.value.play()
}

const handlePlay = () => {
    playing.value = true
    emits('play')
}

const pause = () => {
    videoRef.value.pause()
}

const handlePlause = () => {
    playing.value = false
    emits('pause')
}

const togglePlay = () => {
    if (playing.value) {
        pause()
    } else {
        play()
    }
}

defineExpose({play, pause})

</script>

<style lang="less" scoped>
.video-wrapper {
    width: 100%;
    height: 100%;
    .video {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
// 控制播放
.conPlay {
    position: absolute;
    top: 0;
    left: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}
</style>