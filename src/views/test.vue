<template>
<div class="box" style="background-color: aqua;height: 200px;overflow: scroll;">
    <div style="width: 90%;
    height: 200px; background-color: #d37777; margin-top: 50px;margin-left: 50px;" v-for="item in 9">我是超出的部分</div>
</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';

</script>

<style scoped>

</style>