<template>
<div class="box">
    <div class="content" v-for="item in 6">
        123
    </div>
</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';

</script>

<style scoped lang="scss">

.box{
    width: 100%;
    height: 100%;
    // background-color: #fff;
    overflow-y: scroll;
    .content{
        width: 90%;
        height: 300px;
        margin-top: 20px;
        margin-left: 20px;
        background-color: #fff;
    }
}
</style>