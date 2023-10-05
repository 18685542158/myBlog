<template>
    <div>
        <ul>
            <li v-for="(item, index) in songData" :key="index">
                <div class="item main" v-if="isMainSong && index == 0">
                    <div class="img">
                        <img :src="getSingerImg(item.singer[0].mid)" :title="item.singer[0].name">
                    </div>
                    <div class="theInfo">
                        <div class="mainSongName">
                            <span :title="item.songname || item.title">{{ item.songname || item.title }}</span>
                        </div>
                        <div class="mainSongArtist"><span :title="item.singer[0].name">{{ singerFormat(item.singer)
                        }}</span>
                        </div>
                    </div>
                    <div class="songTime"><span>{{ timeFormat(item.interval) }}</span></div>
                    <div class="songAlbum"><span :title="item.albumname">{{ item.albumname }}</span></div>
                    <div class="play" @click="playSong(item.songmid)">
                        <div class="middle">
                            <div class="continue"></div>
                        </div>
                    </div>
                </div>
                <div class="item" v-else>
                    <div class="songName" @click="router.push({ name: 'SongDetail', params: { songmid: item.songmid } })">
                        <span :title="item.songname || item.title">{{ item.songname || item.title }}</span>
                    </div>
                    <div class="songArtist">
                        <span v-for="(childItem, childIndex) in item.singer" :key="childIndex" @click="router.push({name:'SingerDetail',params:{singermid:childItem.mid}})">
                            {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                        </span>
                    </div>
                    <div class="songTime"><span>{{ timeFormat(item.interval) }}</span></div>
                    <div class="songAlbum" @click="router.push({ name: 'AlbumDetail', params: { albummid: item.albumid } })">
                        <span :title="item.albumname">{{ item.albumname }}</span>
                    </div>
                    <div class="play" @click="playSong(item.songmid)">
                        <div class="middle">
                            <div class="continue"></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps, toRefs } from 'vue';
import { debounce } from 'lodash';
import useStore from '../store/index';
import { storeToRefs } from "pinia"
const router = useRouter()
const useMusic = useStore()
const { uin, songmid, nextSongmid, thedissid, searchSong } = storeToRefs(useMusic.music)
const { isplay, toNext } = storeToRefs(useMusic.musicPlay)
// 接收父组件传过来的参数
const props = defineProps({
    songData: {
        type: Array
    },
    dissid: {
        type: String,
        default: ''
    },
    isMainSong: {
        type: Boolean
    }
})
// 然后解构出来
const { songData, dissid } = toRefs(props)

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

// 创建一个方法，接收歌手数组（因为歌手可能不止一个），返回一个歌手字符串
const singerFormat = (array) => {
    let str = ''
    for (let i = 0; i <= array.length - 1; i++) {
        if (i == 0) {
            str = array[i].name
        } else {
            str = str + '/' + array[i].name
        }
    }
    return str
}


// 返回歌手图片地址
const getSingerImg = (item) => {
    const url = `https://y.qq.com/music/photo_new/T001R300x300M000${item}_8.jpg?max_age=2592000`
    return url
}


// const playSong = (item) => {
//     // 父组件方法的使用
//     emits('play', item)
// }

// 播放
const playSong = debounce(async (item) => {
    if (isplay.value) {
        // 先把之前那个歌曲的暂停咯
        isplay.value = false
    }
    if (dissid.value != '' && thedissid.value != dissid.value) {
        console.log('变化歌单');
        thedissid.value = dissid.value
    } else {
        searchSong.value = nextSongmid.value
    }
    nextSongmid.value = item
    toNext.value = true
}, 500)

</script>

<style scoped lang="scss">
%ellipsis-style {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
}

li {
    .item {
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

    .main {
        width: 100%;
        height: 130px;
        // background-color: #ffffff19;
        // backdrop-filter: blur(5px);
        backdrop-filter: blur(6px);
        background-color: #2e294e25;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ffffff94;
        font-size: 15px;
        backdrop-filter: blur(10px);
        z-index: 2;

        span {
            cursor: pointer;
            text-align: center;
        }

        .img {
            flex: 1;
            margin-left: 20px;
            max-width: 250px;
            height: 80%;

            img {
                // border-radius:10px;
                height: 100%;
            }
        }

        .theInfo {
            flex: 1;
            max-width: 200px;
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;

            .mainSongName {
                // background-color: #fff;
                width: 140%;
                margin-left: 30%;
                max-width: 300px;

                span {
                    @extend %ellipsis-style;
                    font-size: 30px;
                    font-weight: 600;
                }
            }

            .mainSongArtist {
                width: 100%;
                margin-left: 0px;
                max-width: 200px;

                span {
                    @extend %ellipsis-style;
                }
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
}
</style>