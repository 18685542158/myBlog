<template>
    <div class="box">
        <div class="body">
            <list :songData="forData(songData)" :isMainSong="true"></list>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, defineProps } from 'vue';
import list from './List.vue';
import { debounce } from 'lodash';
import useStore from '../store/index';
import { storeToRefs } from "pinia"
const useMusic = useStore()
const { isplay, toNext } = storeToRefs(useMusic.musicPlay)

const props = defineProps({
    songData: {
        type: Array,
        default:[]
    }
})

const forData = (data) => {
    const forData=data.map(obj=>{
        const newObj={...obj}
        newObj.songmid=obj.mid
        newObj.albumname=obj.album.name
        newObj.songname=obj.title
        return newObj
    })
    return forData
}

const { songData } = toRefs(props)

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
}
</style>