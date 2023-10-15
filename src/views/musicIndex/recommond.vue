<template>
    <div class="box" v-show="!loading">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <h1>今日推荐</h1>
        </div>
        <div class="body" v-if="!loading">
            <div class="recommondSong">
                <div class="content">
                    <div class="main">
                        <div class="img">
                            <img :src="getCover(dailyData.songlist[0])" alt="">
                        </div>
                    </div>
                    <div class="info">
                        <div class="title" :title="dailyData.songlist[0].songname"
                            @click="router.push({ name: 'SongDetail', params: { songmid: dailyData.songlist[0].songmid } })">
                            <h1>{{ dailyData.songlist[0].songname }}</h1>
                        </div>
                        <div class="content">
                            <div class="desc">
                                <span>{{ theSentence.data.content }}</span>
                            </div>
                            <div class="toDetail"
                                @click="router.push({ name: 'SongColist', params: { dissid: dailyData.disstid } })">
                                <span>进入歌单</span><span class="iconfont icon-xiangyou"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="recSongList" v-if="!recSongListLoading">
            <div class="title">
                <span>精选歌单</span>
            </div>
            <div class="body">
                <div class="content"
                    :style="`width:${groupCount2}00%;transform: translateX(-${pageNo2 * (100 / groupCount2)}%);`">
                    <div class="page" :style="`width:${100 / groupCount2}00%;`" v-for="(item, index) in groupedArray2 ">
                        <ul>
                            <li v-for="(childItem, index) in item" :key="index">
                                <div class="item"
                                    @click="router.push({ name: 'SongColist', params: { dissid: childItem.content_id } })">
                                    <div class="img">
                                        <img :src="childItem.cover" alt="">
                                        <div class="cover">
                                            <div class="btn">
                                                <div class="middle">
                                                    <div class="continue"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <span>{{ childItem.title }}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="foot">
                <ul>
                    <li v-for="(item, index) in groupCount2">
                        <div class="item" @click="pageNo2 = index">
                            <div class="circle" :class="pageNo2 == index ? 'active' : ''"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="songList" v-if="!songListLoading">
            <div class="songListHead">
                <div class="row" v-for="(item, index) in selData" :key="index" @click="selClick(key, index)"
                    :class="selItem == index ? 'active' : ''">
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div class="songListBody">
                <div class="content"
                    :style="`width:${groupCount}00%;transform: translateX(-${pageNo * (100 / groupCount)}%);`">
                    <!-- 每页 -->
                    <div class="page" :style="`width:${100 / groupCount}00%;`" v-for="(item, index) in groupedArray ">
                        <ul>
                            <li v-for="(childItem, index) in item" :key="index">
                                <div class="item"
                                    @click="router.push({ name: 'SongColist', params: { dissid: childItem.tid } })">
                                    <div class="img">
                                        <img :src="childItem.cover_url_big" alt="">
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
                    <li v-for="(item, index) in groupCount">
                        <div class="item" @click="pageNo = index">
                            <div class="circle" :class="pageNo == index ? 'active' : ''"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import lloading from '../../components/Loading.vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
const router = useRouter()
import { ref, reactive, onMounted } from 'vue';
import {
    //
    getNewMV,
    // 也是推荐歌单
    getRecommondSongList,
    // 歌曲？
    getRecommondSong,

    // 单纯的获取推荐歌单
    getRecommondPlaylist,

} from '../../api/request';


const dailyData = ref({})
const theSentence = ref({})

const loading = ref(true)
const songListLoading = ref(true)
const recSongListLoading = ref(true)

const selItem = ref(0)
const selData = reactive([
    {
        id: 3317,
        name: '官方歌单'
    },
    {
        id: 59,
        name: '经典'
    },
    {
        id: 71,
        name: '情歌'
    },
    {
        id: 3056,
        name: '网络歌曲'
    },
    {
        id: 64,
        name: 'KTV热歌'
    },
])

// 3317: 官方歌单，59：经典，71：情歌，3056：网络歌曲，64：KTV热歌
const query = ref({
    pageNo: 1,
    pageSize: 20,
    id: 3317
})

// 创建一个对象，用来保存需要选择获取的歌单
const selSongListData = ref({})
// 创建一个对象，用于保存推荐的固定歌单
const SongListData = ref({})
// 创建一个对象，用于保存mv数据
// const mvData = ref({})

// 创建一个方法，用于切换菜单
const selClick = (key, index) => {
    pageNo.value = 0
    selItem.value = index
    query.id = selData[index].id
    // 根据条件筛选的歌单，不知道是些啥
    getRecommondSongList(query).then(data => {
        console.log('也是推荐歌单');
        console.log(data);
        selSongListData.value = data
        computedData()
    })
    // 估计顺便执行一下方法
}


const groupedArray2 = ref([])
// 计算由多少组
const groupCount2 = ref(0)
// 第几页
const pageNo2 = ref(0)
// 创建一个方法，将传进来的SongListData，平均分为N个数组然后，每组6个
const computedData2 = () => {
    groupedArray2.value = ([])
    // 每组数组长度
    const groupLength = 4;
    // 计算分组数量
    groupCount2.value = Math.ceil(SongListData.value.list.length / groupLength);
    // 分组过程
    for (let i = 0; i < groupCount2.value; i++) {
        // 以下两个index用于切割SongListData
        const startIndex = i * groupLength;
        const endIndex = startIndex + groupLength;
        const group = SongListData.value.list.slice(startIndex, endIndex);
        groupedArray2.value.push(group);
    }
}


const groupedArray = ref([])
// 计算由多少组
const groupCount = ref(0)
// 第几页
const pageNo = ref(0)
// 创建一个方法，将传进来的selSongListData，平均分为N个数组然后，每组6个
const computedData = () => {
    groupedArray.value = ([])
    // 每组数组长度
    const groupLength = 4;
    // 计算分组数量
    groupCount.value = Math.ceil(selSongListData.value.list.length / groupLength);
    // 分组过程
    for (let i = 0; i < groupCount.value; i++) {
        // 以下两个index用于切割selSongListData
        const startIndex = i * groupLength;
        const endIndex = startIndex + groupLength;
        const group = selSongListData.value.list.slice(startIndex, endIndex);
        groupedArray.value.push(group);
    }
}

// 返回歌曲封面
const getCover = (songData) => {
    let cover = ''
    if (songData.albummid) {
        // 这个获取的是封面图片
        cover = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${songData.albummid}.jpg`
    } else {
        // 这个获取的是歌手图片
        cover = `https://y.qq.com/music/photo_new/T001R800x800M000${songData.singer[0].mid}.jpg?max_age=2592000`
    }
    return cover
}

onMounted(() => {
    axios.get('https://api.xygeng.cn/one').then((data) => {
        theSentence.value = data.data
    })

    // 纯属官方推荐歌单
    getRecommondPlaylist().then((data) => {
        SongListData.value = data
        computedData2()
        recSongListLoading.value = false
    })
    // 根据条件筛选的歌单，不知道是些啥
    getRecommondSongList(query).then(data => {
        selSongListData.value = data
        computedData()
        songListLoading.value = false
    })
    // 我的每日30首
    getRecommondSong().then(data => {
        dailyData.value = data
        loading.value = false
    })

    // 新mv
    // getNewMV().then(data => {
    //     console.log('推荐mv');
    //     console.log(data);
    //     mvData.value = data
    // })
})

</script>

<style scoped lang="scss">
@import url('../../assets/icon/iconfont.css');

.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    overflow-y: scroll;
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

    .body {
        flex: 1;
        padding: 2%;
        box-sizing: border-box;

        .recommondSong {
            width: 100%;

            .content {
                width: 100%;
                display: flex;

                .main {
                    width: 50%;
                    background-color: #2e294e25;

                    .img {
                        width: 100%;
                        background-color: #958888;
                        ;
                        padding: 2%;
                        box-sizing: border-box;

                        img {
                            width: 100%;
                        }
                    }
                }

                .info {
                    flex: 1;
                    margin-left: 2%;
                    margin-top: 2%;
                    display: flex;
                    flex-direction: column;

                    .title {
                        width: 100%;
                        height: 40%;
                        // background-color: #fff;
                        display: flex;
                        // align-items: center;
                        overflow: hidden;
                        border-bottom: 1px solid #ffffff6d;

                        h1 {
                            width: 100%;
                            font-size: 2.9rem;
                            cursor: pointer;
                            text-overflow: ellipsis;
                            // white-space: nowrap;
                            overflow: hidden;
                        }
                    }

                    .content {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        margin: 2%;
                        margin-right: 2%;

                        .desc {
                            flex: 1;

                            span {
                                font-size: 22px;
                                cursor: pointer;
                            }
                        }

                        .toDetail {
                            width: 100%;
                            display: flex;
                            justify-content: end;

                            span {
                                font-size: 20px;
                                cursor: pointer;
                            }
                        }
                    }

                }
            }
        }
    }

    .recSongList {
        width: 100%;
        margin-top: 2%;
        padding: 2%;
        box-sizing: border-box;
        border-top: 1px solid #ffffff66;

        .title {
            width: 100%;

            span {
                font-size: 20px;
            }
        }

        .body {
            margin-top: 2%;
            width: 100%;
            height: auto;
            padding-top: 2%;
            overflow-x: hidden;

            .content {
                transition: 0.3s;
                height: 100%;
                display: flex;


                .page {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;

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

        .foot {
            width: 100%;
            aspect-ratio: 20/1;
            // background-color: #fff;
            padding: 0 2%;
            box-sizing: border-box;
            border-bottom: 1px solid #818181;

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

    .songList {
        width: 100%;
        margin-top: 2%;
        padding: 2%;
        box-sizing: border-box;
        border-top: 1px solid #ffffff66;

        .songListHead {
            width: 100%;
            display: flex;

            .row {
                transition: 0.1s;
                width: 90px;
                height: 30px;
                background-color: #9999994f;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 30px;
                margin-left: 4%;
                cursor: pointer;
                color: antiquewhite;

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

        .songListBody {
            margin-top: 2%;
            width: 100%;
            height: 300px;
            padding-top: 2%;
            overflow-x: hidden;

            .content {
                transition: 0.3s;
                height: 100%;
                // transform: translateX(-100%);
                display: flex;


                .page {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;

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
            border-bottom: 1px solid #818181;

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
</style>