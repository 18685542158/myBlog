<template>
    <div class="box" @mousemove="moveProgress" @mouseup="leaveProgress" @mouseleave="leaveProgress">
        <div class="head">
            <video class="video" :src="urlsData[urlsData.length - 1]" @timeupdate="handleTimeUpdate" controls autoplay
                @loadedmetadata="handleMetadataLoad" :currentTime="newCurrentTime">
            </video>
        </div>
        <div class="controls">
            <div class="progress" style="user-select: none;">
                <div class="progressBox" @mousedown="downProgress" @mouseenter="openControl" @mouseleave="closeControl">
                    <div class="progressBar" :style="`width: ${num}%;`"></div>
                </div>
            </div>
            <div class="info" v-if="!loading">
                <!-- <div class="control" :class="{ 'active': isControl }">
                    <div class="conRight">
                        <div class="middle" @click="changePlay">
                            <div class="stop" v-if="isPlay">
                                <div class="line1"></div>
                                <div class="line2"></div>
                            </div>
                            <div class="continue" v-else></div>
                        </div>
                        <span style="user-select: none;">
                            {{ timeFormat(currentTime) }} / {{ timeFormat(duration) }}
                        </span>
                    </div>
                    <div class="conLeft">

                    </div>
                </div> -->
                <div class="right">
                    <h1>{{ mvData.info.name }}</h1>
                    <div class="singers">
                        <span v-for="(item, index) in mvData.info.singers"
                            @click="router.push({ name: 'SingerDetail', params: { singermid: item.mid } })">
                            {{ index == 0 ? '演唱者：' : '' }}{{ index != 0 ? '/' : '' }}{{ item.name }}
                        </span>
                    </div>
                </div>
                <div class="left">
                    <span>{{ format(mvData.info.playcnt) }}万次播放</span>
                    <span>{{ formatTime(mvData.info.pubdate) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { videoPlayer } from '../../media/videoPlayer';
import useStore from '../../store/index';
const useMusic = useStore();
// 解构pinia里的方法
const { addMV } = useMusic.music


import {
    // 获取MV详情
    getMvInfo,
    // 获取mv链接
    getMvUrl,
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const id = ref('')
const mvData = ref({})
const urlsData = ref([])

const loading = ref(true)

// 创建一个视频实例
const videoElement = ref(null)

// 是否正在播放
const isPlay = ref(false)
// 播放和暂停
const changePlay = () => {
    if (isPlay.value == true) {
        videoElement.value.pause()
        isPlay.value = false
    } else {
        videoElement.value.play()
        isPlay.value = true
    }
}
// 是否打开控制台
// const isControl = ref(false)
// 打开控制台
// let conTimer = ref(null)
const openControl = () => {
    console.log('本来想自己做控制台的，但是时间挺紧的，先放着吧');
    // conTimer = setTimeout(() => {
    //     console.log('打开控制台');
    //     isControl.value = true
    //     clearTimeout(conTimer)
    // }, 1000)
}
// 关闭控制台
const closeControl = () => {
    console.log('及时止损');
    // if (conTimer.value) {
    //     clearTimeout(conTimer)
    // } else {
    //     setTimeout(() => {
    //         isControl.value = false
    //     }, 500)
    // }
}

// 视频总时长
const duration = ref(0)
// 视频播放时间
const currentTime = ref(0)
// 拖动视频播放事件
const newCurrentTime = ref(0)
// 进度条百分比
const num = ref(0)
// 进度条是否可拖动        
const isMove = ref(false)

// 创建一个方法，用于把获取到的歌曲总时长和当前时长换算为60进制的时分秒形式
// const timeFormat = (time) => {
//     const hours = Math.floor(time / 3600);
//     const mins = Math.floor((time % 3600) / 60);
//     const secs = Math.floor(time % 60);
//     const formattedHours = String(hours).padStart(2, '0');
//     const formattedMins = String(mins).padStart(2, '0');
//     const formattedSecs = String(secs).padStart(2, '0');
//     if (hours > 0) {
//         return `${formattedHours}:${formattedMins}:${formattedSecs}`;
//     }
//     return `${formattedMins}:${formattedSecs}`;
// }

// 歌曲播放次数格式转换成万
const format = (num) => {
    if (Number(String(num)[String(num).length - 3]) < 5) {
        return Number(String(num).slice(0, String(num).length - 4) + '.' + String(num).slice(String(num).length - 3, String(num).length - 2))
    } else {
        const newNum = Number(String(num).slice(0, String(num).length - 4) + String(num).slice(String(num).length - 3, String(num).length - 2))
        return Number(String(newNum + 1).slice(0, String(newNum + 1).length - 1) + '.' + String(newNum + 1).slice(String(newNum + 1).length - 1, String(newNum).length))
    }
}

// 将时间戳转换为年月日
const formatTime = (time) => {
    const date = new Date(time * 1000)
    const str = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
    return str
}


// 视频资源加载完毕时，初始化数据
const handleMetadataLoad = (e) => {
    videoElement.value = document.querySelector('video');
    isPlay.value = e.target.paused
    duration.value = e.target.duration
}

// 视频播放时，实时更新数据
const handleTimeUpdate = (e) => {
    currentTime.value = e.target.currentTime
    num.value = currentTime.value / duration.value * 100
}


// 以下是拖动进度条的操作================================================
// 进度条的拖动，当我按下时，进度条可拖动
const getPer = (e) => {
    const left = document.querySelector('.progressBox')
    // 获取进度条宽度
    const pwidth = left.getBoundingClientRect().right - left.getBoundingClientRect().left
    const newTime = (e.clientX - left.getBoundingClientRect().left) / pwidth * 100
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
    // if (isVolumeMove.value) {
    //     const newTime = getvolume(e)
    //     volume.value = newTime
    // }
}
// 鼠标松开后，进度条不可拖动
const leaveProgress = () => {
    if (isMove.value) {
        newCurrentTime.value = num.value * duration.value / 100
        isMove.value = false
    }
    // if (isVolumeMove.value) {
    //     // musicPlayer.setCurrentTime(num.value * duration.value / 100)
    //     isVolumeMove.value = false
    // }
}

watch(route, (to, from) => {
    if (to.name == 'MvDetail') {
        id.value = to.params.id
        // console.log('触发了跳转MV');
        getMvInfo(id.value).then((data) => {
            console.log(data);
            mvData.value = data
            addMV(data.info)
            getMvUrl(id.value).then((urlData) => {
                // console.log('获取播放链接成功');
                // console.log(urlData);
                urlsData.value = urlData[data.info.vid]
                loading.value = false
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }
}, { immediate: true })

</script>

<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    // display: flex;
    // flex-direction: column;
    overflow-y: scroll;

    .head {
        width: 100%;
        height: 90%;
        background-color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;

        .video {
            height: 100%;
        }
    }

    .controls {
        width: 100%;
        height: 10%;
        min-height: 50px;
        display: flex;
        flex-direction: column;

        .progress {
            width: 100%;
            height: 8px;

            .progressBox {
                width: 100%;
                height: 8px;
                background-color: #ffffff25;
                cursor: pointer;

                .progressBar {
                    transition: 0.3s;
                    height: 8px;
                    background-color: #cdbfe976;
                }
            }
        }

        .info {
            flex: 1;
            display: flex;
            position: relative;

            .control {
                transition: 0.3s;
                width: 100%;
                height: 0%;
                position: absolute;
                background-color: #927171;
                backdrop-filter: blur(100px);
                display: flex;

                .conRight {
                    flex: 1;
                    display: flex;
                    align-items: center;

                    .middle {
                        width: 26px;
                        height: 26px;
                        cursor: pointer;
                        box-shadow: 0px 0px 2px 1px #ffffff;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 20px;

                        .stop {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .line1 {
                                transition-duration: 0.3s;
                                width: 4px;
                                height: 14px;
                                background-color: #ffffffc7;
                                border-radius: 4px;
                            }

                            .line2 {
                                transition-duration: 0.3s;
                                margin-left: 3px;
                                width: 4px;
                                height: 14px;
                                background-color: #ffffffc7;
                                border-radius: 4px;
                            }
                        }

                        &:hover {
                            .line1 {
                                transition-duration: 0.3s;
                                background-color: #ffffff;
                            }

                            .line2 {
                                transition-duration: 0.3s;
                                background-color: #ffffff;
                            }

                            .continue {
                                transition-duration: 0.2s;
                            }
                        }

                        .continue {
                            transition-duration: 0.3s;
                            width: 0;
                            height: 0;
                            border-top: 8px solid transparent;
                            border-bottom: 8px solid transparent;
                            border-left: 13px solid #ffffffc7;
                            display: inline-block;
                            margin-left: 3px;
                        }
                    }
                }

                .conLeft {
                    flex: 1;
                }
            }

            .active {
                height: 100%;
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;

                h1 {
                    font-size: 18px;
                    margin-left: 2%;
                    cursor: pointer;
                }

                .singers {
                    margin-left: 2%;

                    span {
                        cursor: pointer;
                    }
                }
            }

            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: end;
                justify-content: space-evenly;

                span {
                    margin-right: 2%;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>