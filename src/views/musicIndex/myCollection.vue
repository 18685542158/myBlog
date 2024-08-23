<template>
    <div class="box">
        <div class="head">
            <h1>我的收藏</h1>
        </div>
        <div class="select" v-if="!loading">
            <ul>
                <li v-for="(item, index) in selectArr" :key="index">
                    <div class="selItem" @click="selItem = index" :class="selItem == index ? 'active' : ''">
                        <span>{{ item.name }}</span>
                    </div>
                </li>
            </ul>
            <div class="seek" :style="`transform: translateX(${40 + selItem * 140}px); `"></div>
        </div>
        <div class="song" v-if="selItem == 0">
            <ul>
                <li v-for="(item, index) in songData.value">
                    <div class="item">
                        <div class="img">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="songName">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="singerName">
                            <!-- <span>{{ item.artist }}</span> -->
                            <span v-for="(childItem, childIndex) in singerMap(item.singer_name)" :key="childIndex"
                                @click="toSinger(childItem)">
                                {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                            </span>
                        </div>
                        <div class="time" style="cursor: pointer;">
                            <span>{{ formatTime(item.createdAt) }}</span>
                        </div>
                        <div class="play" @click="playSong(item.songmid)">
                            <div class="middle">
                                <div class="continue"></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mv" v-else>
            <mbList :mvData="mvData.value"></mbList>
        </div>
    </div>
</template>

<script setup>
    import { getCollection, getCollectionVideo } from '../../api/request';

    import mbList from '../../components/SearchForMv.vue';
    import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
    import useStore from '../../store/index';
    import { storeToRefs } from "pinia"
    import { useRouter, useRoute } from 'vue-router';
    import { debounce } from 'lodash';
    const router = useRouter()
    const route = useRoute()
    const useMusic = useStore()
    const { mvURL, songURL, nextSongmid } = storeToRefs(useMusic.music)
    const { isplay, toNext } = storeToRefs(useMusic.musicPlay)

    const songData = reactive([])
    const mvData = reactive([])
    const loading = ref(false)
    const selItem = ref(0)
    const selectArr = reactive([
        {
            name: '歌曲',
        },
        {
            name: '视频',
        }
    ])

    const formatTime = (str) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1，并补零
        const day = String(date.getDate()).padStart(2, '0'); // 补零
        const hours = String(date.getHours()).padStart(2, '0'); // 补零
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 补零
        const seconds = String(date.getSeconds()).padStart(2, '0'); // 补零
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const singerMap = (str) => {
        const data = JSON.parse(str)
        return data
    }

    const playSong = debounce(async (item) => {
        if (isplay.value) {
            // 先把之前那个歌曲的暂停咯
            isplay.value = false
        }
        // if (dissid.value != '' && thedissid.value != dissid.value) {
        //     console.log('变化歌单');
        //     thedissid.value = dissid.value
        // } else {
        //     searchSong.value = nextSongmid.value
        // }
        nextSongmid.value = item
        toNext.value = true
    }, 500)

    // 定义加载数据的函数
    const loadData = async () => {
        try {
            console.log(mvURL.value);
            
            // 发送请求重新加载数据
            const user_id = localStorage.getItem('user_id')
            await getCollectionVideo(user_id).then(data => {
                console.log(data);
                mvData.value = data
            }).catch(err => {
                console.log(err);
            })
            // 发送请求重新加载数据
            await getCollection(user_id).then(data => {
                console.log(data);
                songData.value = data
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    watch(route, () => {
        loadData();
    })

    onMounted(async () => {
        loadData()
    })

    // 组件销毁的时候
    onUnmounted(() => {
        console.log('触发组件销毁时');

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

    .box {
        position: relative;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(6px);
        background-color: #ffffff00;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;


        .head {
            width: 100%;
            height: 150px;
            border-bottom: 1px solid #ffffff81;
            padding: 40px;
            box-sizing: border-box;

            h1 {
                font-size: 50px;
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

        .song {

            ul {
                li {
                    .item {
                        width: 100%;
                        height: 100px;
                        // background-color: #ffffff19;
                        // backdrop-filter: blur(5px);
                        backdrop-filter: blur(6px);
                        background-color: #2e294e25;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 1px solid #ffffff94;

                        .img {
                            flex: 1;
                            margin-left: 20px;
                            max-width: 250px;
                            height: 80%;
                            cursor: pointer;

                            img {
                                // border-radius:10px;
                                height: 100%;
                            }
                        }

                        .songName {
                            flex: 1;
                            margin-left: -100px;
                            max-width: 250px;

                            span {
                                @extend %ellipsis-style;
                            }
                        }

                        .singerName {
                            flex: 1;
                            margin-left: 100px;
                            max-width: 300px;

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
            }
        }

        .mv {
            width: 100%;
            height: 100%;
        }
    }
</style>