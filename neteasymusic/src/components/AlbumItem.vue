<template>
    <li class="album-icon" @click="getAlbum(item.id)">
        <img :src="item.artist.picUrl" alt="" />
        <div class="album-title">
            <p>专辑 : {{ item.name }}</p>
            <p>{{ item.artist.name }}</p>
            <span class="fa fa-chevron-right"></span>
        </div>
    </li>
</template>

<script>
export default {
    props: ["item"],
    methods: {
        getAlbum(id) {
            this.$emit("transAlbum", id);
        }
    }
};
</script>

<style lang="less">
li.album-icon {
    padding: 5px 10px;
    display: flex;
    border-bottom: 1px solid rgb(250, 248, 248);
    img {
        width: 16vw;
        margin-right: 15px;
    }
    .album-title {
        flex: 1;
        vertical-align: bottom;
        position: relative;
        p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            &:first-child {
                font-size: 18px;

                padding-right: 20px;
            }
            &:nth-child(2) {
                font-size: 10px;
                color: blue;
            }
        }
        span {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(0, 100%);
            color: lightgray;
        }
    }
}
</style>
