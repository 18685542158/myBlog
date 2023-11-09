<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Other</h1>
            </div>
            <div class="text">
                <h2>作为一个双非，还是垫底的一本本科生，是真的很难啊哈哈哈，大一摆了一年，不过还是有有点c语言的基础，然后呢大二学习了java程序设计，
                    本来是有想走后端的想法，所以多少学了一点java，也学了一点数据库，servlet服务器之类的东西，然后慢慢的觉得自己对这方面兴趣不如前端来的舒服，
                    所以还是选择了前端，可能我也是一个比较喜欢艺术的人，所以会对偏页面设计之类的东西感兴趣</h2>
            </div>
        </div>
        <div class="header">
            
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
    display: flex;
    flex-direction: column;

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
        // flex:1;
        display: flex;
        justify-content: left;
        align-items: center;
        // background-color: #fff;
        // border-bottom: 1px solid black;
    }

}
</style>