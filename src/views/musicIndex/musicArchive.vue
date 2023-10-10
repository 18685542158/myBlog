<template>
    <div class="box">
        <h1>音乐馆应该是包含新歌曲，专辑，MV等，</h1>
    </div>
</template>

<script setup>
import loading from '../../components/Loading.vue';
import { ref, reactive } from 'vue';
import {
    // 单纯的获取推荐歌单
    getRecommondPlaylist,
    // 获取歌单分类
    getCategory,
    // 根据分类获取歌单
    getReSongList,

    
    // 新mv
    getNewMV,
    // 新歌
    getNewSong,
    // 新专辑
    getNewAlbum,
} from '../../api/request';

</script>

<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    overflow-y: scroll;
}
</style>