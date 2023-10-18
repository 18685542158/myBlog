import axios from './axios';





// 快速搜索，通过关键词返回少量关键信息
export function quickSearch(key) {
    return axios.get('/search/quick', {
        params: {
            key
        }
    })
}

// 目前搜索只支持搜索歌曲
// 搜索  查询的字符串 key:'周杰伦', 第几页 pageNo:1 , 一页最大数量 pageSize:10 , 查询类型  type:0 （0:单曲，2:歌单，4：MV，3:歌单，8:用户，7:歌词）
export function search(key, type, pageNo) {
    return axios.get('/search', {
        params: {
            key,
            type,
            pageNo,
        }
    })
}

// 获取歌手信息
export function getSingerInfo(singermid) {
    return axios.get('/singer/desc', {
        params: {
            singermid
        }
    })
}

// 获取歌手分类
export function getSingerCategory() {
    return axios.get('/songlist/category')
}

// 根据歌手分类获取歌手列表
export function getSinger(obj) {
    return axios.get('/singer/list', {
        area: obj.area,
        genre: obj.genre,
        index: obj.index,
        sex: obj.sex,
        pageNo: obj.pageNo,
    })
}

// 获取歌手歌曲
export function getSingerSong(singermid, num, page) {
    return axios.get('/singer/songs', {
        params: {
            singermid,
            num,
            page
        }
    })
}

// 获取歌手专辑
export function getSingerAlbum(singermid, num, page) {
    return axios.get('/singer/album', {
        params: {
            singermid,
            num,
            page
        }
    })
}

// 获取歌手mv
export function getSingerMv(singermid, num, page) {
    return axios.get('/singer/mv', {
        params: {
            singermid,
            num,
            page
        }
    })
}

// 获取单个歌曲详情
export function getSongDetail(songmid) {
    return axios.get('/song', {
        params: {
            songmid
        }
    })
}

// 获取播放链接
export function getSong(songmid) {
    return axios.get('/song/urls', {
        params: {
            songmid
        }
    })
}

// 获取歌曲歌词
export function getLyric(songmid) {
    return axios.get('/lyric', {
        params: {
            songmid
        }
    })
}

// 获取歌曲mv
export function getSongMV(songmid) {
    return axios.get('/singer/mv', {
        params: {
            songmid
        }
    })
}

// 获取mv的信息
export function getMvInfo(id) {
    return axios.get('/mv', {
        params: {
            id
        }
    })
}

// 获取mv链接
export function getMvUrl(id) {
    return axios.get('/mv/url', {
        params: {
            id
        }
    })
}



// 新建歌单
export function createSongList(name) {
    return axios.post('/createSongList', { name })
}

// 获取我创建的歌单
export function getSongList(uin) {
    return axios.get('/getSongList', {
        params: {
            uin
        }
    });
}

// 获取主页详情
export function getUserDetail(uin) {
    return axios.get('/getUserDetail', {
        params: {
            uin
        }
    });
}

// 获取收藏的歌单
export function getSongColist(uin) {
    return axios.get('/getSongColist', {
        params: {
            uin
        }
    });
}

// 我的歌单里面有哪些歌曲
export function getSongMap(dirid) {
    return axios.get('/getSongMap', {
        params: {
            dirid
        }
    })
}

// 获取专辑详情
export function getAlbumInfo(albummid) {
    return axios.get('/album', {
        params: {
            albummid
        }
    })
}

// 获取专辑内歌曲
export function getAlbumSongs(albummid) {
    return axios.get('/album/songs', {
        params: {
            albummid
        }
    })
}

// 获取歌单详情
export function getSongListDel(id) {
    return axios.get('/getSongListDel', {
        params: {
            id
        }
    })
}


// 关于官方推荐===============================
//  推荐歌单
export function getRecommondPlaylist() {
    return axios.get('/recommend/playlist/u')
}

// 获取歌单分类
export function getCategory() {
    return axios.get('/songlist/category')
}

// 根据分类获取歌单
export function getReSongList(obj) {
    return axios.get('/songlist/list', {
        params: {
            pageSize: obj.pageSize,
            pageNo: obj.pageNo,
            sort: obj.sort,
            category: obj.category,
        }
    });
}

// 轮播图           估计会删除
export function getBanner() {
    return axios.get('/recommend/banner')
}

// 获取最新歌曲
export function getNewSong(type) {
    return axios.get('/new/songs', {
        params: {
            type
        }
    })
}

// 获取最新专辑
export function getNewAlbum(type, num) {
    return axios.get('/new/album', {
        params: {
            type,
            num: num ? num : 10
        }
    })
}

// 获取最新MV
export function getNewMV(type) {
    return axios.get('/new/mv', {
        params: {
            type
        }
    })
}

// 获取mv分类
export function getMvCategory() {
    return axios.get('/mv/category')
}

// 根据分类获取mv
export function getMV(obj) {
    return axios.get('/mv/list', {
        params: {
            // 默认 1
            pageNo: obj.pageNo,
            // 默认 20
            pageSize: obj.pageSize,
            // 地区，默认 15 全部，具体数值从上面分类接口获取
            area: obj.area,
            // MV 类型，默认 7 全部，具体数值从上面分类接口获取
            version: obj.version,
        }
    })
}

// 获取榜单列表 showDetail是否显示前三歌曲简单信息和榜单介绍，0，不显示，1 显示，默认 0
export function getTop() {
    return axios.get('/top/category')
}

// 获取榜单详情
// 返回说明
// timeType 当前榜单的时间格式 YYYY_W 或 YYYY-MM-DD
// rank 在榜单的排名
// rankType 1 上升，2 减少，3 持平，4 新歌，6 上升百分比
// rankValue    排名改变值
export function getTopDetail(obj) {
    return axios.get('/top', {
        params: {
            id: obj.id,
            pageSize: obj.pageSize,
            period: obj.period,
            time: obj.time
        }
    })
}




// 设置Cookie
export function setCookie(cookie) {
    return axios.post('/setCookie', { cookie });
}

// 获取你的qq号
export function getuin() {
    return axios.get('/getuin')
}

// 查看你的cookie
export function getCookie() {
    return axios.get('/getCookie')
}





// 特殊
//获取的都是歌单
export function getRecommondSongList(obj) {
    return axios.get('/recommend/playlist', {
        params: {
            pageNo: obj.pageNo,
            pageSize: obj.pageSize,
            id: obj.id
        }
    })
}

//这次获取的应该都是歌曲
export function getRecommondSong() {
    return axios.get('/recommend/daily')
}








// 添加新数据到data.JSON
export function addLogData(data) {
    return axios.post('/addLogData', {
        id: data.id,
        title: data.title,
        content: data.content,
        time: data.time,
        pretime: data.time
    })
}

// 删除数据
export function deleteLogData(id) {
    return axios.delete(`/deleteLogData?id=${id}`)
}

// 更新数据
export function updateLogData(id, newdata) {
    return axios.put(`/updateLogData/${id}`, newdata);
}
