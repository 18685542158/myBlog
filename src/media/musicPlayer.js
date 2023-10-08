export const musicPlayer = {
    audio: null,
    isPlaying: false,
    duration: 0,

    // 初始化播放器
    init() {
        this.audio = new Audio();
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            // 播放结束后的逻辑处理
        });
        // this.audio.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
    },

    // 开始播放
    play() {
        if (!this.audio) {
            this.init();
        }
        if (!this.isPlaying) {
            this.audio.play();
            this.isPlaying = true;
        }
    },

    // 暂停播放
    pause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        }
    },

    // 停止播放
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
        }
    },

    // 设置音量
    setVolume(volume) {
        if (this.audio) {
            this.audio.volume = volume;
        }
    },

    // 设置当前播放进度
    setCurrentTime(newTime){
        if(this.audio){
            this.audio.currentTime=newTime
        }
    },

    // 获取歌曲当前播放时间
    getCurrentTime() {
        return this.audio.currentTime;
    },

    // 获取歌曲总时长
    getDuration() {
        return this.audio.duration;
    },

    // 添加加载歌曲
    loadSong(song) {
        return new Promise((resolve, reject) => {
            if (!this.audio) {
                this.init();
            }

            // 停止当前正在播放的歌曲
            this.stop();

            const audioUrl = song.url;

            // 加载新的歌曲资源
            const onLoad = () => {
                this.audio.removeEventListener('canplay', onLoad);
                resolve();
            };

            const onError = (error) => {
                this.audio.removeEventListener('error', onError);
                reject(error);
            };

            this.audio.addEventListener('canplay', onLoad);
            this.audio.addEventListener('error', onError);
            this.audio.src = audioUrl;

            // 处理网络请求超时的情况
            setTimeout(() => {
                if (!this.audio.currentSrc && !this.audio.error) {
                    onError(new Error('加载歌曲超时，请检查网络连接'));
                }
            }, 5000);
        });
    },
};