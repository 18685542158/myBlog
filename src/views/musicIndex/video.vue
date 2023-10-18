<template>
    <div class="box">
        <transition name="loading" mode="out-in">
            <div class="loading" v-show="loading">
                <lloading></lloading>
            </div>
        </transition>
        <div class="head">
            <h1>视频</h1>
        </div>
        <div class="select" v-if="!loading">
            <ul>
                <li v-for="(item, index) in selectArr" :key="index">
                    <div class="selItem" @click="selItem = index" :class="selItem == index ? 'active' : ''">
                        <span>{{ item.name }}</span>
                    </div>
                </li>
            </ul>
            <div class="seek" :style="`transform: translateX(${40 + selItem * 140}px); `"></div>
        </div>
        <div class="newMv" v-if="selItem == 0 && !loading">
            <mvBanner :mvData="value" v-for="(value, key, index) in mvData" :key="index"></mvBanner>
        </div>
        <div class="MvHub" v-else-if="selItem == 1 && !loading">
            <!-- 获取的分类数据传过去 -->
            <mvHub :categoryData="categoryData" :loading="loading" @update:loading="loading = $event"></mvHub>
        </div>
    </div>
</template>

<script setup>
import mvBanner from '../../components/MvBanner.vue';
import mvHub from '../../components/MvHub.vue';
import lloading from '../../components/Loading.vue';

import { ref, reactive, onMounted } from 'vue';
import {
    // 获取最新MV   0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本     type
    getNewMV,

    // 以下这俩可以结合组一个视频库
    // 获取mv分类
    getMvCategory,

} from '../../api/request';


// 获取mv分类的数据
const categoryData = ref({})
// const mvData = ref({})
const mvData = reactive({
    arr1: {},
    arr2: {},
    arr3: {},
    arr4: {},
    arr5: {},
    arr6: {},
})

const loading = ref(true)
const selItem = ref(0)
const selectArr = reactive([
    {
        name: '新MV',
    },
    {
        name: '视频库',
    }
])


const getAllMvData = () => {
    getNewMV(0).then(data => {
        mvData.arr1 = data
    })
    getNewMV(1).then(data => {
        mvData.arr2 = data
    })
    getNewMV(2).then(data => {
        mvData.arr3 = data
    })
    getNewMV(3).then(data => {
        mvData.arr4 = data
    })
    getNewMV(4).then(data => {
        mvData.arr5 = data
    })
    getNewMV(5).then(data => {
        mvData.arr6 = data
    })
}


onMounted(() => {
    getAllMvData()
    getMvCategory().then(d => {
        categoryData.value = d
        loading.value = false
    })
    // getAllMv().then((data) => {
    //     mvData.value = data
    //     loading.value = false
    //     console.log(mvData.value);
    // }).catch(err => {
    //     console.log(err);
    //     loading.value = false
    // })
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
    display: flex;
    flex-direction: column;

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

    .select {
        width: 100%;
        background-color: #ffffff43;

        ul {
            display: flex;

            li {
                .selItem {
                    cursor: pointer;
                    width: 100px;
                    height: 10px;
                    margin: 20px;
                    text-align: center;

                    span {
                        font-size: 19px;
                    }
                }

                .active {
                    transition: 0.3s;
                    color: #fff
                }
            }
        }

        .seek {
            width: 60px;
            height: 5px;
            border-radius: 5px;
            background-color: #fff;
            margin-top: 8px;
            transition: 0.3s;
        }
    }

    .newMv {
        // height: calc(100% - 160px);
        overflow-y: scroll;
        // flex: 1;
    }

    .MvHub {
        height: calc(100% - 180px);
        padding-right: 2px;
        overflow-x: hidden;
        overflow-y: scroll;
        // flex: 1;
    }

}
</style>