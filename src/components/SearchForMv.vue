<template>
    <div class="box">
        <ul>
            <li v-for="(item, index) in mvData">
                <div class="item">
                    <div class="img">
                        <img :src="item.mv_pic_url" alt="">
                        <div class="cover">
                            <div class="btn">
                                <div class="middle">
                                    <div class="continue"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info">

                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { ref, reactive, toRefs, defineProps } from 'vue';
const props = defineProps({
    mvData: {
        type: Array
    }
})

const { mvData } = toRefs(props)


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
            min-width: 200px;
            flex-grow: 1;
            margin: 20px;
            max-width: 300px;

            .item {
                width: 100%;
                aspect-ratio: 4/3;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;

                .img {
                    width: 100%;
                    position: relative;
                    border-radius: 5px;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }

                    .cover {
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

                        &:hover {
                            transition: 0.3s;
                            background-color: #271e1e85;

                            .btn {
                                opacity: 1;
                            }
                        }
                    }
                }

                .info{
                    flex:1;
                    background-color: #fff;
                }
            }
        }
    }
}
</style>