<template>
    <div class="box">
        <div class="head">
            <h1>推荐</h1>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
    // 获取日推
    getDayRecommondPlaylist,
    // 专辑轮播图
    getBanner,


    // 单纯的获取推荐歌单
    getRecommondPlaylist,
    // 获取歌单分类
    getCategory,
    // 根据分类获取歌单
    getReSongList,
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

}
</style>