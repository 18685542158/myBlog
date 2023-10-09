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
        <div class="select" v-if="!loading">
            <ul>
                <li v-for="(item, index) in selectArr">
                    <div class="selItem" @click="selItem = index" :class="selItem == index ? 'active' : ''"
                        v-if="item.mark">
                        <span>{{ item.name }}</span>
                    </div>
                </li>
            </ul>
            <div class="seek" :style="`transform: translateX(${40 + selItem * 140}px); `"></div>
        </div>
        <div class="singer" v-if="!loading && selItem == 0">
            <ul>
                <li v-for="(item, index) in songData.track_info.singer" :key="index">
                    <div class="item">
                        <div class="img">
                            <img :src="getImg(item.mid)" alt="">
                        </div>
                        <div class="info" @click="router.push({ name: 'SingerDetail', params: { singermid: item.mid } })">
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="album" v-else-if="!loading && selItem == 1">
            <div class="right">
                <div class="img">
                    <img :src="albumData.picurl" alt="">
                </div>
            </div>
            <div class="left">
                <span>专辑：</span>
                <span @click="router.push({ name: 'AlbumDetail', params: { albummid: songData.track_info.album.mid } })">
                    {{ songData.track_info.album.name }}
                </span>
                <div class="desc" :title="albumData.desc"><span>{{ albumData.desc }}</span></div>
            </div>
        </div>
        <div class="mv" v-else-if="!loading && selItem == 2">
            <div class="mvData">
                <div class="item" @click="router.push({ name: 'MvDetail', params: { id: mvData.info.vid } })">
                    <div class="img">
                        <img :src="mvData.info.cover_pic" alt="">
                        <div class="cover">
                            <div class="btn">
                                <div class="middle">
                                    <div class="continue"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <span>{{ mvData.info.name }}</span>
                    </div>
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
    getSongDetail,
    // 获取该歌曲下的专辑
    getAlbumInfo,
    // 获取mv详情
    getMvInfo
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const loading = ref(true)

const songmid = ref('')
const songData = ref({})
const albumData = ref({})
const mvData = ref({})

const errImg = ref(false)
const cover = ref('')

const selItem = ref(0)

const selectArr = reactive([
    {
        name: '歌手',
        mark: true
    },
    {
        name: '专辑',
        mark: true
    },
    {
        name: '视频',
        mark: true
    }
])

// 编辑这个选择表，因为有的歌曲没有专辑与mv
const editsel = (data) => {
    selectArr[2].mark = true
    selectArr[1].mark = true
    if (data.track_info.mv.id == 0) {
        selectArr[2].mark = false
    }
    if (data.track_info.album.id == 0) {
        selectArr[1].mark = false
    }
}
const getImg = (mid) => {
    const cover = `https://y.qq.com/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
    return cover
}

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
        // console.log('触发了跳转歌曲');
        getSongDetail(songmid.value).then((data) => {
            songData.value = data
            cover.value = getCover()
            editsel(data)
            getAlbumInfo(data.track_info.album.mid).then((adata) => {
                albumData.value = adata
            }).catch(err => {
                console.log(err);
            })

            getMvInfo(data.track_info.mv.vid).then((mdata) => {
                mvData.value = mdata
                loading.value = false
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
            loading.value = false
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

    .select {
        width: 100%;
        background-color: #ffffff43;

        ul {
            display: flex;

            li {
                .selItem {
                    cursor: pointer;
                    width: 100px;
                    height: 10px;
                    margin: 20px;
                    text-align: center;

                    span {
                        font-size: 19px;
                    }
                }

                .active {
                    transition: 0.3s;
                    color: #fff
                }
            }
        }

        .seek {
            width: 60px;
            height: 5px;
            border-radius: 5px;
            background-color: #fff;
            margin-top: 8px;
            transition: 0.3s;
        }
    }

    .singer {
        flex: 1;

        ul {
            display: flex;
            flex-wrap: wrap;


            .item {
                margin: 20px;
                width: 170px;
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                background-color: #ffffff48;
                box-sizing: border-box;

                .img {
                    width: 100%;
                    display: flex;
                    justify-content: center;

                    img {
                        width: 90%;
                    }
                }

                .info {
                    span {
                        display: inline-block;
                        max-width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        cursor: pointer;
                        text-align: center;
                    }
                }
            }
        }
    }

    .album {
        flex: 1;
        display: flex;

        .right {
            height: 100px;
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;

            .img {
                width: 80%;
                height: 80%;
                overflow: hidden;
                border-radius: 5px;

                img {
                    width: 100%;
                }
            }
        }

        .left {
            width: calc(100% - 100px);
            height: 100%;
            display: flex;
            align-items: center;

            span {
                cursor: pointer;
                font-size: 18px;

                &:nth-of-type(2) {
                    margin-left: 10px;
                }
            }

            .desc {
                flex: 1;
                height: 53px;
                margin-left: 20px;
                line-height: 25px;
                overflow: hidden;
                display: inline-block;
                text-overflow: ellipsis;
            }
        }
    }

    .mv {
        flex: 1;
        padding: 20px;

        .mvData {
            width: 300px;
            min-height: 180px;

            .item {
                width: 100%;
                aspect-ratio: 4/3;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;

                .img {
                    width: 100%;
                    height: auto;
                    position: relative;
                    border-radius: 5px;
                    overflow: hidden;
                    background-color: #000000;

                    img {
                        width: 100%;
                    }

                    .cover {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        z-index: 99;
                        cursor: pointer;

                        .btn {
                            transition: 0.3s;
                            position: inherit;
                            cursor: pointer;
                            right: 20px;
                            bottom: 10px;
                            opacity: 0;

                            .middle {
                                width: 40px;
                                height: 40px;
                                box-shadow: inset 0px 0px 2px 2px #c1c1c1;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                .continue {
                                    transition-duration: 0.3s;
                                    width: 0;
                                    height: 0;
                                    border-top: 12px solid transparent;
                                    border-bottom: 12px solid transparent;
                                    border-left: 20px solid #cecece;
                                    display: inline-block;
                                    margin-left: 5px;
                                }

                                &:hover {
                                    box-shadow: inset 0px 0px 2px 2px #ffffff;

                                    .continue {
                                        transition: 0s;
                                        border-left: 20px solid #ffffff;

                                    }
                                }
                            }
                        }

                        &:hover {
                            transition: 0.3s;
                            background-color: #271e1e85;

                            .btn {
                                opacity: 1;
                            }
                        }
                    }
                }

                .info {
                    margin-top: 2%;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    span {
                        color: rgb(0, 0, 0);
                        font-size: 18px;
                        cursor: pointer;
                    }

                    .singArr {
                        margin-top: 2%;
                        overflow: hidden;
                        height: 15px;

                        span {
                            // display: inline-block;
                            max-width: 100%;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            font-size: 15px;
                            cursor: pointer;
                            text-align: center;
                            color: #333
                        }
                    }
                }
            }
        }
    }
}
</style>