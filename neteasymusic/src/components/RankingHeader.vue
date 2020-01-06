<template>
    <div class="ranking-header">
        <p class="cloud-title">酷狗音乐</p>
        <span></span>
        <p>更新时间: {{ new Date().getMonth() + 1 }}月{{ new Date().getDate() }}日</p>
    </div>
</template>

<script>
export default {
    props: ["item"],
    methods: {
        getTime(number, format) {
            //转换日期
            var formateArr = ["Y", "M", "D", "h", "m", "s"];
            var returnArr = [];
            var date = new Date(number * 1000);
            returnArr.push(date.getFullYear());
            returnArr.push(date.getMonth() + 1);
            returnArr.push(date.getDate());
            returnArr.push(date.getHours());
            returnArr.push(date.getMinutes());
            returnArr.push(date.getSeconds());
            for (var i in returnArr) {
                format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        }
    }
};
</script>

<style lang="less">
.ranking-header {
    padding: 30px 15px;
    color: #ffffff;
    background: url("../assets/hot_music_bg_3x.jpg") no-repeat center;
    p.cloud-title {
        font-size: 16px;
    }
    span {
        display: block;
        height: 10vh;
        width: 100%;
        background: url("../assets/index_icon_2x.png") no-repeat;
        background-position: -28px -56px;
        background-size: 60%;
    }
    p {
        font-size: 10px;
    }
}
</style>
