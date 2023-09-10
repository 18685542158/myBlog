<template>
    <div class="button" @click="handLight" :class="{ 'active': useLight.light.isLight }">
        <svg t="1688624721809" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1711" width="200" height="200" data-spm-anchor-id="a313x.7781069.0.i6">
            <path
                d="M505.4 878.6c-196.7 0-358-150.9-374.9-343.1 1-18.6 16.1-33.4 34.9-33.4 10.8 0 20.5 4.8 26.9 12.4 0.2 0.3 0.5 0.1 0.5-0.7 41.6 44.2 100.5 71.9 166.1 71.9 127.1 0 230.1-103 230.1-230.1 0-66.1-28-125.1-72.6-166.8 0.1-0.1 0.5-0.1 0.3-0.3-7-6.5-11.4-15.7-11.4-26.1 0-19 14.9-34.1 33.7-35.3 192.1 17.1 342.9 178.3 342.9 375 0 208-168.5 376.5-376.5 376.5z"
                fill="#2279a6" p-id="1712" data-spm-anchor-id="a313x.7781069.0.i7" class=""></path>
        </svg>

        <svg t="1688633571687" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="8228" width="128" height="128">
            <path
                d="M512 192c-17.6 0-32-14.4-32-32V96c0-17.6 14.4-32 32-32s32 14.4 32 32v64c0 17.6-14.4 32-32 32zM512 960c-17.6 0-32-14.4-32-32v-64c0-17.6 14.4-32 32-32s32 14.4 32 32v64c0 17.6-14.4 32-32 32z"
                p-id="8229" fill="#f3ca7e"></path>
            <path d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z" p-id="8230" fill="#f3ca7e"></path>
            <path
                d="M285.726 285.726c-12.445 12.445-32.81 12.445-45.255 0l-45.255-45.255c-12.445-12.445-12.445-32.81 0-45.255s32.81-12.445 45.255 0l45.255 45.255c12.445 12.445 12.445 32.81 0 45.255zM828.784 828.784c-12.445 12.445-32.81 12.445-45.255 0l-45.255-45.255c-12.445-12.445-12.445-32.81 0-45.255s32.81-12.445 45.255 0l45.255 45.255c12.445 12.445 12.445 32.81 0 45.255zM738.274 285.726c-12.445-12.445-12.445-32.81 0-45.255l45.255-45.255c12.445-12.445 32.81-12.445 45.255 0s12.445 32.81 0 45.255l-45.255 45.255c-12.445 12.445-32.81 12.445-45.255 0zM195.216 828.784c-12.445-12.445-12.445-32.81 0-45.255l45.255-45.255c12.445-12.445 32.81-12.445 45.255 0s12.445 32.81 0 45.255l-45.255 45.255c-12.445 12.445-32.81 12.445-45.255 0zM160 544H96c-17.6 0-32-14.4-32-32s14.4-32 32-32h64c17.6 0 32 14.4 32 32s-14.4 32-32 32zM928 544h-64c-17.6 0-32-14.4-32-32s14.4-32 32-32h64c17.6 0 32 14.4 32 32s-14.4 32-32 32z"
                p-id="8231" fill="#f3ca7e"></path>
        </svg>
        <div class="arc"></div>
    </div>
</template>

<script setup>
// import { ref, reactive } from 'vue';
import useStore from '../store/index';
const useLight = useStore()
const handLight = () => {
    useLight.light.isLight = !useLight.light.isLight
}
</script>

<style scoped lang="scss">
.button {
    width: 50px;
    height: 20px;
    display: flex;
    align-items: center;
    background-color: #2E294E;
    border-radius: 50px;
    box-shadow: 1px 1px 5px #0c072b;
    cursor: pointer;
    transition-duration: 0.4s;

    &:hover {
        .arc {
            margin: 0 0.5px;
            width: 21px;
            height: 21px;
            background-color: #87CEEB;
            box-shadow: 1px 1px 8px #0c0346;
            border-radius: 50%;
        }
    }

    .icon1 {
        transition-duration: 0.3s;
        position: fixed;
        width: 20px;
        height: 20px;
        z-index: 1;
    }

    .icon2 {
        transition-duration: 0.3s;
        position: fixed;
        width: 20px;
        height: 20px;
        transform: translate(30px);
        z-index: -1;
    }

    .arc {
        transition-delay: 0.1s;
        transition-duration: 0.3s;
        margin: 0 1px;
        width: 20px;
        height: 20px;
        background-color: #87CEEB;
        box-shadow: 1px 1px 5px #0c0346;
        border-radius: 50%;
    }
}

.active {
    border-radius: 50px;
    box-shadow: inset 1px 1px 2px #1c1d1e;
    cursor: pointer;
    background-color: #87CEEB;
    transition-duration: 0.4s;

    &:hover {
        .arc {
            margin: 0 0.5px;
            width: 21px;
            height: 21px;
            background-color: #ebf4f5;
            box-shadow: 1px 1px 8px #86cef5;
            border-radius: 50%;
        }
    }

    .icon1 {
        transition-duration: 0.3s;
        position: fixed;
        width: 20px;
        height: 20px;
        z-index: -1;
    }

    .icon2 {
        transition-duration: 0.3s;
        position: fixed;
        width: 20px;
        height: 20px;
        transform: translate(30px);
        z-index: 1;
    }

    .arc {
        transition-delay: 0.1s;
        transition-duration: 0.3s;
        margin: 0 1px;
        width: 20px;
        height: 20px;
        background-color: #ebf4f5;
        box-shadow: 1px 1px 5px #86cef5;
        border-radius: 50%;
        transform: translate(28.5px);
    }
}</style>