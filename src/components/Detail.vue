<template>
    <!-- 背景图片模糊 -->
    <div class="img">
        <img :src="songData.cover" alt="">
    </div>
    <!-- 关闭按钮单独提取 -->
    <div class="close" style="position: fixed;top: 20px;cursor: pointer;" @click="close"><span
            class="iconfont icon-xiangxia"></span>
    </div>
    <!-- 主要内容 -->
    <div class="box">
        <div class="left">
            <div class="cover">
                <img :src="songData.cover" alt="">
            </div>
        </div>
        <div class="right">
            <div class="head">
                <h1>{{ songData.name }}</h1>
                <span>{{ songData.artist }}</span>
            </div>
            <div class="body">
                <ul ref="lyricUL">
                    <li v-for="(item, i) in lyricsObjArr" :style="{ color: lyricIndex === i ? 'skyblue' : '#ded9d9' }"
                        :key="item.uid" :data-index='i' ref="lyric">{{ item.lyric }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getLyric } from '../api/request';
import { toRefs, defineProps, watch, ref } from 'vue';
// 接收父组件传过来的参数
const props = defineProps({
    songData: Object,
    detailShow: Boolean,
    songmid: String,
    currentTime: Number
})
// 解构父组件传过来的参数
const { songData, detailShow, songmid, currentTime } = toRefs(props)
// 接收父组件传递过来的的关闭方法
const emits = defineEmits(["close"]);

// 存放歌词数据
const lyricsObjArr = ref([])

// 关闭页面
const close = () => {
    emits('close')
    console.log(lyricsObjArr.value);
}

const getData = async () => {
    console.log('获取歌词');
    const data = await getLyric(songmid.value)
    songData.lyc = data.lyric
    formatLyc(songData.lyc)
}

// 将字符串转换为数组形式的歌词
const formatLyc = (lyc) => {
    // 开始转换歌词
    const regNewLine = /\n/
    const lineArr = lyc.split(regNewLine) // 每行歌词的数组
    // 将歌词分组之后，每组包含歌词时间，现在需要将时间分离出来
    const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
    // 分离出歌词与时间与uid，uid用于当作唯一项
    lineArr.forEach(item => {
        if (item === '') return
        const obj = {}
        const time = item.match(regTime)
        obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
        obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
        obj.uid = Math.random().toString().slice(-6)
        if (obj.lyric === '') {
            console.log('这一行没有歌词')
        } else {
            lyricsObjArr.value.push(obj)
        }
    })
}

// 将时间转换成需要的格式：15.71 类似这样的
const formatLyricTime = (time) => { // 格式化歌词的时间 转换成 sss:ms
    const regMin = /.*:/
    const regSec = /:.*\./
    const regMs = /\./
    const min = parseInt(time.match(regMin)[0].slice(0, 2))
    let sec = parseInt(time.match(regSec)[0].slice(1, 3))
    const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
    if (min !== 0) {
        sec += min * 60
    }
    return Number(sec + '.' + ms)
}

// 匹配歌词
const test = () => {
    for (let i = 0; i < lyricsObjArr.value.length; i++) {
        if (this.currentTime > (parseInt(this.lyricsObjArr[i].time))) {
            const index = this.$refs.lyric[i].dataset.index
            if (i === parseInt(index)) {
                this.lyricIndex = i
                this.$refs.lyricUL.style.transform = `translateY(${170 - (30 * (i + 1))}px)`
            }
        }
    }
}

watch(detailShow, () => {
    if (detailShow.value == true) {
        getData()
    }
})

</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');

.img {
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        transform: translateY(-25%);
    }
}

.close {
    z-index: 1;

    span {
        color: #858c9a;
        margin-left: 35px;
        font-size: 20px;

        &:hover {
            transition: 0.1s;
            color: #666
        }
    }
}

.box {
    width: 100%;
    height: 100%;
    background-color: #00000098;
    backdrop-filter: blur(20px);
    display: flex;

    .left {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .cover {
            width: 40%;
            aspect-ratio: 1/1;
            margin-bottom: 10%;
            background-color: #958888;
            padding: 1%;

            img {
                width: 100%;
                height: 100%;
            }

            -webkit-box-reflect: below 0px linear-gradient(transparent 10%, rgb(0, 0, 0, 0.4) 90%);
        }
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .head {
            margin-top: 12%;
            width: 80%;
            height: 10%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            h1 {
                font-size: 30px;
                font-weight: 300;
                color: #ffffff;
                cursor: pointer;
            }

            span {
                cursor: pointer;
                color: #ffffff79;

            }
        }

        .body {
            width: 80%;
            flex: 1;
            margin: 2% 0 15% 0;
            border: 1px solid red;
        }
    }


}
</style>