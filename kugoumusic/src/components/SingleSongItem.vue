<template>
    <li @click="playMusic(item.id)" v-if="item">
        <div class="left">
            <p class="songtitle">{{ item.name }}</p>

            <p class="composer"><span v-if="item.song.hMusic"></span>{{ item.song.artists[0].name }}-{{ item.song.album.name }}</p>
        </div>
        <div class="right"><i class="fa fa-play"></i></div>
    </li>
</template>

<script>
export default {
    props: {
        item: Object
    },
    methods: {
        playMusic(id) {
            this.$emit("delivery",id);
            
        }
    }
};
</script>

<style lang="less" scoped>
li {
    display: flex;
    margin: 5px 0;
    padding-left: 10px;
    border-bottom: 1px solid rgb(250, 248, 248);
    &::after {
        content: "";
        display: block;
        clear: both;
    }
    .left {
        flex: 1;
        p {
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
