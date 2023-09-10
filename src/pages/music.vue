<template>
    <!-- 背景 -->
    <Snow id="snow"></Snow>
    <div class="btn" style="width: 50px;
    height: 20px; background-color: #e28686;border-radius: 0 0 10px 0;cursor: pointer;position: fixed;top:30px;"
        @click="fanhui">返回</div>
    <div class="btn" style="width: 50px;
    height: 20px; background-color: #e28686;border-radius: 0 0 10px 0;cursor: pointer;position: fixed;top:60px;"
        @click="text1">测试一</div>
    <div class="btn" style="width: 50px;
    height: 20px; background-color: #e28686;border-radius: 0 0 10px 0;cursor: pointer;position: fixed;top:90px;"
        @click="text2">测试二</div>

    <!-- 设置cookie -->
    <transition name="fade" mode="out-in">
        <div class="setting-cookie-outer" v-if="useMusic.music.isSettingCookie">
            <div class="setting-cookie">
                <SetCookie></SetCookie>
            </div>
        </div>
    </transition>

    <!-- 大盒子 -->
    <div class="bg">
        <!-- 盒子布局 -->
        <div class="box" style="display: flex;width: 80%; height: 90vh;">
            <!-- 左侧音乐导航栏 -->
            <div class="left" style="width: 230px;height: 100%;">
                <div class="nav-head" style="width: 100%;
                height: 60px;display: flex;justify-content: center;align-items: center;">
                    <span>My Music</span>
                </div>
                <div class="nav-content">
                    <div class="def-nav-item" v-for="(item, index) in defNavData" :index="index" :key="item.id">
                        <h2>{{ item.title }}</h2>
                        <ul>
                            <li v-for="(childItem, index) in item.child" :key="childItem.path"
                                :class="childItem.cid == isActiveNav ? 'nav-Active' : ''" @click="navSel(childItem)"><span
                                    :class="`iconfont icon-${childItem.icon}`"></span>{{ childItem.title }}</li>
                        </ul>
                    </div>
                    <div class="nav-item" v-for="(item, index) in navData" :index="index" :key="item.id">
                        <h2>{{ item.title }}<span
                                :class="!item.isClose ? 'iconfont icon-xiangshang' : 'iconfont icon-xiangxia'"
                                @click="navClose(item)"></span></h2>
                        <ul :class="item.isClose ? 'nav-close' : ''">
                            <li v-for="(childItem, index) in item.child"
                                :class="childItem.cid == isActiveNav ? 'nav-Active' : ''" @click="navSel(childItem)">{{
                                    childItem.title || childItem.dissname }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 右侧主要内容 -->
            <div class="right"
                style="flex:1;display: flex;flex-direction: column;justify-content: space-between;height: 100%;"
                @mousemove="moveProgress" @mouseup="leaveProgress" @mouseleave="leaveProgress">
                <!-- 头部 -->
                <div class="head" style="width: 100%;height: 60px;display: flex;position: relative;z-index: 2;">
                    <div class="head-left" style="width: 700px;height: 100%;display: flex;z-index: 99;">
                        <div class="routerControl" style="width: 100px;height: 100%;display: flex;align-items: center;">
                            <span class="iconfont icon-xiangzuo" style="margin: 0 10px;margin-top: 10px;padding: 10px;"
                                title="后退" @click="router.back();"></span>
                            <span class="iconfont icon-xiangyou" style="margin: 0 -5px;margin-top: 10px;padding: 10px;"
                                title="前进" @click="router.forward()"></span>
                        </div>
                        <div class="search"
                            style="flex:1;height: 100%;display: flex;justify-content: center;align-items: center;">
                            <input type="text" class="searchContent" autocomplete="off" v-model="inputValue"
                                :placeholder="placeholder" @focus="focusSearch" @blur="blurSearch">
                            <span class="iconfont icon-sousuo"></span>
                            <div class="search-kuang" :class="{ 'isSearchKuang': isSearchKuang }"
                                @click="handleHistoryItemClick()">
                                <div class="hisSearch">
                                    <span>历史搜索</span><span class="iconfont icon-shanchu"></span>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="head-right" style="flex:1;">
                        <div class="right-content">
                            <span class="iconfont icon-cloud"></span>
                            <span class="iconfont icon-tongzhi"></span>
                        </div>
                        <div class="image" :class="{ imageActive: imageActive }" @mouseleave="hidden">
                            <div class="imgOuter" @mouseenter="show" :class="{ 'nocookie': !useMusic.music.hasCookie }">
                                <img src="../assets/images/1.jpg" alt="">
                            </div>
                            <div class="imgInfo" @mouseenter="show">
                                <div class="imgInfo-name" style="width: 80%;height: 60px;margin-left: 10%;">
                                    <h2>柊筱娅</h2>
                                </div>
                                <div class="imginfo-content">
                                    <div class="imginfo-contentnav" @click="changeSettingCookie">
                                        <div class="setting" :class="!useMusic.music.hasCookie ? 'noCookie' : ''"
                                            :title="!useMusic.music.hasCookie ? '记得设置cookie' : ''"><span
                                                class="iconfont icon-shouzhi imginfo-contentnav-font"></span>Cookie
                                        </div>
                                    </div>
                                    <div class="imginfo-contentnav" @click="router.push('/music/log')">
                                        <div class="log"><span
                                                class="iconfont icon-rizhi imginfo-contentnav-font"></span>Mylog
                                        </div>
                                    </div>
                                    <div class="imginfo-contentnav" @click="router.push('/music/about')">
                                        <div class="about"><span
                                                class="iconfont icon-guanyu imginfo-contentnav-font"></span>About
                                        </div>
                                    </div>
                                </div>
                                <div class="toQQ-line">
                                    <div class="imginfo-contentnav">
                                        <div class="toQQ" @click="toQQmusic"><span
                                                class="iconfont icon-tiaozhuan imginfo-contentnav-font"></span>QQmusic
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 主要内容 -->
                <div class="content">
                    <div class="hisList" :class="{ 'open': isOpen }">
                        <HisList></HisList>
                    </div>
                    <index id="index"></index>
                </div>
                <!-- 音乐播放 -->
                <div class="footer" style="width: 100%;height: 80px;">
                    <div class="progress" style="user-select: none;">
                        <div class="progressBox" @mousedown="downProgress">
                            <div class="progressBar" :style="`width: ${num}%;`"></div>
                        </div>
                        <!-- <el-progress :percentage="num" :color="customColor" :show-text="false"/> -->
                    </div>
                    <div class="foot-body">
                        <div class="f-left">
                            <div class="f-image">
                                <img :src="songData.cover" alt="">
                            </div>
                            <div class="f-info">
                                <span class="name" :title="songData.name">{{ songData.name }}</span>
                                <span class="artist" :title="songData.artist">{{ songData.artist }}</span>
                            </div>
                        </div>
                        <div class="f-center">
                            <!-- 单曲循环，顺序播放，随机播放 -->
                            <div class="audioModel" @click="changePlayModel">
                                <span v-if="playModel == 'loop'" class="iconfont icon-loop" title="顺序播放"></span>
                                <span v-else-if="playModel == 'random'" class="iconfont icon-random" title="随机播放"></span>
                                <span v-else-if="playModel == 'singLoop'" class="iconfont icon-singLoop"
                                    title="单曲循环"></span>
                            </div>
                            <div class="last" @click="lastSong">
                                <div class="leftline"></div>
                                <div class="inner"></div>
                            </div>
                            <div class="middle" @click="changePlay">
                                <div class="stop" v-if="isplay">
                                    <div class="line1"></div>
                                    <div class="line2"></div>
                                </div>
                                <div class="continue" v-else></div>
                            </div>
                            <div class="next" @click="nextSong">
                                <div class="inner"></div>
                                <div class="leftline"></div>
                            </div>
                            <!-- 音量控制 -->
                            <span class="iconfont icon-sound" title="音量"></span>
                        </div>
                        <div class="f-right">
                            <div class="f-control">
                                <div class="f-time" style="user-select: none;">
                                    {{ timeFormat(currentTime) }} / {{ timeFormat(duration) }}
                                </div>
                                <span class="iconfont icon-liebiao" @click="isOpen = !isOpen"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import Snow from '../components/Snow.vue';
import SetCookie from '../components/SetCookie.vue';
import index from '../components/Mindex.vue';
import HisList from '../components/hisList.vue';
import { musicPlayer } from '../music/musicPlayer';

import {
    getUserDetail,                  // 获取我的主页详情                                                    uin
    setCookie,                      //                                                                   cookie
    getuin,                         // 获取qq号                                                           无
    getCookie,                      // 查看cookie                                                         无
    getSong,                        // 获取一首歌的播放地址                                                songmid
    getSongList,                    // 获取我创建的歌单                                                    uin
    getSongDetail,                  // 获取单个歌曲详情                                                    songmid
    getSongColist,                  // 获取我收藏的歌单                                                    uin
    createSongList,                 // 创建歌单                                                           name
    getRecommond,                   // 日推                                                               无
    getCategory,                    // 获取歌单分类                                                        无
    getReSongList,                  // 根据分类获取歌单                                                    id
    getBanner,                      // 轮播图           目测没什么用，可能会删除                            无
    getSongMap,                     // 获取我歌单里面的歌曲（不包括我收藏的歌单）       默认我喜欢          dirid
    getSongListDel,                 // 根据收藏歌单里面的dissid来查询歌单                                 dissid
    getNewSong,                     // 获取最新歌曲 0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    getNewAlbum,                    // 获取最新专辑 0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    getNewMV,                       // 获取最新MV   0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    search,                         // 搜索，我设置了三个参数，第一个是key关键词，第二个是type类型，第三个是pageNum第几页
} from '../api/request';

import { ref, reactive, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useStore from '../store/index';
import { storeToRefs } from "pinia"
import { debounce } from 'lodash';          // 防抖
import songlist from 'qq-music-api/routes/songlist';

const useMusic = useStore()
const router = useRouter()
const route = useRoute()
// 解构pinia里的方法
const { changeSettingCookie, getSongData, setSongmid, addSongList, getSongPlayList } = useMusic.music
const { changePlay, changePlayModel } = useMusic.musicPlay
// 响应式解构pinia里面的参数
const { num, playModel, isplay, toNext } = storeToRefs(useMusic.musicPlay)
const { uin, songmid, nextSongmid } = storeToRefs(useMusic.music)

// 被选中的菜单
let isActiveNav = ref(1)

// 选择菜单显示高亮和路由切换以及传递我的歌单与收藏歌单参数
const navSel = (item) => {
    // isActiveNav.value = item.cid
    if (item.dissname) {
        router.push({
            name: item.name,
            params: {
                dissid: item.dissid
            }
        })
    } else if (item.dirid) {
        router.push({
            name: item.name,
            params: {
                dissid: item.dissid
            }
        })
    } else {
        router.push(item.path)
    }
}
// 歌单的展开与关闭
const navClose = (item) => {
    item.isClose = !item.isClose
}
// 默认的菜单数据
const defNavData = ref([
    {
        id: 1,
        title: '推荐音乐',
        child: [
            {
                cid: 1,
                title: '推荐',
                icon: 'tuijian',
                path: '/music'
            },

            {
                cid: 2,
                title: '音乐馆',
                icon: 'yinyueguan',
                path: '/music/archive'
            },

            {
                cid: 3,
                title: '视频',
                icon: 'shipin',
                path: '/music/video'
            },
        ]
    },
    {
        id: 2,
        title: '我的音乐',
        child: [
            {
                cid: 4,
                title: '我喜欢',
                icon: 'woxihuan',
                path: '/music/fevorite'
            },

            {
                cid: 5,
                title: '本地和下载',
                icon: 'bendi',
                path: '/music/download'
            },
            {
                cid: 6,
                title: '播放列表',
                icon: 'liebiao',
                path: '/music/playlist'
            },
            {
                cid: 7,
                title: '最近播放',
                icon: 'zuijin',
                path: '/music/recently'
            },
        ]
    },
])
// 我的歌单和收藏歌单菜单栏
const navData = ref([
    {
        id: 3,
        title: '我的歌单',
        isClose: false,
        child: [],
    },
    {
        id: 4,
        title: '收藏歌单',
        isClose: false,
        child: [],
    },
])
// 创建一个根据当前dissid获取一个songListData，用于播放器在不进入歌单页面时得播放逻辑
const songListData = reactive([])
// 根据当前dissid获取列表
const getData = async () => {
    const detail = await getSongListDel(useMusic.music.songPlayList.thedissid)
    songListData.value = detail.songlist
}
// 输入框
let placeholder = ref('搜索')
// 记录输入框的文字 ======================================================
const inputValue = ref('')
// 是否显示搜索框
let isSearchKuang = false
// 是否开启历史播放列表
const isOpen = ref(false)
// 聚焦时，搜索框占位文字消失
const focusSearch = () => {
    isSearchKuang = true
    placeholder.value = ''
}
// 失去焦点时，搜索框占位文字出现
const blurSearch = () => {
    isSearchKuang = false
    placeholder.value = '搜索'
}
// 历史搜索的逻辑
const handleHistoryItemClick = () => {      //==============================
    console.log('111111111');
}
// 移动到顶部头像之后的展出
let imageActive = ref(false)
// 以下是防抖
let timer
// 展出了
const show = () => {
    clearTimeout(timer)
    imageActive.value = true
}
// 过一段时间之后收起来
const hidden = () => {
    timer = setTimeout(() => {
        imageActive.value = false
    }, 800)
}

// 跳转到qq音乐
const toQQmusic = () => {
    // window.location.href('https://y.qq.com/')
    window.open('https://y.qq.com/', '_blank');
}
// 测试
const fanhui = () => {
    // router.push('/home')
    console.log(useMusic.music.songPlayList.list);
    console.log(hisList);
    console.log('hisIndex:' + hisIndex);
    console.log(nextSongmid.value);
    console.log('=============');
}

const text1 = () => {
    musicPlayer.play()
    console.log('我点了');
}

const text2 = async () => {
    // 日推
    // const li = await getRecommond()
    // 获取歌单分类
    // const li=await getCategory()
    // 根据分类获取歌单
    // const li=await getReSongList(39)
    // 轮播图           目测没什么用，可能会删除
    // const li=await getBanner()
    // 获取我创建的歌单
    const li = await getSongList(1538518479)
    // 获取我歌单里面的歌曲（不包括我收藏的歌单）
    // const li=await getSongMap(14)
    // 根据歌单里面的dissid来查询歌单
    // const li=await getSongListDel(2624033848)
    // 获取最新歌曲
    // const li=await getNewSong(0)
    // 获取最新专辑
    // const li=await getNewAlbum(0)
    // 获取最新MV
    // const li=await getNewMV(0)

    // 搜索（大概率用不了）
    // const li = await search('夜空中最亮的星')
    // 查看用户cookie
    // const li = await getCookie()
    // const li = await getUserDetail(1538518479)
    console.log('结束');
    console.log(li);
    musicPlayer.pause()
}



// 之前的音乐播放器控制逻辑
// 使用reactive创建一个可相应的对象
const songData = reactive({
    name: '',
    artist: '',
    url: '',
    cover: '',
    lyc: '',
})

// 创建一个方法，可以将pinia里面的songmid转换成歌曲信息
const getSongDataInfo = async (id) => {
    const thesongmid = id
    // 获取播放地址
    const playInfo = await getSong(thesongmid)
    // 获取songData数据
    const detail = await getSongDetail(thesongmid)
    let cover = ''
    if (detail.track_info.album.mid) {
        // 这个获取的是封面图片
        cover = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${detail.track_info.album.mid}.jpg`
    } else if (detail.track_info.vs[1]) {
        // 这个获取的是不知道啥图片
        cover = `https://y.qq.com/music/photo_new/T062R300x300M000${detail.track_info.vs[1]}.jpg?max_age=2592000`
    } else {
        // 这个获取的是歌手图片
        cover = `https://y.qq.com/music/photo_new/T001R300x300M000${detail.track_info.singer[0].mid}.jpg?max_age=2592000`
    }
    songData.name = detail.extras.transname ? detail.extras.name + "(" + detail.extras.transname + ")" : detail.extras.name
    songData.url = playInfo[thesongmid]
    songData.artist = detail.track_info.singer[0].title
    songData.cover = cover
}

// 创建一个方法，作用是在页面刚加载的时候加载一首歌曲       ======================================
const loadSong = async (songmid) => {
    // 获取当前歌曲信息
    await getSongDataInfo(songmid)
    // 添加一个歌曲到播放列表
    addSongList()
    // // lastIndex严格来说就是当前正在播放的的历史播放index
    // lastIndex = hisIndex
    // 初始化音乐播放器
    musicPlayer.loadSong(songData).then(() => {
        console.log('歌曲加载完成');
        duration.value = musicPlayer.getDuration()
        musicPlayer.audio.addEventListener('timeupdate', onTimeUpdate.bind(this));
        musicPlayer.audio.addEventListener('ended', songEnded.bind(this));
    }).catch(err => {
        console.log('歌曲加载失败');
    })
}

// 创建一个历史列表，用于播放器的上一曲下一曲的历史记录=============未完成==============
// 记录一下这个播放器的历史记录歌曲的index
let hisList = []
// 这玩意接受的才是下一首播放的index是否存在于hisList
let hisIndex = 0

// 创建一个方法，作用是回到上一首歌曲，需要防抖
const lastSong = debounce(async () => {
    isplay.value = false
    // 更新hisIndex
    hisIndex = hisList.findIndex(item => item == songmid.value)
    console.log(hisIndex);
    let lastSongmid = ''
    if (hisIndex == 0) {
        // 处理历史播放的上一曲，假如列表里面没有上一曲，就需要随机一首歌单里面的歌曲=========
        if (playModel.value == 'loop') {
            console.log(songListData);
            lastSongmid = songListData.value[songListData.value.length - 1].songmid
        } else {
            lastSongmid = nextSongmid.value
        }
    } else {
        lastSongmid = hisList[hisIndex - 1]
    }
    songmid.value = lastSongmid
    await loadSong(lastSongmid)
    isplay.value = true
    if (hisIndex == 0) {
        // 然后添加歌曲到历史记录里面
        hisList.unshift(lastSongmid)
    }
    // 更新hisIndex
    hisIndex = hisList.findIndex(item => item == songmid.value)
    setSongmid()
    nextSongSel()
}, 200); // 设置防抖延迟时间，单位为毫秒

// 创建一个历史播放列表的添加方法
const addHisList = (songMid) => {
    console.log(hisIndex);
    // 这个时候的songmid是已经添加之后的新歌曲，但是hisIndex还是之前的，判断历史列表是否存在这个新的歌曲，如果已经存在过了，则判断是在hisIndex的前面还是后面
    const index = hisList.findIndex(item => item == songMid)
    console.log(index);
    // 如果是历史列表里面的歌曲，并且历史列表里的歌曲是旧的在前，添加的在后，为了防止修改后index变化导致增加删除出现问题，所以
    // 当index>hisIndex的时候，先删除，再增加
    if (index != -1 && index > hisIndex) {
        hisList.splice(index, 1)
        if (hisIndex == hisList.length - 1) {
            hisList.push(songMid)
        } else {
            hisList.splice(hisIndex + 1, 0, songMid)
        }
        // 这里相反，当index<=hisIndex的时候，先增加再删除
    } else if (index != -1 && index <= hisIndex) {
        if (hisIndex == hisList.length - 1) {
            hisList.push(songMid)
        } else {
            hisList.splice(hisIndex + 1, 0, songMid)
        }
        hisList.splice(index, 1)

        // 在或者，如果历史播放里面没有，那就直接在原歌曲后面添加一首
    } else if (index == -1) {
        if (hisIndex == hisList.length - 1) {
            hisList.push(songMid)
        } else {
            hisList.splice(hisIndex + 1, 0, songMid)
        }
    }
}

// 创建一个方法，作用是加载下一首歌曲，需要防抖（单纯的接收到来的数据播放下一首歌曲，不包含下一首的播放逻辑）
const nextSong = debounce(async () => {
    console.log(toNext.value);
    isplay.value = false
    // 更新hisIndex的值
    console.log('长度：' + hisList.length);
    hisIndex = hisList.findIndex(item => item == songmid.value)
    let nextSongMid = ''
    if (hisIndex == hisList.length - 1 || toNext.value) {               // 匪夷所思啊这里
        console.log('按下一首歌曲播放');
        nextSongMid = nextSongmid.value
        // 然后添加歌曲到历史记录里面
        addHisList(nextSongMid)                                                 //=====
    } else {
        console.log('按播放器顺序播放');
        nextSongMid = hisList[hisIndex + 1]
    }
    // 同步pinia里面songmid的数据
    songmid.value = nextSongMid
    // 播放器加载歌曲
    await loadSong(nextSongMid)
    // // 然后把歌曲添加到歌曲列表
    // addSongList(nextSongMid)
    // 加载时候播放
    hisIndex = hisList.findIndex(item => item == songmid.value)
    isplay.value = true
    // 保证只要使用了nextsong加载歌曲，那么在本地的songmid就一定与当前播放器的歌曲一致
    setSongmid()
    nextSongSel()
}, 200)

// 创建方法，展示下一个需要播放的歌曲，这里需要联系随机播放，顺序播放还是单曲循环
const nextSongSel = () => {
    const index = songListData.value.findIndex(item => item.songmid == songmid.value)
    if (playModel.value == 'loop') {
        if (index == songListData.value.length - 1) {
            nextSongmid.value = songListData.value[0].songmid
        } else {
            nextSongmid.value = songListData.value[index + 1].songmid
        }
    } else if (playModel.value == 'random') {
        let num = Math.floor(Math.random() * songListData.value.length)
        if (num == index) {
            num = Math.floor(Math.random() * songListData.value.length)
        }
        nextSongmid.value = songListData.value[num].songmid
    } else if (playModel.value == 'singLoop') {
        nextSongmid.value = songmid.value
    }
}

// 歌曲总时长
let duration = ref(0)
// 歌曲播放事件
let currentTime = ref(0)
// 进度条是否可拖动        
const isMove = ref(false)

// 处理 timeupdate 事件 当歌曲播放时，更新currentTime数据
const onTimeUpdate = () => {
    // 在这里执行与播放进度相关的操作
    if (!isMove.value) {
        currentTime.value = musicPlayer.getCurrentTime();
        num.value = currentTime.value / duration.value * 100
    }
}

// 处理ended事件，当歌曲播放完毕之后的操作逻辑              需要随机播放，顺序播放，单曲循环
const songEnded = () => {
    num.value = 0
    nextSong()
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

// 以下是拖动进度条的操作================================================
// 进度条的拖动，当我按下时，进度条可拖动
const getPer = (e) => {
    const left = document.querySelector('.progressBox')
    // 获取进度条宽度
    const pwidth = left.getBoundingClientRect().right - left.getBoundingClientRect().left
    const newTime = (e.clientX - left.getBoundingClientRect().left) / pwidth * 100
    return newTime
}
const downProgress = (e) => {
    const newTime = getPer(e)
    num.value = newTime
    isMove.value = true
}
// 当鼠标放到进度条上的操作
const moveProgress = (e) => {
    if (isMove.value) {
        const newTime = getPer(e)
        num.value = newTime
    }
}
// 鼠标松开后，进度条不可拖动
const leaveProgress = () => {
    if (isMove.value) {
        musicPlayer.setCurrentTime(num.value * duration.value / 100)
        isMove.value = false
    }
}

// 以下是音乐方法======================================
// 这个方法是为了获取我的歌单和收藏歌单的数据
const SongList = async (uin) => {
    // 获取的是我创建的歌单
    // const resSongList = await getSongList(uin)
    const resSongList = await getUserDetail(uin)
    // 获取的是我收藏的歌单
    const resSongColist = await getSongColist(uin)
    // 左侧我的菜单的唯一标识id
    let cid = 8
    for (let i = 0; i < resSongList.mydiss.list.length; i++) {
        if ((i + 1) > resSongList.mydiss.list.length) {
            // if ((i + 4) > resSongList.mydiss.list.length) {
            break
        }
        navData.value[0].child.push({ ...resSongList.mydiss.list[i], cid: cid, path: '/music/songList', name: 'SongList' })
        // navData.value[0].child.push({ ...resSongList.list[i+3], cid: cid, path: '/music/songList', name: 'SongList' })
        // navData.value[0].child[i+3].id=id
        cid++
    }
    for (let i = 0; i < resSongColist.list.length; i++) {
        navData.value[1].child.push({ ...resSongColist.list[i], cid: cid, path: '/music/songColist', name: 'SongColist' })
        cid++
    }
}

// 监听toNext的变化
watch(toNext, async (newValue) => {
    if (newValue) {
        await nextSong()
        // 把播放下一首的信号给关闭
        toNext.value = false
    }
})

// 监听stop的变化，音乐的暂停与播放
watch(isplay, (newValue) => {
    if (newValue === true) {
        musicPlayer.play()
    } else {
        musicPlayer.pause()
    }
})

// 监听路由的变化，使路由导航目录与左侧菜单一致
watch(route, (to, from, next) => {
    const Arr = [...defNavData.value[0].child, ...defNavData.value[1].child, ...navData.value[0].child, ...navData.value[1].child]
    const index = Arr.findIndex(item => {
        if (item.dissid) {
            return item.dissid == to.params.dissid
        }
        else {
            return item.path == to.path
        }
    })
    isActiveNav.value = index + 1
})

// 监听播放模式的变化
watch(playModel, () => {
    nextSongSel()
})

// 监听目前播放歌单的变化
watch(useMusic.music.songPlayList, () => {
    nextSongSel()
})

// 挂载的时候
onMounted(async () => {
    // 目前为止，播放器挂载的时候需要进行的操作有：
    // 将路由跳转到推荐页面
    router.push('/music')
    // 验证一下是否是登录状态
    getCookie().then((data) => {
        if (Object.keys(data).length === 0) {
            console.log('啦啦啦，请输入cookie');
            useMusic.music.hasCookie = false
        }
    })
    // 获取本地歌曲
    getSongData()
    // 获取播放器近10条播放记录
    getSongPlayList()
    hisList = [...useMusic.music.songPlayList.list]
    hisIndex = hisList.findIndex(item => item == songmid.value)
    // 加载当前播放器的歌曲
    loadSong(songmid.value)
    // 获取我的歌单
    SongList(uin.value)
    // 获取当前播放器的所对应的歌单
    await getData()
    // 根据播放模式决定下一首歌是什么
    nextSongSel()
})

</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');


#snow {
    position: fixed;
    z-index: -1;
    opacity: 0.6;
}

.setting-cookie-outer {
    z-index: 99;
    width: 100%;
    height: 110vh;
    position: fixed;
    background-color: #1d161669;
    backdrop-filter: blur(3px);

    .setting-cookie {
        width: 500px;
        height: 300px;
        border: 1px solid #cfaeae;
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        overflow: hidden;
    }
}

.bg {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {

        .left {
            border-right: 1px solid rgb(176, 173, 173);
            box-sizing: border-box;
            backdrop-filter: blur(6px);
            background-color: #2e294e47;
            overflow: hidden;
            font-family: 'myfont';

            .nav-head {
                box-sizing: border-box;
                font-size: 26px;
                font-weight: 200;
                letter-spacing: 0.2ch;
                user-select: none;
                border-bottom: 1px solid rgb(176, 173, 173);
            }

            .nav-content {
                width: 100%;
                height: calc(90vh - 60px);
                margin-left: 10px;
                overflow: auto;
                padding: 0 10px;

                .def-nav-item {
                    // margin: 10px 0 20px -20px;
                    width: 90%;

                    h2 {
                        user-select: none;
                        margin: 20px -5px;
                        font-size: 14px;
                        font-weight: 100;
                    }

                    ul {
                        transition: 0.3s;

                        li {
                            width: 170px;
                            padding: 17px 10px;
                            cursor: pointer;

                            span {
                                margin-right: 8px;
                            }

                            &:hover {
                                transition: 0.4s;
                                border-radius: 10px;
                                box-shadow: 0 0 6px #02020242;
                            }
                        }
                    }

                }

                .nav-item {
                    width: 90%;
                    margin-bottom: 10px;

                    h2 {
                        user-select: none;
                        margin: 20px -5px;
                        font-size: 14px;
                        font-weight: 100;

                        span {
                            margin-left: 120px;
                            cursor: pointer;
                            color: #02020242;

                            &:hover {
                                color: #020202;
                            }
                        }
                    }

                    ul {
                        transition: 0.3s;

                        li {
                            width: 170px;
                            padding: 17px 10px;
                            cursor: pointer;
                            font-size: 15px;
                            font-weight: 100;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;

                            &:hover {
                                transition: 0.4s;
                                border-radius: 10px;
                                box-shadow: 0 0 6px #02020242;
                            }
                        }
                    }
                }

                .nav-Active {
                    transition: 0.3s;
                    background-color: #d694e91c;
                    border-radius: 10px;
                    box-shadow: 0 0 6px #02020242;
                }

                .nav-close {
                    transition: 0.3s;
                    height: 0px;
                    overflow: hidden;
                }
            }
        }

        .right {
            font-family: 'myfont';

            .head {
                box-sizing: border-box;
                // border: 1px solid #76e1cf;
                backdrop-filter: blur(6px);
                background-color: #2e294e47;
                border-bottom: 1px solid rgb(176, 173, 173);

                .head-left {
                    .routerControl {
                        .icon-xiangzuo {
                            cursor: pointer;
                            color: #333;

                            &:hover {
                                color: rgb(0, 0, 0)
                            }
                        }

                        .icon-xiangyou {
                            cursor: pointer;
                            color: #333;

                            &:hover {
                                color: rgb(0, 0, 0)
                            }
                        }
                    }

                    .search {
                        .searchContent {
                            transition: 0.3s;
                            width: 250px;
                            height: 25px;
                            border-radius: 20px;
                            border: none;
                            padding: 5px 20px;
                            background-color: #ffffff1f;
                            border: 1px solid rgba(60, 56, 56, 0.348);
                            color: #333;
                            margin-left: 30px;
                            margin-top: 10px;
                            box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.538);

                            &::placeholder {
                                color: #333
                            }
                        }

                        .icon-sousuo {
                            color: #333;
                            margin-top: 10px;
                            margin-left: 10px;
                            font-size: 18px;
                            cursor: pointer;

                            &:hover {
                                color: rgb(0, 0, 0)
                            }
                        }


                        .search-kuang {
                            transition: 0.3s;
                            box-sizing: border-box;
                            position: fixed;
                            width: 300px;
                            height: 0;
                            top: 60px;
                            border-radius: 0 0 10px 10px;
                            background-color: #ffffffe7;
                            backdrop-filter: blur(10px);
                            overflow: hidden;
                            z-index: 100;

                            .hisSearch {
                                position: relative;
                                left: 15px;
                                width: 90%;
                                padding: 12px;
                                box-sizing: border-box;
                                display: flex;
                                justify-content: space-between;
                                border-bottom: 1px solid rgba(0, 0, 0, 0.707);

                                span {
                                    font-size: 14px;
                                    color: #33333398
                                }

                                .icon-shanchu {
                                    cursor: pointer;
                                }
                            }
                        }

                        .isSearchKuang {
                            width: 300px;
                            height: 100px;
                            box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.538);
                            display: inline-block;
                        }
                    }
                }

                .head-right {
                    box-sizing: border-box;
                    // border-left: 1px solid black;
                    display: flex;
                    justify-content: end;
                    align-items: center;

                    .right-content {
                        margin-top: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        span {
                            margin: 0 10px;
                            color: #333;
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }

                    .image {
                        transition: 0.3s;
                        width: 60px;
                        height: 60px;
                        margin-right: 20px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;

                        .imgOuter {
                            z-index: 1;
                            width: 80%;
                            height: 80%;
                            background-color: #a18aa5;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 90%;
                                height: 90%;
                                border-radius: 50%;
                            }
                        }

                        .nocookie {
                            background-color: #db151589;
                        }

                        .imgInfo {
                            transition: 0.3s;
                            position: fixed;
                            width: 0;
                            height: 0;
                            backdrop-filter: blur(6px);
                            background-color: #2e294e47;
                            margin-top: 0px;
                            border-radius: 10px;
                            box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.538);
                            overflow: hidden;

                            .imgInfo-name {
                                opacity: 0;
                                box-sizing: border-box;
                                border-bottom: 2px solid #333;
                                padding: 20px 0;

                                h2 {
                                    font-size: 24px;
                                }
                            }


                            .imginfo-contentnav {
                                opacity: 0;
                                width: 100%;
                                box-sizing: border-box;
                                padding: 8px;

                                // background-color: #fff;
                                .imginfo-contentnav-font {
                                    font-size: 22px;
                                    margin-right: 50px;
                                }

                                &:hover {
                                    border-radius: 10px;
                                    background-color: #d694e91c;
                                    box-shadow: inset 0 0 6px #02020242;
                                }
                            }



                            .imginfo-content {
                                width: 80%;
                                height: 160px;
                                margin-left: 10%;
                                // background-color: #fff;
                                margin-top: 20px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-evenly;
                                align-items: start;
                            }

                            .noCookie {
                                color: #db151589;
                            }

                            .toQQ-line {
                                opacity: 0;
                                width: 80%;
                                margin-left: 10%;
                                height: 20px;
                                // margin-top: 18px;
                                padding: 10px 0;
                                border-top: 2px solid #333;
                            }
                        }
                    }

                    .imageActive {
                        transition: 0.3s;
                        width: 130px;
                        height: 130px;
                        margin-top: 80px;

                        .imgOuter {
                            z-index: 100;
                        }

                        .imgInfo {
                            transition: 0.3s;
                            z-index: 99;
                            display: block;
                            margin-top: 200px;
                            position: fixed;
                            width: 200px;
                            height: 300px;
                            margin-top: 300px;
                            margin-right: 100px;
                            background-color: #ffffffe7;
                            backdrop-filter: blur(10px);

                            .imgInfo-name {
                                transition: 0.8s 0.1s;
                                opacity: 1;
                            }

                            .imginfo-contentnav {
                                transition: 0.8s 0.1s;
                                opacity: 1;
                            }

                            .toQQ-line {
                                transition: 0.8s 0.1s;
                                opacity: 1;
                            }
                        }
                    }
                }
            }

            .content {
                box-sizing: border-box;
                position: relative;
                // backdrop-filter: blur(6px);
                // background-color: #2E294Ea0;
                width: 100%;
                height: calc(100% - 140px);

                .hisList {
                    transition: 0.3s;
                    position: absolute;
                    width: 0px;
                    height: 100%;
                    right: 0px;
                    bottom: 0px;
                    box-sizing: border-box;
                    z-index: 1;
                    opacity: 0;
                }

                .open {
                    width: 300px;
                    opacity: 1;
                }
            }

            .footer {
                border-top: 1px solid rgb(176, 173, 173);
                box-sizing: border-box;
                backdrop-filter: blur(6px);
                background-color: #2e294e47;
                display: flex;
                flex-direction: column;

                .progress {
                    width: 100%;
                    height: 8px;

                    .progressBox {
                        width: 100%;
                        height: 8px;
                        background-color: #ffffff25;
                        cursor: pointer;

                        .progressBar {
                            transition: 0.3s;
                            height: 8px;
                            background-color: #cdbfe9;
                        }
                    }
                }

                .foot-body {
                    width: 100%;
                    flex: 1;
                    display: flex;

                    .f-left {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;

                        .f-image {
                            width: 60px;
                            height: 60px;
                            margin-right: 10px;
                            margin-left: 30px;
                            border-radius: 5px;
                            overflow: hidden;

                            img {
                                width: 100%;
                                height: 100%;
                                cursor: pointer;
                            }
                        }

                        .f-info {
                            width: 250px;
                            height: 100%;
                            display: flex;
                            flex-direction: column;

                            .name {
                                margin-top: 13px;
                                font-size: 17px;
                                font-weight: 500;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            }

                            .artist {
                                margin-top: 7px;
                                font-size: 14px;
                                font-weight: 100;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            }
                        }
                    }

                    .f-center {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .last {
                            width: 35px;
                            height: 35px;
                            cursor: pointer;
                            border-radius: 12px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-left: 15px;

                            .inner {
                                width: 0;
                                height: 0;
                                border-top: 12px solid transparent;
                                border-bottom: 12px solid transparent;
                                border-right: 18px solid #ffffffc7;
                                display: inline-block;
                            }

                            .leftline {
                                width: 3px;
                                height: 17px;
                                background-color: #ffffffc7;
                                border-radius: 3px;
                            }

                            &:hover {

                                .inner {
                                    border-right: 18px solid #ffffff;
                                }

                                .leftline {
                                    background-color: #ffffff;
                                }
                            }

                            &:active {

                                .inner {
                                    transform: translateY(1px);
                                }

                                .leftline {
                                    transform: translateY(1px);
                                }
                            }
                        }

                        .middle {
                            width: 50px;
                            height: 50px;
                            cursor: pointer;
                            box-shadow: 0px 0px 5px 1px #ffffff;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0 20px;

                            .stop {
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                .line1 {
                                    transition-duration: 0.3s;
                                    width: 7px;
                                    height: 25px;
                                    background-color: #ffffffc7;
                                    border-radius: 4px;
                                }

                                .line2 {
                                    transition-duration: 0.3s;
                                    margin-left: 5px;
                                    width: 7px;
                                    height: 25px;
                                    background-color: #ffffffc7;
                                    border-radius: 4px;
                                }
                            }

                            &:hover {
                                .line1 {
                                    transition-duration: 0.3s;
                                    background-color: #ffffff;
                                }

                                .line2 {
                                    transition-duration: 0.3s;
                                    background-color: #ffffff;
                                }

                                .continue {
                                    transition-duration: 0.2s;
                                    border-left: 22px solid #ffffff;
                                }
                            }

                            .continue {
                                transition-duration: 0.3s;
                                width: 0;
                                height: 0;
                                border-top: 14px solid transparent;
                                border-bottom: 14px solid transparent;
                                border-left: 22px solid #ffffffc7;
                                display: inline-block;
                                margin-left: 5px;
                            }
                        }

                        .next {
                            width: 35px;
                            height: 35px;
                            cursor: pointer;
                            border-radius: 12px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 15px;

                            .inner {
                                width: 0;
                                height: 0;
                                border-top: 12px solid transparent;
                                border-bottom: 12px solid transparent;
                                border-left: 18px solid #ffffffc7;
                                display: inline-block;
                            }

                            .leftline {
                                width: 3px;
                                height: 17px;
                                background-color: #ffffffc7;
                                border-radius: 3px;
                            }


                            &:hover {

                                .inner {
                                    border-left: 18px solid #ffffff;
                                }

                                .leftline {
                                    background-color: #ffffff;
                                }
                            }

                            &:active {

                                .inner {
                                    transform: translateY(1px);
                                }

                                .leftline {
                                    transform: translateY(1px);
                                }
                            }
                        }

                        .iconfont {
                            cursor: pointer;
                            font-size: 18px;
                            color: #222;

                            &:hover {
                                color: #000
                            }
                        }
                    }

                    .f-right {
                        flex: 1;

                        .f-control {
                            margin-top: 30px;
                            width: 100%;
                            display: flex;
                            justify-content: end;
                            align-items: center;

                            .icon-liebiao {
                                margin-right: 30px;

                                &:hover {
                                    cursor: pointer;
                                }
                            }

                            .f-time {
                                margin-right: 10px;
                            }

                            span {
                                font-size: 18px;
                                color: #222;

                                &:hover {
                                    color: #000
                                }

                                &:active {
                                    transform: translateY(1px);
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