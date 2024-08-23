<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Project</h1>
            </div>
            <div class="text">
                <h2>在学校这段时间，通过很多途径，会接触到大大小小的很多项目，也很感谢自己能在学校期间接触这些项目，让自己可以忙碌起来，
                    算起来的话，两段项目经历和一段实习经历可以拿来说说。</h2>
            </div>
        </div>
        <div class="header">
            <div class="content-box" v-for="(item) in data">
                <div class="content1">
                    <div class="title"><span>{{item.title}}</span></div>
                    <div class="text">
                        <h2 v-text="item.desc" style="white-space: pre-line">
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue';


const data=reactive([
    {
        title:'一网统管管理系统',
        desc:`
        ● 需求分析与设计：参与政府后台管理系统智慧管理项目的需求分析和设计阶段，负责一个模块的制作。与团队成员共同探讨交互逻辑，提出设计观点，指定服务接口，确保满足政府管理需求。\n● 技术开发：使用前端技术参与项目的开发和测试。与后端开发人员合作讨论技术实现方案，进行前后端联调，确保系统功能的完整实现。\n● 问题解决与优化：参与修改项目下其他模块的问题，积极解决系统中的技术和功能性问题，提升整体产品质量和用户体验。\n● 团队协作：与开发团队紧密合作，在需求确认、设计讨论、开发实现、测试联调等阶段积极沟通协作，保证项目按时高质量交付。`
    },
    {
        title:'Web主页',
        desc:`
        ● 项目搭建：通过使用 vite 脚手架和 vue-router，成功搭建个人主页网站，在页面切换和展示方面实现良好的用户体验。\n● 功能特点：该播放器通过爬取 qq 音乐的 API 数据，实现音乐的播放、搜索以及推荐等功能，为网站增添强大的音乐功能。\n● 技术实现：通过扫码登录获取 cookie 登录，实现类似客户端播放器的音乐播放体验，让用户方便使用音乐功能，为网站增加互动性和吸引力。\n● 用户体验优化：注重用户体验的优化，确保网站的页面设计简洁清晰、操作流畅，让用户能够快速找到所需信息并享受音乐播放体验。`
    },
    {
        title:'字节-抖音&淘宝商业化权益项目',
        desc:`
        ● 项目背景：淘宝在抖音中投放应用类广告，引导看到广告的用户进行淘宝应用的下载/跳转，为提升应用下载/跳转的广告转化率，构建信息流广告中的权益信息展示模块，引导用户进入淘宝后下单；\n● 用户调研：使用问卷星设计用户对抖音广告权益的调研问卷，回收有效问卷 100 份，通过性别、年龄等多维度分析，确定了本次权益样式的设计方向，输出用户调研报告；\n● 竞品分析：选择快手、小红书、bilibili 等产品进行竞品分析，利用用户体验五要素进行竞品拆解，重点聚焦权益类利益点的前端展示形式，总结其优势劣势，输出竞品分析报告；\n● 产品设计：设计信息流广告权益利益点的展示样式。通过 Axure 绘制原型图进行功能设计，输出产品需求文档；\n● 核心贡献：支持抖音*淘宝商业化权益项目的落地，并支持权益利益点展示的产品能力可复用于其他抖音广告重点客户。\n● 项目结果：通过 AB 测试口径测试得出项目的核心数据指标广告转化率提升大约了 30%，但需要广告主考虑投入产出比，所以没有全量上线。`
    },
    {
        title:'京东-数据化营销平台 ',
        desc:`
        ● 项目背景：京东内部业务割裂，各个部门对接客户落地能力容易出现重复造车轮的现象，导致人力成本和开发成本的资源浪费；不同业务部门的数据孤岛现象严重，交付客户维度低，容易出现数据断层现象；\n● 产品调研：梳理 ECRM 和 POI 产品功能，输出对应的功能鱼骨图，调研集团业务线和 KA 售前业务线，了解高频业务场景；对标阿里品牌数据银行，输出竞品调研报告；整理高频业务需求，针对这些高频业务需求，确定六大功能，包括人群包管理、标签管理、API 管理等；\n● 资源整合：整合京东科技二级部门的标签资源，完成 700+数据标签的资源整合，包括标签主题划分、标签口径统一、标签类型梳理和输出形式整理，落地标签人群圈选功能；对接上游产品运营部门，协同客户梳理指标资源，协同开发确认可行性，进行指标筛选、指标口径整理和优先级划分，形成指标文档，落地人群洞察功能；\n● 产品设计：负责 API 管理、标签管理、人群包管理、渠道管理的功能设计，输出对应的 PRD 文档；对接开发人员、测试人员以及运维人员，完成项目的开发、测试、上线；保障相关功能按时保质上线；\n● 项目结果：部门人员可以释放人力 8 人/月支持其他业务，效率提升 80%多；品牌商可以直接使用标准化的功能，实现用户洞察、用户抓取和用户触达；通讯云、京东大屏、京耕、京准通和鹊桥等触达业务单量比上季度多出约合 200 万 GMV。
`
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
        height: 500px;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
        // border-bottom: 1px solid black;

        .content-box {
            width: 100%;
            // height: 100%;
            box-sizing: border-box;
            padding: 30px 30px 30px 0;

            .content1 {
                width: 100%;
                // height: 100%;

                .title {
                    width: 100%;
                    height: 15%;
                    font-size: 25px;

                    span {
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