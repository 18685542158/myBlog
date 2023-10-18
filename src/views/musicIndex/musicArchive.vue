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
            <div class="ListBead">
                
            </div>
            <div class="ListBody">

            </div>
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

            <div class="bbb" v-for="(value, key, index) in albumData" :key="index">
                <div class="songListHead">
                    <span>{{ value.typeName }}</span>
                </div>
                <div class="songListBody">
                    <div class="content"
                        :style="`width:${cutAlbumData(value.list).length}00%;transform: translateX(-${selArr[key] * (100 / cutAlbumData(value.list).length)}%);`">
                        <!-- 每页 -->
                        <div class="page" :style="`width:${100 / cutAlbumData(value.list).length}00%;`"
                            v-for="(citem, cindex) in cutAlbumData(value.list)" :key="cindex">
                            <ul>
                                <li v-for="(titem, tindex) in citem" :key="tindex">
                                    <div class="item"
                                        @click="router.push({ name: 'AlbumDetail', params: { albummid: titem.mid } })">
                                        <div class="img">
                                            <img :src="getCover(titem.mid)" alt="">
                                            <div class="cover">
                                                <div class="btn">
                                                    <div class="middle">
                                                        <div class="continue"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="songListFoot">
                    <ul>
                        <li v-for="(item, index) in cutAlbumData(value.list).length" :key="index">
                            <div class="item" @click="selArr[key] = index">
                                <div class="circle" :class="selArr[key] == index ? 'active' : ''"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
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










// 以下是歌单区域
// 获取歌单分类
const songListcategoryData = ref([])
const songListcategoryDataQuery = reactive({
    pageSize: 20,
    pageNo: 1,
    sort: 5,         // 5是推荐，2是最新
    category: '10000000',   // 默认10000000是全部
})





// 以下是专辑区域
// 获取专辑图片
const getCover = (mid) => {
    const cover = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${mid}.jpg`
    return cover
}
// 顺便创建一个数组，用语保存selItem
const selArr = reactive({
    sel0: 0,
    sel1: 0,
    sel2: 0,
    sel3: 0,
    sel4: 0,
    sel5: 0,
})
// 创建一个数组，保存专辑数据
const albumData = reactive({
    arr1: {},
    arr2: {},
    arr3: {},
    arr4: {},
    arr5: {},
    arr6: {},
})
const getAlbumData = () => {
    getNewAlbum(1, 20).then((data) => {
        albumData.arr1 = data
    })
    getNewAlbum(2, 20).then((data) => {
        albumData.arr2 = data
    })
    getNewAlbum(3, 20).then((data) => {
        albumData.arr3 = data
    })
    getNewAlbum(4, 20).then((data) => {
        albumData.arr4 = data
    })
    getNewAlbum(5, 20).then((data) => {
        albumData.arr5 = data
    })
    getNewAlbum(6, 20).then((data) => {
        albumData.arr6 = data
    })
}


// 创建一个方法，将传进来的20条数据分成两大组
const cutAlbumData = (array) => {
    const pageSize = 4
    const page = Math.ceil(array.length / 4)
    const newArr = []
    for (let i = 0; i < page; i++) {
        const startIndex = i * pageSize
        const endIndex = startIndex + pageSize
        const ground = array.slice(startIndex, endIndex)
        newArr.push(ground)
    }
    return newArr
    // return result
}

onMounted(async () => {
    getBanner().then((data) => {
        // console.log(data);
        bannerData.value = data
        loading.value = false
    })
    getAlbumData()
    getCategory().then(data => {
        console.log(data);
    })
    getReSongList(songListcategoryDataQuery).then(d => {
        console.log(d);
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

        .bbb {
            width: 100%;
            margin-top: 2%;
            padding: 2%;
            padding-top: 5%;
            box-sizing: border-box;
            border-top: 1px solid #ffffff66;

            .songListHead {
                width: 100%;

                span {
                    font-size: 24px;
                }
            }

            .songListBody {
                margin-top: 2%;
                width: 100%;
                height: 300px;
                padding-top: 2%;
                overflow: hidden;
                background-color: #ffffff63;

                .content {
                    transition: 0.3s;
                    height: 100%;
                    // transform: translateX(-100%);
                    display: flex;


                    .page {
                        width: 100%;
                        height: 100%;
                        // box-sizing: border-box;

                        ul {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            align-items: flex-start;

                            li {
                                width: 20%;
                                max-width: 50%;
                                margin: 0 2%;
                                flex-grow: 1;

                                .item {
                                    width: 100%;
                                    // aspect-ratio: 4/3;
                                    box-sizing: border-box;
                                    display: flex;
                                    padding: 2%;
                                    background-color: #958888;
                                    // flex-direction: column;

                                    .img {
                                        width: 100%;
                                        height: auto;
                                        position: relative;
                                        border-radius: 5px;
                                        // overflow: hidden;
                                        // background-color: #000000;

                                        img {
                                            transition: 0.3s;
                                            width: 100%;
                                        }

                                        .cover {
                                            transition: 0.3s;
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

                                            .playCount {
                                                transition: 0.3s;
                                                padding: 0 20px;
                                                // width: 100px;
                                                height: 20px;
                                                background-color: #bdcdfdc0;
                                                position: inherit;
                                                cursor: pointer;
                                                border-radius: 0 0 5px 0;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;

                                                span {
                                                    color: #ffffff
                                                }
                                            }

                                            &:hover {
                                                transition: 0.3s;
                                                background-color: #271e1e85;

                                                .btn {
                                                    opacity: 1;
                                                }

                                                .playCount {
                                                    opacity: 0;
                                                }
                                            }
                                        }
                                    }

                                    &:hover {

                                        .img {
                                            img {
                                                transform: translateY(-10px);
                                            }

                                            .cover {
                                                transform: translateY(-10px);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .songListFoot {
                width: 100%;
                aspect-ratio: 20/1;
                // background-color: #fff;
                padding: 0 2%;
                box-sizing: border-box;
                // border-bottom: 1px solid #818181;

                ul {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    li {
                        .item {
                            width: 30px;
                            height: 30px;
                            // background-color: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;

                            .circle {
                                transition: 0.3s;
                                width: 10px;
                                height: 10px;
                                background-color: #b5b5b5;
                                border-radius: 5px;
                            }

                            .active {
                                background-color: #ffffff;
                            }

                            &:hover {
                                .circle {
                                    background-color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}
</style>