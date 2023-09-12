<template>
    <div class="box" v-show="isColLoading">
        <div class="head">
            <div class="bgcImg">
                <img :src="songColist.songColistCover" alt="">
            </div>
            <div class="infobox">
                <h1>{{ songColist.songColistName }}</h1>
                <div class="artistbox">
                    <div class="artistimg">
                        <img :src="songColist.userCover" alt="">
                    </div>
                    <div class="artistname">{{ songColist.userName }}</div>
                </div>
                <div class="desc">
                    <span v-html="songColist.songColistDesc"></span>
                </div>
            </div>
            <div class="imgbox">
                <img id="cover" :src="songColist.songColistCover" alt="">
            </div>
        </div>
        <div class="body">
            <ul>
                <li v-for="(item, index) in songData" :key="index">
                    <div class="songName"><span :title="item.songname">{{ item.songname }}</span></div>
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
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { debounce } from 'lodash';
import { useRoute } from 'vue-router';
import useStore from '../../store/index';
import { storeToRefs } from "pinia"
const useMusic = useStore()
const { uin, songmid, nextSongmid, thedissid } = storeToRefs(useMusic.music)
const { isplay, toNext } = storeToRefs(useMusic.musicPlay)
import {
    // 获取单个歌曲的信息
    getSongDetail,
    // 获取歌单详情
    getSongListDel,
    // 获取播放地址
    getSong
} from '../../api/request';

const route = useRoute()
// 页面是否加载完毕
const isColLoading = ref(false)
// 获取歌单唯一标识
const id = ref(0)
// 新建一个头部数据对象
const songColist = reactive({
    userName: '',
    songColistName: '',
    songColistDesc: '',
    songColistCover: '',
    userCover: '',
})
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

// 新建一个歌曲列表
let songData = reactive([])

// 播放
const playSong = debounce(async (item) => {
    if (isplay.value) {
        // 先把之前那个歌曲的暂停咯
        isplay.value = false
    }
    if (thedissid.value != id) {
        thedissid.value = id
    }
    nextSongmid.value = item.songmid
    toNext.value = true
}, 500)

// 获取歌单详细描述
const getData = async () => {
    const detail = await getSongListDel(id.value)
    songColist.songColistName = detail.dissname
    songColist.songColistDesc = detail.desc
    songColist.userName = detail.nickname
    songColist.songColistCover = detail.logo
    songColist.userCover = detail.headurl
    songData = detail.songlist
    isColLoading.value = true
}

// 这个歌单页面刚开始加载会需要onMOunted，挂载完毕之后，后面的页面更新靠的就是下面的watch了
onMounted(() => {
    // isColLoading.value = true
    id.value = route.params.dissid
    getData()
})

// 监听路由的参数，随时更新这个页面
watch(route, (to, from) => {
    if (to.name == 'SongColist') {
        isColLoading.value = false
        id.value = to.params.dissid || id.value
        getData()
    }
})
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;

    .head {
        box-sizing: border-box;
        width: 98%;
        height: 180px;
        background-color: #ffffff19;
        backdrop-filter: blur(5px);
        // backdrop-filter: blur(6px);
        // background-color: #2e294e47;
        margin-top: 20px;
        margin-bottom: 5px;
        margin: 10px;
        display: flex;
        justify-content: start;
        box-shadow: 2px 2px 10px 1px rgb(83, 83, 83);

        .bgcImg {
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;

            img {
                width: 100%;
                transform: translateY(-25%);
            }
        }

        .imgbox {
            height: 100%;
            overflow: hidden;

            img {
                height: 100%;
            }
        }

        .infobox {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(15px);


            h1 {
                font-size: 28px;
                margin: 20px;
                margin-bottom: 6px;
            }

            .artistbox {
                width: 94%;
                display: flex;
                justify-content: start;
                align-items: center;
                margin-left: 30px;
                padding-bottom: 5px;
                border-bottom: 1px solid #333;
                box-sizing: border-box;

                .artistimg {
                    width: 30px;
                    display: flex;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }
                }

                .artistname {
                    margin-left: 10px;
                }
            }

            .desc {
                flex: 1;
                overflow-y: auto;
                margin: 20px;
                margin-top: 10px;
                margin-bottom: 5px;

                span {

                    line-height: 20px;
                    // background-color: #fff;
                }
            }


        }
    }

    .body {
        display: inline-block;
        // min-height: calc(100% - 220px);
        width: 98%;
        margin: 10px;

        ul {
            width: 100%;

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
                        display: inline-block;
                        max-width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }

                .songArtist {
                    flex: 1;
                    max-width: 200px;

                    span {
                        display: inline-block;
                        max-width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }

                .songTime {
                    flex: 1;
                    max-width: 50px;

                    span {
                        display: inline-block;
                        max-width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }

                .songAlbum {
                    flex: 1;
                    max-width: 200px;

                    span {
                        display: inline-block;
                        max-width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
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
    }
}
</style>