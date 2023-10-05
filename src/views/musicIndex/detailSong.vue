<template>
    <div class="box">
        我是歌曲详情页
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    // 获取歌曲详情
    getSongDetail
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const songmid = ref('')
const data = ref({})

watch(route, (to, from) => {
    if (to.name == 'SongDetail') {
        songmid.value = to.params.songmid
        console.log('触发了跳转歌曲');
        getSongDetail(songmid.value).then((data) => {
            console.log(data);
            data.value = data
        })
    }
})

</script>

<style scoped lang="scss"></style>