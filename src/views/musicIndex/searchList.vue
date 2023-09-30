<template>
    <div style="width:100%;height: 100%;">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="isLoading">
                <loading></loading>
            </div>
        </transition>
        <div class="box">
            <div class="head">
                <div class="nav">
                    <ul>
                        <li v-for="(item, index) in navData" :class="selItem == index ? 'active' : ''"
                            @click="chose(item, index)">
                            <div class="item">
                                {{ item.title }}
                            </div>
                        </li>
                    </ul>
                    <div class="seek" :style="`transform: translateX(${-300 + selItem * 120}px); `"></div>
                </div>
                <div class="info" @click="{ console.log(key); }"
                    style="display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;">
                    <!-- <div>
                    搜索：<span>"{{ key }}""</span>
                </div>
                <div>
                    结果：{{ 200 }}条
                </div> -->
                </div>
            </div>
            <div class="body">
                <searchforsong v-if="selItem == 0" :songData="songData.value" @scroll="loadMoreData"
                    class="searchPage"></searchforsong>
                <searchforsonglist v-else-if="selItem == 1" :songlistData="songlistData.value"
                    @scroll="loadMoreData" class="searchPage">
                </searchforsonglist>
                <searchforsinger v-else-if="selItem == 2" :singerData="singerData.value"
                    @scroll="loadMoreData" class="searchPage"></searchforsinger>
                <searchforalbum v-else-if="selItem == 3" :albumData="albumData.value" @scroll="loadMoreData"
                    class="searchPage"></searchforalbum>
                <searchformv v-else-if="selItem == 4" :mvData="mvData.value" @scroll="loadMoreData"
                    class="searchPage"></searchformv>
                <searchforlyric v-else-if="selItem == 5" :lyricData="lyricData.value" @scroll="loadMoreData"
                    class="searchPage"></searchforlyric>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { debounce } from 'lodash';          // 防抖

import searchforalbum from '../../components/SearchForAlbum.vue';
import searchforlyric from '../../components/SearchForLyric.vue';
import searchformv from '../../components/SearchForMv.vue';
import searchforsinger from '../../components/SearchForSinger.vue';
import searchforsong from '../../components/SearchForSong.vue';
import searchforsonglist from '../../components/SearchForSongList.vue';
import loading from '../../components/Loading.vue';
const route = useRoute()
import {
    search,   // 搜索，我设置了三个参数，第一个是key关键词，第二个是type类型，第三个是pageNum第几页，
} from '../../api/request';

const isLoading = ref(true)
const more = ref(false)

const key = ref('')
const type = ref(0)
const pageNum = ref(1)
// 默认菜单为歌曲，也就是0号菜单
const selItem = ref(0)

// 给这几个组件创建数据
const songData = reactive([])
const songlistData = reactive([])
const singerData = reactive([])
const albumData = reactive([])
const mvData = reactive([])
const lyricData = reactive([])

// nav菜单
const navData = [
    {
        title: '单曲',
        type: 0,
    },
    {
        title: '歌单',
        type: 3,
    },
    {
        title: '歌手',
        type: 1,
    },
    {
        title: 'mv',
        type: 4,
    },
    {
        title: '专辑',
        type: 2,
    },
    {
        title: '歌词',
        type: 7,
    },
]

// 菜单切换，对应高亮显示
const chose = async (item, index) => {
    isLoading.value = true
    selItem.value = index
    type.value = item.type
    pageNum.value = 1
    await getData()
    isLoading.value = false
}

// 第一次打开搜索获取数据
const getData = async () => {
    if (!key.value) return
    console.log('获取数据？？？');
    console.log(key.value, type.value);
    const data = await search(key.value, type.value, pageNum.value)
    console.log(data);
    if (type.value == 7) {
        lyricData.value = data.req_1.data.body.song.list
    } else if (type.value == 0) {
        songData.value = data.req_1.data.body.song.list
    } else if (type.value == 3) {
        songlistData.value = data.req_1.data.body.songlist
    } else if (type.value == 1) {
        singerData.value = data.req_1.data.body.singer
    } else if (type.value == 4) {
        mvData.value = data.req_1.data.body.mv
    } else if (type.value == 2) {
        albumData.value = data.req_1.data.body.album
    }
}

//获取更多数据
const loadMoreData = debounce((e) => {
    const page = document.querySelector('.searchPage')
    if (Math.floor(page.scrollHeight - page.scrollTop) <= page.clientHeight) {
        isLoading.value = true
        console.log('到底');
        pageNum.value++
        // const data = search(key.value, type.value, pageNum.value)
        search(key.value, type.value, pageNum.value).then((data) => {
            console.log(data);
            if (type.value == 7) {
                lyricData.value = [...lyricData.value, ...data.req_1.data.body.song.list]
            } else if (type.value == 0) {
                songData.value = [...songData.value, ...data.req_1.data.body.song.list]
            } else if (type.value == 3) {
                songlistData.value = [...songlistData.value, ...data.req_1.data.body.songlist]
            } else if (type.value == 1) {
                singerData.value = [...singerData.value, ...data.req_1.data.body.singer]
            } else if (type.value == 4) {
                mvData.value = [...singerData.value, ...data.req_1.data.body.mv]
            } else if (type.value == 2) {
                albumData.value = [...albumData.value, ...data.req_1.data.body.album]
            }
            isLoading.value = false
        }).catch(err=>{
            isLoading.value = false
            console.log(err);
        })
    }
}, 300)

// 当key发生变化时，重新获取数据
watch(route, async (to, from, next) => {
    isLoading.value = true
    key.value = route.params.key
    await getData()
    isLoading.value = false
})

// 当pageNum发生变化时，接着获取数据，添加到尾部
watch(pageNum, () => {
    // 这里处理获取接下来的内容
})

onMounted(async () => {
    key.value = route.params.key
    await getData()
    isLoading.value = false
})

</script>

<style scoped lang="scss">
.loading {
    position: absolute;
    width: 100%;
    height: 100%;
    // background-color: #7f9dff00;
    // backdrop-filter: opacity(1);
    // backdrop-filter: blur(1000px);
    // z-index: 100;
}

.box {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    .head {
        display: flex;
        background-color: #ffffff18;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #ffffff81;

        .nav {
            width: 75%;
            height: 100px;
            // background-color: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            ul {
                display: flex;

                // background-color: #333;
                li {
                    cursor: pointer;

                    .item {
                        transition: 0.3s;
                        width: 120px;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        font-size: 20px;
                        user-select: none;
                    }
                }

                .active {
                    color: #f2f2fe;
                }
            }

            .seek {
                width: 60px;
                height: 3px;
                border-radius: 5px;
                background-color: #fff;
                margin-top: 8px;
                transition: 0.3s;
            }
        }

        .info {
            flex: 1;
        }
    }

    .body {
        position: relative;
        height: calc(100% - 101px);
        // flex: 1;
    }
}
</style>