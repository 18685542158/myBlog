<template>
    <div class="box" v-show="isColLoading">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="!loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head" v-if="isColLoading">
            <div class="infobox">
                <h1 style="cursor: pointer;">{{ songColist.songColistName }}</h1>
                <div class="artistbox">
                    <div class="artistname" style="cursor: pointer;">{{ songColist.userName }}</div>
                </div>
                <div class="desc">
                    <span v-html="songColist.songColistDesc" style="cursor: pointer;"></span>
                </div>
            </div>
            <div class="imgbox">
                <img id="cover" :src="songColist.songColistCover" alt="">
            </div>
        </div>
        <div class="body" v-if="isColLoading">
            <div class="item" v-for="(item, index) in songData" :key="index">
                <div class="rank">
                    <span>{{ index + 1 }}</span>
                    <span v-if="item.rankValue">{{ mapRank(item.rankType) }}：{{ item.rankValue }}</span>
                </div>
                <div class="img" @click="router.push({ name: 'SongDetail', params: { songmid: item.mid } })">
                    <img :src="getCover(item)" alt="">
                </div>
                <div class="songName" @click="router.push({ name: 'SongDetail', params: { songmid: item.mid } })">
                    <span>{{ item.name }}</span>
                </div>
                <!-- <div class="singerName" @click="router.push({ name: 'SingerDetail', params: { singermid: item.mid } })">
                    <span>{{ item.singerName }}</span>
                </div> -->
                <div class="singerName">
                    <span v-for="(childItem, childIndex) in item.singer" :key="childIndex"
                        @click="router.push({ name: 'SingerDetail', params: { singermid: childItem.mid } })">
                        {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                    </span>
                </div>
                <div class="time">
                    <span>{{ timeFormat(item.interval) }}</span>
                </div>
            </div>
        </div>
        <div class="noData" v-if="noData">
            <h1 style="cursor: pointer;margin-left: 2%;font-size: 24px;">没有数据啊！！！</h1>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import useStore from '../../store/index';
import { storeToRefs } from "pinia"
import { useRouter } from 'vue-router';
const router = useRouter()
const useMusic = useStore()
const { uin, songmid, nextSongmid, thedissid } = storeToRefs(useMusic.music)
const { isplay, toNext } = storeToRefs(useMusic.musicPlay)
import {
    // 获取单个歌曲的信息
    getSongDetail,
    // 获取歌单详情
    getSongListDel,
    // 获取播放地址
    getSong,
    // 获取榜单详情
    getTopDetail
} from '../../api/request';

import lloading from '../../components/Loading.vue';

// 是否有数据
const noData = ref(false)
const route = useRoute()
// 页面是否加载完毕
const isColLoading = ref(false)
const loading = ref(false)
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

// 新建一个歌曲列表
let songData = reactive([])

// 获取歌单详细描述
const getData = async () => {
    const detail = await getTopDetail(longQuery)
    console.log(detail);
    songColist.songColistName = detail.info.title
    songColist.songColistDesc = detail.info.desc
    songColist.userName = detail.info.titleDetail
    songColist.songColistCover = detail.info.picUrl
    // songColist.userCover = detail.headurl
    songData = detail.list
}

// 获取歌曲图片
// 返回歌曲封面
const getCover = (songData) => {
    let cover = ''
    if (songData.cover) {
        cover = songData.cover
    } else if (songData.albummid) {
        // 这个获取的是封面图片
        cover = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.albumMid}.jpg`
    } else {
        // 这个获取的是歌手图片
        cover = `https://y.qq.com/music/photo_new/T001R300x300M000${songData.singerMid}.jpg?max_age=2592000`
    }
    return cover
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

// 创建一个搜索
const longQuery = reactive({
    id,
    pageSize: '20',
    period: '',
    time: ''
})

// 创建一个方法用于判断排名
const mapRank = (type) => {
    const obj = {
        '0': '',
        '1': '上升',
        '2': '减少',
        '3': '持平',
        '4': '新歌',
        '6': '上升百分比',
    }
    return obj[type]
}


// 这个歌单页面刚开始加载会需要onMOunted，挂载完毕之后，后面的页面更新靠的就是下面的watch了
onMounted(async () => {
    id.value = route.params.id
    if (id.value == '201') {
        noData.value = true
    } else {
        getData()
    }
    isColLoading.value = true
    loading.value = true
})

// 监听路由的参数，随时更新这个页面
watch(route, async (to, from) => {
    if (to.name == 'RankList') {
        isColLoading.value = false
        id.value = to.params.id || id.value
        if (id.value == '201') {
            noData.value = true
        } else {
            await getData()
        }
        isColLoading.value = true
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

span {
    cursor: pointer;
}

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
                color: azure;
            }

            .artistbox {
                width: 94%;
                display: flex;
                justify-content: end;
                align-items: center;
                margin-left: 30px;
                padding-bottom: 5px;
                border-bottom: 1px solid #333;
                box-sizing: border-box;

                .artistname {
                    margin-left: 10px;
                    color: azure;
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
                    color: azure;

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

        .item {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            // background-color: #ffffff37;
            margin-bottom: 2%;
            padding-bottom: 2%;
            border-bottom: 1px solid #ffffff80;

            .img {
                flex: 1;
                height: 100%;

                img {
                    height: 100%;
                    cursor: pointer;
                }
            }

            .rank {
                flex: 1;
                margin-left: 2%;

                span {
                    &:nth-child(1) {
                        font-size: 1.82rem;
                    }

                    &:nth-child(2) {
                        font-size: 1.12rem;
                        margin-left: 10%;
                    }
                }
            }

            .songName {
                flex: 1;

            }

            .singerName {
                flex: 1;

            }

            .time {
                flex: 1;

            }
        }
    }
}
</style>