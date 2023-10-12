<template>
    <div class="box">
        <div class="head">
            <h1>音乐馆</h1>
        </div>
    </div>
</template>

<script setup>
import loading from '../../components/Loading.vue';
import { ref, reactive } from 'vue';
import {



    // 获取歌手分类
    getSingerCategory,
    // 根据歌手分类获取歌手列表
    getSinger,


    // 下面这两个可以结合起来做一个排行榜
    // 获取榜单的名称   showDetail
    getTop,
    // 获取榜单详情
    getTopDetail,


    // 新mv
    getNewMV,
    // 新歌
    getNewSong,
    // 新专辑
    getNewAlbum,
} from '../../api/request';

// 大概是进行排行榜的搜索
// 下面参数的来源是getTop
const longQuery = reactive({
    id: '4',
    pageSize: '20',
    period: '2023-05-10',
    time: ''
})

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