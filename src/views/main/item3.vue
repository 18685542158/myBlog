<template>
    <div class="box" :class="{ light: useLight.light.isLight }">
        <div class="info">
            <div class="title">
                <h1>Hobby</h1>
            </div>
            <div class="text">
                <h2>我的兴趣偏向艺术方面吧，我对音乐，画画，跳舞都挺感兴趣的，在高中的时候一直有在弹吉他，唱歌也还不错啦，虽然没有学过画画，
                    但是同学对我画画的技艺评价也还是蛮高的，我对审美的感知也挺不错的，然后呢，我也算是个二次元吧，很喜欢动漫里面天马行空的想象，
                    也喜欢动漫所带来的故事，喜欢动漫里面的曲子，喜欢闭上眼睛感受它们的意境。我认为它们给我的生活带来了很多的乐趣，如果有机会的话，
                    我也很有意愿能够往这方面发展
                </h2>
            </div>
        </div>
        <div class="header">
            <div class="item" v-for="(item, index) in data" :key="index">
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
import { reactive } from 'vue';
import useStore from '../../store/index';
const useLight = useStore()

const data=reactive([
    {
        title:'最喜欢的音乐',
        name:'夜空中最亮的星',
        cover:'',
        content:''
    },
    {
        title:'最喜欢的动漫',
        name:'进击的巨人',
        cover:'',
        content:''
    },
    {
        title:'最喜欢的艺人',
        name:'胡彦斌',
        cover:'',
        content:''
    },
    {
        title:'我的目标是什么',
        name:'',
        cover:'',
        content:''
    },
])


</script>
    
<style scoped lang="scss">
.box {
    transition: 0.5s;
    width: 80%;
    height: 80%;
    overflow-y: scroll;

    .info {
        width: 100%;
        margin-bottom: 6%;
        // height: 30%;

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
            padding-bottom: 2%;
            border-bottom: 1px solid black;

            h2 {
                font-weight: 300;
                text-indent: 2em;
                line-height: 1.5;
            }
        }
    }

    .header {
        width: 100%;
        height: 45vh;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        overflow-y: scroll;

        .item {
            width: 90%;
            height: 80%;
            background-color: #fff;
            display: flex;
            margin: 10px 0;
            margin-left: 2%;


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