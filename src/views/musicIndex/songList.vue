<template>
    <div class="box" v-show="isLoading">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="!loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <div class="imgbox">
                <img :src="songList.songListCover" alt="" @click="console.log(document.scrollTop)" @load="loading = true">
            </div>
            <div class="bgcImg">
                <img :src="songList.songListCover" alt="">
            </div>
            <div class="infobox">
                <h1>{{ songList.songListName }}</h1>
                <div class="artistbox">
                    <div class="artistimg">
                        <img :src="songList.userCover" alt="">
                    </div>
                    <div class="artistname">{{ songList.userName }}</div>
                </div>
                <div class="desc">
                    <span v-html="songList.songListDesc"></span>
                </div>
            </div>
        </div>
        <div class="body">
            <list :songData="songData" :dissid="String(id)"></list>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import useStore from '../../store/index';
import { storeToRefs } from "pinia"
const useMusic = useStore()
const { uin, songmid, nextSongmid, thedissid } = storeToRefs(useMusic.music)
const { isplay, toNext } = storeToRefs(useMusic.musicPlay)
import {
    // 获取单个歌曲的信息
    getSongDetail,
    // 获取歌单详情·
    getSongListDel,
    // 获取播放地址
    getSong
} from '../../api/request';

import list from '../../components/List.vue';
import lloading from '../../components/Loading.vue';

const route = useRoute()
// 页面是否加载完毕
const isLoading = ref(false)
const loading = ref(false)
// 获取歌单唯一标识
const id = ref(0)
// 新建作者数据
const songList = reactive({
    userName: '',
    songListName: '',
    songListDesc: '',
    songListCover: '',
    userCover: '',
})

// 新建一个歌曲列表
let songData = reactive([])

// 获取歌单详细描述
const getData = async () => {
    const detail = await getSongListDel(id.value)
    songList.songListName = detail.dissname
    songList.songListDesc = detail.desc
    songList.userName = detail.nickname
    songList.songListCover = detail.logo
    songList.userCover = detail.headurl
    songData = detail.songlist
}

// 这个歌单页面刚开始加载会需要onMOunted，挂载完毕之后，后面的页面更新靠的就是下面的watch了
onMounted(async () => {
    id.value = route.params.dissid
    await getData()
    isLoading.value = true
})

// 监听路由的参数，随时更新这个页面
watch(route, async (to, from) => {
    if (to.name == 'SongList') {
        isLoading.value = false
        id.value = to.params.dissid || id.value
        await getData()
        isLoading.value = true
    }
})
</script>

<style scoped lang="scss">
%ellipsis-style {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;

    .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        // background-color: #7f9dff00;
        // backdrop-filter: opacity(1);
        // backdrop-filter: blur(1000px);
        // z-index: 100;
    }

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
        // display: inline-block;
        // min-height: calc(100% - 220px);
        width: 98%;
        margin: 10px;
    }
}
</style>