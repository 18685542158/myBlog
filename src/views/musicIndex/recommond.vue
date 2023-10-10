<template>
    <div class="box">
        <div class="head">
            推荐的话，包含的应该是推荐你听什么，看什么，不用纠结是新的还是旧的
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