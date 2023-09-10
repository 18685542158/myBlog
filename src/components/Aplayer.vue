<template>
    <div class="box">
        <div id="aplayer"></div>
    </div>
</template>

<script setup>
import '../../node_modules/aplayer/dist/APlayer.min.css'
import Aplayer from 'Aplayer';
// 在这里初始化并创建APlayer实例
const ap = new Aplayer({
    container: document.getElementById('aplayer'), // 指定容器
    audio: [
        // 音频相关配置
        {
            name: '音频名称',
            artist: '艺术家',
            url: 'http://music.163.com/song/media/outer/url?id=407764775.mp3',
            // cover: '../assets/images/1.jpg'
        },
        {
            name: '音频名称',
            artist: '艺术家',
            url: 'http://music.163.com/song/media/outer/url?id=1865095005.mp3',
            // cover: '../assets/images/1.jpg'
        },
    ]
});
    // 可以在这里对APlayer实例进行进一步的配置和操作

</script>

<style lang="scss" scoped>
.box {
    background-color: #fff;
    width: 100px;
    height: 20px;
    #aplayer{
        position: fixed;
        display: none;
        background-color: #000;
    }
}
</style>