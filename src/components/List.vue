<template>
    <div>
        <div class="tag" v-if="!isMainSong">
            <span>歌曲</span>
            <span @click="console.log(listData)">歌手</span>
            <span>时长</span>
            <span>专辑</span>
            <div class="sort" @click="handleClickOutside">
                <span @click="changeSortVisiable" style="user-select: none;" v-html="`排序：${typename}`"></span>
                <div class="sel" :class="sortVisiable ? '' : 'noVisiable'" ref="dropdown">
                    <span @click="sort(0)">默认</span>
                    <span @click="sort(1)">歌曲名</span>
                    <span @click="sort(2)">歌手</span>
                    <span @click="sort(3)">专辑</span>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item, index) in listData" :key="index">
                <div class="item main" v-if="isMainSong && index == 0">
                    <div class="img" @click="router.push({ name: 'SongDetail', params: { songmid: item.songmid } })">
                        <img :src="getSingerImg(item.singer[0].mid)" :title="item.singer[0].name">
                    </div>
                    <div class="theInfo">
                        <div class="mainSongName"
                            @click="router.push({ name: 'SongDetail', params: { songmid: item.songmid } })">
                            <span :title="item.songname || item.title">{{ item.songname || item.title }}</span>
                        </div>
                        <div class="mainSongArtist">
                            <span v-for="(childItem, childIndex) in item.singer" :key="childIndex"
                                @click="router.push({ name: 'SingerDetail', params: { singermid: childItem.mid } })">
                                {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                            </span>
                        </div>
                    </div>
                    <div class="songTime"><span>{{ timeFormat(item.interval) }}</span></div>
                    <div class="songAlbum"
                        @click="router.push({ name: 'AlbumDetail', params: { albummid: item.album.mid } })">
                        <span :title="item.albumname">{{ item.albumname }}</span>
                    </div>
                    <div class="play" @click="playSong(item.songmid || item.mid)">
                        <div class="middle">
                            <div class="continue"></div>
                        </div>
                    </div>
                </div>
                <div class="item" v-else>
                    <div class="songName"
                        @click="router.push({ name: 'SongDetail', params: { songmid: item.songmid } })"
                        v-if="!NotClick">
                        <span :title="item.songname || item.title">{{ item.songname || item.title }}</span>
                    </div>
                    <div class="songName" v-else>
                        <span :title="item.songname || item.title">{{ item.songname || item.title }}</span>
                    </div>
                    <div class="songArtist" v-if="!NotClick" :title="allSinger(item.singer)">
                        <span v-for="(childItem, childIndex) in item.singer" :key="childIndex"
                            @click="router.push({ name: 'SingerDetail', params: { singermid: childItem.mid } })">
                            {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                        </span>
                    </div>
                    <div class="songArtist" v-else :title="allSinger(item.singer)">
                        <span v-for="(childItem, childIndex) in item.singer" :key="childIndex">
                            {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                        </span>
                    </div>
                    <div class="songTime"><span>{{ timeFormat(item.interval) }}</span></div>
                    <div class="songAlbum" v-if="!NotClick"
                        @click="router.push({ name: 'AlbumDetail', params: { albummid: item.albummid || item.album.mid } })">
                        <span :title="item.albumname">{{ item.albumname }}</span>
                    </div>
                    <div class="songAlbum" v-else>
                        <span :title="item.albumname">{{ item.album.name }}</span>
                    </div>
                    <div class="play" @click="playSong(item.songmid || item.mid)">
                        <div class="middle">
                            <div class="continue"></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { defineProps, toRefs, ref, onMounted, watch } from 'vue';
    import { debounce } from 'lodash';
    import useStore from '../store/index';
    import { storeToRefs } from "pinia"
    import Log from '../views/musicIndex/log.vue';
    const router = useRouter()
    const useMusic = useStore()
    const { uin, songmid, nextSongmid, thedissid, searchSong } = storeToRefs(useMusic.music)
    const { isplay, toNext } = storeToRefs(useMusic.musicPlay)
    // 接收父组件传过来的参数
    const props = defineProps({
        songData: {
            type: Array
        },
        dissid: {
            type: String,
            default: ''
        },
        isMainSong: {
            type: Boolean
        },
        NotClick: {
            type: Boolean,
            default: false
        }
    })
    // 然后解构出来
    const { songData, dissid } = toRefs(props)

    const listData = ref([])
    const typename = ref('默认')
    const sort = (type) => {
        if (type == 0) {
            listData.value = songData.value
            typename.value = '默认'
        } else if (type == 1) {
            listData.value = songSort(songData.value)
            typename.value = '歌曲名'
        } else if (type == 2) {
            listData.value = singerSort(songData.value)
            typename.value = '歌手'
        } else if (type == 3) {
            listData.value = albumSort(songData.value)
            typename.value = '专辑'
        }
        sortVisiable.value = false
        console.log(typename.value);
    }

    const songSort = (arr) => {
        return arr.slice().sort((a, b) => a.songname.localeCompare(b.songname));
    }
    const singerSort = (arr) => {
        return arr.slice().sort((a, b) => a.singer[0].name.localeCompare(b.singer[0].name));
    }
    const albumSort = (arr) => {
        return arr.slice().sort((a, b) => a.albumname.localeCompare(b.albumname));
    }

    const sortVisiable = ref(false)
    const changeSortVisiable = (event) => {
        if (sortVisiable.value == false) {
            sortVisiable.value = true
            event.stopPropagation(); // 防止点击事件冒泡
        } else if (sortVisiable.value == true) {
            sortVisiable.value = false
            event.stopPropagation(); // 防止点击事件冒泡
        }
    }
    const dropdown = ref(null);
    const handleClickOutside = (event) => {
        if (sortVisiable.value && dropdown.value && !dropdown.value.contains(event.target)) {
            sortVisiable.value = false
        }
    };

    // 接收父组件传递过来的的方法
    const emits = defineEmits(["play"]);

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

    // 创建一个方法，整合歌手
    const allSinger = (array) => {
        const newArray = array.map((item) => item.name)
        const result = newArray.join('/')
        return result
    }

    // 返回歌手图片地址
    const getSingerImg = (item) => {
        const url = `https://y.qq.com/music/photo_new/T001R300x300M000${item}_8.jpg?max_age=2592000`
        return url
    }


    // 播放
    const playSong = debounce(async (item) => {
        if (isplay.value) {
            // 先把之前那个歌曲的暂停咯
            isplay.value = false
        }
        if (dissid.value != '' && thedissid.value != dissid.value) {
            console.log('变化歌单');
            nextSongmid.value = item
            thedissid.value = dissid.value
        } else {
            searchSong.value = nextSongmid.value
            nextSongmid.value = item
        }
        toNext.value = true
    }, 500)

    watch((songData), (newValue) => {
        // console.log(newValue);
        typename.value = '默认'
        listData.value = newValue
    })

</script>

<style scoped lang="scss">
    %ellipsis-style {
        display: inline-block;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 15px;
        cursor: pointer;
        text-align: center;
    }







    .tag {
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 2%;
        position: relative;

        // background-color: #fff;
        .sel {
            box-sizing: border-box;
            position: absolute;
            width: 120px;
            // height: 120px;
            background-color: #fff;
            z-index: 99;
            border-radius: 10px;
            right: 0;
            margin-top: 1%;
            padding: 1%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            span {
                padding: 7%;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    background-color: #99999947;
                }
            }
        }

        .noVisiable {
            display: none;
        }

        span {
            cursor: pointer;
        }

        :nth-child(1) {
            flex: 4;
        }

        :nth-child(2) {
            flex: 3.4;
        }

        :nth-child(3) {
            flex: 1.9;
        }

        :nth-child(4) {
            flex: 2.5;
        }

        :nth-child(5) {
            flex: 1;
        }
    }

    li {
        .item {
            width: 100%;
            height: 50px;
            // background-color: #ffffff19;
            // backdrop-filter: blur(5px);
            backdrop-filter: blur(6px);
            background-color: #e4e4e425;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ffffff94;

            .songName {
                flex: 1;
                margin-left: 20px;
                max-width: 250px;

                span {
                    @extend %ellipsis-style;
                }
            }

            .songArtist {
                flex: 1;
                max-width: 200px;
                height: 15px;
                overflow: hidden;

                span {
                    @extend %ellipsis-style;
                }
            }

            .songTime {
                flex: 1;
                max-width: 50px;

                span {
                    @extend %ellipsis-style;
                }
            }

            .songAlbum {
                flex: 1;
                max-width: 200px;

                span {
                    @extend %ellipsis-style;
                }
            }

            .play {
                cursor: pointer;
                margin-right: 20px;

                .middle {
                    width: 25px;
                    height: 25px;
                    box-shadow: inset 0px 0px 2px 1px #ffffff;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .continue {
                        transition-duration: 0.3s;
                        width: 0;
                        height: 0;
                        border-top: 7px solid transparent;
                        border-bottom: 7px solid transparent;
                        border-left: 11px solid #ffffffc7;
                        display: inline-block;
                        margin-left: 2px;
                    }
                }
            }
        }

        .main {
            width: 100%;
            height: 130px;
            // background-color: #ffffff19;
            // backdrop-filter: blur(5px);
            backdrop-filter: blur(6px);
            background-color: #2e294e25;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ffffff94;
            font-size: 15px;
            backdrop-filter: blur(10px);
            z-index: 2;

            span {
                cursor: pointer;
                text-align: center;
            }

            .img {
                flex: 1;
                margin-left: 20px;
                max-width: 250px;
                height: 80%;

                img {
                    // border-radius:10px;
                    height: 100%;
                    cursor: pointer;
                }
            }

            .theInfo {
                flex: 1;
                max-width: 200px;
                height: 80%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;

                .mainSongName {
                    // background-color: #fff;
                    width: 140%;
                    margin-left: 30%;
                    max-width: 300px;

                    span {
                        @extend %ellipsis-style;
                        font-size: 30px;
                        font-weight: 600;
                    }
                }

                .mainSongArtist {
                    width: 100%;
                    margin-left: 0px;
                    max-width: 200px;

                    span {
                        @extend %ellipsis-style;
                    }
                }
            }

            .songTime {
                flex: 1;
                max-width: 50px;

                span {
                    @extend %ellipsis-style;
                }
            }

            .songAlbum {
                flex: 1;
                max-width: 200px;

                span {
                    @extend %ellipsis-style;
                }
            }

            .play {
                cursor: pointer;
                margin-right: 20px;

                .middle {
                    width: 25px;
                    height: 25px;
                    box-shadow: inset 0px 0px 2px 1px #ffffff;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .continue {
                        transition-duration: 0.3s;
                        width: 0;
                        height: 0;
                        border-top: 7px solid transparent;
                        border-bottom: 7px solid transparent;
                        border-left: 11px solid #ffffffc7;
                        display: inline-block;
                        margin-left: 2px;
                    }
                }
            }
        }
    }
</style>