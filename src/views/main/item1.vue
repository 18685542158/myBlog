<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>DaShan</h1>
            </div>
            <div class="text">
                <h2>Perhaps we can do things we truly enjoy, instead of constantly losing our true selves in pursuit of
                    material needs. We have the ability to become the person we truly want to be.</h2>
            </div>
        </div>
        <div class="content">
            <div class="box1">
                <div class="content1">
                    <div class="title">我的经历：</div>
                    <div class="text">
                        <h2>我来自贵州遵义，是湖南城市学院的一名大四学生，目前居住在湖南益阳，性格内敛且稳重，目前的技术方向是前端开发，最终目标是一名全栈工程师，前端框架以Vue为主，目前的技术栈为Vue3+vite+JavaScript+Pinia，当然也有在学习TypeScript，不过目前做的项目的是个人向的小项目，所以Ts用的不多，移动端的项目也有了解过，比如微信小程序等，有了解过Uniapp相关的知识，可以写一点小程序代码
                        </h2>
                    </div>
                </div>
            </div>
            <div class="box2">
                <div class="content2">
                    <div class="title">我的技能：</div>
                    <div class="body">
                        <div class="skill1" v-for="(item, index) in skillList" :key="index">
                            <div class="desc">
                                <span>{{ item.item }}</span><span>{{ item.percent }}%</span>
                            </div>
                            <div class="jindutiao">
                                <div class="jindutiaozhanbi" :style="`width: ${item.percent}%;`"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// 我的技能
const skillList = ref([
    {
        item: "HTML+CSS",
        percent: 80,
    },
    {
        item: "JavaScript",
        percent: 60,
    },
    {
        item: "Vue",
        percent: 80,
    },
    {
        item: "NodeJs",
        percent: 40,
    },
    {
        item: "Java",
        percent: 40,
    },
])
</script>

<style scoped lang="scss">
// 大盒子
.box {
    width: 80%;
    height: 80%;

    // 顶部大黑体
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

    // 右侧主页部分
    .content {
        width: 100%;
        height: 400px;
        padding: 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        // 内容一
        .box1 {
            width: 70%;
            height: 100%;
            box-sizing: border-box;
            padding: 30px 30px 30px 0;

            .content1 {
                width: 100%;
                height: 100%;
                border-right: 1px solid black;

                .title {
                    width: 100%;
                    height: 15%;
                    font-size: 25px;
                }

                .text {
                    width: 100%;
                    height: 80%;

                    // background-color: #fff;
                    h2 {
                        padding-right: 10px;
                        font-size: 16px;
                        font-weight: 100;
                        text-indent: 2em;
                        line-height: 2em;
                    }
                }
            }
        }


        // 我的技能，以及进度条
        .box2 {
            width: 30%;
            height: 100%;
            box-sizing: border-box;
            padding: 30px 0;

            .content2 {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;

                .title {
                    width: 100%;
                    height: 15%;
                    font-size: 25px;
                }

                .body {
                    display: flex;
                    flex-direction: column;

                    .skill1 {
                        transition: 0.3s;
                        cursor: pointer;
                        width: 100%;
                        height: 30px;
                        margin: 13px 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        &:hover {
                            scale: 1.05;
                        }

                        .desc {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 16px;
                            font-weight: 100;
                        }

                        .jindutiao {
                            width: 100%;
                            height: 8px;
                            background-color: #fff;
                            border-radius: 10px;
                            overflow: hidden;

                            .jindutiaozhanbi {
                                height: 8px;
                                background-color: #f1b9b9;
                            }
                        }
                    }
                }

            }
        }
    }
}

@media (max-width: 610px) {
    .box {
        .info {
            height: 40%;
        }

        .content {
            .box1 {
                width: 100%;

                .content1 {
                    border: none;

                    .text {
                        h2 {
                            padding-right: 0px;
                        }
                    }
                }
            }

            .box2 {
                display: none;
            }
        }
    }
}</style>