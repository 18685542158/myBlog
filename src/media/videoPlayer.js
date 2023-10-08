export const videoPlayer = {
    video: null,
    isPlaying: false,
    duration: 0,

    init() {
        this.video = document.createElement('video');
        this.video.addEventListener('ended', () => {
            this.isPlaying = false;
            // 播放结束后的逻辑处理
        });
    },

    play() {
        if (!this.video) {
            this.init();
        }
        if (!this.isPlaying) {
            this.video.play();
            this.isPlaying = true;
        }
    },

    pause() {
        if (this.isPlaying) {
            this.video.pause();
            this.isPlaying = false;
        }
    },

    stop() {
        if (this.video) {
            this.video.pause();
            this.video.currentTime = 0;
            this.isPlaying = false;
        }
    },

    setVolume(volume) {
        if (this.video) {
            this.video.volume = volume;
        }
    },

    setCurrentTime(newTime) {
        if (this.video) {
            this.video.currentTime = newTime;
        }
    },

    getCurrentTime() {
        return this.video.currentTime;
    },

    getDuration() {
        return this.video.duration;
    },

    loadVideo(videoUrl) {
        return new Promise((resolve, reject) => {
            if (!this.video) {
                this.init();
            }

            this.stop();

            this.video.src = videoUrl;
            this.video.load();

            this.video.addEventListener('canplay', resolve);
            this.video.addEventListener('error', reject);

            setTimeout(() => {
                if (!this.video.currentSrc && !this.video.error) {
                    reject(new Error('加载视频超时，请检查网络连接'));
                }
            }, 5000);
        });
    }
};