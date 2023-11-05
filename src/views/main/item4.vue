<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Project</h1>
            </div>
            <div class="text">
                <h2>在学习前端这段时间，会接触到大大小小的很多项目，比如什么后台管理系统，什么音乐播放器什么的，而我认为我做的比较大型的项目有两个，
                    一个是在北明实习期间参与的项目，一个就是现在看到的，我的个人web主页，一个是vue2一个是vue3，一个偏表格化，一个偏娱乐轻松，
                    两者都给我带来了很多的收获</h2>
            </div>
        </div>
        <div class="header">
            <div class="content-box">
                <div class="content1">
                    <div class="title"><span>一网统管管理系统</span></div>
                    <div class="text">
                        <h2>
                            市政府下，用于各个政府单位下，对“事件”进行统一管理，是打通城市各治理系统的业务平台，实现一张网络管理全城，
                            其中的“事件”是由移动端人员创建，会流经各个部门任选进行处理，最后进行结案。系统设立了城运中心，运营平台，
                            态势分析等模块，通过数据指令，运行机制，组织管理来实现一网统管
                        </h2>
                    </div>
                </div>
            </div>
            <div class="content-box">
                <div class="content1">
                    <div class="title"><span>个人web主页</span></div>
                    <div class="text">
                        <h2>
                            在学习vue这段时间创建的一个web个人主页，包括了个人的一些兴趣爱好及一些小博客之类的内容，
                            后台编写了一个大型的音乐播放器，可以实现音乐平台的基本音乐操作，虽然名字叫做个人web主页，
                            但是目前为止绝大多数中心放到了音乐播放器上，因为需要qq登录，所以只能利用qq音乐官网的cookie进行登录，
                            浅浅制作了每日推荐，音乐馆，视频库等导航，对音乐播放列表的逻辑进行了很大程度的梳理，可以完成搜索歌曲，
                            歌手，歌单，专辑，歌词等，可以查看歌曲详情，歌手详情，歌单详情，专辑详情，其实原本只是想做一个小型的，
                            背景音乐播放器，但是因为一点强迫症，所以干脆在web个人主页的基础上，额外做一个音乐播放器的项目出来,
                            其中用到的技术栈是vite+pinia+vue-router ，因为项目没那么复杂，所以没有使用ts
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>

</script>
    
<style scoped lang="scss">
.box {
    transition: 0.5s;
    width: 80%;
    height: 80%;
    overflow-y: scroll;

    .info {
        width: 100%;
        // height: 30%;

        .title {
            padding: 0 10px;
            height: 60%;

            h1 {
                font-size: 90px;
                font-weight: 500;
            }
        }

        .text {
            padding: 0 10px;
            padding-bottom: 2%;
            border-bottom: 1px solid black;

            h2 {
                font-weight: 300;
                text-indent: 2em;
                line-height: 1.5;
            }
        }
    }

    .header {
        width: 100%;
        height: 500px;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
        // border-bottom: 1px solid black;

        .content-box {
            width: 100%;
            // height: 100%;
            box-sizing: border-box;
            padding: 30px 30px 30px 0;

            .content1 {
                width: 100%;
                // height: 100%;

                .title {
                    width: 100%;
                    height: 15%;
                    font-size: 25px;

                    span {
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                    }
                }

                .text {
                    width: 100%;
                    height: 80%;
                    margin-top: 2%;

                    // background-color: #fff;
                    h2 {
                        padding-right: 10px;
                        font-size: 16px;
                        font-weight: 100;
                        text-indent: 2em;
                        line-height: 2em;
                    }
                }
            }
        }
    }

}
</style>