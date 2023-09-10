import { defineStore } from 'pinia';

export default defineStore('musicPlay', {
    state: () => {
        return {
            // 暂停或播放
            isplay: false,
            // 播放模式
            playModel: 'loop',
            // 用作点击切换下一个的信号
            toNext:false,

            // 歌曲时长
            duration:0,
            // 当前播放时长
            currentTime:0,
            // 播放进度百分比
            num:0,
            // 进度条是否可拖动
            isMove:false,
            audio: []
        };
    },
    getters: {

    },
    actions: {
        // 暂停还是播放
        changePlay() {
            this.isplay = !this.isplay
        },
        // 顺序播放，随机播放，单曲循环
        changePlayModel() {
            if (this.playModel == 'loop') {
                this.playModel = 'random'
            } else if (this.playModel == 'random') {
                this.playModel = 'singLoop'
            } else if (this.playModel == 'singLoop') {
                this.playModel = 'loop'
            }
        },
    }
});