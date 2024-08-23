<template>
    <div class="close" @click="close">
        <div class="closefont" title="关闭">×</div>
    </div>
    <div class="logOther" @click="isMyCookie = !isMyCookie">
        <div class="logOtherfont" title="登录其他账号cookie">Other</div>
    </div>
    <div class="box">
        <div class="box-head">
            <div class="box-head-left" v-if="isMyCookie">
                <h1>设置我的cookie:</h1>
                <textarea name="cookie" id="textarea" cols="35" rows="10" placeholder="此处输入cookie"></textarea>
            </div>
            <div class="box-head-left" v-else>
                <h1>设置其他cookie:</h1>
                <div class="input">
                    账号：<input type="text">
                </div>
                <textarea name="cookie" id="textarea" cols="35" rows="8" placeholder="此处输入cookie"></textarea>
            </div>
            <div class="box-head-right">
                <h1>说明：</h1>
                <h2>本音乐播放器是用的qq音乐的接口，但是qq音乐不像网易云那样向用户公开接口，接口需要用户自己在网上寻找，所以登录状态也需要去qq音乐的官网去登录之后去获取cookie，然后粘贴到此处，即可使用全部功能。否则的话，某些功能会被限制
                </h2>
            </div>
        </div>
        <div class="box-footer">
            <div class="btn" @click="submit" :class="{ 'wobble': shouldWobble }">确认</div>
        </div>
    </div>
</template>

<script setup>
import {
    setCookie,
    getUserDetail
} from '../api/request';

import { ref, reactive } from 'vue';
import useStore from '../store/index';
import { storeToRefs } from 'pinia';
const musicStore = useStore()
// 解构pinia里的方法
const { changeSettingCookie } = musicStore.music
// 解构pinia里的属性
const { uin } = storeToRefs(musicStore.music)
// 按钮是否摆动（当cookie有错误时）
const shouldWobble = ref(false);
// 登录我的cookie还是其他cookie
const isMyCookie = ref(true)
const submit = async () => {
    // 执行上传cookie

    const value = document.querySelector('textarea').value

    await setCookie(value)
    if (isMyCookie.value == false) {
        const inputValue=document.querySelector('input').value
        if (!value||!inputValue) {
            shouldWobble.value = true;
            setTimeout(() => {
                shouldWobble.value = false;
            }, 500);
        }else{
            uin.value = inputValue
        }
    }
    const data = await getUserDetail(uin).catch(err => {
        console.log(err)
    })

    /*     if (!data) {
            alert('你的cookie不正确，前往qq音乐官网获取正确的cookie')
            return
        } */

    if (!data || !value) {
        shouldWobble.value = true;

        setTimeout(() => {
            shouldWobble.value = false;
        }, 500);
    } else {
        location.reload();
    }


}
const close=()=>{
    if(!musicStore.music.hasCookie){
        uin.value=1538518479
    }
    changeSettingCookie()
}
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

    &:hover {
        background-color: #d794e9d7;
    }
}

.logOther {
    width: 55px;
    height: 14px;
    background-color: #94cae984;
    position: fixed;
    border-radius: 5px;
    z-index: 99;
    left: 80%;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: end;
    cursor: pointer;
    color: #333;
    font-size: 14px;

    &:hover {
        background-color: #94cae9d7;
    }
}

.box {
    width: 100%;
    height: 100%;
    background-color: #8a696900;

    .box-head {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            font-weight: 300;
            font-size: 20px;
        }

        .box-head-left {
            width: 60%;
            height: 80%;
            box-sizing: border-box;
            padding: 10px;

            .input {
                margin-top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 15px;
                color: #3b3b3b;

                input {
                    background-color: #ffffff00;
                    border: none;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.449);
                }
            }

            #textarea {
                margin-top: 10px;
                background-color: #ffffff51;
                resize: none;
            }

            /* 定制滚动条的样式 */
            textarea::-webkit-scrollbar {
                width: 10px;
                /* 滚动条的宽度 */
            }

            /* 定制滚动条滑块的样式 */
            textarea::-webkit-scrollbar-thumb {
                background-color: #ab9aaa72;
                /* 滑块的颜色 */
                border-radius: 5px;
                /* 滑块的圆角 */
            }

            /* 定制滚动条轨道的样式 */
            textarea::-webkit-scrollbar-track {
                background-color: #f1f1f100;
                /* 轨道的颜色 */
                border-radius: 5px;
                /* 轨道的圆角 */
            }
        }

        .box-head-right {
            flex: 1;
            height: 80%;
            border-left: 1px solid rgb(48, 38, 38);
            box-sizing: border-box;
            padding: 10px;

            h2 {
                font-size: 16px;
                font-weight: 300;
                text-indent: 2ch;
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