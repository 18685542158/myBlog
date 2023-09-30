<template>
    <div class="box">
        <div class="body">
            <ul>
                <li v-for="(item, index) in 10">
                    <div class="item">
                        <div class="img">
                            <img src="../assets/images/1.jpg">
                        </div>
                        <div class="desc">
                            我是一段描述
                        </div>
                        <div class="user">
                            我是用户
                        </div>
                        <div class="num">
                            多少多少播放
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import { ref, reactive } from 'vue';

</script>
    
<style scoped lang="scss">
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
                // background-color:#fff;
                border-bottom: 1px solid #ffffff94;
            }
        }
    }
}
</style>