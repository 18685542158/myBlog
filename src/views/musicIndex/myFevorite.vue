<template>
    <div class="box">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <h1>我喜欢的歌曲</h1>
        </div>
        <div class="body">
            <list :songData="songListData.songlist" :dissid="String(songListData.disstid)"></list>
        </div>
    </div>
</template>

<script setup >
import list from '../../components/List.vue';
import lloading from '../../components/Loading.vue';


import { ref, reactive, onMounted, onUnmounted } from 'vue';
import useStore from '../../store/index';
import { storeToRefs } from "pinia"
const useMusic = useStore()
const { uin } = storeToRefs(useMusic.music)
import {
    // 获取我喜欢歌单的id
    getUserDetail,
    // 获取歌单详情
    getSongListDel
} from '../../api/request';

const loading = ref(true)
const songListData = ref({})

onMounted(() => {
    getUserDetail(uin.value).then((data) => {
        getSongListDel(data.mymusic[0].id).then((adata) => {
            songListData.value = adata
            loading.value = false
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
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
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #ffffff81;
        padding: 40px;
        box-sizing: border-box;

        h1 {
            font-size: 50px;
        }
    }
}
</style>