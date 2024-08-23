<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Experence</h1>
            </div>
            <div class="text">
                <h2>大一的时候学习了c语言，大二到大三之间学习了java程序设计，学习了软件工程这门课程，因为接触了墨刀、摹客这类原型设计工具，
                    所以对前端产生了兴趣，于是产生了学习前端的想法。前端是从22年中开始学习的吧，然后学习了html，css，js等，
                    然后在23年初学习了nodejs，然后开始接触vue，在23年的7月到12月进行了前端实习。</h2>
            </div>
        </div>
        <div class="content">
            <div class="content-box">
                <div class="content1">
                    <div class="title">我的实习：<span>北明软件有限公司</span></div>
                    <div class="text">
                        <h2>
                            担任政府项目下的智慧管理模块项目的前端工程师，以及公司其他项目的 Web 网页制作。项目在国庆期间进行初验，
                            其中智慧管理项目的具体内容是政府后台管理页面的模块，全程参与项目的需求分析，设计，开发以及测试等几个阶段，
                            项目的开发使用的技术是 Vue2+Element UI+Gdui2+Echarts ，与后端开发人员讨论技术实现方案，指定服务接口，与
                            后端进行测试联调。从七月开始实习，帮助公司项目组进行系统外的页面的制作，对 ui ，审美，有一定的感知。
                            八月，加入公司一网统管管理系统项目组，对一个政府下的老项目进行开发，项目从18年开始，所以用的是 vue2，与项目组成员进行讨论，
                            建议，与项目经理进行交流，与另一位实习生共同开发模块，并且对项目的 bug  进行排查与修复，会根据客户需求更新功能，
                            有较强的学习能力，可以自己解决绝大部分问题。
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
    overflow-y: scroll;

    .info {
        width: 100%;
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

    .content {
        margin-top: 2%;
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