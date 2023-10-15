<template>
    <div class="box">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <div class="img">
                <img v-if="errImg" src="https://y.gtimg.cn/music/photo_new/T001R800x800M000002knSQ01Ts1vS_0.jpg" alt="">
                <img v-if="!loading" :src="getSingerImg(singermid)" alt="" @error="errImg = true" @load="errImg = false">
            </div>
            <div class="info">
                <div class="name" :title="singerData.singername">
                    <h1>{{ singerData.singername }}</h1>
                </div>
                <div class="baseInfo" v-if="!loading && singerData.basic">
                    <ul>
                        <li v-for="(item, index) in singerData.basic.item" :key="index">
                            <span>{{ item.key }} </span>
                            <span style="line-height: 22px;">：{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="select">
            <ul>
                <li v-for="(item, index) in selectArr" @click="search">
                    <div class="selItem" @click="selItem = index" :class="selItem == index ? 'active' : ''">
                        <span>{{ item.name }}</span>
                    </div>
                </li>
            </ul>
            <div class="seek" :style="`transform: translateX(${40 + selItem * 140}px); `"></div>
        </div>
        <div class="body" v-if="!loading && selItem == 0">
            <div class="detail" v-if="singerData.desc">
                <h2>歌手详情：</h2>
                <span v-html="lyricFormat(singerData.desc)"></span>
            </div>
            <div class="detail" v-if="singerData.other" v-for="(item, index) in singerData.other.item">
                <h2>{{ item.key }}：</h2>
                <span v-html="lyricFormat(item.value)"></span>
            </div>
        </div>
        <div class="song" v-else-if="!loading && selItem == 1">
            <div style="width: 100%;height: 100%;overflow-y: scroll;" class="searchPage" @scroll="loadMoreData">
                <list :songData="songData" :NotClick="true"></list>
            </div>
        </div>
        <div class="album" v-else-if="!loading && selItem == 2">
            <searchforalbum :albumData="albumData" :NotClick="true" class="searchPage" @scroll="loadMoreData">
            </searchforalbum>
        </div>
        <div class="mv" v-else-if="!loading && selItem == 3">
            <searchformv :mvData="mvData" class="searchPage" @scroll="loadMoreData"></searchformv>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { debounce } from 'lodash';          // 防抖

import list from '../../components/List.vue';
import searchforalbum from '../../components/SearchForAlbum.vue';
import searchformv from '../../components/SearchForMv.vue';
import lloading from '../../components/Loading.vue';


import {
    // 获取歌手详情
    getSingerInfo,
    // 其实这三个方法我可以整合成一块的
    getSingerSong,
    getSingerAlbum,
    getSingerMv
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const loading = ref(true)

const singermid = ref('')
const singerData = ref({})

const errImg = ref(false)
const selItem = ref(0)

const selectArr = reactive([
    {
        name: '信息'
    },
    {
        name: '单曲'
    },
    {
        name: '专辑'
    },
    {
        name: '视频'
    }
])
// const isLoading = ref(false)

// 存储歌曲，专辑，nv
const songData = ref([])
const albumData = ref([])
const mvData = ref([])
const num = ref(10)
const page = ref(1)
// 搜索歌曲，专辑，mv
const search = () => {
    console.log(selItem);
    if (selItem.value == 1) {
        num.value = 20
        page.value = 1
        getSingerSong(singermid.value, num.value, page).then((data) => {
            console.log(data);
            songData.value = data.list
        })
    } else if (selItem.value == 2) {
        num.value = 10
        page.value = 1
        getSingerAlbum(singermid.value, num.value, page).then((data) => {
            console.log(data);
            albumData.value = data.list
        })
    } else if (selItem.value == 3) {
        num.value = 20
        page.value = 1
        getSingerMv(singermid.value, num.value, page).then((data) => {
            console.log(data);
            mvData.value = data.list
        })
    }
}

// 当滑到底部，获取更多数据
const loadMoreData = debounce((e) => {
    const page = document.querySelector('.searchPage')
    if (Math.floor(page.scrollHeight - page.scrollTop) <= page.clientHeight) {
        // isLoading.value = true
        page.value++
        if (selItem.value == 1) {
            num.value = 20
            getSingerSong(singermid.value, num.value, page).then((data) => {
                songData.value = [...songData.value, ...data.list]
            })
        } else if (selItem.value == 2) {
            num.value = 10
            getSingerAlbum(singermid.value, num.value, page).then((data) => {
                albumData.value = [...albumData.value, ...data.list]
            })
        } else if (selItem.value == 3) {
            num.value = 20
            getSingerMv(singermid.value, num.value, page).then((data) => {
                mvData.value = [...mvData.value, ...data.list]
            })
        }
    }
}, 300)

// 返回歌手图片地址
const getSingerImg = (item) => {
    // const url = `https://y.qq.com/music/photo_new/T001R300x300M000${item}_8.jpg?max_age=2592000`
    const url2 = `https://y.gtimg.cn/music/photo_new/T001R800x800M000${item}.jpg?max_age=0`
    return url2
}

// 创建一个方法，接收歌词内容，将歌词里面的\n转换为可渲染内容
const lyricFormat = (content) => {
    const newContent = content.replace(/\n/g, '<br>')
    return newContent
}

watch(route, (to, from) => {
    if (to.name == 'SingerDetail') {
        loading.value = true
        singermid.value = to.params.singermid
        console.log('触发了跳转歌手');
        getSingerInfo(singermid.value).then((data) => {
            console.log(data);
            singerData.value = data
            loading.value = false
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

    .body {
        flex: 1;
        background-color: #ffffffbe;

        .detail {
            padding: 20px;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 1px solid #fff;

            h2 {
                font-size: 18px;
                margin-bottom: 18px;
            }

            span {
                line-height: 22px;
            }
        }

    }

    .song {
        width: 100%;
        height: 90%;
    }

    .album {
        width: 100%;
        height: 90%;
    }

    .mv {
        width: 100%;
        height: 90%;
    }
}
</style>