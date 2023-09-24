import { defineStore } from 'pinia';

export default defineStore('music', {
    state: () => {
        return {
            hasCookie: true,
            isSettingCookie: false,      // 这里指的是设置cookie的窗口是否展示
            uin: 1538518479,
            songmid: '',
            nextSongmid: '002UJg1T3tbCsK',
            songPlayList: [],               // 播放列表，大概率要存进localStorage 
            thedissid: '3580408357',
            songURL: [],                  // 还是得缓存歌曲的url等信息，不然每次打开页面都是从网上获取，太慢了
            searchSong:'',
        };
    },
    getters: {

    },
    actions: {
        // 设置cookie的窗口是否展出
        changeSettingCookie() {
            this.isSettingCookie = !this.isSettingCookie
        },

        // 设置当前播放的歌曲songmid到本地
        setSongmid() {
            const data = JSON.stringify(this.songmid)
            localStorage.setItem('songmid', data)
        },

        // 刚打开时，从本地获取需要播放的歌曲songmid
        getSongData() {
            console.log('触发获取本地歌曲songmid');
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
            const dataJSON = {
                thedissid: this.thedissid,
                songPlayList: this.songPlayList
            }
            const data = JSON.stringify(dataJSON)
            localStorage.setItem('playList', data)
        },

        // 从local获取播放列表
        getSongPlayList() {
            console.log('触发获取本地播放器的近16条歌曲数据');
            const data = JSON.parse(localStorage.getItem('playList'))
            if (!data) {
                this.songPlayList = []
                this.thedissid = '3580408357'
            } else {
                this.songPlayList = data.songPlayList
                this.thedissid = data.thedissid
            }
            this.getSongURL()
        },

        // 添加一首歌曲到播放列表   最多15首吧
        addSongList(name, artist, url, cover, lyc, songmid) {
            // 判断是否是新加入的歌曲，
            const index = this.songPlayList.findIndex(item => item == this.songmid)
            // 不是的话，就把列表里面旧的数据先删除，然后再在尾部添加
            if (index != -1) {
                this.songPlayList.splice(index, 1)
            }
            // 如果这个列表的歌曲数量大于15首，那么将尾部的删除
            if (this.songPlayList.length > 15) {
                this.songPlayList.splice(0, 1)
            }
            // 是，就在尾部添加
            this.songPlayList.push(
                this.songmid
            )
            this.setSongPlayList()
            this.addSongURL(name, artist, url, cover, lyc, songmid)
        },

        // 添加一首歌的基本信息，这里就不用管顺序了，不一样的就加
        // 需要六个参数：
        addSongURL(name, artist, url, cover, lyc, songmid) {
            // 以对象的形式存放信息
            if (this.songURL.findIndex(item => item.url == url) != -1) {
                return
            } else {
                this.songURL.push({
                    name, artist, url, cover, lyc, songmid
                })
            }
            if (this.songURL.length > 15) {
                this.songURL.splice(0, 1)
            }
            this.setSongURL()
        },

        // 将保留的15个歌曲的url信息等存在浏览器，建议在页面销毁的时候调用这个方法
        setSongURL() {
            const data = JSON.stringify(this.songURL)
            localStorage.setItem('songURL', data)
        },

        // 对应上面，将保存在浏览器里面的歌曲url取出来
        getSongURL() {
            const data = localStorage.getItem('songURL')
            this.songURL = JSON.parse(data) || []
        }
    }
});