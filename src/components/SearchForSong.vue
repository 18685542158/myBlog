<template>
    <div>
        <div class="body">
            <list @play="playSong" :songData="songData"></list>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, defineProps } from 'vue';
import list from './List.vue';
import { debounce } from 'lodash';

const props = defineProps({
    songData: {
        type: Array
    }
})

const { songData } = toRefs(props)

const data={
    
}

// 播放
const playSong = debounce(async (item) => {
    if (isplay.value) {
        // 先把之前那个歌曲的暂停咯
        isplay.value = false
    }
    // if (thedissid.value != id) {
    //     thedissid.value = id
    // }
    nextSongmid.value = item.songmid
    toNext.value = true
}, 500)

</script>

<style scoped lang="scss">
.body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>