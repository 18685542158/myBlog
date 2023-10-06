<template>
    <div class="box">
        <div class="body">
            <ul>
                <li v-for="(item, index) in lyricData" :key="index">
                    <div class="item" :class="index == open ? 'open' : ''">
                        <div class="songName">
                            <span :title="item.title">{{ item.title }}</span>
                        </div>
                        <div class="content">
                            <span v-html="lyricFormat(item.content)"></span>
                            <span :class="`iconfont icon-${index == open ? 'xiangshang' : 'xiangxia'}`"
                                style="font-size: 13px;color:#444;margin-right: 30px;" @click="chose(index)"></span>
                        </div>
                        <div class="songArtist">
                            <span v-for="(childItem, childIndex) in item.singer" :key="childIndex"
                                @click="router.push({ name: 'SingerDetail', params: { singermid: childItem.mid } })">
                                {{ childIndex != 0 ? '/' : '' }}{{ childItem.name }}
                            </span>
                        </div>
                        <div class="songAlbum"><span :title="item.album.name">{{ item.album.name }}</span></div>
                        <div class="songTime"><span>{{ timeFormat(item.interval) }}</span></div>
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
    lyricData: {
        type: Array
    }
})

// 默认展开歌词1
const open = ref(0)

// 创建歌词展开的选择
const chose = (index) => {
    if (index == open.value) {
        open.value = 999
        return
    }
    open.value = index
}

// 创建一个方法，用于把获取到的歌曲总时长和当前时长换算为60进制的时分秒形式
const timeFormat = (time) => {
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    if (hours > 0) {
        return `${formattedHours}:${formattedMins}:${formattedSecs}`;
    }
    return `${formattedMins}:${formattedSecs}`;
}

// 创建一个方法，接收歌词内容，将歌词里面的\n转换为可渲染内容
const lyricFormat = (content) => {
    const newContent = content.replace(/\\n/g, '<br>')
    // console.log(content);
    // console.log(newContent);
    return newContent
}

</script>
    
<style scoped lang="scss">
@import url('../assets/icon/iconfont.css');


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
                transition: 0.3s;
                width: 100%;
                max-height: 80px;
                border-bottom: 1px solid #ffffff94;
                display: flex;
                justify-content: space-between;
                align-items: start;
                overflow: hidden;
                padding-top: 20px;

                .songName {
                    flex: 1;
                    margin-left: 20px;
                    max-width: 150px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .content {
                    flex: 1;
                    max-width: 300px;
                    display: flex;
                    justify-content: space-between;

                    span {
                        cursor: pointer;
                    }
                }

                .songArtist {
                    flex: 1;
                    max-width: 200px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .songTime {
                    flex: 1;
                    max-width: 50px;

                    span {
                        @extend %ellipsis-style;
                    }
                }

                .songAlbum {
                    flex: 1;
                    max-width: 200px;

                    span {
                        @extend %ellipsis-style;
                    }
                }
            }

            .open {
                transition: 0.5s;
                // height: auto;
                max-height: 3000px;
            }
        }
    }

}
</style>