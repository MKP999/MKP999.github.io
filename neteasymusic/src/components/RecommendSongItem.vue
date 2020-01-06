<template>
    <li @click="playMusic(item.id)">
        <div class="left">{{ number + 1 }}</div>
        <div class="middle">
            <p class="songtitle">{{ item.name }}</p>

            <p class="composer"><span v-if="item.h"></span>{{ item.ar[0].name }}-{{ item.al.name }}</p>
        </div>
        <div class="right"><i class="fa fa-play"></i></div>
    </li>
</template>

<script>
export default {
    props: {
        item: Object,
        number: Number
    },
    methods: {
        playMusic(id) {
            this.$emit("delivery", id);
        }
    }
};
</script>

<style lang="less" scoped>
li {
    display: flex;
    margin: 5px 0;
    border-bottom: 1px solid rgb(250, 248, 248);
    &::after {
        content: "";
        display: block;
        clear: both;
    }
    .left {
        width: 40px;
        text-align: center;
        line-height: 47px;
        color: #999;
    }
    .middle {
        flex: 1;
        p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            &.songtitle {
                margin: 5px 0;
                font-size: 16px;
            }
            &.composer {
                font-size: 12px;
                color: #999;
                span {
                    width: 15px;
                    height: 10px;
                    background-image: url("../assets/index_icon_2x.png");
                    background-size: 1200%;
                    background-position: 0 1px;
                    display: inline-block;
                    margin: 0 5px;
                    line-height: 10px;
                }
            }
        }
    }
    .right {
        width: 50px;
        text-align: center;
        i {
            font-size: 20px;
            color: #999;
            line-height: 47px;
        }
    }
}
</style>
