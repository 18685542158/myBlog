<template>
    <div class="box">
        <div style="width: 100%;height: 300px;background-color: #fff;">
            {{ singerData }}
        </div>
        <div class="body">
            <ul>
                <li v-for="(item, index) in singerData">
                    <div class="main" v-if="index == 0">
                        <div class="img">
                            <img :src="singerData[0].singerPic" alt="">
                        </div>
                        <div>
                            <span>{{ singerData[0].singerName }}</span>
                        </div>
                    </div>
                    <div class="item">
                        {{ item.singerName }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import { ref, reactive, toRefs, defineProps, watch } from 'vue';

const props = defineProps({
    singerData: {
        type: Array
    }
})

const { singerData } = toRefs(props)

const mainSinger = ref([])

watch(singerData, (newValue) => {
    console.log(newValue);
    // mainSinger.value.push()
    console.log(mainSinger.value);
})

</script>
    
<style scoped lang="scss">
.box {
    position: relative;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: #2e294e25;

    .body {

        ul {
            display: flex;
            flex-wrap: wrap;


            .item {
                margin: 20px;
                width: 200px;
                height: 200px;
                border: 1px solid #333;
            }

            .main {
                width: 100%;
                height: 200px;
                border: 1px solid #fff;
            }
        }
    }
}
</style>