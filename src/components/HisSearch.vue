<template>
    <div>
        <div class="search-kuang" :class="{ 'isSearchKuang': isSearchKuang, 'openH': inputValue.length && isSearchKuang }">
            <div v-if="!inputValue.length">
                <div class="hisSearch">
                    <span>历史搜索</span><span class="iconfont icon-shanchu"></span>
                </div>
                <div class="hisSearchBody">
                    <ul>
                        <li v-for="(item, index) in array">
                            <div class="item" @click="toSearch(item)" :title="item">
                                <span>{{ item }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else class="content">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, defineProps, toRefs, watch, computed } from 'vue';
import useStore from '../store/index';
import { storeToRefs } from "pinia"
const router = useRouter()
const useMusic = useStore()
const { hisSearch } = storeToRefs(useMusic.music)


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

const array = computed(() => { return hisSearch.value.reverse() })

const toSearch = (item) => {
    console.log(item);
    router.push({
        name: 'Search',
        params: {
            key: item
        }
    })
}

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
    // min-height: 0px;
    top: 60px;
    left: 252px;
    border-radius: 0 0 10px 10px;
    background-color: #ffffffe7;
    backdrop-filter: blur(10px);
    overflow: hidden;
    z-index: 100;
    overflow-y: scroll;


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

    .hisSearchBody {
        margin-top: 3px;

        ul {
            display: flex;
            padding: 0 20px;
            flex-wrap: wrap;

            li {
                .item {
                    padding: 4px;
                    background-color: #33333317;
                    margin: 5px 0;
                    margin-right: 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }
    }
}

.isSearchKuang {
    transition: 0.3s;
    width: 300px;
    height: 110px;
    // height: auto;
    // min-height: 100px;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.538);
    display: inline-block;
}

.openH {
    min-height: 200px;
    height: auto;
}

.content {
    height: auto;
}
</style>