<template>
    <div class="box" :class="{ light: useLight.light.isLight }">
        <div class="info">
            <div class="title">
                <h1>DaShan</h1>
            </div>
            <div class="text">
                <h2>Perhaps we can do things we truly enjoy, instead of constantly losing our true selves in pursuit of
                    material needs. We have the ability to become the person we truly want to be.</h2>
            </div>
        </div>
        <div class="header">
            <div class="item" v-for="item in 3">
                <div class="desc">
                    <h1>在听的音乐：</h1>
                    <h2>Wonderful U</h2>
                    <span>AGA</span>
                </div>
                <div class="image">
                    <img src="http://p1.music.126.net/UT9-zloHMCwIFWlkhqYtcA==/109951167891231829.jpg?param=130y130" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import useStore from '../../store/index';
const useLight = useStore()

</script>
    
<style scoped lang="scss">

.box {
    transition: 0.5s;
    width: 80%;
    height: 80%;

    .info {
        width: 100%;
        height: 30%;
        border-bottom: 1px solid black;

        .title {
            padding: 0 10px;
            height: 60%;

            h1 {
                font-size: 90px;
                font-weight: 500;
            }
        }

        .text {
            padding: 0 10px;

            h2 {
                font-weight: 300;
                text-indent: 2em;
                line-height: 1.5;
            }
        }
    }

    .header {
        width: 100%;
        height: 500px;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 1px solid black;

        .item {
            width: 70%;
            height: 130px;
            display: flex;
            margin: 10px 0;
            border: 1px solid red;


            .desc {
                flex: 1;
                height: 100%;
            }

            .image {
                width: 130px;
            }
        }
    }

}

.light {
    transition: 0.8s;
    backdrop-filter: blur(3px);
    background-color: #75afc3a0;
}
</style>