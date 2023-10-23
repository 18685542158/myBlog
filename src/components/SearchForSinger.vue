<template>
    <div class="box">
        <div class="main">
            <div class="img">
                <img v-if="!loading" :src="mainSinger.singerPic" alt="">
                <div v-else style="width: 100%;height: 300px;background-color: #ffffff0a;"></div>
            </div>
            <div class="info">
                <h1 :title="mainSinger.singerName"
                    @click="router.push({ name: 'SingerDetail', params: { singermid: mainSinger.singerMID } })">{{
                        mainSinger.singerName }}</h1>
                <div class="songInfo" v-if="!loading"><span>单曲：{{ mainSinger.songNum }}</span><span>专辑：{{
                    mainSinger.albumNum }}</span>
                </div>
            </div>
            <div class="song">
                <span v-if="!loading" :title="mainSingerInfo">{{ mainSingerInfo }}</span>
                <div v-else style="width: 100%;height: 300px;background-color: #ffffff0a;"></div>
            </div>
        </div>
        <div class="body" v-if="!loading">
            <ul>
                <li v-for="(item, index) in singerData" :key="index">
                    <div class="item">
                        <div class="img">
                            <img :src="item.singerPic" alt="">
                        </div>
                        <div class="info"
                            @click="router.push({ name: 'SingerDetail', params: { singermid: item.singerMID } })">
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
import { useRouter } from 'vue-router';
import {
    getSingerInfo
} from '../api/request';
const router = useRouter()

const props = defineProps({
    singerData: {
        type: Array
    }
})

const loading = ref(true)
const { singerData } = toRefs(props)

const mainSinger = ref([])

const mainSingerInfo = ref({})

watch(singerData, (newValue) => {
    mainSinger.value = newValue[0]
    getSingerInfo(mainSinger.value.singerMID).then((data) => {
        console.log(data);
        mainSingerInfo.value = data.desc
        loading.value = false
    }).catch(err => {
        console.log(err);
    })
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
                display: inline-block;
                max-width: 350px;
                cursor: pointer;
                font-size: 50px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
            flex: 2;
            height: 90%;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
                font-size: 16px;
                line-height: 20px;
                cursor: pointer;
            }
        }
    }

    .body {
        // flex: 1;

        ul {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

            .item {
                margin: 8%;
                // width: 170px;
                aspect-ratio: 6/7;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                background-color: #ffffff48;
                box-sizing: border-box;
                .img{
                    width: 90%;
                    img{
                        width: 100%;
                    }
                }

                .info {
                    span {
                        display: inline-block;
                        max-width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        cursor: pointer;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>