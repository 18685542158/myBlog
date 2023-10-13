<template>
    <div class="box">
        <ul>
            <li v-for="(item, index) in mvData" :key="index">
                <div class="item" @click="router.push({ name: 'MvDetail', params: { id: item.v_id || item.vid } })">
                    <div class="img">
                        <img :src="item.mv_pic_url || item.pic || item.cover_pic || item.picurl" alt="">
                        <div class="cover">
                            <div class="playCount">
                                <span>{{ format(item.play_count || item.listenCount || item.playcnt) }}</span>
                            </div>
                            <div class="btn">
                                <div class="middle">
                                    <div class="continue"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <span>{{ item.mv_name || item.title || item.name }}</span>
                        <div class="singArr">
                            <span v-for="(childItem, childIndex) in item.singer_list || item.singers" :key="childIndex">
                                {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { ref, reactive, toRefs, defineProps } from 'vue';
const props = defineProps({
    mvData: {
        type: Array
    }
})

const { mvData } = toRefs(props)

// 歌曲播放次数格式转换成万
const format = (num) => {
    if (String(num).length < 4) {
        return num + '播放'
    } else if (String(num).length == 4) {
        return '0' + '.' + String(num)[0]+'万'
    }
    if (Number(String(num)[String(num).length - 3]) < 5) {
        return Number(String(num).slice(0, String(num).length - 4) + '.' + String(num).slice(String(num).length - 3, String(num).length - 2)) + '万'
    } else {
        const newNum = Number(String(num).slice(0, String(num).length - 4) + String(num).slice(String(num).length - 3, String(num).length - 2))
        return Number(String(newNum + 1).slice(0, String(newNum + 1).length - 1) + '.' + String(newNum + 1).slice(String(newNum + 1).length - 1, String(newNum).length)) + '万'
    }
}

</script>
    
<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;

    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;

        li {
            min-width: 27%;
            flex-grow: 1;
            margin: 2%;
            max-width: 270px;

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

                    span {
                        color: rgb(0, 0, 0);
                        font-size: 18px;
                        cursor: pointer;
                    }

                    .singArr {
                        margin-top: 2%;
                        overflow: hidden;
                        height: 15px;

                        span {
                            // display: inline-block;
                            max-width: 100%;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            font-size: 15px;
                            cursor: pointer;
                            text-align: center;
                            color: #333
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
</style>