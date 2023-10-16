<template>
    <div class="box">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <h1>音乐馆</h1>
        </div>
        <div class="select">
            <ul>
                <li v-for="(item, index) in selectArr">
                    <div class="selItem" @click="selItem = index" :class="selItem == index ? 'active' : ''">
                        <span>{{ item.name }}</span>
                    </div>
                </li>
            </ul>
            <div class="seek" :style="`transform: translateX(${40 + selItem * 140}px); `"></div>
        </div>

        <div class="main" v-if="selItem == 0">
            <div class="aaa">
                <div class="left" @click="pageNo == 0 ? pageNo = bannerData.length - 1 : pageNo--">
                    <div class="outer">
                        <span class="iconfont icon-xiangzuo"></span>
                    </div>
                </div>
                <div class="body">
                    <div class="content"
                        :style="`width:${bannerData.length}00%;transform: translateX(-${pageNo * (100 / bannerData.length)}%);`">
                        <div class="img" v-for="(item, index) in bannerData" :class="pageNo == index ? 'active' : ''"
                            @click="router.push({ name: 'AlbumDetail', params: { albummid: item.id } })">
                            <img :src="item.picUrl" alt="">
                        </div>
                    </div>
                </div>
                <div class="right" @click="pageNo == bannerData.length - 1 ? pageNo = 0 : pageNo++">
                    <div class="outer">
                        <span class="iconfont icon-xiangyou"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="rank" v-else-if="selItem == 1">
            2
        </div>

        <div class="singer" v-else-if="selItem == 2">
            3
        </div>

        <div class="songList" v-else-if="selItem == 3">
            4
        </div>

        <div class="album" v-else-if="selItem == 4">
            <div class="aaa">
                <div class="left" @click="pageNo == 0 ? pageNo = bannerData.length - 1 : pageNo--">
                    <div class="outer">
                        <span class="iconfont icon-xiangzuo"></span>
                    </div>
                </div>
                <div class="body">
                    <div class="content"
                        :style="`width:${bannerData.length}00%;transform: translateX(-${pageNo * (100 / bannerData.length)}%);`">
                        <div class="img" v-for="(item, index) in bannerData" :class="pageNo == index ? 'active' : ''"
                            @click="router.push({ name: 'AlbumDetail', params: { albummid: item.id } })">
                            <img :src="item.picUrl" alt="">
                        </div>
                    </div>
                </div>
                <div class="right" @click="pageNo == bannerData.length - 1 ? pageNo = 0 : pageNo++">
                    <div class="outer">
                        <span class="iconfont icon-xiangyou"></span>
                    </div>
                </div>
            </div>

            <div class="bbb"></div>
        </div>

    </div>
</template>

<script setup>
import lloading from '../../components/Loading.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
import {
    // 专辑轮播图
    getBanner,


    // 获取歌手分类
    getSingerCategory,
    // 根据歌手分类获取歌手列表
    getSinger,


    // 下面这两个可以结合起来做一个排行榜
    // 获取榜单的名称   showDetail
    getTop,
    // 获取榜单详情
    getTopDetail,


    // 获取歌单分类
    getCategory,
    // 根据分类获取歌单
    getReSongList,

    // 获取最新MV   0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    // 新mv
    getNewMV,
    // 新歌
    getNewSong,
    // 新专辑
    getNewAlbum,
} from '../../api/request';

// 大概是进行排行榜的搜索
// 下面参数的来源是getTop
const longQuery = reactive({
    id: '4',
    pageSize: '20',
    period: '2023-05-10',
    time: ''
})


const loading = ref(false)
const selItem = ref(0)
const selectArr = reactive([
    {
        name: '精选',
    },
    {
        name: '排行',
    },
    {
        name: '歌手',
    },
    {
        name: '歌单',
    },
    {
        name: '专辑',
    }
])

// 保存专辑轮播图图片
const bannerData = ref([])
// 第几页了
const pageNo = ref(0)

// getData = () => {

// }


onMounted(() => {
    getBanner().then((data) => {
        console.log(data);
        bannerData.value = data
        loading.value = false
    })

    getNewAlbum(0).then((data) => {
        console.log(data);
    })
})

</script>

<style scoped lang="scss">
@import url('../../assets/icon/iconfont.css');

%albumBanner-style {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: start;
        z-index: 99;

        .outer {
            transition: 0.3s;
            width: 100px;
            height: 150px;
            background-color: #ffffff00;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            span {
                transition: 0.3s;
                font-size: 40px;
                color: #66666600;
                transform: translateX(-30px);
            }
        }

        &:hover {

            .outer {
                background-color: #ffffff6b;

                span {
                    color: #666;
                    transform: translateX(0px);
                }
            }
        }
    }

    .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
        z-index: 99;

        .outer {
            transition: 0.3s;
            width: 100px;
            height: 150px;
            background-color: #ffffff00;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            span {
                transition: 0.3s;
                font-size: 40px;
                color: #66666600;
                transform: translateX(30px);
            }
        }

        &:hover {

            .outer {
                background-color: #ffffff6b;

                span {
                    color: #666;
                    transform: translateX(0px);
                }
            }
        }
    }

    .body {
        width: 100%;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        margin-top: 2%;
        position: relative;
        // overflow: hidden;
        box-sizing: border-box;


        .content {
            transition: 0.5s;
            // overflow: scroll;
            display: flex;
            justify-content: start;

            .img {
                width: 100%;
                display: flex;
                justify-content: center;
                cursor: pointer;

                img {
                    transition: 0.3s;
                    width: 30%;
                }
            }

            .active {
                img {
                    width: 100%;
                }
            }
        }
    }
}

.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    .head {
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #ffffff81;
        padding: 40px;
        box-sizing: border-box;

        h1 {
            font-size: 40px;
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

    .main {
        width: 100%;

        .aaa {
            @extend %albumBanner-style
        }
    }







    .album {
        .aaa {
            @extend %albumBanner-style
        }
    }

}
</style>