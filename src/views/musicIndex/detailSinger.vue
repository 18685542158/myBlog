<template>
    <div class="box">
        我是歌手详情页
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    // 获取歌手详情
    getSingerInfo
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const singermid = ref('')
const data = ref({})

// 返回歌手图片地址
const getSingerImg = (item) => {
    const url = `https://y.qq.com/music/photo_new/T001R300x300M000${item}_8.jpg?max_age=2592000`
    const url2 = `https://y.gtimg.cn/music/photo_new/T062M000001bbC9x1SnDip.jpg?max_age=0`
    return url
}

watch(route, (to, from) => {
    if (to.name == 'SingerDetail') {
        singermid.value = to.params.singermid
        console.log('触发了跳转歌手');
        getSingerInfo(singermid.value).then((data) => {
            console.log(data);
            data.value = data
        })
    }
})

</script>

<style scoped lang="scss"></style>