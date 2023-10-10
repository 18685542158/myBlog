<template>
    <div class="box">
        <div class="head">
            <h1>视频</h1>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
    // 获取最新MV   0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    getNewMV,

    // 以下这俩可以结合组一个视频库
    // 获取mv分类
    getMvCategory,
    // 根据分类获取mv
    getMV,


    // 下面这两个可以结合起来做一个排行榜
    // 获取榜单的名称
    getTop,
    // 获取榜单详情
    getTopDetail,


} from '../../api/request';

// 大概是进行排行榜的搜索
// 下面参数的来源是getTop
const longQuery = reactive({
    id: '201',
    pageSize: '10',
    period: '2023-10-10',
    time: ''
})

// 获取mv分类的数据
const categoryData = ref({})

// 创建一个对象，用于发送网络请求
const query = reactive({
    pageNo: '1',
    pageSize: '20',
    area: '15',
    version: '7'
})



onMounted(() => {
    getTop().then((data) => {
        console.log(data);
    })
    getTopDetail(longQuery).then(data => {
        console.log(data);
    })
})

</script>

<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;
    overflow-y: scroll;

    .head {
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #ffffff81;
        padding: 40px;
        box-sizing: border-box;

        h1 {
            font-size: 40px;
        }
    }

}
</style>