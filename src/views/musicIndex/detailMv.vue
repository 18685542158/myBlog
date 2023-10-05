<template>
    <div class="box">
        我是MV播放
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    // 获取MV详情
    getMvInfo
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const id = ref('')
const data = ref({})

watch(route, (to, from) => {
    if (to.name == 'MvDetail') {
        id.value = to.params.id
        console.log('触发了跳转MV');
        getMvInfo(id.value).then((data) => {
            console.log(data);
            data.value = data
        })
    }
})

</script>

<style scoped lang="scss"></style>