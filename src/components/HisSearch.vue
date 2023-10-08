<template>
    <div>
        <div class="search-kuang" :class="{ 'isSearchKuang': isSearchKuang, 'openH': inputValue.length && isSearchKuang }">
            <div v-if="!inputValue.length">
                <div class="hisSearch">
                    <span>历史搜索</span><span class="iconfont icon-shanchu" @click="deleteAll"></span>
                </div>
                <div class="hisSearchBody">
                    <ul>
                        <li v-for="(item, index) in array" :key="index">
                            <div class="item" @click="toSearch(item)" :title="item">
                                <span>{{ item }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else-if="!loading" class="content">
                <div class="song">
                    <div class="title"><span>单曲</span></div>
                    <div class="body">
                        <ul>
                            <li v-for="(item, index) in songData.itemlist" :key="index">
                                <div class="songItem" @click="toSearch(item.name)">
                                    <span>{{ item.name }}-{{ item.singer }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="singer">
                    <div class="title"><span>歌手</span></div>
                    <div class="body">
                        <ul>
                            <li v-for="(item, index) in singerData.itemlist" :key="index">
                                <div class="singerItem" @click="toSearch(item.name)">
                                    <div class="img">
                                        <img :src="item.pic" alt="">
                                    </div>
                                    <span>{{ item.name }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="album">
                    <div class="title"><span>专辑</span></div>
                    <div class="body">
                        <ul>
                            <li v-for="(item, index) in albumData.itemlist" :key="index">
                                <div class="albumItem" @click="toSearch(item.name)">
                                    <div class="img">
                                        <img :src="item.pic" alt="">
                                    </div>
                                    <span>{{ item.name }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else style="width: 100%;height: 100%;background-color: #ffffff;">
                <lloading></lloading>
            </div>
        </div>
    </div>
</template>

<script setup>
import lloading from '../components/Loading.vue';

import { useRouter } from 'vue-router';
import { ref, reactive, defineProps, toRefs, watch, computed } from 'vue';
import useStore from '../store/index';
import { storeToRefs } from "pinia"
import {
    getSongMV,
    getMvInfo
} from '../api/request';
const router = useRouter()
const useMusic = useStore()
const { setHisSearch } = useMusic.music
const { hisSearch, inputValue } = storeToRefs(useMusic.music)


const props = defineProps({
    isSearchKuang: {
        type: Boolean
    },
    // inputValue: {
    //     type: String
    // },
    qSearchData: {
        type: Object
    }
})

// 接收父组件传进来的参数
const { isSearchKuang, qSearchData } = toRefs(props)

const loading = ref(true)

//创建需要渲染的四个数据数组
const songData = ref({})
const singerData = ref({})
const albumData = ref({})
// const mvData = ref({})

// 渲染搜索记录
const array = computed(() => { return hisSearch.value.reverse() })

// 删除搜索记录
const deleteAll = () => {
    hisSearch.value = []
    setHisSearch()
}

// 通过历史搜索记录区搜索
const toSearch = (item) => {
    inputValue.value = item
    router.push({
        name: 'Search',
        params: {
            key: item,
        }
    })
}

// 实现快速搜索的赋值
watch(qSearchData, (newValue) => {
    if (Object.keys(qSearchData.value).length == 0) {
        loading.value = true
    } else {
        console.log(newValue);
        songData.value = newValue.song
        singerData.value = newValue.singer
        albumData.value = newValue.album
        // mvData.value = newValue.mv
        loading.value = false
    }
}, { immediate: true })
</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');

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

.search-kuang {
    transition: 0.3s 0.3s;
    box-sizing: border-box;
    position: fixed;
    width: 300px;
    height: 0;
    // min-height: 0px;
    top: 60px;
    left: 252px;
    border-radius: 0 0 10px 10px;
    background-color: #ffffffe7;
    backdrop-filter: blur(10px);
    overflow: hidden;
    z-index: 100;
    overflow-y: scroll;


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

    .hisSearchBody {
        margin: 3px 0;

        ul {
            display: flex;
            padding: 0 20px;
            flex-wrap: wrap;

            li {
                .item {
                    padding: 4px;
                    background-color: #33333317;
                    margin: 5px 0;
                    margin-right: 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }
    }
}

.isSearchKuang {
    transition: 0.3s;
    width: 300px;
    height: 117px;
    // height: auto;
    // min-height: 100px;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.538);
    display: inline-block;
}

.openH {
    min-height: 200px;
    height: 390px;
}

.content {
    height: auto;
    padding: 5%;

    .song {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #333;

        .title {
            width: 15%;
            height: 150px;
        }

        .body {
            width: calc(100% - 15%);

            .songItem {
                width: 100%;
                height: 30px;
                cursor: pointer;
                margin-bottom: 2%;
                margin-left: 2%;
                padding-left: 2%;
                border-radius: 5px;

                &:hover {
                    transition: 0.3s;
                    background-color: #b8a5b726;
                }

                span {
                    @extend %ellipsis-style;
                    line-height: 30px;
                }
            }
        }
    }

    .singer {
        margin-top: 5%;
        display: flex;
        width: 100%;
        border-bottom: 1px solid #333;

        .title {
            width: 15%;
            height: 90px;
        }

        .body {
            width: calc(100% - 15%);

            .singerItem {
                width: 100%;
                height: 40px;
                cursor: pointer;
                margin-bottom: 2%;
                margin-left: 2%;
                padding-left: 2%;
                border-radius: 5px;
                display: flex;
                align-items: center;

                .img {
                    height: 90%;
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 5%;

                    img {
                        width: 100%;
                    }
                }

                span {
                    @extend %ellipsis-style;
                    line-height: 30px;
                }

                &:hover {
                    transition: 0.3s;
                    background-color: #b8a5b726;
                }
            }
        }
    }

    .album {
        margin-top: 5%;
        display: flex;
        width: 100%;

        .title {
            width: 15%;
            height: 90px;
        }

        .body {
            width: calc(100% - 15%);

            .albumItem {
                width: 100%;
                height: 40px;
                cursor: pointer;
                margin-bottom: 2%;
                margin-left: 2%;
                padding-left: 2%;
                border-radius: 5px;
                display: flex;
                align-items: center;

                .img {
                    height: 90%;
                    aspect-ratio: 1/1;
                    margin-right: 5%;

                    img {
                        width: 100%;
                    }
                }

                span {
                    @extend %ellipsis-style;
                    line-height: 30px;
                }

                &:hover {
                    transition: 0.3s;
                    background-color: #b8a5b726;
                }
            }
        }
    }
}
</style>