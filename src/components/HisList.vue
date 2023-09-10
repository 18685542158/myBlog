<template>
    <div class="box">
        <div class="head">
            <h1>你播放了：</h1>
            <div style="display: flex;justify-content: space-between;margin: 20px 10px;margin-bottom: 0px;">
                <span>400首歌曲</span>
                <span class="iconfont icon-shanchu"></span>
            </div>

        </div>
        <div class="body">
            <ul v-for="item in 10">
                <li>一项</li>
            </ul>
        </div>


    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');

.box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #ffffffa5 1%, #ffffff6c 60%);
    backdrop-filter: blur(5px);

    .head {
        padding: 20px;
        border-bottom: 1px solid black;
        h1 {
            font-size: 25px;
            user-select: none;
        }
        span{
            cursor: pointer;
        }
    }

    .body {
        padding: 0 20px;

        li {
            margin-top: 10px;
        }
    }
}</style>