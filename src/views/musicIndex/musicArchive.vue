<template>
    <div class="box">
        <div style="width:100%;height:100%;position:absolute;">
            <loading></loading>
        </div>
        <div class="other" style="width:100px;height:100px;background-color:#000">
            我是其他
        </div>
    </div>
</template>

<script setup>
import loading from '../../components/Loading.vue';
import { ref, reactive } from 'vue';

</script>

<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>