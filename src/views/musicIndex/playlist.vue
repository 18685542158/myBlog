<template>
    <div class="box">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <div class="item1">
                <h1>当前歌单：</h1>
            </div>
            <div class="item2">
                <span>{{ songListData.dissname }}</span>
            </div>
        </div>
        <div class="body">
            <list :songData="songListData.songlist" :dissid="String(songListData.disstid)"></list>
        </div>
    </div>
</template>

<script setup>
import list from '../../components/List.vue';
import lloading from '../../components/Loading.vue';

import { ref, reactive, onMounted, watch, onUnmounted } from 'vue';
import useStore from '../../store/index';
import { storeToRefs } from "pinia"
import {
    // 获取歌单详情
    getSongListDel
} from '../../api/request';
const useMusic = useStore()
const { thedissid } = storeToRefs(useMusic.music)

const loading = ref(true)
const songListData = ref({})


watch(thedissid, (newValue) => {
    getSongListDel(thedissid.value).then((data) => {
        songListData.value = data
        console.log(data);
    })
})

onMounted(() => {
    getSongListDel(thedissid.value).then((data) => {
        songListData.value = data
        console.log(data);
        loading.value = false
    })
})

onUnmounted(() => {
    loading.value = true
})

</script>

<style scoped lang="scss">
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
        border-bottom: 1px solid #ffffff81;
        padding: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 150px;

        .item1 {
            width: 30%;
            height: 100%;

            h1 {
                display: inline;
                font-size: 50px;
            }
        }

        .item2 {
            width: 70%;
            height: 100%;
            overflow: hidden;

            span {
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 50px;
                width: 100%;
            }
        }
    }
}
</style>