<template>
    <div class="outer-box">
        <div class="inner-box" :class="{ 'open': isOpen }">
            <div class="head">
                <h1>你播放了：</h1>
                <div style="display: flex;justify-content: space-between;margin: 20px 10px;margin-bottom: 0px;">
                    <span>400首歌曲</span>
                    <span class="iconfont icon-shanchu"></span>
                </div>

            </div>
            <div class="body" @click="console.log(isOpen)">
                <ul>
                    <li v-for="item in songURL">
                        <div class="item" style="width: 100%;height: 60px;border: 1px solid red;display: flex;">
                            <div style="flex:1">
                                <h1 style="cursor: pointer;white-space: nowrap;overflow:hidden">{{ item.name }}</h1>
                                <span></span>
                            </div>
                            <div style="width: 60px;height: 100%;">
                                按钮
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
import {storeToRefs} from 'pinia';
const useMusic = useStore()
const { songmid, nextSongmid, thedissid, songURL } = storeToRefs(useMusic.music)

import { toRefs, defineProps } from 'vue';
// 使用 `props` 关键字来接收外部传递的 prop
const props = defineProps({
    isOpen: Boolean
})
// 使用 `props` 对象中的属性
const {isOpen} = toRefs(props)





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
        transition: 0.1s 0s;
        background-image: linear-gradient(45deg, #f2e1ff4e 1%, #f0e3ff64 99%);
        box-shadow: inset 1px 1px 4px black;
        display: flex;        
        flex-direction: column;
        opacity: 0;

        .head {
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
            flex:1;
            padding: 0 20px;
            overflow-y: scroll;

            li {
                margin-top: 10px;
            }
        }
    }

    .open {
        transition: 0.3s 0.3s;
        opacity: 1;
    }
}
</style>