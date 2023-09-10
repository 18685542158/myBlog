<template>
    <RouterView v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </transition>
    </RouterView>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import router from '../router';
onMounted(() => {
    // router.push('/home')
})
</script>

<style scoped lang="scss"></style>