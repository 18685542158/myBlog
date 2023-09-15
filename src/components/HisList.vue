<template>
    <div class="outer-box">
        <div class="inner-box" :class="{ 'open': isOpen }">
            <div class="head">
                <h1>你播放了：</h1>
                <div style="display: flex;justify-content: space-between;margin: 20px 10px;margin-bottom: 0px;">
                    <span>{{ songURL.length }}首歌曲</span>
                    <span class="iconfont icon-shanchu" @click="clearAll"></span>
                </div>

            </div>
            <div class="body">
                <ul>
                    <li v-for="item in songURL" :class="item.songmid == songmid ? 'active' : ''">
                        <div class="item" style="width: 100%;height: 60px;display: flex;">
                            <div
                                style="width: calc(100% - 60px);display: flex;flex-direction: column;justify-content: space-evenly;">
                                <h1 :title="item.name">{{ item.name }}</h1>
                                <span :title="item.artist">{{ item.artist }}</span>
                            </div>
                            <div
                                style="width: 60px;aspect-ratio: 1/1;display: flex;justify-content: center;align-items: center;">
                                <div class="middle" @click="play(item)">
                                    <div class="continue"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import useStore from '../store/index';
import { storeToRefs } from 'pinia';
const useMusic = useStore()
const { songmid, nextSongmid, thedissid, songURL, songPlayList } = storeToRefs(useMusic.music)
// 接收父组件的方法
const emits = defineEmits(["FatherClick"]);
// 解构里面的方法
const { setSongPlayList, setSongURL } = useMusic.music

import { toRefs, defineProps } from 'vue';
// 使用 `props` 关键字来接收外部传递的 prop
const props = defineProps({
    isOpen: Boolean,
})
// 使用 `props` 对象中的属性
const { isOpen } = toRefs(props)

// 历史播放列表里面点击播放歌曲
const play = (item) => {
    nextSongmid.value = item.songmid
    emits('nextSong')
}

// 清空历史播放
const clearAll = () => {
    console.log('清除了全部');
    songURL.value = []
    songPlayList.value = []
    setSongPlayList()
    setSongURL()
}

</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');

.outer-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // background-image: linear-gradient(to right, #90dfdba6 1%, #5bceff99 60%);
    background-color: #ffffffaa;
    backdrop-filter: blur(5px);
    padding-left: 3%;

    .inner-box {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(45deg, #f2e1ff4e 1%, #f0e3ff64 99%);
        box-shadow: inset 1px 1px 4px black;
        display: flex;
        flex-direction: column;

        .head {
            transition: 0.1s 0s;
            opacity: 0;
            padding: 20px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.521);

            h1 {
                font-size: 25px;
                user-select: none;
            }

            span {
                cursor: pointer;
            }
        }

        .body {
            flex: 1;
            padding: 0 20px;
            overflow-y: scroll;
            transition: 0.1s 0s;
            opacity: 0;

            li {
                margin: 10px 0;

                &:hover {
                    transition: 0.3s;
                    background-color: #cb9f9f;
                    border-radius: 5px;
                }

                .item {
                    padding: 0 5px;

                    h1,
                    span {
                        cursor: pointer;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .middle {
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        box-shadow: 0px 0px 5px 1px #ffffff;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .continue {
                            transition-duration: 0.3s;
                            width: 0;
                            height: 0;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                            border-left: 17px solid #ffffffc7;
                            display: inline-block;
                            margin-left: 5px;
                        }
                    }
                }
            }

            .active {
                transition: 0.3s;
                background-color: #cb9f9f;
                border-radius: 5px;
            }
        }
    }

    .open {

        .body,
        .head {
            transition: 0.3s 0.3s;
            opacity: 1;
        }
    }
}
</style>