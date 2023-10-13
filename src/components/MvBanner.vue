<template>
    <div class="box">
        <div class="title">
            <span v-if="!loading">{{ mvData.typeName }}</span>
            <span v-else>加载。。。</span>
        </div>
        <div class="body" v-if="!loading">
            <!-- 将长度局限到这个div里面 -->
            <div class="content" :style="`width:${groupCount}00%;transform: translateX(-${pageNo * (100 / groupCount)}%);`">
                <!-- 每页 -->
                <div class="page" :style="`width:${100 / groupCount}00%;`" v-for="(item, index) in groupedArray ">
                    <ul>
                        <li v-for="(childItem, index) in item" :key="index">
                            <div class="item" @click="router.push({ name: 'MvDetail', params: { id: childItem.vid } })">
                                <div class="img">
                                    <img :src="childItem.picurl" alt="">
                                    <div class="cover">
                                        <div class="playCount">
                                            <span>{{ format(childItem.listennum) }}万</span>
                                        </div>
                                        <div class="btn">
                                            <div class="middle">
                                                <div class="continue"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info">
                                    <div class="span">
                                        <span>{{ childItem.mvtitle }}</span>
                                    </div>
                                    <div class="singArr">
                                        <span v-for="(threeItem, threeIndex) in  childItem.singers" :key="threeIndex">
                                            {{ threeIndex != 0 ? '/' : '' }}{{ threeItem.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="foot" v-if="!loading">
            <ul>
                <li v-for="(item, index) in groupCount">
                    <div class="item" @click="pageNo = index">
                        <div class="circle" :class="pageNo == index ? 'active' : ''"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div></div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    mvData: {
        type: Object
    }
})
const { mvData } = toRefs(props)

const loading = ref(true)
// 创建一个数组，用于渲染页面
const groupedArray = ref([])
// 计算由多少组
const groupCount = ref(0)
// 第几页
const pageNo = ref(0)

// 创建一个方法，将传进来的mvData，平均分为N个数组然后，每组6个
const computedData = () => {
    // 每组数组长度
    const groupLength = 6;
    // 计算分组数量
    groupCount.value = Math.ceil(mvData.value.list.length / groupLength);
    // 分组过程
    for (let i = 0; i < groupCount.value; i++) {
        // 以下两个index用于切割mvData
        const startIndex = i * groupLength;
        const endIndex = startIndex + groupLength;
        const group = mvData.value.list.slice(startIndex, endIndex);
        groupedArray.value.push(group);
    }
    loading.value = false
}



// 歌曲播放次数格式转换成万
const format = (num) => {
    if (Number(String(num)[String(num).length - 3]) < 5) {
        return Number(String(num).slice(0, String(num).length - 4) + '.' + String(num).slice(String(num).length - 3, String(num).length - 2))
    } else {
        const newNum = Number(String(num).slice(0, String(num).length - 4) + String(num).slice(String(num).length - 3, String(num).length - 2))
        return Number(String(newNum + 1).slice(0, String(newNum + 1).length - 1) + '.' + String(newNum + 1).slice(String(newNum + 1).length - 1, String(newNum).length))
    }
}


onMounted(() => {
    computedData()
})

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    padding: 2%;
    box-sizing: border-box;
    overflow: hidden;

    .title {
        span {
            font-size: 30px;
        }
    }

    .body {
        margin-top: 2%;
        width: 100%;
        aspect-ratio: 4/2;
        background-color: #ffffff4d;
        overflow: hidden;
        padding-top: 2%;

        .content {
            transition: 0.3s;
            height: 100%;
            // transform: translateX(-100%);
            display: flex;


            .page {
                width: 100%;
                height: 100%;
                box-sizing: border-box;

                ul {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: flex-start;

                    li {
                        width: 28%;
                        max-width: 50%;
                        margin: 0 2%;
                        flex-grow: 1;

                        .item {
                            width: 100%;
                            aspect-ratio: 4/3;
                            box-sizing: border-box;
                            display: flex;
                            flex-direction: column;

                            .img {
                                width: 100%;
                                height: auto;
                                position: relative;
                                border-radius: 5px;
                                // overflow: hidden;
                                // background-color: #000000;

                                img {
                                    transition: 0.3s;
                                    width: 100%;
                                }

                                .cover {
                                    transition: 0.3s;
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    top: 0;
                                    z-index: 99;
                                    cursor: pointer;

                                    .btn {
                                        transition: 0.3s;
                                        position: inherit;
                                        cursor: pointer;
                                        right: 20px;
                                        bottom: 10px;
                                        opacity: 0;

                                        .middle {
                                            width: 40px;
                                            height: 40px;
                                            box-shadow: inset 0px 0px 2px 2px #c1c1c1;
                                            border-radius: 50%;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;

                                            .continue {
                                                transition-duration: 0.3s;
                                                width: 0;
                                                height: 0;
                                                border-top: 12px solid transparent;
                                                border-bottom: 12px solid transparent;
                                                border-left: 20px solid #cecece;
                                                display: inline-block;
                                                margin-left: 5px;
                                            }

                                            &:hover {
                                                box-shadow: inset 0px 0px 2px 2px #ffffff;

                                                .continue {
                                                    transition: 0s;
                                                    border-left: 20px solid #ffffff;

                                                }
                                            }
                                        }
                                    }

                                    .playCount {
                                        transition: 0.3s;
                                        padding: 0 20px;
                                        // width: 100px;
                                        height: 20px;
                                        background-color: #bdcdfdc0;
                                        position: inherit;
                                        cursor: pointer;
                                        border-radius: 0 0 5px 0;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;

                                        span {
                                            color: #ffffff
                                        }
                                    }

                                    &:hover {
                                        transition: 0.3s;
                                        background-color: #271e1e85;

                                        .btn {
                                            opacity: 1;
                                        }

                                        .playCount {
                                            opacity: 0;
                                        }
                                    }
                                }
                            }

                            .info {
                                margin-top: 2%;
                                flex: 1;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;

                                .span {
                                    span {
                                        display: inline-block;
                                        color: rgb(0, 0, 0);
                                        font-size: 18px;
                                        cursor: pointer;
                                    }
                                }

                                .singArr {
                                    margin-top: 2%;
                                    overflow: hidden;
                                    height: 15px;

                                    span {
                                        display: inline-block;
                                        text-overflow: ellipsis;
                                        white-space: wrap;
                                        overflow: hidden;
                                        font-size: 15px;
                                        cursor: pointer;
                                        color: #333;
                                    }
                                }
                            }

                            &:hover {
                                .img {
                                    img {
                                        transform: translateY(-10px);
                                    }

                                    .cover {
                                        transform: translateY(-10px);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .foot {
        width: 100%;
        aspect-ratio: 20/1;
        // background-color: #fff;
        padding: 0 2%;
        box-sizing: border-box;
        border-bottom: 1px solid #818181;

        ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            li {
                .item {
                    width: 30px;
                    height: 30px;
                    // background-color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    .circle {
                        transition: 0.3s;
                        width: 10px;
                        height: 10px;
                        background-color: #b5b5b5;
                        border-radius: 5px;
                    }

                    .active {
                        background-color: #ffffff;
                    }

                    &:hover {
                        .circle {
                            background-color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>