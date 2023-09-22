<template>
    <div class="box">
        <div class="head">
            <div class="nav">
                <ul>
                    <li v-for="(item, index) in navData" :class="selItem == index ? 'active' : ''" @click="chose(item,index)">
                        <div class="item">
                            {{ item.title }}
                        </div>
                    </li>
                </ul>
                <div class="seek" :style="`transform: translateX(${-300 + selItem * 120}px); `"></div>
            </div>
            <div class="info" @click="{ console.log(key); }"
                style="display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;">
                <!-- <div>
                    搜索：<span>"{{ key }}""</span>
                </div>
                <div>
                    结果：{{ 200 }}条
                </div> -->
            </div>
        </div>
        <div class="body">
            <searchforsong v-if="selItem == 0"></searchforsong>
            <searchforsonglist v-else-if="selItem == 1"></searchforsonglist>
            <searchforsinger v-else-if="selItem == 2"></searchforsinger>
            <searchforalbum v-else-if="selItem == 3"></searchforalbum>
            <searchformv v-else-if="selItem == 4"></searchformv>
            <searchforlyric v-else-if="selItem == 5"></searchforlyric>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineExpose, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import searchforalbum from '../../components/SearchForAlbum.vue';
import searchforlyric from '../../components/SearchForLyric.vue';
import searchformv from '../../components/SearchForMv.vue';
import searchforsinger from '../../components/SearchForSinger.vue';
import searchforsong from '../../components/SearchForSong.vue';
import searchforsonglist from '../../components/SearchForSongList.vue';
const route = useRoute()
import {
    search,   // 搜索，我设置了三个参数，第一个是key关键词，第二个是type类型，第三个是pageNum第几页，
    //0：单曲，2：专辑，7：歌词，8：用户，9：歌手，12：mv
} from '../../api/request';

const key = ref('')
const type = ref(0)
const pageNum = ref(1)
// 默认菜单为歌曲，也就是0号菜单
const selItem = ref(0)

// 给这几个组件创建数据
const songData = reactive([])
const songlistData = reactive([])
const singerData = reactive([])
const albumData = reactive([])
const mvData = reactive([])
const lyricData = reactive([])

// nav菜单
const navData = [
    {
        title: '单曲',
        type: 0,
    },
    {
        title: '歌单',
        type: 3,
    },
    {
        title: '歌手',
        type: 1,
    },
    {
        title: 'mv',
        type: 4,
    },
    {
        title: '专辑',
        type: 2,
    },
    {
        title: '歌词',
        type: 7,
    },
]

// 菜单切换，对应高亮显示
const chose = (item,index) => {
    selItem.value = index
    type.value=item.type
    getData()
}
const getData = async () => {
    console.log(key.value,type.value);
    const data = await search(key.value, type.value, pageNum.value)
    console.log(data);
}

// 当type发生变化时，重新获取数据
// watch(type, () => {
//     getData()
// })

// 当key发生变化时，重新获取数据
watch(route, (to, from, next) => {
    key.value = route.params.key
    getData()
})

// 当pageNum发生变化时，接着获取数据，添加到尾部
watch(pageNum, () => {
    // 这里处理获取接下来的内容
})

onMounted(() => {
    key.value = route.params.key
    getData()
})

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;

    .head {
        display: flex;
        background-color: #ffffff18;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #ffffff81;

        .nav {
            width: 75%;
            height: 100px;
            // background-color: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            ul {
                display: flex;

                // background-color: #333;
                li {
                    cursor: pointer;

                    .item {
                        transition: 0.3s;
                        width: 120px;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        font-size: 20px;
                        user-select: none;
                    }
                }

                .active {
                    color: #f2f2fe;
                }
            }

            .seek {
                width: 60px;
                height: 3px;
                border-radius: 5px;
                background-color: #fff;
                margin-top: 8px;
                transition: 0.3s;
            }
        }

        .info {
            flex: 1;
        }
    }
}
</style>