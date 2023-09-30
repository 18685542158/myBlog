<template>
    <div>
        <div class="search-kuang" :class="{ 'isSearchKuang': isSearchKuang }">
            <div v-if="!inputValue.length">
                <div class="hisSearch">
                    <span>历史搜索</span><span class="iconfont icon-shanchu"></span>
                </div>
                <div class="item">
                    <!-- <ul>
                        <li v-for="(item, index) in inputValueArr">
                            <span>{{ item }}</span>
                        </li>
                    </ul> -->
                </div>
            </div>
            <div v-else class="content">

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps, toRefs, watch } from 'vue';

const props = defineProps({
    isSearchKuang: {
        type: Boolean
    },
    inputValue: {
        type: String
    }
})
const { isSearchKuang, inputValue } = toRefs(props)

const inputValueArr = reactive([])

watch(inputValue, (newValue) => {
    if (newValue) {
        inputValueArr.push(newValue)
        console.log(newValue);
    }
})
</script>

<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');

.search-kuang {
    transition: 0.3s;
    box-sizing: border-box;
    position: fixed;
    width: 300px;
    height: 0;
    min-height: 0px;
    top: 60px;
    left: 252px;
    border-radius: 0 0 10px 10px;
    background-color: #ffffffe7;
    backdrop-filter: blur(10px);
    overflow: hidden;
    z-index: 100;

    .hisSearch {
        position: relative;
        left: 15px;
        width: 90%;
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.707);

        span {
            font-size: 14px;
            color: #33333398
        }

        .icon-shanchu {
            cursor: pointer;
        }
    }
}

.isSearchKuang {
    width: 300px;
    height: 100px;
    min-height: 100px;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.538);
    display: inline-block;
}

.content {}
</style>