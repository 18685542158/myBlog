<template>
    <div class="head" :class="{ light: useLight.light.isLight }">
        <div style="width: 70px; display: flex; align-items: center;">
            <Light id="lightNav"></Light>
        </div>
        <MusicNav id="musicNav"></MusicNav>
        <ul class="nav">
            <li v-for="(item, index) in navList" :key="index" @click="handActive(item, index)"
                :class="{ 'active': index == navIndex }">
                <span>{{ item.item }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import MusicNav from './MusicNav.vue';
import Light from './Light.vue';
import router from '../router';
import useStore from '../store/index';
const useLight = useStore()
const navList = [
    {
        item: "主页",
        name: "Index",
        path: '/home'
    },
    {
        item: "经验",
        name: "Experience",
        path: '/home/experience'
    },
    {
        item: "爱好",
        name: "Hobby",
        path: '/home/hobby'
    },
    {
        item: "项目",
        name: "Item",
        path: '/home/item'
    },
    {
        item: "联系",
        name: "Contact",
        path: '/home/contact'
    },
    {
        item: "其他",
        name: "Other",
        path: '/home/other'
    }
]


let navIndex = ref(0)
const handActive = (item, i) => {
    navIndex.value = i,
        router.push(item.path)
}
</script>

<style scoped lang="scss">
.head {
    transition-duration: 0.5s;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    width: 100%;
    height: 70px;
    backdrop-filter: blur(3px);
    background-color: #2E294Ea0;


    .nav {
        width: 40%;
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        li {
            cursor: pointer;
            width: 50px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            border-bottom: 0px #87CEEB solid;

            span {
                transition: 1s;
                font-size: 18px;
                font-weight: 400;
                font-family: Realist;
                color: #87CEEB;
            }
        }

        .active {
            transition-duration: 0.3s;
            border-bottom: 3px #87CEEB solid;
            box-sizing: border-box;
        }
    }
}

.light {
    transition: 0.3s;
    backdrop-filter: blur(3px);
    background-color: #75afc3a0;

    .nav {
        li {
            span {
                transition: 1s;
                color: #ffffff;
            }
        }

        .active {
            border-bottom: 3px solid #95d4f7;
        }
    }


}

@media screen and (max-width: 768px) {
    .head {
        #musicNav {
            display: none;
        }

        .nav {
            width: 70%
        }
    }
}
</style>