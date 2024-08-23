<template>
    <div class="close" @click="close">
        <div class="closefont" title="关闭">×</div>
    </div>
    <div class="box">
        <div class="box-head">
            <div class="box-head-left">
                <h1>QQ 扫码登录绑定</h1>
                <div class="img">
                    <img :src="imageUrl" alt="加载中" @load="handleImageLoaded()" @click="fetchImageData()"
                        title="点击刷新二维码" />
                </div>
            </div>
            <div class="box-head-right">
                <h1>说明：</h1>
                <h2>本音乐播放器是用的qq音乐的接口，使用qq扫码登录即可使用全部功能。否则的话，某些功能会被限制。
                </h2>
            </div>
        </div>
        <!-- <div class="box-footer">
            <div class="btn" @click="submit" :class="{ 'wobble': shouldWobble }">确认</div>
        </div> -->
    </div>
</template>

<script setup>
import {
    setCookie,
    getUserDetail,
    verify
} from '../api/request';

import { ref, reactive, onMounted } from 'vue';
import useStore from '../store/index';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const imageUrl = ref(''); // 图片URL初始为空，用于响应式绑定

const fetchImageData = async () => {
    imageUrl.value = `http://localhost:3000/qr-code?userid=${Date.now()}`
}

const extractUrl = (data) => {
    // 这个正则表达式用于匹配 URL 
    const urlRegex = /'(https?:\/\/[^']*)'/;
    const match = data.match(urlRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

const handleImageLoaded = async () => {
    console.log('图片加载完毕');
    verify().then(response => {
        console.log(response);
    // 执行上传cookie    
    const cookie='qqmusic_key='+response.data.QQmusic_Key+'; uin='+response.data.QQmusic_uin+'; qm_keyst='+response.data.qm_keyst
    // console.log(cookie);
    // if(response.data.QQmusic_Key){
        
    // }
    localStorage.setItem('uin',response.data.QQmusic_uin)
    setCookie(cookie)
    location.reload();

    }).catch(err => {
        console.log(err);
    })
}
// ptcz
// RK
// uin




const musicStore = useStore()
// 解构pinia里的方法
const { changeSettingCookie } = musicStore.music
// 解构pinia里的属性

const close = () => {
    // if (!musicStore.music.hasCookie) {
    //     uin.value = 1538518479
    // }
    changeSettingCookie()
}


onMounted(() => {
    const { uin } = storeToRefs(musicStore.music)
    // if(uin.value){
    //     console.log(uin.value);
    // }else{
        fetchImageData()
    // }
})

</script>

<style scoped lang="scss">
.close {
    width: 14px;
    height: 14px;
    background-color: #d794e984;
    position: fixed;
    z-index: 99;
    left: 96%;
    border-radius: 50%;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: end;
    cursor: pointer;
    color: #333;
    transition: 0.3s;

    &:hover {
        background-color: #d794e9d7;
    }
}

.box {
    width: 100%;
    height: 100%;
    background-color: #acacac93;

    .box-head {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            font-weight: 300;
            font-size: 20px;
            text-align: center;
        }

        .box-head-left {
            width: 60%;
            height: 80%;
            box-sizing: border-box;
            padding: 10px;
            h1{
                padding-bottom:8%;
            }

            .img {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 60%;
                    aspect-ratio: 1/1;
                    cursor: pointer;
                }
            }
        }

        .box-head-right {
            flex: 1;
            height: 80%;
            border-left: 1px solid rgb(48, 38, 38);
            box-sizing: border-box;
            padding: 10px;

            h1{
                padding-bottom:8%;
            }

            h2 {
                font-size: 16px;
                font-weight: 300;
                text-indent: 2ch;
                line-height:1.5;
            }
        }
    }

    .box-footer {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: start;

        .btn {
            width: 80px;
            height: 35px;
            background-color: #d694e91c;
            box-shadow: 1px 1px 6px #02020242;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: #d794e940;
            }
        }

        // 当cookie输入错误时，按钮的动作
        .wobble {
            animation: wobble 0.5s ease-in-out;
        }

        @keyframes wobble {
            0% {
                transform: translateX(-3px);
            }

            10% {
                transform: translateX(4px);
            }

            20% {
                transform: translateX(-5px);
            }

            30% {
                transform: translateX(6px);
            }

            40% {
                transform: translateX(-7px);
            }

            50% {
                transform: translateX(8px);
            }

            60% {
                transform: translateX(-7px);
            }

            70% {
                transform: translateX(6px);
            }

            80% {
                transform: translateX(-5px);
            }

            90% {
                transform: translateX(4px);
            }

            100% {
                transform: translateX(-3px);
            }
        }
    }
}
</style>