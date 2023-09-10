<template>
    <div class="box" :class="{ light: useLight.light.isLight }">
        <div class="info">
            <div class="title">
                <h1>DaShan</h1>
            </div>
            <div class="text">
                <h2>Perhaps we can do things we truly enjoy, instead of constantly losing our true selves in pursuit of
                    material needs. We have the ability to become the person we truly want to be.</h2>
            </div>
        </div>
        <div class="item"></div>
    </div>
</template>
    
<script setup>
import useStore from '../../store/index';
const useLight = useStore()

</script>
    
<style scoped lang="scss">
.box {
    transition: 0.5s;
    width: 80%;
    height: 80%;
    backdrop-filter: blur(3px);
    background-color: #2E294Ea0;

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

.light {
    transition: 0.8s;
    backdrop-filter: blur(3px);
    background-color: #75afc3a0;
}
</style>