<template>
    <div class="box">
        <div class="body">
            <ul>
                <li v-for="(item, index) in songlistData" :key="index">
                    <div class="item">
                        <div class="img" @click="toDetail(item)">
                            <img :src="item.imgurl">
                        </div>
                        <div class="desc" @click="toDetail(item)">
                            <span>
                                {{ item.dissname }}
                            </span>
                        </div>
                        <div class="user">
                            <span>
                                {{ item.creator.name }}
                            </span>
                        </div>
                        <div class="songNum">
                            <span>
                                {{ item.song_count }}首歌曲
                            </span>
                        </div>
                        <div class="num">
                            <span>
                                {{ format(item.listennum) }}万次播放
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import { ref, reactive, toRefs, defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    songlistData: {
        type: Array,
    }
})

const { songListData } = toRefs(props)

// 跳转到歌单详情
const toDetail = (item) => {
    console.log(item);
    router.push({
        name:'SongColist',
        params: {
            dissid: item.dissid
        }
    })
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

</script>
    
<style scoped lang="scss">
%ellipsis-style {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
}

.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;

    .body {
        li {
            display: flex;
            flex-direction: column;

            .item {
                width: 100%;
                height: 130px;
                border-bottom: 1px solid #ffffff94;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .img {
                    flex: 1;
                    margin-left: 20px;
                    max-width: 250px;
                    height: 80%;
                    cursor: pointer;

                    img {
                        // border-radius:10px;
                        height: 100%;
                    }
                }

                .desc {
                    flex: 1;
                    margin-left: -100px;
                    max-width: 250px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .user {
                    // flex: 1;
                    margin-left: 20px;
                    max-width: 150px;
                    width: 100px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .songNum {
                    // flex: 1;
                    margin-left: 20px;
                    max-width: 200px;
                    width: 150px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .num {
                    // flex: 1;
                    margin-left: 20px;
                    max-width: 200px;
                    width: 150px;

                    span {
                        @extend %ellipsis-style;
                    }
                }
            }
        }
    }
}
</style>