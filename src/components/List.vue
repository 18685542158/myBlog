<template>
    <div>
        <button @click="console.log(songData)" style="position: fixed; z-index: 99;">我是按钮</button>
        <ul>
            <li v-for="(item, index) in songData" :key="index">
                <div class="songName"><span :title="item.songname || item.title">{{ item.songname || item.title }}</span>
                </div>
                <div class="songArtist"><span :title="item.singer[0].name">{{ item.singer[0].name }}</span></div>
                <div class="songTime"><span>{{ timeFormat(item.interval) }}</span></div>
                <div class="songAlbum"><span :title="item.albumname">{{ item.albumname }}</span></div>
                <div class="play" @click="playSong(item)">
                    <div class="middle">
                        <div class="continue"></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
// 接收父组件传过来的参数
const props = defineProps({
    songData: {
        type: Array
    }
})
// 然后解构出来
const { songData } = toRefs(props)

// 接收父组件传递过来的的方法
const emits = defineEmits(["play"]);


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


const playSong = (item) => {
    // 父组件方法的使用
    emits('play', item)
}

</script>

<style scoped lang="scss">
%ellipsis-style {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

li {
    width: 100%;
    height: 50px;
    // background-color: #ffffff19;
    // backdrop-filter: blur(5px);
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff94;
    font-size: 15px;

    span {
        cursor: pointer;
        text-align: center;
    }

    .songName {
        flex: 1;
        margin-left: 20px;
        max-width: 250px;

        span {
            @extend %ellipsis-style;
        }
    }

    .songArtist {
        flex: 1;
        max-width: 200px;

        span {
            @extend %ellipsis-style;
        }
    }

    .songTime {
        flex: 1;
        max-width: 50px;

        span {
            @extend %ellipsis-style;
        }
    }

    .songAlbum {
        flex: 1;
        max-width: 200px;

        span {
            @extend %ellipsis-style;
        }
    }

    .play {
        cursor: pointer;
        margin-right: 20px;

        .middle {
            width: 25px;
            height: 25px;
            box-shadow: inset 0px 0px 2px 1px #ffffff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            .continue {
                transition-duration: 0.3s;
                width: 0;
                height: 0;
                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-left: 11px solid #ffffffc7;
                display: inline-block;
                margin-left: 2px;
            }
        }
    }
}
</style>