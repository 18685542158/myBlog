<template>
    <div class="box">
        <div class="head">
            <h1>视频就包含</h1>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
    // 获取最新MV   0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    getNewMV,
    getBanner,
    getNewSong,
    getNewAlbum,
    // 这个接口可以传纯数字的id，也可以传mid
    getAlbumInfo,
    // 这个只能传mid
    getAlbumSongs
} from '../../api/request';

onMounted(() => {
    getNewMV(1).then((data) => {
        console.log(data);
    })
    getBanner().then((data) => {
        console.log(data);
    })
    getNewAlbum().then(data => {
        console.log(data);
    })
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

}
</style>