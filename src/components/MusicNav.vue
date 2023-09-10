<template>
    <div class="box" @mouseleave="hidden">
        <div class="music">
            <div class="left">
                <img class="cover" @mouseenter="show" :class="{ 'active': useMusic.musicPlay.isplay }"
                    src="../assets//images/1.jpg" alt="">
            </div>
            <div class="right">
                <div class="last">
                    <div class="leftline"></div>
                    <div class="inner"></div>
                </div>
                <div class="middle" @click="changePlay">
                    <div class="stop" v-if="useMusic.musicPlay.isplay">
                        <div class="line1"></div>
                        <div class="line2"></div>
                    </div>
                    <div class="continue" v-else></div>
                </div>
                <div class="next">
                    <div class="inner"></div>
                    <div class="leftline"></div>
                </div>
            </div>
        </div>
        <div class="info" :class="{ issong: issong }">
            <Song></Song> 
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import useStore from '../store/index';
import Song from './Song.vue';
const useMusic = useStore()

// 解构pinia中的方法
const {changePlay} = useMusic.musicPlay

let issong = ref(false)

let timer
const show = () => {
    clearTimeout(timer)
    issong.value = true

}
const hidden = () => {
    timer = setTimeout(() => {
        issong.value = false
    }, 1000)
}

</script>

<style scoped lang="scss">
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.music {
    margin-left: -50px;
    width: 240px;
    height: 70px;
    background-color: rgba(135, 207, 235, 0.459);
    border-radius: 33px 30px 30px 33px;
    display: flex;
    align-items: center;
    box-shadow: inset 1px 1px 7px #000000;
    // flex-wrap: wrap;

    .left {
        margin-left: 10px;
        width: 60px;
        height: 60px;
        background-color: #939dcf;
        border-radius: 50%;
        box-shadow: 1px 1px 5px #3d4153;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .cover {
            width: 100%;
            cursor: pointer;
        }

        .active {
            animation: spin 8s linear infinite;
        }
    }

    .right {
        flex: 1;
        height: 60px;
        margin: 10px;
        background-color: #939dcf;
        border-radius: 32px;
        box-shadow: 1px 1px 7px #3d4153;
        background: linear-gradient(to top left, #817ccd 0%, #808cc5 50%, #a3ade2 100%);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;

        .last {
            transition-duration: 0.1s;
            width: 32px;
            height: 32px;
            background-color: #87CEEB;
            box-shadow: 1px 1px 5px #576f78;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            .inner {
                transition-duration: 0.1s;
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 15px solid #2279a6;
                display: inline-block;
            }

            .leftline {
                width: 3px;
                height: 17px;
                background-color: #2279a6;
                border-radius: 3px;
            }

            &:hover {
                transition-duration: 0.1s;
                box-shadow: 1px 1px 10px #576f78;

                .inner {
                    transition-duration: 0.1s;
                    border-right: 15px solid #1d98d6;
                }

                .leftline {
                    background-color: #1d98d6;
                }
            }

            &:active {
                box-shadow: 1px 1px 10px #576f78;

                .inner {
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    border-right: 18px solid #1d98d6;
                }

                .leftline {
                    background-color: #1d98d6;
                }
            }
        }

        .middle {
            width: 40px;
            height: 40px;
            background-color: #87CEEB;
            box-shadow: 1px 1px 5px #576f78;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            .stop {
                display: flex;
                justify-content: center;
                align-items: center;

                .line1 {
                    transition-duration: 0.3s;
                    width: 5px;
                    height: 20px;
                    background-color: #2279a6;
                    border-radius: 4px;
                }

                .line2 {
                    transition-duration: 0.3s;
                    margin-left: 5px;
                    width: 5px;
                    height: 20px;
                    background-color: #2279a6;
                    border-radius: 4px;
                }
            }

            &:hover {
                .line1 {
                    transition-duration: 0.3s;
                    background-color: #1d98d6;
                }

                .line2 {
                    transition-duration: 0.3s;
                    background-color: #1d98d6;
                }

                .continue {
                    transition-duration: 0.3s;
                    border-left: 17px solid #1d98d6;
                }
            }

            .continue {
                transition-duration: 0.3s;
                width: 0;
                height: 0;
                border-top: 12px solid transparent;
                border-bottom: 12px solid transparent;
                border-left: 17px solid #2279a6;
                display: inline-block;
                margin-left: 3px;
            }
        }

        .next {
            transition-duration: 0.1s;
            width: 32px;
            height: 32px;
            background-color: #87CEEB;
            box-shadow: 1px 1px 5px #576f78;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            .inner {
                transition-duration: 0.1s;
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-left: 15px solid #2279a6;
                display: inline-block;
            }

            .leftline {
                width: 3px;
                height: 17px;
                background-color: #2279a6;
                border-radius: 3px;
            }


            &:hover {
                transition-duration: 0.1s;
                box-shadow: 1px 1px 10px #576f78;

                .inner {
                    transition-duration: 0.1s;
                    border-left: 15px solid #1d98d6;
                }

                .leftline {
                    background-color: #1d98d6;
                }
            }

            &:active {
                box-shadow: 1px 1px 10px #576f78;

                .inner {
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    border-left: 18px solid #1d98d6;
                }

                .leftline {
                    background-color: #1d98d6;
                }
            }
        }
    }
}

.info {
    transition: 0.3s;
    width: 0;
    height: 0;
    position: fixed;
    margin-left: -75px;
    overflow: hidden;
    box-shadow: 0px 0px 10px #2E294Ea0;
}

.issong {
    transition: 0.3s;
    width: 300px;
    height: 200px;
}
</style>