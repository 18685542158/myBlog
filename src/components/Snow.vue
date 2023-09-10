<template>
    <canvas class="snow" :class="{ light: useLight.light.isLight }"></canvas>
</template>
    
<script setup>
import { onMounted, defineProps } from 'vue';
import useStore from '../store/index';
const useLight = useStore()

const props=defineProps({
    cover:{
        type:String         // 参数类型
    }
})

onMounted(() => {
    let canvas = document.querySelector('.snow');
    let context = canvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let num = 80;
    let snows = [];
    for (let i = 0; i < num; i++) {
        snows.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 3 + 1,
            speedX: 0
        })
    }

    // 雪花的移动
    let move = () => {
        for (let i = 0; i < num; i++) {
            let snow = snows[i];
            if (!snow.speedX) {
                snow.speedX = Math.random() * 0.6
            }
            snow.x += snow.speedX
            snow.y += 0.3;
            if (snow.x > w) {
                snow.x = 0,
                snow.speedX = 0
            }
            if (snow.y > h) {
                snow.y = 0
                snow.speedX = 0
            }
        }
    }

    // 绘制每一朵雪花的起始位置
    let draw = () => {
        context.clearRect(0, 0, w, h);
        context.beginPath();
        context.fillStyle = '#fff';
        context.shadowColor = '#fff';
        context.shadowBlur = 10
        for (let i = 0; i < num; i++) {
            let snow = snows[i];
            context.moveTo(snow.x, snow.y);
            context.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2)
        }
        context.fill();
        context.closePath();
        move();
    }

    const debounce = (func, delay) => {
        let timer;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(func, delay);
        }
    }

    // 事件监听器函数
    const handleResize = () => {
        // 处理窗口大小变化的逻辑
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        for (let i = 0; i < num; i++) {
            snows.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 3 + 1,
                speedX: 0
            })
        }
        draw()
    }

    window.addEventListener("resize", debounce(handleResize, 200));

    // 网页刚加载时绘制雪花
    draw();

    const snowTimer = setInterval(() => {
        draw()
    }, 10);

})

</script>
    
<style scoped>

.snow {
    background: linear-gradient(225deg, #131ce7 10%, #3b1367 28.5%, #221341 40.5%, #f47c40 50.5%, #6e84c8 76.5%, #4dbaf5 99.5%);
    background-size: 320%;
    background-position: 100%;
    transition: background-position 1s ease;
    backdrop-filter: blur(10px);
}

.light {
    background-position: 0%;
}
</style>