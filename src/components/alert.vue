<template>
    <div class="box">

    </div>
</template>

<script setup>
import { ref, reactive, defineProps, toRefs} from 'vue';

// 接收父组件传过来的参数
const props = defineProps({
    type: String,
    content: String
})

// 解构父组件传过来的参数
const { type, content } = toRefs(props)




</script>

<style scoped lang="scss">
.box{
    width: 20%;
    height: 1/5;
    position: absolute;
    margin: auto;
    background-color: #fff;
}


</style>