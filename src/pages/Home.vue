<template>
    <Snow id="snow"></Snow>
    <div class="box">
        <!-- 顶部导航栏 -->
        <div class="header" style="height: 70px;width: 100%;z-index: 99;" @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave">
            <transition name="slide">
                <Header v-show="showNav"></Header>
            </transition>
        </div>
        <!-- 左侧信息标签 -->
        <div class="userInfo">
            <User></User>
        </div>
        <!-- 右侧主页部分 -->
        <div class="content">
            <Main></Main>
        </div>
    </div>
</template>

<script setup>
import Snow from '../components/Snow.vue';
import Header from '../components/Header.vue';
import User from '../components/User.vue';
import Main from '../components/Main.vue';
import { ref } from 'vue';

// 以下都是关于头部导航栏的隐藏和出现
const showNav = ref(false);
let timer = ref(null)
const handleMouseEnter = () => {
    clearTimeout(timer);
    showNav.value = true;
}
const handleMouseLeave = () => {
    timer = setTimeout(() => {
        showNav.value = false; // 鼠标离开时，延迟3秒后隐藏导航栏
    }, 3000);
}//


</script>

<style scoped lang="scss">
#snow {
    position: fixed;
    z-index: -1;
    opacity: 0.6;
}

.box {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;

    .slide-enter-active,
    // 指的是鼠标进入目标区域后，导航栏由隐藏到下滑的过程
    .slide-leave-to {
        // 指的是鼠标离开导航栏之后，导航栏上滑到隐藏的过程
        transform: translateY(-100%); // 指的是导航栏沿着Y轴向负方向移动100%
        /* 导航栏上滑效果 */
    }

    // 左侧信息卡
    .userInfo {
        width: 450px;
        height: 720px;
        display: flex;
        justify-content: end;
        align-items: center;
        // background-color: #fff;
    }

    // 右侧路由页
    .content {
        flex: 1;
        height: 720px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

@media (max-width: 1050px) {
    .box {
        .userInfo {
            display: none;
        }
    }

}</style>