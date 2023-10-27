<template>
    <div class="right-info">
        <img @click.stop="jump()" :src="imgUrl" alt="">
        <!-- 未关注显示 -->
        <div @click="handleAddCol()" v-if="userColl" class="addCol">
            <van-icon name="plus" size="14" color="#fff" />
        </div>
        <div>
            <van-icon @click.stop="handleLike(i)" name="like" size="30"
                :color="likeFlag && userItem ? '#f9476f' : '#fff'" />
            <p>{{ likeTotal }}</p>
        </div>
        <div>
            <van-icon @click.stop="handleChat()" name="chat" size="30" color="#fff" />
            <p>{{ chatCount }}</p>
        </div>
        <div>
            <van-icon @click.stop="handlecollection(i)" name="star" size="30"
                :color="collectionFlag && userItem ? '#ffb701' : '#fff'" />
            <p>{{ collTotal }}</p>
        </div>
        <div>
            <van-icon @click.stop="handleShare()" name="share" size="30" color="#fff" />
            <p>66</p>
        </div>
    </div>
</template>

<script setup>
import { computed  } from 'vue'
const props = defineProps({
    imgUrl: {
        type: String,
        default: ''
    },
    likeFlag: {
        type: Boolean,
        default: false
    },
    collectionFlag: {
        type: Boolean,
        default: false
    },
    collTotal: {
        type: Number,
        default: 0
    },
    likeTotal: {
        type: Number,
        default: 0
    }
})

// 点击+号关注
const handleAddCol = () => {
    playShow.value = false
    if (localStorage.getItem('Qy') !== null) {
        videoStore.$patch(() => {
            props.playsData.collectionFlag = true
            props.playsData.fanTotal++
        })
        showToast('关注成功')
    } else {
        showToast('登录后才可以关注')
    }
}

// 未登录直接不显示 是当前用户的作品也不显示关注图标 如已登录但是未关注作者显示
let userColl = computed(() => {
    return props.collectionFlag !== true && props.flag !== true || localStorage.getItem('Qy') === null
})

// 是否喜欢
const handleLike = (i) => {
    playShow.value = false
    if (localStorage.getItem('Qy') !== null) {
        if (props.playsData.videos[i].likeFlag) {
            videoStore.$patch(() => {
                props.playsData.videos[i].likeFlag = false
                props.playsData.videos[i].likeTotal--
            })
        } else {
            videoStore.$patch(() => {
                props.playsData.videos[i].likeFlag = true
                props.playsData.videos[i].likeTotal++
            })
        }
    } else {
        showToast('登录后才可以点赞哦~')
    }

}

// 点击评论图标
const handleChat = () => {
    playShow.value = false
    chatShow.value = !chatShow.value
}

// 是否收藏
function handlecollection(i) {
    playShow.value = false
    if (localStorage.getItem('Qy') !== null) {
        if (props.playsData.videos[i].collectionFlag) {
            videoStore.$patch(() => {
                props.playsData.videos[i].collectionFlag = false
                props.playsData.videos[i].collTotal--
            })
            showToast('已取消')
        } else {
            videoStore.$patch(() => {
                props.playsData.videos[i].collectionFlag = true
                props.playsData.videos[i].collTotal++
            })
            showToast('已收藏')
        }
    } else {
        showToast('登录后才可以收藏哦~')
    }

}

// 点击分享图标
const handleShare = () => {
    playShow.value = false
    shareShow.value = !shareShow.value
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
</script>

<style lang="less" scoped>
// 右侧边栏
.right-info {
    position: absolute;
    right: 10px;
    top: 28%;
    height: 300px;
    display: flex;
    flex-direction: column; //设置排列方向为纵向
    align-items: center;
    justify-content: space-between;

    img {
        border: 3px solid #fff;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        object-fit: cover;
    }

    .addCol {
        position: absolute;
        top: 15%;
        left: 35%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background-color: #f9476f;
        text-align: center;

        :deep(.van-icon-plus) {
            vertical-align: 15%;
        }
    }

    p {
        font-size: 12px;
        color: #fff;
        margin: 0;
        text-align: center;
    }

}
</style>