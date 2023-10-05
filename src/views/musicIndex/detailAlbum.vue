<template>
    <div class="box">
        我是专辑详情页
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    // 获取专辑详情
    getAlbumInfo
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const albummid = ref('')
const data = ref({})

watch(route, (to, from) => {
    if (to.name == 'AlbumDetail') {
        albummid.value = to.params.albummid
        console.log('触发了跳转专辑');
        getAlbumInfo(albummid.value).then((data) => {
            console.log(data);
            data.value = data
        })
    }
})

</script>

<style scoped lang="scss"></style>