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
            songLocalList: [
                {
                    name: '沉醉于风中',
                    artist: 'S.E.N.S(神思者)',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M000002AMtsQ2jW9pz_2.jpg?max_age=2592000',
                    url: '/audios/沉醉于风中.mp3'
                },
                {
                    name: '夜空中最亮的星',
                    artist: '逃跑计划',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M000000wr4zc1gls3e_2.jpg?max_age=2592000',
                    url: '/audios/夜空中最亮的星.mp3'
                },
                {
                    name: 'The Name of Life/ Spirited Away',
                    artist: '广桥真纪子 (ひろはしまきこ)',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M000004THcdR2s4O9V_1.jpg?max_age=2592000',
                    url: '/audios/广桥真纪子 (ひろはしまきこ) - The Name of Life_ Spirited Away.ogg'
                },
                {
                    name: '銀河ステーション (银河站)',
                    artist: '加賀谷玲 (Kagaya Rei)',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M0000039Dv9a2Yi6HW_1.jpg?max_age=2592000',
                    url: '/audios/加賀谷玲 (Kagaya Rei) - 銀河ステーション (银河站).ogg'
                },
                {
                    name: '託された想い (Inst_)',
                    artist: '増田俊郎 (ますだ としお)',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M000003o8heP3oPlSa_1.jpg?max_age=2592000',
                    url: '/audios/増田俊郎 (ますだ としお) - 託された想い (Inst_).ogg'
                },
                {
                    name: '祝!恋ばな成就! (祝！恋花结果！)',
                    artist: '増田俊郎 (ますだ としお)',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M0000031ZRGW4TWfMp_1.jpg?max_age=2592000',
                    url: '/audios/増田俊郎 (ますだ としお) - 祝!恋ばな成就! (祝！恋花结果！).ogg'
                },
                {
                    name: "We've Never Met but Can We Have a Cup of Coffee or Something",
                    artist: 'In Love With a Ghost',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M000002AMtsQ2jW9pz_2.jpg?max_age=2592000',
                    url: "/audios/In Love With a Ghost - We've Never Met but Can We Have a Cup of Coffee or Something.ogg"
                },
                {
                    name: 'I Miss You (想你)',
                    artist: 'Lee Ayur (リー・アユール)',
                    cover: 'https://y.qq.com/music/photo_new/T002R300x300M0000027MNhy1OdaD9_1.jpg?max_age=2592000',
                    url: '/audios/Lee Ayur (リー・アユール) - I Miss You (想你).ogg'
                },
                {
                    name: '未成年',
                    artist: '本兮',
                    cover: 'http://p1.music.126.net/-emsJTdmutfySav8wA-wGQ==/109951166890840827.jpg?param=130y130',
                    url: '/audios/未成年 - 本兮.mp3'
                },
            ],                  // 本地最好存入歌曲
            searchSong: '',
            hisSearch: [],                  // 搜索记录
            inputValue: '',                  // 还是决定将搜索的值放进store，会比较方便一点
            mvURL: [],                      // 存入mv的播放记录
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
        },


        // 添加搜素记录
        addHisSearch(search) {
            const index = this.hisSearch.findIndex(item => item == search)
            if (index == -1) {
                this.hisSearch.push(search)
            } else {
                this.hisSearch.splice(index, 1)
                this.hisSearch.push(search)
            }
            this.setHisSearch()
            console.log(this.hisSearch);
        },
        // 将搜索记录存入local
        setHisSearch() {
            const data = JSON.stringify(this.hisSearch)
            localStorage.setItem('hisSearch', data)
        },
        // 从本地获取搜索记录
        getHisSearch() {
            const data = JSON.parse(localStorage.getItem('hisSearch'))
            if (!data) return
            this.hisSearch = data
        },

        // 添加mv播放记录
        addMV(obj) {
            console.log(obj);
            console.log(this.mvURL);
            const index = this.mvURL.findIndex(item => item.vid == obj.vid)
            if (index == -1) {
                this.mvURL.push(obj)
            } else {
                this.mvURL.splice(index, 1)
                this.mvURL.push(obj)
            }
            this.setMV()
            console.log(this.mvURL);
        },
        // 将mv播放记录存入本地
        setMV() {
            const data = JSON.stringify(this.mvURL)
            localStorage.setItem('mvURL', data)
        },
        // 从本地获取mv播放记录
        getMV() {
            const data = JSON.parse(localStorage.getItem('mvURL'))
            if (!data) return
            this.mvURL = data
        },





        // 网页初始化获取本地数据（主要慢慢发现要存的本地数据有点多了，干脆整合一下）
        getInitData() {
            // 刚打开时，从本地获取需要播放的歌曲songmid
            this.getSongData()
            // 从local获取播放列表
            this.getSongPlayList()
            // 从本地获取搜索记录
            this.getHisSearch()
            // 从本地获取mv播放记录
            this.getMV()
        }
    }
});