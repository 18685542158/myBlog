<template>
    <div class="box" @click="close">
        我是详情页
    </div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue';
// 接收父组件传过来的参数
const props = defineProps({
    songData: Object
})
// 解构父组件传过来的参数
const { songData } = toRefs(props)
// 接收父组件传递过来的的关闭方法
const emits = defineEmits(["close"]);
// 关闭页面
const close = () => {
    emits('close')
    console.log(songData.value);
}


</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    background-color: #958888;
}
</style>