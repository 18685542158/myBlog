<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>DaShan</h1>
            </div>
            <div class="text">
                <h2>Perhaps we can do things we truly enjoy, instead of constantly losing our true selves in pursuit of
                    material needs. We have the ability to become the person we truly want to be.</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';

</script>

<style scoped lang="scss">
.box {
    padding: 50px 30px;
    .info {
        width: 100%;
        height: 30%;
        border-bottom: 1px solid black;

        .title {
            padding: 0 10px;
            height: 60%;

            h1 {
                font-size: 90px;
                font-weight: 500;
            }
        }

        .text {
            padding: 0 10px;

            h2 {
                font-weight: 300;
                text-indent: 2em;
                line-height: 1.5;
            }
        }
    }
}
</style>