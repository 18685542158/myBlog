import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    routes: [
        {
            path: '/home',
            component: () => import('../pages/Home.vue'),
            name: 'Home',
            children: [
                {
                    path: '',
                    component: () => import('../views/main/item1.vue'),
                    name: 'Index'
                },
                {
                    path: 'experience',
                    component: () => import('../views/main/item2.vue'),
                    name: 'Experience'
                },
                {
                    path: 'hobby',
                    component: () => import('../views/main/item3.vue'),
                    name: 'Hobby'
                },
                {
                    path: 'item',
                    component: () => import('../views/main/item4.vue'),
                    name: 'Item'
                },
                {
                    path: 'contact',
                    component: () => import('../views/main/item5.vue'),
                    name: 'Contact'
                },
                {
                    path: 'other',
                    component: () => import('../views/main/item6.vue'),
                    name: 'Other'
                },
            ]

        },
        {
            path: '/music',
            component: () => import('../pages/music.vue'),
            name: 'Music',
            children: [
                {
                    path: '',
                    name: 'Recommond',
                    component: () => import('../views/musicIndex/recommond.vue')
                },
                {
                    path: 'archive',
                    name: 'MusicArchive',
                    component: () => import('../views/musicIndex/musicArchive.vue')
                },
                {
                    path: 'fevorite',
                    name: 'MyFevorite',
                    component: () => import('../views/musicIndex/myFevorite.vue')
                },
                {
                    path: 'download',
                    name: 'Download',
                    component: () => import('../views/musicIndex/download.vue')
                },
                {
                    path: 'playlist',
                    name: 'Playlist',
                    component: () => import('../views/musicIndex/playlist.vue')
                },
                {
                    path: 'recently',
                    name: 'Recently',
                    component: () => import('../views/musicIndex/recently.vue')
                },
                {
                    path: 'songList/:dissid',
                    name: 'SongList',
                    component: () => import('../views/musicIndex/songList.vue')
                },
                {
                    path: 'songColist/:dissid',
                    name: 'SongColist',
                    component: () => import('../views/musicIndex/songColist.vue')
                },
                {
                    path: 'log',
                    name: 'Log',
                    component: () => import('../views/musicIndex/log.vue')
                },
                {
                    path: 'video',
                    name: 'Video',
                    component: () => import('../views/musicIndex/video.vue')
                },
                {
                    path: 'about',
                    name: 'About',
                    component: () => import('../views/musicIndex/about.vue')
                },
                {
                    path: 'search/:key',
                    name: 'Search',
                    component: () => import('../views/musicIndex/searchList.vue')
                },
                {
                    path: 'songDetail/:songmid',
                    name: 'SongDetail',
                    component: () => import('../views/musicIndex/detailSong.vue')
                },
                {
                    path: 'singerDetail/:singermid',
                    name: 'SingerDetail',
                    component: () => import('../views/musicIndex/detailSinger.vue')
                },
                {
                    path: 'albumDetail/:albummid',
                    name: 'AlbumDetail',
                    component: () => import('../views/musicIndex/detailAlbum.vue')
                },
                {
                    path: 'mvDetail/:id',
                    name: 'MvDetail',
                    component: () => import('../views/musicIndex/detailMv.vue')
                },
                {
                    path: 'rankList/:id',
                    name: 'RankList',
                    component: () => import('../views/musicIndex/rankList.vue')
                }
            ]
        },
        {
            path: '/hobbyDetail',
            component: () => import('../pages/hobby.vue'),
            name: 'HobbyDetail'
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/home'
        }
    ],
    history: createWebHistory()
})

/* router.beforeEach((to, from, next) => {
    if () {
        next('/');
    } else if () {
        next('/');
    } else {
        next();
    }
}); */

/* router.beforeEach((to,from)=>{
    if (to.name == 'SongList' || to.name == 'SongColist') {
        console.log('你好');
        let value = document.querySelector('#index')
        if(value){
            value.scrollTop = 0; // 将滚动位置设置为顶部
            console.log('=================');
        }
    }
}) */

router.beforeResolve(async (to, from, next) => {
    // 延迟执行，等待页面加载完毕
    await new Promise((resolve) => {
        const handle = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(handle);
                resolve();
            }
        }, 100);
    });
    next();
});


export default router;