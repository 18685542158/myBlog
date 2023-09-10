import { defineStore } from 'pinia';

export default defineStore('music', {
    state: () => {
        return {
            hasCookie: true,
            isSettingCookie: false,      // 这里指的是设置cookie的窗口是否展示
            uin: 1538518479,
            songmid: '',
            nextSongmid: '002UJg1T3tbCsK',
            songPlayList: {              // 播放列表，大概率要存进localStorage
                thedissid: '',
                list: []
            },
        };
    },
    getters: {

    },
    actions: {
        // 设置cookie的窗口是否展出
        changeSettingCookie() {
            this.isSettingCookie = !this.isSettingCookie
        },

        // 设置播放器歌曲到本地
        setSongmid() {
            const data = JSON.stringify(this.songmid)
            localStorage.setItem('songmid', data)
        },

        // 从本地获取播放器歌曲
        getSongData() {
            const data = localStorage.getItem('songmid')
            if (!data || data == 'undefined' || data == 'null') {
                this.songmid = '000NXxWk10W0B2'
                this.setSongmid()
            } else {
                this.songmid = JSON.parse(data)
            }
        },





        // 设置播放列表到local
        setSongPlayList() {
            const data = JSON.stringify(this.songPlayList)
            localStorage.setItem('playList', data)
        },

        // 从local获取播放列表
        getSongPlayList() {
            const data = JSON.parse(localStorage.getItem('playList'))
            if (!data) {
                this.songPlayList = {
                    thedissid: '3580408357',
                    list: []
                }
            } else {
                this.songPlayList = data
            }
        },

        // 添加一首歌曲到播放列表
        addSongList() {
            const index = this.songPlayList.list.findIndex(item => item == this.songmid)
            // 判断是否是新加入的歌曲，如果是，就在尾部添加,不是的话，就把列表里面旧的数据先删除，然后再在尾部添加
            if (index != -1) {
                this.songPlayList.list.splice(index, 1)
            }
            this.songPlayList.list.push(
                this.songmid
            )
            this.setSongPlayList()
        },
    }
});