<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Contact me</h1>
            </div>
            <div class="text">
                <h2>缺人吗？找我啊！！！！！</h2>
            </div>
        </div>
        <div class="header">
            <div class="item" v-for="(item, index) in data">
                <div class="font">
                    <span :class="`iconfont icon-${item.font}`"></span>
                </div>
                <div class="name">
                    <span>{{ item.key }}</span>
                </div>
                <div class="info" @click="toGitHub(item.key)">
                    <span>{{ item.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue';

const data = ref([
    {
        font: '24gf-telephone',
        key: 'Tel',
        value: '18685542158'
    },
    {
        font: 'QQ',
        key: 'QQ',
        value: '1538518479'
    },
    {
        font: 'weixin',
        key: 'WeiXin',
        value: 'HW153851479'
    },
    {
        font: 'youxiang',
        key: 'E-mail',
        value: '18685542158@163.com'
    },
    {
        font: 'github-fill',
        key: 'GitHub',
        value: '点击跳转'
    },
])

const toGitHub = (value) => {
    if(value=='GitHub')
    window.open('https://github.com/18685542158/myBlog', '_blank')
}

</script>
    
<style scoped lang="scss">
@import url('../../assets/icon/iconfont.css');

.box {
    transition: 0.5s;
    width: 80%;
    height: 80%;
    overflow-y: scroll;

    span {
        cursor: pointer;
    }

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
            padding: 2% 10px;
            border-bottom: 1px solid black;

            h2 {
                font-size: 23px;
                font-weight: 300;
                text-indent: 2rem;
                line-height: 1.5;
            }
        }
    }

    .header {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .item {
            transition: 0.3s;
            width: 100%;
            height: 20%;
            background-color: rgba(255, 255, 255, 0.214);
            border-bottom: 3px solid rgba(255, 255, 255, 0.501);
            margin-bottom: 4%;
            display: flex;
            align-items: center;
            margin-left: 10%;

            .font {
                margin-left: 2%;

                span {
                    font-size: 30px;
                }
            }

            .name {
                margin-left: 2%;

                span {
                    display: inline-block;
                    font-size: 20px;
                    width: 100px;
                    // background-color: #fff;
                }
            }

            .info {
                flex: 1;
            }

            &:hover{
                scale: 1.05;
            }
        }
    }

}</style>