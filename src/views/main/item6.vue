<template>
    <div class="box">
        <div class="info">
            <div class="title">
                <h1>Other</h1>
            </div>
            <div class="text">
                <h2></h2>
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