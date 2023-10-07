<template>
    <div class="box">
        <div class="body">
            <ul>
                <li v-for="(item, index) in albumData" :key="index">
                    <div class="item">
                        <div class="img" @click="toDetail(item)">
                            <img :src="item.albumPic || getImg(item.album_mid)">
                        </div>
                        <div class="albumName" @click="toDetail(item)">
                            <span>
                                {{ item.albumName || item.album_name }}
                            </span>
                        </div>
                        <div class="singer" @click="router.push({ name: 'SingerDetail', params: { singermid: item.singerMID } })" v-if="!NotClick">
                            <span>
                                {{ item.singerName || item.singer_name }}
                            </span>
                        </div>
                        <div class="singer" v-else>
                            <span>
                                {{ item.singerName || item.singer_name }}
                            </span>
                        </div>
                        <div class="time">
                            <span>
                                {{ item.publicTime || item.pub_time }}
                            </span>
                        </div>
                        <div class="songNum">
                            <span>
                                {{ item.song_count || item.latest_song.song_count }}首歌曲
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
    albumData: {
        type: Array,
    },
    NotClick: {
        type: Boolean,
        default: false
    }
})

// 获取专辑图片
const getImg = (item) => {
    const str = `http://y.gtimg.cn/music/photo_new/T002R180x180M000${item}_2.jpg`
    return str
}

// 跳转到专辑详情
const toDetail = (item) => {
    console.log(item);
    router.push({
        name:'AlbumDetail',
        params: {
            albummid: item.albumMID
        }
    })
}


const { albumlistData } = toRefs(props)

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

                .albumName {
                    flex: 1;
                    margin-left: -100px;
                    max-width: 250px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .singer {
                    // flex: 1;
                    margin-left: 20px;
                    max-width: 150px;
                    width: 100px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .time {
                    // flex: 1;
                    margin-left: 20px;
                    max-width: 200px;
                    width: 150px;

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
            }
        }
    }
}
</style>