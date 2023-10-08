<template>
    <div class="box">
        <div class="head">
            <div class="img">
                <img v-if="errImg" src="https://y.gtimg.cn/music/photo_new/T001R800x800M000002knSQ01Ts1vS_0.jpg" alt="">
                <img v-if="!loading" :src="cover" alt="" @error="errImg = true" @load="errImg = false">
            </div>
            <div class="info">
                <div class="name" :title="songData.extras.name" v-if="!loading">
                    <h1>{{ songData.extras.name }}</h1>
                </div>
                <div class="name" v-else></div>
                <div class="baseInfo" v-if="!loading && songData.info">
                    <ul>
                        <li v-for="(value, key, index) in songData.info" :key="index">
                            <span>{{ value.title }} ：</span>
                            <span style="line-height: 22px;margin-left: 10px;">{{ value.content[0].value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    // 获取歌曲详情
    getSongDetail
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const loading = ref(true)

const songmid = ref('')
const songData = ref({})

const errImg = ref(false)
const cover = ref('')

// 返回歌曲封面
const getCover = () => {
    let cover = ''
    if (songData.value.track_info.album.mid) {
        // 这个获取的是封面图片
        cover = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${songData.value.track_info.album.mid}.jpg`
    } else if (songData.value.track_info.vs[1]) {
        // 这个获取的是不知道啥图片
        cover = `https://y.qq.com/music/photo_new/T062R800x800M000${songData.value.track_info.vs[1]}.jpg?max_age=2592000`
    } else {
        // 这个获取的是歌手图片
        cover = `https://y.qq.com/music/photo_new/T001R800x800M000${songData.value.track_info.singer[0].mid}.jpg?max_age=2592000`
    }
    return cover
}

watch(route, (to, from) => {
    if (to.name == 'SongDetail') {
        songmid.value = to.params.songmid
        console.log('触发了跳转歌曲');
        getSongDetail(songmid.value).then((data) => {
            console.log(data);
            songData.value = data
            cover.value = getCover()
            loading.value = false
        }).catch(err => {
            console.log(err);
            console.log('跳转歌手获取歌曲详情报错了');
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
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    .head {
        // height: 50%;
        background-color: #ffffff69;
        border-bottom: 1px solid #fff;
        display: flex;

        .img {
            width: 40%;
            aspect-ratio: 1/1;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 95%;
            }
        }

        .info {
            width: 60%;
            display: flex;
            flex-direction: column;

            .name {
                width: 100%;
                min-height: 80px;
                max-height: 100px;
                // background-color: #fff;
                display: flex;
                align-items: center;

                h1 {
                    display: inline-block;
                    width: 100%;
                    font-size: 60px;
                    cursor: pointer;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }

            .baseInfo {
                flex: 1;
                overflow: hidden;

                ul {
                    margin-left: 10px;
                    height: 90%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    li {}
                }
            }
        }
    }

}
</style>