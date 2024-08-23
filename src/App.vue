<script setup>
</script>

<template>
  <!-- <keep-alive> -->
    <router-view></router-view>
  <!-- </keep-alive> -->
</template>

<style>
@font-face {
  font-family: 'myfont';
  src: url('./assets/font/江城圆体 300W.ttf');
}

h2 {
  cursor: pointer;
}

/* WebKit 内核 (Chrome, Safari, Opera) */
/* 定制滚动条的样式 */
::-webkit-scrollbar {
  width: 10px;
  /* 滚动条的宽度 */
}

/* 定制滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: #ab9aaa72;
  /* 滑块的颜色 */
  border-radius: 5px;
  /* 滑块的圆角 */
}

/* 定制滚动条轨道的样式 */
::-webkit-scrollbar-track {
  background-color: #f1f1f100;
  /* 轨道的颜色 */
  border-radius: 5px;
  /* 轨道的圆角 */
}

/* 定制滚动条滑块的样式 */
* {
  scrollbar-color: #ab9aaa72 #f1f1f100;
  /* 滚动条的颜色 (滑块颜色 轨道颜色) */
}


/* Opera 内核 */
/* 定制滚动条的样式 */
/* 需要使用-webkit-前缀进行兼容性处理 */
::-webkit-scrollbar {
  width: 10px;
  /* 滚动条的宽度 */
}

/* 定制滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: #ab9aaa72;
  /* 滑块的颜色 */
}

/* 定制滚动条轨道的样式 */
::-webkit-scrollbar-track {
  background-color: #f1f1f100;
  /* 轨道的颜色 */
}


/* fade-transform */

/* 有页面刚进来的时候 */
.fade-transform-enter-active {
  transform: translateX(30px);
  opacity: 0;
  transition: all .5s;
}

/* 页面进来最后的状态 */
.fade-transform-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

/* 页面刚离开的时候 */
.fade-transform-leave-active {
  transition: all .5s;
}

/* 页面最后离开的样子 */
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* fade */
/* 页面出现与消失 */
.fade-enter-active {
  transform: translateY(-30px);
  opacity: 0;
  transition: all .5s;
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.fade-leave-active {
  transition: all .5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}


/* detali */
/* 歌曲播放的展示与收起 */
.detail-enter-active {
  transition: 0.3s;
  transform: translateY(100%);
}

.detail-enter-to {
  transform: translateY(0);
}

.detail-leave-active {
  transition: 0.3s;
  transform: translateY(0);
}

.detail-leave-to {
  transform: translateY(100%);
}

/* loading加载的淡入淡出样式 */
.loading-enter-active {
  opacity: 1;
  transition: 0.3s;
}

.loading-enter-to {
  opacity: 1;
}

.loading-leave-active {
  opacity: 1;
  transition: 0.3s;
}

.loading-leave-to {
  opacity: 0;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  /* background-color: #7f9dff00;
  backdrop-filter: opacity(1);
  backdrop-filter: blur(1000px);
  z-index: 100; */
}
</style>
