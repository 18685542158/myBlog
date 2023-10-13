<template>
    <div class="box searchPage" @scroll="loadMoreData">
        <div class="head">
            <div class="item" v-for="(value, key, index) in categoryData" :key="index">
                <div class="row" v-for="(item, Cindex) in value" :key="Cindex" @click="selClick(key, Cindex)"
                    :class="selObj[key] == Cindex ? 'active' : ''">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div class="body">
            <searchformv :mvData="mvData"></searchformv>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch } from 'vue';
import { debounce } from 'lodash';          // 防抖

import {
    getMV
} from '../api/request'
import searchformv from './SearchForMv.vue';

const props = defineProps({
    categoryData: {
        type: Object
    },
    loading: {
        type: Boolean
    }
})
const emit = defineEmits(['update:loading'])
const { categoryData } = toRefs(props)


// 创建一个对象，用于保存上方选择项的selItem
const selObj = ref({})
// 创建一个对象，用于保存搜索的数据
const query = ref({
    pageNo: 1,
    pageSize: 20,
    area: 0,
    version: 0
})
// 创建一个mv数据，用于展示
const mvData = ref([])

//获取更多数据
const loadMoreData = debounce((e) => {
    const page = document.querySelector('.searchPage')
    if (Math.floor(page.scrollHeight - page.scrollTop) <= page.clientHeight) {
        // isLoading.value = true
        // emit('update:loading', true)
        query.value.pageNo += 1
        getMV(query.value).then((data) => {
            console.log(data);
            console.log(mvData.value);
            mvData.value = [...mvData.value, ...data.list]
        })
    }
}, 300)

// 创建一个方法，用于切换菜单
const selClick = (key, index) => {
    selObj.value[key] = index
    query.value[key] = categoryData.value[key][index].id
    getMV(query.value).then((data) => {
        console.log(data);
        mvData.value = data.list
    })
    // 估计顺便执行一下方法
}

watch(categoryData, () => {
    console.log(categoryData.value);
    for (let key in categoryData.value) {
        if (categoryData.value.hasOwnProperty(key)) {
            selObj.value[key] = 0;
            query.value[key] = categoryData.value[key][0].id
        }
    }
    getMV(query.value).then((data) => {
        console.log(data);
        mvData.value = data.list
    })
}, { immediate: true })

</script>

<style scoped lang="scss">
.box {
    width: 100%;

    .head {
        width: 100%;

        .item {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            margin: 2% 0;

            .row {
                transition: 0.1s;
                width: 70px;
                height: 30px;
                background-color: #9999994f;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 30px;
                margin-left: 2%;
                cursor: pointer;
                color: antiquewhite;

                &:hover {
                    background-color: #9999998b;
                    color: #ffffff;
                }
            }

            .active {
                background-color: #ffffffe7;
                color: #333;

                &:hover {
                    background-color: #ffffffe7;
                    color: #333;
                }
            }

        }

    }

}
</style>