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
                <img :src="songData.cover" alt="" style="cursor: pointer;" @click="changePlay">
            </div>
        </div>
        <div class="right">
            <div class="head" @click="console.log(lyricsObjArr)">
                <h1>{{ songData.name }}</h1>
                <span>{{ songData.artist }}</span>
            </div>
            <div class="body">
                <ul v-if="lyricsObjArr.length == 0" style="transform: translateY(160px);">
                    <li style="color:skyblue;font-size: 24px;text-align: center;margin-left: -18%;">请欣赏纯音乐</li>
                </ul>
                <ul ref="lyricUL" style="transition: 0.6s;transform:translateY(160px)" @wheel="handleMouseWheel" v-else>
                    <li v-for="(item, i) in lyricsObjArr" :style="{
                        color: lyricIndex === i ? 'skyblue' : '#ded9d9',
                        fontSize: lyricIndex === i ? '24px' : '18px',
                    }" :key="item.uid" :data-index='i' ref="lyric" @click="toLyc(item, i)" style="transition: 0.3s;">
                        {{ item.lyric }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getLyric } from '../api/request';
import { toRefs, defineProps, watch, ref, onMounted, onUnmounted } from 'vue';
// 记得添加防抖函数
import { debounce } from 'lodash';
import useStore from '../store/index';
const useMusic = useStore()
const { changePlay } = useMusic.musicPlay

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

// 歌词是否处于滚动状态
const MouseWheel = ref(false)
// 记录歌词的滚动距离
const distance = ref(160)
// 记录鼠标滚轮距离
const MouseWheelDis = ref(0)
// 存放歌词数据
const lyricsObjArr = ref([])

// 为了获取标签元素
const lyricUL = ref([])
const lyric = ref([])
const lyricIndex = ref(0)
// const 
// 关闭页面
const close = () => {
    emits('close')
}

// 获取歌词
const getData = async () => {
    const data = await getLyric(songmid.value)
    // console.log(data);
    songData.lyc = data.lyric
    formatLyc(songData.lyc)
}

// 将字符串转换为数组形式的歌词
const formatLyc = (lyc) => {
    if (lyc == '[00:00:00]此歌曲为没有填词的纯音乐，请您欣赏') return
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
            // console.log('这一行没有歌词')
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
const moveLyric = () => {
    for (let i = 0; i < lyricsObjArr.value.length; i++) {
        if (currentTime.value > (parseInt(lyricsObjArr.value[i].time))) {
            const index = lyric.value[i].dataset.index
            if (i === parseInt(index)) {
                lyricIndex.value = i
                const dis = 160 - (50 * (i + 1))
                if (MouseWheel.value == false) {
                    lyricUL.value.style.transform = `translateY(${160 - (50 * (i + 1))}px)`
                }
                // 记录歌词滚动距离
                distance.value = dis
            }
        }
    }
}

// 以下实现歌词的鼠标滚动操作
const handleMouseWheel = (event) => {
    if (MouseWheel.value == false) {
        MouseWheel.value = true
    } else if (MouseWheel.value == true) {
        if ((distance.value - MouseWheelDis.value) > 160) {
            MouseWheelDis.value = MouseWheelDis.value
        } else if ((distance.value - MouseWheelDis.value) <= 160 - (50 * (lyricsObjArr.value.length))) {
            MouseWheelDis.value = MouseWheelDis.value
        } else {
            MouseWheelDis.value = event.deltaY + MouseWheelDis.value
        }
        lyricUL.value.style.transform = `translateY(${distance.value - MouseWheelDis.value}px)`
    }
    deMouse()
}
const deMouse = debounce(() => {
    setTimeout(() => {
        MouseWheel.value = false
        MouseWheelDis.value = 0
        lyricUL.value.style.transform = `translateY(${distance.value}px)`
    }, 1000);
}, 2000)

// 以下实现点击歌词跳转对应进度
const toLyc = (item, i) => {
    console.log(item);
    console.log(i);
}
// 将子组件的方法传递给父组件
defineExpose({
    moveLyric,
});

// 监听展开和收起
// watch(detailShow, () => {
//     if (detailShow.value == true) {
//         console.log('获取歌词');
//         getData()
//     } else {
//         lyricsObjArr.value = []
//     }
// })

// 监听当前歌曲，获取对应的歌词
watch(songmid, () => {
    lyricsObjArr.value = []
    getData()
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
            height: 80%;
            padding-right: 20px;
            margin: 2% 0 15% 0;
            overflow: hidden;
            font-size: 18px;
            line-height: 50px;

            ul {
                margin-left: 15%;

                li {
                    cursor: pointer;
                }
            }
        }
    }


}
</style>