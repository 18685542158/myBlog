<template>
    <div class="box">
        <div class="head">
            <video class="video" :src="urlsData[2]" autoplay ></video>
        </div>
        <div class="controls">
            <!-- <div class="progress" style="user-select: none;">
                <div class="progressBox" @mousedown="downProgress">
                    <div class="progressBar" :style="`width: ${num}%;`"></div>
                </div>
            </div> -->
        </div>
        <div class="body">
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { videoPlayer } from '../../media/videoPlayer';

import {
    // 获取MV详情
    getMvInfo,
    // 获取mv链接
    getMvUrl
} from '../../api/request';

const router = useRouter()
const route = useRoute()

const id = ref('')
const mvData = ref({})
const urlsData = ref([])

watch(route, (to, from) => {
    if (to.name == 'MvDetail') {
        id.value = to.params.id
        // console.log('触发了跳转MV');
        getMvInfo(id.value).then((data) => {
            console.log(data);
            mvData.value = data
            getMvUrl(id.value).then((urlData) => {
                // console.log('获取播放链接成功');
                // console.log(urlData);
                urlsData.value = urlData[data.info.vid]
                console.log(urlsData.value);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }
}, { immediate: true })

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
    overflow-y: scroll;

    .head {
        width: 100%;
        height: 90%;
        background-color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;

        .video {
            height: 100%;
        }
    }

    .controls {
        width: 100%;
        height: 10%;
        background-color: #fff;

        .progress {
            width: 100%;
            height: 8px;

            .progressBox {
                width: 100%;
                height: 8px;
                background-color: #ffffff25;
                cursor: pointer;

                .progressBar {
                    transition: 0.3s;
                    height: 8px;
                    background-color: #cdbfe9;
                }
            }
        }
    }

}
</style>