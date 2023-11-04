<template>
    <div class="box" @mousemove="moveProgress" @mouseup="leaveProgress" @mouseleave="leaveProgress"
        :class="{ light: isLight }">
        <div class="head">
            <!-- 歌曲图片 -->
            <div class="singer">
                <!-- 测试按钮------------------------- -->
                <img :src="songData.cover" alt="">
            </div>
            <!-- 歌曲信息于歌手 -->
            <div class="songInfo">
                <div class="title">
                    <h2 id="title" :class="{ shouldMarquee: shouldMarquee }" :title="songData.name">{{ songData.name }}</h2>
                </div>
                <div class="singName">
                    <h2 id="singName" :class="{ shouldMarquee: artistshouldMarquee }" :title="songData.artist">{{
                        songData.artist }}</h2>
                </div>
            </div>
        </div>
        <!-- 下方的音乐控制 -->
        <div class="body">
            <div class="music">
                <!-- 创建一个audio对象 -->
                <audio ref="audioPlayer" :src="songData.url" @timeupdate="updateProgress" @loadedmetadata="initAudio"
                    @ended="end"></audio>
                <!-- 给audio对象创建样式 -->
                <div class="audioStyle">
                    <!-- 进度条 -->
                    <div class="progress" style="user-select: none;">
                        <div class="progressBox" @mousedown="downProgress">
                            <div class="progressBar" :style="`width: ${num}%;`"></div>
                        </div>
                        <!-- <el-progress :percentage="num" :color="customColor" :show-text="false"/> -->
                    </div>
                    <!-- 控制栏 -->
                    <div class="audioInfo">
                        <div class="time" style="user-select: none;">
                            {{ timeFormat(currentTime) }} / {{ timeFormat(duration) }}
                        </div>

                        <div class="control">
                            <!-- 单曲循环，顺序播放，随机播放 -->
                            <div class="audioModel" @click="changePlayModel">
                                <span v-if="playModel == 'loop'" class="iconfont icon-loop" title="顺序播放"></span>
                                <span v-else-if="playModel == 'random'" class="iconfont icon-random" title="随机播放"></span>
                                <span v-else-if="playModel == 'singLoop'" class="iconfont icon-singLoop"
                                    title="单曲循环"></span>
                            </div>
                            <!-- 音量控制 -->
                            <div class="soundCtr">
                                <span class="iconfont icon-sound" title="音量" @click="isVolume = !isVolume"></span>
                                <div class="sound" :class="{ 'isVolume': isVolume }" @mouseleave="leaveSoundProgress">
                                    <div class="sound-main" @mousedown="downSoundProgress">
                                        <div class="sound-pro" :style="`width: ${volume}%;`"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- 播放列表 -->
                            <span class="iconfont icon-MusicList" title="播放列表" @click="toMusic"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, toRefs, inject } from 'vue';
import useStore from '../store/index';
import { storeToRefs } from 'pinia';
const useMusic = useStore()

const { playModel } = storeToRefs(useMusic.musicPlay)
const { isLight } = storeToRefs(useMusic.light)
// 关于pinia数据的处理
// 响应式解构pinia里面的参数
const { changePlayModel } = useMusic.musicPlay

// const song = useMusic.musicPlay.audio[i]
// const { id, name, artist, url, cover, lyc } = toRefs(song)

const props = defineProps({
    songData: Object,
})
// 解构父组件传过来的参数
const { songData } = toRefs(props)

// 暂停还是播放
const isplay = computed(() => useMusic.musicPlay.isplay)
// 创建一个audio对象
const audioPlayer = ref(null);
// 歌曲总时长
let duration = ref(0)
// 播放器加载完毕的操作
const initAudio = () => {
    duration.value = audioPlayer.value.duration;
    num.value = 0
    // const audioPlayer = document.querySelector('audio');
    audioPlayer.value.volume = 0.4
};
// 实时获取歌曲当前进度，进度条进度同样
const currentTime = ref(0)
// 播放进度百分比，用于进度条
const num = ref(0)
// 进度条是否可拖动        
const isMove = ref(false)
// 歌曲是否显示文字滑动
const shouldMarquee = ref(false)
// 作者是否显示文字滑动
const artistshouldMarquee = ref(false)

// 设置音量
const volume = ref(40)
// 是否调节音量
const isVolume = ref(false)
// 音量条是否可拖动
const isVolumeMove = ref(false)
// 音量条的拖动========================================
const getvolume = (e) => {
    const left = document.querySelector('.sound-main')
    // 获取进度条宽度
    const pwidth = left.getBoundingClientRect().right - left.getBoundingClientRect().left
    const newTime = Math.floor((e.clientX - left.getBoundingClientRect().left) / pwidth * 100)
    if (newTime > 100) {
        return 100
    } else if (newTime <= 0) {
        return 0
    } else {
        return newTime
    }
}
const downSoundProgress = (e) => {
    const newTime = getvolume(e)
    // console.log(newTime);
    volume.value = newTime
    isVolumeMove.value = true
}
const leaveSoundProgress = () => {
    setTimeout(() => {
        isVolume.value = false
    }, 1000)
}
// 监听音量的变化
watch(volume, (newValue) => {
    // console.log('设置音量');
    const audioPlayer = document.querySelector('audio');
    audioPlayer.volume = newValue / 100
})




// 实时获取当前播放时间
const updateProgress = () => {
    if (!isMove.value) {
        currentTime.value = audioPlayer.value.currentTime;
        num.value = currentTime.value / duration.value * 100
    }
};


// 跳转到音乐播放器
const toMusic = () => {
    // window.open('')
    // 打开新窗口
    const newWindow = window.open('', '_blank')
    if (newWindow) {
        // 跳转到第二个页面
        newWindow.location.href = '/music'
    }
}



// 创建一个方法，用于把获取到的歌曲总时长和当前时长换算为60进制的时分秒形式
const timeFormat = (time) => {
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    if (hours > 0) {
        return `${formattedHours}:${formattedMins}:${formattedSecs}`;
    }
    return `${formattedMins}:${formattedSecs}`;
}

// 以下是拖动进度条的操作================================================
// 进度条的拖动，当我按下时，进度条可拖动
const getPer = (e) => {
    const left = document.querySelector('.progressBox')
    const newTime = (e.clientX - left.getBoundingClientRect().left) / 3
    return newTime
}
const downProgress = (e) => {
    const newTime = getPer(e)
    num.value = newTime
    isMove.value = true
}
// 当鼠标放到进度条上的操作
const moveProgress = (e) => {
    if (isMove.value) {
        const newTime = getPer(e)
        num.value = newTime
    }
    if (isVolumeMove.value) {
        const newTime = getvolume(e)
        volume.value = newTime
    }
}
// 鼠标松开后，进度条不可拖动
const leaveProgress = () => {
    if (isMove.value) {
        audioPlayer.value.currentTime = num.value * duration.value / 100
        isMove.value = false
    }
    if (isVolumeMove.value) {
        // musicPlayer.setCurrentTime(num.value * duration.value / 100)
        isVolumeMove.value = false
    }
}
// 以上是拖动进度条的操作===================================================







// 当歌曲播放完之后
const end = () => {
    console.log('播放完毕');
    audioPlayer.value.currentTime = 0;
    nextSong()
}

const nextSong = inject('nextSong')

// 使用watch监听歌曲数据变化
watch(() => songData, (newValue) => {
    // 当歌曲变化时的操作
    const audioPlayer = document.querySelector('audio');
    audioPlayer.load()
})

// 监听stop的变化，音乐的暂停与播放
watch(isplay, (newValue) => {
    if (newValue === true) {
        Gun()
        audioPlayer.value.play()
    } else {
        audioPlayer.value.pause()
    }
})

// 文字是否需要滚动====================================
// 要获取宽度
const getWidth = (name) => {
    const n = document.querySelector(name)
    return n.offsetWidth
}
// 计算文字是否需要滚动效果
const isGun = (name1, name2) => {
    const n1 = getWidth(name1)
    const n2 = getWidth(name2)
    if (n1 > n2) return true
    else return false
}
// 滚动指令
const Gun = () => {
    shouldMarquee.value = isGun('#title', '.title')
    artistshouldMarquee.value = isGun('#singName', '.singName')
}
// ===================================================
</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');

.box {
    transition: 1s;
    width: 300px;
    height: 200px;
    backdrop-filter: blur(3px);
    background: linear-gradient(225deg, #999ce2 1%, #512680 43%, #736888 99%);

    .head {
        width: 100%;
        height: 70%;
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .singer {
            margin: 20px;
            width: 110px;
            height: 110px;
            overflow: hidden;

            img {
                width: 100%;
                cursor: pointer;
            }
        }

        .songInfo {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 10px;

            .title {
                overflow: hidden;
                width: 120px;
                /* 设置这里的宽度为适合你的容器宽度 */
                text-align: center;

                h2 {
                    font-size: 22px;
                    margin: 10px;
                    cursor: pointer;
                    font-weight: 400;
                    position: relative;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;

                }

                .shouldMarquee {
                    animation: marquee 14s linear infinite;

                    @keyframes marquee {
                        0% {
                            transform: translateX(20%);
                        }

                        10% {
                            transform: translateX(20%);
                        }

                        50% {
                            transform: translateX(-80%);
                        }

                        60% {
                            transform: translateX(-80%);
                        }

                        100% {
                            transform: translateX(20%);
                        }
                    }
                }
            }

            .singName {
                overflow: hidden;
                width: 120px;
                /* 设置这里的宽度为适合你的容器宽度 */
                text-align: center;

                h2 {
                    font-size: 15px;
                    font-weight: 100;
                    cursor: pointer;
                    position: relative;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                }

                .shouldMarquee {
                    animation: marquee 14s linear infinite;

                    @keyframes marquee {
                        0% {
                            transform: translateX(20%);
                        }

                        10% {
                            transform: translateX(20%);
                        }

                        50% {
                            transform: translateX(-80%);
                        }

                        60% {
                            transform: translateX(-80%);
                        }

                        100% {
                            transform: translateX(20%);
                        }
                    }
                }
            }
        }
    }

    .body {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;

        .music {
            width: 100%;
            height: 100%;

            .audioStyle {
                width: 100%;
                height: 100%;

                // background-color: #ffffff;
                .progress {
                    width: 100%;
                    height: 40%;



                    // 进度条--------------------------------------------------
                    .progressBox {
                        width: 100%;
                        height: 8px;
                        background-color: #ffffff01;
                        cursor: pointer;

                        .progressBar {
                            transition: 0.3s;
                            height: 8px;
                            background-color: #411974;
                        }
                    }

                    // ------------------------------------------------------


                }

                .audioInfo {
                    width: 100%;
                    height: 60%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    box-sizing: border-box;

                    .time {
                        font-size: 14px;
                        font-weight: 500;
                    }

                    .control {
                        width: 30%;
                        display: flex;
                        justify-content: space-between;

                        .audioModel {
                            display: inline;

                            .iconfont {
                                cursor: pointer;

                                &:hover {
                                    transition: 0.3s;
                                    color: #8e68b6
                                }
                            }
                        }

                        .soundCtr {
                            position: relative;
                            display: flex;

                            .sound {
                                position: absolute;
                                transition: 0.3s;
                                overflow: hidden;
                                position: fixed;
                                bottom: 15%;
                                right: 0%;
                                // margin-left: 3%;
                                // transform: translate(20%,-100%);
                                width: 0px;
                                height: 30px;
                                border-radius: 0px 0px 0px 5px;
                                background-color: #ffffff7d;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                .sound-main {
                                    width: 90%;
                                    height: 5px;
                                    background-color: #ffffff81;
                                    cursor: pointer;
                                    border-radius: 2px;
                                    overflow: hidden;

                                    .sound-pro {
                                        height: 100%;
                                        background-color: #333;
                                    }
                                }
                            }

                            .isVolume {
                                transition: 0.3s;
                                width: 150px;
                                height: 30px;
                            }
                        }

                        .iconfont {
                            cursor: pointer;
                            color: #000;

                            &:hover {
                                transition: 0.3s;
                                color: #8e68b6
                            }
                        }
                    }

                }
            }
        }
    }
}

.light {
    transition: 0.3s;
    backdrop-filter: blur(3px);
    background: linear-gradient(225deg, #eca07b 1%, #6e84c8 65%, #4dbaf5 99%);
}
</style>