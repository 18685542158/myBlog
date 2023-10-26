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
                    <div class="selItem" :class="selItem == index ? 'active' : ''" @click="openSongListSel(index)">
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
            <!-- <div class="content"> -->
            <div class="outer" v-for="(item, index) in topData" :key="index">
                <!-- <div class="item"> -->
                <div class="head">
                    <span>{{ item.title }}</span>
                </div>
                <div class="body">
                    <div class="inner" v-for="(childItem, childIndex) in item.list" :key="childIndex">
                        <div class="img" @click="router.push({ name: 'RankList', params: { id: childItem.topId } })">
                            <img :src="childItem.picUrl" alt="">
                        </div>
                        <div class="info">
                            <div class="top">
                                <span>{{ childItem.label }}</span>
                            </div>
                            <div class="bottom">
                                <div class="songInfo" v-for="(thrItem, thrIndex) in childItem.song" :key="thrIndex">
                                    <span>
                                        {{ thrItem.rank }} {{ thrItem.title }} {{ thrItem.singerName }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </div> -->
            </div>
            <!-- </div> -->
        </div>

        <div class="singer" v-else-if="selItem == 2">
            <div class="open" @click="singerOpen = !singerOpen">
                <span v-if="singerOpen">展开</span>
                <span v-else>关闭</span>
            </div>
            <div class="singerHead" :class="{ 'active': singerOpen }">
                <div class="item" v-for="(value, key, index) in singerCategoryData" :key="index">
                    <div class="row" v-for="(item, Cindex) in value" :key="Cindex" @click="selSingerClick(key, Cindex)"
                        :class="selObj[key] == Cindex ? 'active' : ''">
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
            <div class="singerBody" @scroll="getMoreSingerData">
                <ul>
                    <li v-for="(item, index) in singerData" :key="index">
                        <div class="item">
                            <div class="img">
                                <img :src="item.singer_pic" alt="">
                            </div>
                            <div class="info"
                                @click="router.push({ name: 'SingerDetail', params: { singermid: item.singer_mid } })">
                                <span>{{ item.singer_name }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="songList" v-else-if="selItem == 3">
            <div class="sel" :class="{ 'openSel': openSel }">
                <div class="item1" v-for="(item, index) in songListcategoryData" :key="index"
                    :class="categoryDataSel == index ? 'categoryDataActive' : ''" @click="clickCategory(index)">
                    <div class="outer">
                        <span> {{ item.type }} </span>
                    </div>
                </div>
            </div>
            <div class="ListHead">
                <div class="level1">
                    <div class="item2" v-for="(item, index) in songListcategoryData[categoryDataSel].list" :key="index"
                        @click="selcategory(item)" :class="item.id == songListId ? 'active' : ''">
                        <span> {{ item.name }} </span>
                    </div>
                </div>
            </div>
            <div class="ListBody searchPage" @scroll="getMoreData">
                <ul>
                    <li v-for="(item, index) in songListData" :key="index">
                        <div class="item" @click="router.push({ name: 'SongColist', params: { dissid: item.dissid } })">
                            <div class="img">
                                <img :src="item.imgurl" alt="">
                                <div class="cover">
                                    <div class="btn">
                                        <div class="middle">
                                            <div class="continue"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="info">
                                <span>{{ item.dissname }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
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
                                        <div class="info">
                                            <span>{{ titem.name }}</span>
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
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';          // 防抖
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





// 以下是排行榜区域
// 大概是进行排行榜的搜索
// 下面参数的来源是getTop
const longQuery = reactive({
    id: '62',
    pageSize: '20',
    period: '',
    time: ''
})
// 创建一个排行信息数据
const topData = ref([])








// 以下是歌手区域
// 创建一个歌手数组
const singerCategoryData = ref([])
// 创建一个对象，用于保存上方选择项的selItem
const selObj = ref({})
// 创建一个展开按钮
const singerOpen = ref(true)
// 创建一个对象，用于存储歌手数据
const singerData = ref([])

// 创建一个对象，用于保存搜索的数据
const singerQuery = ref({
    area: -100,
    genre: -100,
    index: -100,
    sex: -100,
    pageNo: 1
})
// 创建一个方法，用于切换菜单
const selSingerClick = (key, index) => {
    selObj.value[key] = index
    singerQuery.value[key] = singerCategoryData.value[key][index].id
    singerQuery.value.pageNo = 1
    const page = document.querySelector('.singerBody')
    page.scrollTop = 0
    // 估计顺便执行一下方法
    getSinger(singerQuery.value).then((data) => {
        singerData.value = data.list
    })
}
// 创建一个方法，获取更多歌手
const getMoreSingerData = debounce((e) => {
    const page = document.querySelector('.singerBody')
    if (Math.floor(page.scrollHeight - page.scrollTop) <= page.clientHeight + 1) {
        loading.value = true
        singerQuery.value.pageNo++
        getSinger(singerQuery.value).then(data => {
            singerData.value = [...singerData.value, ...data.list]
            loading.value = false
        })
    }
}, 300)

watch(singerCategoryData, () => {
    for (let key in singerCategoryData.value) {
        if (singerCategoryData.value.hasOwnProperty(key)) {
            selObj.value[key] = 0;
            singerQuery.value[key] = singerCategoryData.value[key][0].id
        }
    }
    getSinger(singerQuery.value).then((data) => {
        singerData.value = data.list
    })
}, { immediate: true })





// 以下是歌单区域
// 获取歌单分类
// 默认选择的第一个类
const categoryDataSel = ref(0)
const openSel = ref(true)
const songListcategoryData = ref([])
const songListData = ref([])
const songListId = ref('10000000')
const songListNum = ref(1)
const songListcategoryDataQuery = reactive({
    pageSize: 20,
    pageNo: songListNum,
    sort: 5,         // 5是推荐，2是最新
    category: songListId,   // 默认10000000是全部
})
const clickCategory = (index) => {
    categoryDataSel.value = index
    setTimeout(() => {
        openSel.value = false
    }, 300)
}
const openSongListSel = (index) => {
    selItem.value = index
    if (index == 3) {
        if (openSel.value == false) {
            openSel.value = true
        } else {
            openSel.value = false
        }
    } else {
        openSel.value = true
    }
}
const selcategory = (item) => {
    console.log(item);
    songListId.value = item.id
    songListNum.value = 1
    const page = document.querySelector('.searchPage')
    page.scrollTop = 0
    // 还要获取数据
    getReSongList(songListcategoryDataQuery).then(d => {
        console.log(d);
        songListData.value = d.list
    })
}

// 获取更多数据
//获取更多数据
const getMoreData = debounce((e) => {
    const page = document.querySelector('.searchPage')
    if (Math.floor(page.scrollHeight - page.scrollTop) <= page.clientHeight + 1) {
        loading.value = true
        songListNum.value++
        getReSongList(songListcategoryDataQuery).then(d => {
            songListData.value = [...songListData.value, ...d.list]
            loading.value = false
        })
    }
}, 300)


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
    // 获取专辑轮播图
    getBanner().then((data) => {
        // console.log(data);
        bannerData.value = data
        loading.value = false
    })
    // 获取专辑的六个分类
    getAlbumData()
    // 获取歌单的分类
    getCategory().then(data => {
        songListcategoryData.value = data
    })
    // 根据歌单分类获取歌单
    getReSongList(songListcategoryDataQuery).then(d => {
        songListData.value = d.list
    })

    // 获取歌手分类
    getSingerCategory().then((data) => {
        singerCategoryData.value = data
    })


    // 获取排行榜编号
    getTop(1).then((data) => {
        console.log(data);
        topData.value = data
    })

    getTopDetail(longQuery).then((data) => {
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
    height: 80%;

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
                        user-select: none;
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

    .rank {
        width: 100%;
        flex: 1;
        overflow-y: scroll;

        .outer {
            width: 100%;
            margin-bottom: 5%;
            display: flex;
            flex-direction: column;

            .head {
                width: 100%;

                span {
                    font-size: 30px;
                }
            }

            .body {
                width: 100%;
                // aspect-ratio: 1/1;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 30px;
                grid-template-rows: repeat();
                padding: 2%;
                box-sizing: border-box;

                .inner {
                    width: 100%;
                    aspect-ratio: 2/1;
                    display: flex;

                    .img {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                        cursor: pointer;

                        img {
                            width: 100%;
                        }
                    }

                    .info {
                        flex: 1;
                        background-color: #ffffff72;
                        margin-left: 0;

                        .top {
                            width: 100%;
                            height: 30%;
                            display: flex;
                            align-items: center;
                            border-bottom: 1px solid black;
                            padding: 2%;
                            box-sizing: border-box;
                            position: relative;

                            span {
                                font-size: 24px;
                                cursor: pointer;
                                position: absolute;
                                cursor: pointer;
                                white-space: nowrap;
                                /*保证内容在一行显示*/
                                overflow: hidden;
                                text-overflow: ellipsis;
                                max-width: 100%;
                                display: inline-block;
                            }
                        }

                        .bottom {
                            width: 100%;
                            height: 70%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-evenly;
                            margin-left: 2%;

                            .songInfo {
                                width: 100%;
                                position: relative;
                                padding: 2%;
                                box-sizing: border-box;

                                span {
                                    position: absolute;
                                    cursor: pointer;
                                    white-space: nowrap;
                                    /*保证内容在一行显示*/
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    max-width: 90%;
                                    display: inline-block;
                                    font-size: 14px;
                                }
                            }

                        }
                    }
                }
            }
        }
    }



    .singer {
        width: 100%;
        position: relative;
        // flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;

        .open {
            position: absolute;
            right: 5%;
            top: 2%;
            z-index: 99;

            span {
                cursor: pointer;
                color: #ffffffb4;

                &:hover {
                    color: #fff;
                }
            }
        }

        .singerHead {
            position: relative;
            transition: 0.3s;
            width: 100%;
            overflow: hidden;
            padding-bottom: 1%;
            // height: auto;

            .item {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .row {
                    transition: 0.1s;
                    width: 60px;
                    height: 30px;
                    background-color: #9999994f;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 30px;
                    margin-left: 2%;
                    font-size: 14px;
                    cursor: pointer;
                    color: antiquewhite;
                    margin-top: 2%;

                    &:hover {
                        background-color: #9999998b;
                        color: #ffffff;
                    }
                }

                .active {
                    background-color: #ffffffe7;
                    color: #333;

                    &:hover {
                        background-color: #ffffffe7;
                        color: #333;
                    }
                }

            }

        }

        .active {
            transition: 0.3s;
            height: 10%;
        }

        .singerBody {
            width: 100%;
            flex: 1;
            height: calc(100vh - 120px);
            overflow-y: scroll;

            ul {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

                .item {
                    margin: 8%;
                    // width: 170px;
                    aspect-ratio: 3/4;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    background-color: #ffffff48;
                    box-sizing: border-box;

                    .img {
                        margin-top: 4%;
                        width: 90%;
                        cursor: pointer;

                        img {
                            width: 100%;
                        }
                    }

                    .info {
                        margin: 3%;

                        span {
                            // display: inline-block;
                            max-width: 100%;
                            // text-overflow: ellipsis;
                            // white-space: nowrap;
                            // overflow: hidden;
                            cursor: pointer;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

    .songList {
        width: 100%;
        flex: 1;

        .sel {
            position: absolute;
            transition: 0.3s;
            width: 65%;
            height: 0%;
            z-index: 0;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 0 0 5px 0;
            box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.538);
            box-sizing: border-box;

            .item1 {
                transition: 0.3s;
                opacity: 0;
                flex: 1;
                height: 80%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                box-sizing: border-box;

                &:not(:last-child) {
                    border-right: 2px solid #333;
                }

                &:hover {
                    .outer {
                        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.43);
                    }
                }

                .outer {
                    transition: 0.4s;
                    width: 70%;
                    height: 80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;

                    span {
                        font-size: 19px;
                    }
                }
            }

            .categoryDataActive {
                .outer {
                    background-color: #bdbbff6e;
                    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.43);
                }
            }
        }

        .openSel {
            width: 65%;
            height: 60px;
            z-index: 99;

            .item1 {
                opacity: 1;
            }
        }

        .ListHead {
            width: 100%;
            position: relative;

            .level1 {
                z-index: -1;
                width: 100%;
                height: 20%;
                background-color: #ffffff71;
                display: flex;
                box-sizing: border-box;
                flex-wrap: wrap;
                overflow-y: scroll;

                .item2 {
                    width: 7%;
                    aspect-ratio: 3/1;
                    background-color: #ffffff86;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 1%;
                    box-sizing: border-box;
                    cursor: pointer;
                    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.329);
                    border-radius: 5px;

                    &:active {
                        transform: translateX(2px);
                        transform: translateY(1px);
                    }

                    span {
                        font-size: 1.19rem;
                    }
                }

                .active {}
            }


        }

        .ListBody {
            width: 100%;
            height: 50vh;
            overflow-y: scroll;

            ul {
                margin-top: 2%;
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;

                li {
                    width: 20%;
                    max-width: 50%;
                    margin: 2%;
                    flex-grow: 1;

                    .item {
                        width: 100%;
                        aspect-ratio: 7/8;
                        box-sizing: border-box;
                        display: flex;
                        padding: 4%;
                        background-color: #95888862;
                        flex-direction: column;

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

                        .info {
                            margin-top: 2%;
                            flex: 1;
                            cursor: pointer;
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

    .album {
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;

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
                // height: 300px;
                padding: 2% 0;
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
                                // max-width: 50%;
                                margin: 0 2%;
                                // flex-grow: 1;

                                .item {
                                    width: 100%;
                                    // aspect-ratio: 4/3;
                                    box-sizing: border-box;
                                    display: flex;
                                    padding: 2%;
                                    background-color: #958888;
                                    flex-direction: column;
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

                                    .info {
                                        margin-top: 2%;

                                        span {
                                            font-size: 17px;
                                            line-height: 20px;
                                            cursor: pointer;
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