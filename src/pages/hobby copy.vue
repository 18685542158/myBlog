<template>
    <div class="box">
        <div class="cover">
            <div class="header">

            </div>
            <div class="footer">

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';



</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url(../assets/images/infinity-65164497.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    cursor: url('../assets/cursor/Arrow-126.png/9c62daf09c084e4e8ce64a2db39c859c2PJQYb7HkrsYTdLZ-0.png'), auto;

    .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(5, 5, 5, 0.318);
        backdrop-filter: blur(3px);
        display: flex;
        flex-direction: column;

        .header {
            width: 100%;
            height: 100px;
        }
    }
}
</style>