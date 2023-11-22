<template>
    <div class="box" :class="{ light: useLight.light.isLight }">
        <div class="info">
            <div class="title" @click="toHobby">
                <h1>Hobby</h1>
            </div>
            <div class="text">
                <h2>我的兴趣偏向艺术方面吧，我对音乐，画画，跳舞都挺感兴趣的，在高中的时候一直有在弹吉他，唱歌也还不错啦，虽然没有学过画画，
                    但是同学对我画画的技艺评价也还是蛮高的，我对审美的感知也挺不错的，然后呢，我也算是个二次元吧，很喜欢动漫里面天马行空的想象，
                    也喜欢动漫所带来的故事，喜欢动漫里面的曲子，喜欢闭上眼睛感受它们的意境。我认为它们给我的生活带来了很多的乐趣，如果有机会的话，
                    我也很有意愿能够往这方面发展
                </h2>
            </div>
        </div>
        <div class="header">
            <div class="item" v-for="(item, index) in data" :key="index">
                <div class="activeContent" v-if="item.title == '我的追求的是什么'">
                    <div class="desc">
                        <h1>{{ item.title }}：</h1>
                        <h2>{{ item.content }}</h2>
                    </div>
                    <div class="image">
                        <img :src="`/images/${item.cover}.jpg`" alt="">
                    </div>
                </div>
                <div class="content" v-else>
                    <div class="image">
                        <img :src="`/images/${item.cover}.jpg`" alt="">
                    </div>
                    <div class="desc">
                        <h1>{{ item.title }}：</h1>
                        <h2>{{ item.content }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue';
import useStore from '../../store/index';
import { useRouter } from 'vue-router';
const router = useRouter()
const useLight = useStore()

const data = reactive([
    {
        title: '最喜欢的音乐',
        name: '夜空中最亮的星',
        cover: 'star',
        content: `音乐这种东西，其实我个人也没有最喜爱这一说，在每个时期都会有我比较喜欢的歌曲，比如初中时期喜欢听电音，高中时期慢慢的开始转变成纯音乐，
        现在大学了，喜欢的音乐慢慢的变成了纯音乐，大概也是跟心境有关吧，然后现在大四了，开始慢慢听一些什么华语流行乐，特别是陈奕迅，胡彦斌这种，越听越有感觉，
        然后呢听了这么久的歌，还是感觉“夜空中最亮的星”这首歌最好听，每一次听都能感受到作者想要传递的感情`
    },
    {
        title: '最喜欢的动漫',
        name: '进击的巨人',
        cover: 'attack',
        content: `动漫真是个美好的东西啊哈哈哈，有些时候感觉当个二次元也挺好的，至少可以暂时忘记三次元带来的烦恼，投入到二次元带来的故事里面，
        我喜欢的动漫作品有很多，比如京阿尼的作品，描绘了跟多美好的事情，《紫罗兰永恒花园》，《轻音少女》等等，也看少数的热血漫，比如《一拳超人》等等，
        其中《巨人》这部作品是我的最爱，初中入的坑，被谏山创的细节震惊到了，新奇的设定更是吸引我，笔下的每个人都描绘的有血有肉，今年（2023年）动画就完结了
        看完之后我久久不能释怀`
    },
    {
        title: '最喜欢的艺人',
        name: '胡彦斌',
        cover: 'hu',
        content: `胡彦斌是我比较欣赏的一名歌手，虽然外貌不是他的强项，但是他依靠自己出色的能力，硬生生让所有人忠于他的才华。胡彦斌的魅力，
        表现在他对音乐的痴迷与专业上，也表现在他的真诚与耐心里。要知道，在此之前胡彦斌在大众眼中的标签一直都是“丑”，就连谈个恋爱都会被人们冷嘲热讽，
        说配不上对方。从“不好看”到“迷人”这也正是说明，胡彦斌身上的音乐才华与人格魅力，终于是冲破了人们对于他颜值的肤浅认知。`
    },
    {
        title: '我的追求的是什么',
        cover: 'ye',
        content: `哎，怎么说呢，估计是从小的经历吧，也可能是压力大了莫名的emo，可能还是会感觉自己有点早熟，明明才20多岁就开始感叹人生了，
        我啊，不是一个特别喜欢繁华的人，我不喜欢城市的拥挤喧嚣，我更喜欢乡下的怡然自乐，emm，当然也不能说没有了世间的欲望，我还是比较喜欢的钱的，
        因为除了向下的怡然自乐，我也有很多其他的想法，比如很早以前就像买台钢琴了，寝室的吉他都快两年没碰了，其实我也很喜欢画画，我也喜欢摄影，
        如果要找我跳舞也不是不行，我也想唱歌，我想做好多事情，但是现实就是我必须先有钱，我向往自由，这可能也是我喜欢《进击的巨人》这部作品的原因吧，
        说真的我也挺想为了自己的追求而拼一下的，如果可以的话，当一名自媒体工作者也不是不行，哈哈哈`
    },
])

// 跳转到音乐播放器
const toHobby = () => {
    // window.open('')
    // 打开新窗口
    const newWindow = window.open('', '_blank')
    if (newWindow) {
        // 跳转到第二个页面
        newWindow.location.href = '/HobbyDetail'
    }
}


</script>
    
<style scoped lang="scss">
.box {
    transition: 0.5s;
    width: 80%;
    height: 80%;
    overflow-y: scroll;

    h1 {
        cursor: pointer;
    }

    .info {
        width: 100%;
        margin-bottom: 6%;
        // height: 30%;

        .title {
            padding: 0 10px;
            margin-bottom: 2%;

            h1 {
                font-size: 90px;
                font-weight: 500;

            }
        }

        .text {
            padding: 0 10px;
            padding-bottom: 2%;
            border-bottom: 1px solid black;

            h2 {
                font-weight: 300;
                text-indent: 2em;
                line-height: 1.5;
            }
        }
    }

    .header {
        width: 100%;
        height: 45vh;
        display: grid;
        overflow-y: scroll;

        .item {
            width: 90%;
            aspect-ratio: 3/1;

            .content {
                width: 100%;
                height: 100%;
                display: flex;
                margin: 10px 0;
                margin-left: 2%;
                background-color: #ffffff2c;

                .image {
                    height: 100%;
                    aspect-ratio: 1/1;
                    overflow: hidden;

                    img {
                        width: 95%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }

                .desc {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    overflow-y: hidden;

                    h1 {
                        font-weight: 300;
                        font-size: 30px;
                        display: inline-block;
                        width: 100%;
                        padding-bottom: 2%;
                        border-bottom: 1px solid black;
                        font-weight: 600;
                    }

                    h2 {
                        display: inline-block;
                        width: 100%;
                        max-height: 70%;
                        font-weight: 300;
                        font-size: 16px;
                        line-height: 20px;
                        text-indent: 2em;
                        overflow-y: scroll;
                    }
                }
            }

            .activeContent {
                position: relative;
                width: 100%;
                height: 100%;
                margin: 10px 0;
                margin-left: 2%;

                // background-color: #ffffff2c;
                .image {
                    width: 100%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }

                .desc {

                    // position: fixed;
                    // display: flex;
                    // flex-direction: column;
                    // justify-content: space-evenly;
                    // z-index: 99;
                    h1 {
                        font-weight: 300;
                        font-size: 30px;
                        display: inline-block;
                        width: 100%;
                        padding-bottom: 2%;
                        margin-bottom: 2%;
                        border-bottom: 1px solid black;
                        font-weight: 600;
                    }

                    h2 {
                        font-weight: 300;
                        font-size: 16px;
                        line-height: 20px;
                        text-indent: 2em;
                    }
                }
            }
        }
    }

}
</style>