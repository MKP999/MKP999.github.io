<template>
    <div class="recommendlist">
        <!-- {{ this.$route.query.id }} -->
        <div class="header">
            <span @click="Goback"><i class="fa fa-arrow-circle-left"></i></span>
        </div>
        <RecommendlistHeader :item="RecommendHeader"></RecommendlistHeader>
        <SeparationTitle>歌曲列表</SeparationTitle>
        <ul>
            <RecommendSongItem v-for="(item, index) in RecommendSongs" :key="index" :item="item" :number="index" @delivery="transMend($event)"></RecommendSongItem>
        </ul>
    </div>
</template>

<script>
import RecommendlistHeader from "@/components/RecommendlistHeader";
import RecommendSongItem from "@/components/RecommendSongItem";
import SeparationTitle from "@/components/SeparationTitle";

export default {
    data() {
        return {
            RecommendSongs: null,
            RecommendHeader: null
        };
    },
    components: {
        RecommendlistHeader,
        RecommendSongItem,
        SeparationTitle
    },
    methods: {
        Goback() {
            this.$router.go(-1);
        },
        getRecommendSong(id) {
            let RecommendHeader = localStorage.getItem("RecommendHeader" + id);
            let RecommendSongs = localStorage.getItem("RecommendSongs" + id);
            if (RecommendHeader && Date.now() < JSON.parse(RecommendHeader).time + 60 * 60 * 1000) {
                this.RecommendHeader = JSON.parse(RecommendHeader).data;
                this.RecommendSongs = JSON.parse(RecommendSongs).data;
            } else {
                this.axios
                    .get("http://musicapi.leanapp.cn/playlist/detail", {
                        params: {
                            id: id
                        }
                    })
                    .then(response => {
                        ({ playlist: this.RecommendHeader } = response.data);
                        ({ tracks: this.RecommendSongs } = response.data.playlist);
                        localStorage.setItem(
                            "RecommendHeader" + id,
                            JSON.stringify({
                                time: Date.now(),
                                data: this.RecommendHeader
                            })
                        );
                        localStorage.setItem(
                            "RecommendSongs" + id,
                            JSON.stringify({
                                time: Date.now(),
                                data: this.RecommendSongs
                            })
                        );
                    });
            }
        },
        transMend(id) {
            this.$emit("transApp", id);
            localStorage.setItem(
                "MusicList",
                JSON.stringify({
                    time: Date.now(),
                    data: this.RecommendSongs
                })
            );
        }
    },
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建

        next(vm => {
            vm.getRecommendSong(to.query.id);
        });
    }
};
</script>

<style lang="less">
.recommendlist {
    margin-bottom: 50px;
    position: relative;
    .header {
        position: fixed;
        width: 100%;
        height: 25px;
        background: transparent;
        span {
            display: block;
            position: absolute;
            top: 5px;
            left: 5px;
            font-size: 22px;
            color: #ffffff;
            z-index: 99;
        }
    }
}
</style>
