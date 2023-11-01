<template>
    <div class="box" :class="{ light: useLight.light.isLight}">
        <div class="header">
            <div class="image">
                <img src="../assets/images/1.jpg" alt="">
            </div>
            <div class="userInfo">
                <h1>大山</h1>
                <h3>QQ:<span>1538518479</span></h3>
                <h3>Number:<span>18685542158</span></h3>
            </div>
        </div>
        <div class="userBody">
            <div class="content1">
                <h2>也许我们可以追求自己真正喜欢的事情，而不是整天为了满足物质需求而失去真实的自我。我们有能力成为自己想成为的人。</h2>
            </div>
            <div class="content2">
                <h2>年级：大三</h2>
                <h2>毕业院校：湖南城市学院</h2>
                <h2>现居城市：湖南 益阳</h2>
            </div>
            <div class="content3">
                <h2>我的爱好是：唱，跳，rap，篮球</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import useStore from '../store/index';
const useLight = useStore()

</script>

<style scoped lang="scss">
.box {
    position: fixed;
    transition: 0.8s;
    width: 80%;
    height: 80%;
    backdrop-filter: blur(3px);
    background-color: #2E294Ea0;

    .header {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* overflow: hidden; */
        flex-wrap: wrap;
        border-bottom: 1px solid rgb(176, 173, 173);
        box-sizing: border-box;

        .image {
            width: 34%;
            aspect-ratio: 1/1;
            overflow: hidden;
            margin: 20px;
            border-radius: 5px;
            background-color: #fff;

            img {
                width: 100%;
                cursor: pointer;
            }
        }

        .userInfo {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            h1 {
                font-size: 38px;
            }
        }
    }

    .userBody {
        width: 100%;
        height: 70%;
        padding: 30px;

        .content1 {
            width: 100%;
            // height: 80px;
            border-bottom: 1px solid black;

            // background-color: #fff;
            h2 {
                margin-bottom: 10px;
                font-weight: 300;
                text-indent: 2em;
                line-height: 23px;
            }
        }

        .content2 {
            width: 100%;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            h2 {
                margin-bottom: 10px;
                font-weight: 300;
            }

            border-bottom: 1px solid black;
        }

        .content3 {
            width: 100%;
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            h2 {
                margin-bottom: 10px;
                font-weight: 300;
            }
        }
    }
}

.light{
    transition: 0.3s;
    backdrop-filter: blur(3px);
    background-color: #75afc3a0;
    .header{
        border-bottom: 1px solid #f1b9b9;
    }
}
</style>