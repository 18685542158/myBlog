<template>
    <div class="box">
        <div class="main">
            <div class="img">
                <img :src="mainSinger.singerPic" alt="">
            </div>
            <div class="info">
                <h1>{{ mainSinger.singerName }}</h1>
                <div class="songInfo"><span>单曲：{{ mainSinger.songNum }}</span><span>专辑：{{ mainSinger.albumNum }}</span>
                </div>
            </div>
            <div class="song">

            </div>
        </div>
        <div class="body">
            <ul>
                <li v-for="(item, index) in singerData">
                    <div class="item" v-if="index != 0">
                        <div class="img">
                            <img :src="item.singerPic" alt="">
                        </div>
                        <div>
                            <span>{{ item.singerName }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import { ref, reactive, toRefs, defineProps, watch } from 'vue';

const props = defineProps({
    singerData: {
        type: Array
    }
})

const { singerData } = toRefs(props)

const mainSinger = ref([])

watch(singerData, (newValue) => {
    mainSinger.value = newValue[0]
})

</script>
    
<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    display: flex;
    flex-direction: column;

    .main {
        width: 100%;
        height: 220px;
        // background-color: #fff;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ffffff5b;

        .img {
            height: 95%;
            aspect-ratio: 1/1;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 2%;

            img {
                width: 100%;
            }
        }

        .info {
            flex: 1;
            height: 90%;
            margin-left: 5%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            h1 {
                cursor: pointer;
                font-size: 50px;
            }

            .songInfo {
                span {
                    cursor: pointer;
                    color: #111;
                    &:nth-of-type(2) {
                        margin-left: 5%;
                    }
                }
            }
        }

        .song {
            flex: 1;
        }
    }

    .body {
        flex: 1;

        ul {
            display: flex;
            flex-wrap: wrap;


            .item {
                margin: 20px;
                width: 200px;
                height: 200px;
                border: 1px solid #333;
            }
        }
    }
}
</style>