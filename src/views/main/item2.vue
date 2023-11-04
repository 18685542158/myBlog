<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Experence</h1>
            </div>
            <div class="text">
                <h2>大一的时候学习了c语言，因为大一大二比较摆，所以大二到大三之间学习了java程序设计，但总感觉学不好，感觉跟不上后端的节奏，
                    于是产生了学习前端的想法，前端是从22年中开始学习的吧，然后学习了html，css，js等，然后开始学习老杜web，但是太偏向于后端了，
                    所以没有坚持下去，然后在23年初学习了nodejs，然后开始接触vue，同样是看的老杜的视频学习的</h2>
            </div>
        </div>
        <div class="content">
            <div class="content-box">
                <div class="content1">
                    <div class="title">我的实习：<span>北明软件有限公司</span></div>
                    <div class="text">
                        <h2>
                            担任政府项目下的智慧管理模块项目的前端工程师，以及公司其他项目的临时 Web  网页制作。项目会在国庆假进行初验，
                            其中智慧管理项目的具体内容是政府后台管理页面的其中一个模块的制作，全程参与项目的需求分析，设计，开发以及测试等几个阶段，
                            项目的开发使用的技术是 vue2+Element UI+Gdui2+Echarts ，与后端开发人员讨论技术实现方案，指定服务接口，与
                            后端进行测试联调。从七月开始实习，帮助公司项目组进行系统外的页面的制作其中不包括逻辑，所以对 ui ，审美，有一定的感知。
                            八月底至今，因为公司项目组缺人，所以临时对一个政府下的老项目进行开发，项目从18年开始，所以用的是 vue2，与项目组成员进行讨论，
                            建议，与项目经理进行交流，与另一位实习生共同开发了其中一个模块，并且对老项目的 bug  进行排查与修复，会根据客户需求添加新功能，
                            即使是老代码，也能在短时间内理清楚大概逻辑
                        </h2>
                    </div>
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

    .content {
        width: 100%;
        height: 400px;
        padding: 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        .content-box {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 30px 30px 30px 0;

            .content1 {
                width: 100%;
                height: 100%;

                .title {
                    width: 100%;
                    height: 15%;
                    font-size: 25px;

                    span{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                    }
                }

                .text {
                    width: 100%;
                    height: 80%;
                    margin-top: 2%;

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
    }
}
</style>