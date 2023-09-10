<template>
    <div class="box">
        <div class="head">
            <h1>关于我的开发日志</h1>
            <div class="add">
                <span>开始时间：2023年7月16日</span>
                <div class="addbtn" @click="isopen=!isopen">
                    添加
                </div>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <div class="leftItem" v-for="item in comments.list" :key="item.id">
                    <h1>{{ item.title }} <span class="iconfont icon-shanchu" @click="deleteItem(item.id)"></span><span
                            class="iconfont icon-bianji" @click="editItem(item.id)" :title="'上次编辑时间：'+item.time"></span></h1>
                    <div class="leftItem-content">
                        <pre class="formatted-text" v-text="item.content"></pre>
                        <!-- <div v-text="item.content" class="formatted-text"></div> -->
                    </div>
                    <div class="leftItem-time">
                        <span>{{ item.pretime }}</span>
                    </div>
                </div>
            </div>
            <div class="right" :class="{'active':isopen}">
                <form @submit="submitLogForm" style="display: flex;flex-direction: column;justify-content: space-evenly;">
                    <!-- 表单项 -->
                    <label v-if="!update" for="title">标题:</label>
                    <label v-else for="title">修改标题:</label>
                    <input type="text" id="title" v-model="logForm.title" :placeholder="placeholderTitle" autocomplete="off" 
                        @focus="placeholderTitle = ''" @blur="placeholderTitle = '请输入标题'">
                    <label v-if="!update" for="textarea">内容:</label>
                    <label v-else for="textarea">修改内容:</label>
                    <textarea name="content" id="content" cols="40" rows="11" v-model="logForm.content"
                        :placeholder="placeholderContent" @focus="placeholderContent = ''"
                        @blur="placeholderContent = '请输入你的内容'"></textarea>
                    <div class="btn">
                        <button v-if="!update" type="submit" :class="{ 'wobble': shouldWobble }">提交</button>
                        <button v-else type="submit" :class="{ 'wobble': shouldWobble }">修改</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import {
    addLogData,
    deleteLogData,
    updateLogData
} from '../../api/request'
// 编辑栏是否打开
const isopen=ref(false)

// 建立一个数据保存data.json里面的数据
const comments = reactive({
    list: []
})
// 获取data.json里面的数据
const fetchComments = async () => {
    try {
        const response = await axios.get('/data/log_data.JSON'); // 使用axios发送GET请求来获取JSON数据
        comments.list = response.data.log_List; // 将获取的JSON数据赋值给comments数组
    } catch (error) {
        console.error(error);
    }
}
// 提交方法
const submit = async (logForm) => {
    await addLogData(logForm)
    fetchComments()
}
const placeholderTitle = ref('请输入你的标题')
const placeholderContent = ref('请输入你的内容')
// 关于log的表单
const logForm = reactive({
    id: 0,
    title: '',
    content: '',
    time: ''
})

// 按钮是否摆动（当表单有错误时）
const shouldWobble = ref(false);

const submitLogForm = async (event) => {
    event.preventDefault();
    const value = document.querySelector('#title').value
    const data = document.querySelector('#content').value
    if (!data || !value) {
        shouldWobble.value = true;
        setTimeout(() => {
            shouldWobble.value = false;
        }, 500);
    } else {
        // 处理表单数据
        const id = Date.now()
        logForm.id = id
        const currentDateTime = new Date()
        const currentYear = currentDateTime.getFullYear();
        const currentMonth = currentDateTime.getMonth() + 1; // 月份范围是 0-11，所以要加 1
        const currentDate = currentDateTime.getDate();
        function farmat() {
            const getMonth = (currentMonth / 10) >= 1 ? String(currentMonth) : ('0' + currentMonth)
            const getDay = (currentDate / 10) >= 1 ? String(currentDate) : ('0' + currentDate)
            return currentYear + '-' + getMonth + '-' + getDay
        }
        const time = farmat()
        // logForm.content = logForm.content.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        logForm.time = time
        if (update.value) {
            await editItemBtn()
        } else {
            logForm.pretime = time
            submit(logForm)
        }
        // 清空表单数据
        logForm.title = '';
        logForm.content = '';
        logForm.id = 0;
        logForm.time = '';
        logForm.pretime = '';
    }
}
// 删除我的某一个log
const deleteItem = async (id) => {
    update.value = 0
    await deleteLogData(id)
    fetchComments()
}

// 以下是修改我的log，需要两个方法，以及一个变量，用于使这个提交按钮变成修改按钮
const update = ref(0)
// 使我的某一个log显示在发布栏
const editItem = async (id) => {
    isopen.value=true
    update.value = id
    const index = comments.list.findIndex(item => item.id === id)
    logForm.title = comments.list[index].title
    logForm.content = comments.list[index].content
    logForm.pretime=comments.list[index].pretime
}
// 修改我的log
const editItemBtn = async () => {
    await updateLogData(update.value, logForm)
    fetchComments()
    update.value = 0
}




// 挂载时干点啥
onMounted(() => {
    fetchComments()
})
</script>

<style scoped lang="scss">
@import url('../../assets/icon/iconfont.css');

.box {
    width: 100%;
    height: 100%;
    background-color: #ffffff30;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .head {
        position: relative;
        left: 5%;
        width: 90%;
        height: 150px;
        border-bottom: 1px solid black;
        box-sizing: border-box;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h1 {
            font-size: 40px;
        }

        .add{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .addbtn{
                padding: 8px 14px;
                background-color: #ffffff3a;
                border-radius: 5px;
                font-size: 14px;
                font-family: 'myFont';
                cursor: pointer;
                box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.599),inset 1px 1px 1px #fff;
                &:hover{
                    background-color: #ffffff4f;
                }
            }
        }
    }

    .content {
        width: 100%;
        height: calc(100% - 150px);
        display: flex;

        .left {
            flex:1;
            height: 100%;
            overflow-y: auto;

            .leftItem {
                width: 90%;
                margin-left: 5%;
                margin-top: 10px;
                margin-bottom: 60px;
                border-bottom: 2px solid rgba(0, 0, 0, 0.268);
                box-shadow: 1px 1px 1px 1px #333;
                padding-top: 5px;

                h1 {
                    margin: 5px;
                    font-size: 24px;
                    margin-bottom: 10px;

                    span {
                        float: right;
                        margin-right: 10px;
                        line-height: 24px;
                        font-weight: 100;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .leftItem-content {
                    margin-left: 20px;
                    margin-bottom: 10px;
                    margin-right: 10px;

                    // 解析换行
                    .formatted-text {
                        white-space: pre-wrap;
                        line-height: 2ch;
                        font-size: 16px;
                        font-family: 'myfont';
                    }

                }

                .leftItem-time {
                    span {
                        display: block;
                        // background-color: #fff;
                        float: right;
                        margin-top: 5px;
                    }

                    margin-top: 20px;
                }
            }
        }

        .right {
            transition: 0.3s;
            opacity: 0;
            width: 0%;
            height: 100%;
            background-color: #ffffff5f;
            padding: 10px;
            box-sizing: border-box;
            overflow: hidden;

            label {
                margin: 15px 0 10px 0;
                font-size: 20px;
            }

            input {
                padding: 6px;
                background-color: #ffffff00;
                border: none;
                border-bottom: 1px solid black;
                margin-bottom: 20px;

                &::placeholder {
                    color: #333
                }
            }

            textarea {
                margin-top: 5px;
                padding: 6px;
                background-color: #ffffff00;
                resize: none;
                font-size: 14px;
                margin-bottom: 20px;

                &::placeholder {
                    color: #333
                }
            }

            .btn {
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;

                button {
                    transition: 0.2s;
                    width: 180px;
                    height: 50px;
                    border-radius: 10px;
                    background-color: #ffffff7f;
                    font-size: 18px;
                    text-align: center;
                    letter-spacing: 0.38ch;
                    border: none;
                    box-shadow: 2px 2px 3px 1px #333;

                    &:hover {
                        background-color: #ffffffa9;
                    }

                    &:active {
                        box-shadow: 1px 1px 1px 1px #333;
                    }
                }

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

        .active{
            width: 40%;
            opacity: 1;
        }
    }
}
</style>