import express, { json } from 'express';      // 引入express
import qqMusic from 'qq-music-api'; // 引入qq音乐第三方接口
import fs from 'fs';           // 读写文件
import cors from 'cors';            // CORS设置,允许跨域
const app = express();              // express服务


// 以下是express解析req.body所必需的代码
// 解析 req.body 中的 json 数据
app.use(express.json());
// 解析 req.body 中的 urlencoded 数据
app.use(express.urlencoded({ extended: true }));

// qqMusic.setCookie('RK=T5vMHQVkVy; ptcz=00f484463991751b7e23cb57c7b90e17a145b905278bbcc737ac1eeeb6a4e46b; pgv_pvid=935044804; fqm_pvqid=50ede925-dc80-4bec-bdbe-995094ac0d57; ts_refer=www.baidu.com/link; ts_uid=5513503523; tmeLoginType=2; euin=oK4iNe45NevlNv**; fqm_sessionid=60110412-9a15-431f-80b1-bb668ae39246; pgv_info=ssid=s2953369972; _qpsvr_localtk=0.3284149056385628; yqq_stat=0; ts_last=y.qq.com/n/ryqq/search; login_type=1; psrf_qqunionid=0E04C2456F7EC85660D2E0F5F7519779; qm_keyst=Q_H_L_5ttCwfsEoaHG4_B68Dn7jMKsSAfVbWPz7ip6P3uQ-GCNKcEDR22AEZg; wxrefresh_token=; psrf_qqopenid=24A2EC76DFE32EC30B8BD37FC32A8635; psrf_qqrefresh_token=B9F2EB3CAD61F91E0CA5A4467EFBB480; uin=1538518479; qqmusic_key=Q_H_L_5ttCwfsEoaHG4_B68Dn7jMKsSAfVbWPz7ip6P3uQ-GCNKcEDR22AEZg; psrf_access_token_expiresAt=1698819674; qm_keyst=Q_H_L_5ttCwfsEoaHG4_B68Dn7jMKsSAfVbWPz7ip6P3uQ-GCNKcEDR22AEZg; wxunionid=; psrf_qqaccess_token=AFAC7F97711F0B2015A5F8C08AD9F2F7; wxopenid=; psrf_musickey_createtime=1691043674');

app.use(cors({
    // origin: ['http://localhost:5173', 'http://192.168.1.105','https://dashan.online']   // 允许http://localhost:5173这个域名来访问
}))
// 定义路由和中间件
// 创建成功
app.get('/', (req, res) => {
    res.send('Hello Express!');
});







// 设置cookie
app.post('/setCookie', (req, res) => {
    qqMusic.setCookie(req.body.cookie)
    if (qqMusic.cookie) {
        res.json('设置成功')
    } else {
        res.status(500).json({ error: '设置cookie失败' })
    }
})

// 获取cookie
app.get('/getCookie', (req, res) => {
    if (!qqMusic.cookie) {
        return res.status(500).json({ error: '没有返回cookie' })
    } else {
        res.send(qqMusic.cookie)
    }
});

// 获取你的qq号
app.get('/getuin', (req, res) => {
    if (!qqMusic.uin) {
        return res.status(500).json({ error: '没有返回cookie' })
    } else {
        res.send(qqMusic.uin)
    }
});


// 获取我的主页信息
app.get('/getUserDetail', (req, res) => {
    qqMusic.api('/user/detail', { id: req.query.uin })
        .then((result) => {
            console.log('获取了主页');
            if (!result) {
                return res.status(500).json({ error: '没有返回数据' })
            } else {
                res.json(result)
            }
        })
        .catch(err => {
            res.status(500).json({ error: '获取主页失败' })
            console.log(err);
        })
})

// 歌手介绍
app.get('/singer/desc', (req, res) => {
    qqMusic.api('/singer/desc', { singermid: req.query.singermid })
        .then((result) => {
            console.log('获取了歌手介绍');
            res.json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: '获取歌手介绍失败' })
        })
})

// 获取歌手分类
app.get('/singer/category', (req, res) => {
    qqMusic.api('/singer/category').then((result) => {
        console.log('获取了歌手分类');
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: '获取歌手分类错误' })
    })
})

// 根据分类获取歌手列表
app.get('/singer/list', (req, res) => {
    qqMusic.api('/singer/list', {
        area: req.query.area,
        genre: req.query.genre,
        index: req.query.index,
        sex: req.query.sex,
        pageNo: req.query.pageNo
    }).then((result) => {
        console.log('获取歌手列表成功');
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: '获取歌手列表失败' })

    })
})


// 获取歌手歌曲
app.get('/singer/songs', (req, res) => {
    qqMusic.api('/singer/songs', {
        singermid: req.query.singermid,
        num: req.query.num,
        page: req.query.page
    })
        .then((result) => {
            console.log('获取了歌手歌曲');
            res.json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: '获取歌手歌曲失败' })
        })
})

// 获取歌手专辑
app.get('/singer/album', (req, res) => {
    qqMusic.api('/singer/album', {
        singermid: req.query.singermid,
        pageSize: req.query.num,
        pageNo: req.query.page
    })
        .then((result) => {
            console.log('获取了歌手专辑');
            res.json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: '获取歌手专辑失败' })
        })
})

// 获取某专辑内的歌曲
app.get('/album/songs', (req, res) => {
    qqMusic.api('/album/songs', {
        albummid: req.query.albummid
    }).then((result) => {
        console.log('获取了专辑歌曲');
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: '获取专辑歌曲失败' })
    })
})

// 获取歌手mv
app.get('/singer/mv', (req, res) => {
    qqMusic.api('/singer/mv', {
        singermid: req.query.singermid,
        pageSize: req.query.num,
        pageNo: req.query.page
    })
        .then((result) => {
            console.log('获取了歌手mv');
            res.json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: '获取歌手mv失败' })
        })
})

// 搜索歌曲                 
app.get('/search', (req, res) => {
    qqMusic.api('/search', {
        key: req.query.key,
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
        type: req.query.type
    })
        .then((result) => {
            console.log('搜索成功');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取歌单失败' })
            console.log(err);
        })
})

// 快速搜索
app.get('/search/quick', (req, res) => {
    qqMusic.api('/search/quick', {
        key: req.query.key
    }).then((result) => {
        console.log('快速搜索');
        res.json(result)
    }).catch((err) => {
        res.status(500).json({ error: '快速搜索失败' })
        console.log(err);
    })
})

// 获取单个歌曲详情
app.get('/song', (req, res) => {
    qqMusic.api('/song', ({
        songmid: req.query.songmid
    }))
        .then((result) => {
            console.log('获取详情成功');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取歌曲详情失败' })
            console.log(err);
        })
})


// 播放连接
app.get('/song/urls', (req, res) => {
    qqMusic.api('song/urls', {
        id: req.query.songmid
    }).then((result) => {
        console.log('获取播放成功');
        res.json(result)
    })
        .catch(err => {
            res.status(500).json({ error: '获取播放失败' })
            console.log(err);
        })
})

// 通过歌曲songmid获取歌曲歌词
app.get('/lyric', (req, res) => {
    qqMusic.api('lyric', {
        songmid: req.query.songmid
    }).then((result) => {
        console.log('获取歌词成功');
        res.json(result)
    }).catch((err) => {
        res.status(500).json({ error: '获取歌词失败' })
        console.log(err);
    })
})

// 获取歌曲mv
app.get('/singer/mv', (req, res) => {
    qqMusic.api('/singer/mv', {
        songmid: req.query.songmid
    }).then((result) => {
        console.log('获取mv成功');
        res.json(result)
    }).catch((err) => {
        res.status(500).json({ error: '获取mv失败' })
        console.log(err);
    })
})

// 获取mv的信息
app.get('/mv', (req, res) => {
    qqMusic.api('/mv', {
        id: req.query.id
    }).then((result) => {
        console.log('获取mv信息成功');
        res.json(result)
    }).catch((err) => {
        res.status(500).json({ error: '获取mv信息失败' })
        console.log(err);
    })
})

// 获取mv的播放链接
app.get('/mv/url', (req, res) => {
    qqMusic.api('/mv/url', {
        id: req.query.id
    }).then(result => {
        console.log('获取mv链接成功');
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: '获取mv链接失败' })
    })
})

// 获取专辑详情
app.get('/album', (req, res) => {
    qqMusic.api('/album', {
        albummid: req.query.albummid
    }).then((result) => {
        console.log('获取专辑详情成功');
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: '获取专辑详情失败' })
    })
})




// 创建一个新的歌单
app.post('/createSongList', (req, res) => {
    qqMusic.api('/songlist/create', { name: req.body.name })
        .then((result) => {
            console.log('新建了歌单');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '创建歌单失败' })
            console.log(err);
        })
})



// 获取歌单
app.get('/getSongList', (req, res) => {
    qqMusic.api('/user/songlist', { id: req.query.uin })
        .then((result) => {
            console.log('获取了歌单');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取歌单失败' })
            console.log(err);
        })
})

// 获取的是我的歌单里面的歌曲
app.get('/getSongMap', (req, res) => {
    qqMusic.api('songlist/map', { dirid: req.query.dirid })
        .then((result) => {
            console.log('哈希表：');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取哈希表失败' })
            console.log(err);
        })
})


// 获取歌单详情，暂且不知道是怎么个详情
app.get('/getSongListDel', (req, res) => {
    qqMusic.api('/songlist', { id: req.query.id })
        .then((result) => {
            console.log('获取歌单详情成功：');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取详情失败' })
            console.log(err);
        })
})


// 获取收藏的歌单
app.get('/getSongColist', (req, res) => {
    qqMusic.api('user/collect/songlist', { id: req.query.uin })
        .then((result) => {
            console.log('收集的歌单:');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取歌单失败' })
            console.log(err);
        })
})










// 以下是关于官方的推荐歌曲===========================================

// 热门搜索
app.get('/search/hot', (req, res) => {
    qqMusic.api('/search/hot')
        .then((result => {
            console.log('获取热搜词成功');
            res.json(result)
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: '获取热搜词失败' })
        })
})


// 获取歌单分类
app.get('/songlist/category', (req, res) => {
    qqMusic.api('/songlist/category')
        .then((result) => {
            console.log('获取歌单分类成功：');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取歌单分类失败' })
            console.log(err);
        })
})

// 根据歌单分类获取歌单
app.get('/songlist/list', (req, res) => {
    qqMusic.api('/songlist/list', {
        pageSize: req.query.pageSize,
        pageNo: req.query.pageNo,
        sort: req.query.sort,
        category: req.query.category,
    })
        .then((result) => {
            console.log('根据歌单分类获取歌单成功：');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '根据歌单分类获取歌单失败' })
            console.log(err);
        })
})

// 获取推荐歌单
app.get('/recommend/playlist/u', (req, res) => {
    qqMusic.api('/recommend/playlist/u')
        .then((result) => {
            console.log('推荐');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '推荐歌单失败' })
            console.log(err);
        })
})

// 日推歌单
app.get('/recommend/daily', (req, res) => {
    qqMusic.api('/recommend/daily')
        .then((data) => {
            console.log('获取日推成功');
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: '获取日推失败' })
        })
})

// 获取轮播图
app.get('/recommend/banner', (req, res) => {
    qqMusic.api('/recommend/banner')
        .then((result) => {
            console.log('获取轮播图成功：');
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: '获取轮播图失败' })
            console.log(err);
        })
})

// 新歌推荐
app.get('/new/songs', (req, res) => {
    qqMusic.api('/new/songs', {
        type: req.query.type
    })
        .then((result) => {
            console.log('获取最新歌曲');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取最新歌曲失败' })
            console.log(err);

        })
})

// 新专辑推荐
app.get('/new/album', (req, res) => {
    qqMusic.api('/new/album', {
        type: req.query.type,
        num: req.query.num,
    })
        .then((result) => {
            console.log('获取最新专辑');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取最新专辑失败' })
            console.log(err);
        })
})

// 新MV推荐
app.get('/new/mv', (req, res) => {
    qqMusic.api('/new/mv', {
        type: req.query.type
    })
        .then((result) => {
            console.log('获取最新MV');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取最新MV失败' })
            console.log(err);
        })
})

// 获取mv分类
app.get('/mv/category', (req, res) => {
    qqMusic.api('/mv/category')
        .then((result) => {
            console.log('获取mv分类');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取MV分类失败' })
            console.log(err);
        })
})

// 根据分类获取mv
app.get('/mv/list', (req, res) => {
    qqMusic.api('/mv/list', {
        // 默认 1
        pageNo: req.query.pageNo,
        // 默认 20
        pageSize: req.query.pageSize,
        // 地区，默认 15 全部，具体数值从上面分类接口获取
        area: req.query.area,
        // MV 类型，默认 7 全部，具体数值从上面分类接口获取
        version: req.query.version,
    }).then((result) => {
        console.log('根据分类获取mv成功');
        res.json(result)
    })
        .catch((err) => {
            res.status(500).json({ error: '根据分类获取mv失败' })
            console.log(err);
        })
})


// 获取榜单列表 showDetail是否显示前三歌曲简单信息和榜单介绍，0，不显示，1 显示，默认 0
app.get('/top/category', (req, res) => {
    qqMusic.api('/top/category', {
        showDetail: req.query.showDetail,
    })
        .then((result) => {
            console.log('获取榜单列表成功');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取榜单列表失败' })
            console.log(err);
        })
})

// 获取榜单详情
app.get('/top', (req, res) => {
    qqMusic.api('/top', {
        // 默认 4，从上面的列表中取值
        id: req.query.id,
        // 默认 100 // 部分接口不支持这个字段，所以这里默认选择100
        pageSize: req.query.pageSize,
        // 榜单的时间，从上面的列表中取值，非必填
        period: req.query.period,
        // 默认当前时间，如果有 period，则当前榜单的发布时间，可能是天，也可能是周
        time: req.query.time,
    })
        .then((result) => {
            console.log('获取榜单详情成功');
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json({ error: '获取榜单详情失败' })
            console.log(err);
        })
})







// 以下是文档没有的，尝试通过其他接口获取需要的数据
app.get('/recommend/playlist', (req, res) => {
    qqMusic.api('/recommend/playlist', {
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
        // 3317: 官方歌单，59：经典，71：情歌，3056：网络歌曲，64：KTV热歌
        id: req.query.id
    }).then(data => {
        console.log('获取推荐歌曲成功');
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: '获取推荐歌曲失败' })
    })
})


// 以下是关于后端对文件的操作=======================================

// 创建一个 POST 路由来处理添加数据的请求
app.post('/addLogData', (req, res) => {
    const newData = req.body; // 获取请求中的新数据
    // 读取原始数据文件
    fs.readFile('./data/log_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器发生错误'); // 如果读取文件出错，则返回错误响应
            return;
        }
        const jsonData = JSON.parse(data); // 解析原始数据
        // 将新数据添加进去
        jsonData.log_List.unshift(newData);
        // 将更新后的数据写回到文件中
        fs.writeFile('./data/log_data.json', JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('服务器发生错误'); // 如果写入文件出错，则返回错误响应
                return;
            }
            res.status(200).send('数据添加成功'); // 返回成功响应
        });
    });
});


// 路由处理删除请求
app.delete("/deleteLogData", (req, res) => {
    const id = Number(req.query.id); // 从请求的查询字符串中获取要删除的数据的 id
    fs.readFile('./data/log_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器发生错误'); // 如果读取文件出错，则返回错误响应
            return;
        }
        const jsonData = JSON.parse(data); // 解析原始数据
        // 在这里执行删除逻辑
        const index = jsonData.log_List.findIndex(item => item.id === id);
        if (index !== -1) {
            jsonData.log_List.splice(index, 1);
            // 将更新后的数据写回到文件中
            fs.writeFile('./data/log_data.json', JSON.stringify(jsonData), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('服务器发生错误'); // 如果写入文件出错，则返回错误响应
                    return;
                }
                res.status(200).send('数据添加成功'); // 返回成功响应
            });
        } else {
            res.sendStatus(404); // 如果要删除的数据不存在，返回 404 状态码
        }

    })
});

// 路由处理更新请求
app.put("/updateLogData/:id", (req, res) => {
    const id = Number(req.params.id); // 从请求的查询字符串中获取要删除的数据的 id
    const newData = req.body; // 从请求的正文中获取新的数据
    fs.readFile('./data/log_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器发生错误'); // 如果读取文件出错，则返回错误响应
            return;
        }
        const jsonData = JSON.parse(data); // 解析原始数据
        // 在这里执行更新逻辑
        const index = jsonData.log_List.findIndex(item => item.id === id);
        if (index !== -1) {
            jsonData.log_List[index] = newData;
            // 将更新后的数据写回到文件中
            fs.writeFile('./data/log_data.json', JSON.stringify(jsonData), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('服务器发生错误'); // 如果写入文件出错，则返回错误响应
                    return;
                }
                res.status(200).send('数据添加成功'); // 返回成功响应
            });
        } else {
            res.sendStatus(404); // 如果要更新的数据不存在，返回 404 状态码
        }
    });
});



// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});