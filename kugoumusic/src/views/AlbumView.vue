<template>
    <div class="album" v-if="AlbumContent">
        <!-- {{ this.$route.query.id }} -->
        <div class="header">
            <span @click="Goback"><i class="fa fa-arrow-circle-left"></i></span>
        </div>
        <div class="introduce-pic">
            <img :src="AlbumContent.picUrl" alt="" />
            <p class="name">{{ AlbumContent.artist.name }}</p>
            <p class="albumname">{{ AlbumContent.type }} - {{ AlbumContent.name }}</p>
        </div>
        <div class="introduce-word">
            <div class="s-title">歌手简介</div>
            <p :class="{ brief: hasBrief, active: isActive }" @click="isActive = !isActive">{{ AlbumContent.description }}</p>
            <span v-if="isActive"><i class="fa fa-chevron-down" @click="isActive = !isActive"></i></span>
            <span v-else><i class="fa fa-chevron-up" @click="isActive = !isActive"></i></span>
        </div>
        <div class="hot-title">热门单曲</div>
        <ul>
            <RecommendSongItem v-for="(item, index) in AlbumSongs" :key="index" :item="item" :number="index" @delivery="playMusic($event)"></RecommendSongItem>
        </ul>
    </div>
</template>

<script>
import RecommendSongItem from "@/components/RecommendSongItem";

export default {
    data() {
        return {
            AlbumContent: null,
            AlbumSongs: null,
            isActive: true,
            hasBrief: true
        };
    },
    components: {
        RecommendSongItem
    },
    methods: {
        Goback() {
            this.$router.go(-1);
        },
        getAlbumNew(id) {
            this.axios
                .get("http://musicapi.leanapp.cn/album/detail/dynamic", {
                    params: {
                        id: id
                    }
                })
                .then(response => {
                    // window.console.log(response.data.songs); //专辑单曲
                    // window.console.log(response.data.album); //专辑信息
                    ({ album: this.AlbumContent } = response.data);
                    ({ songs: this.AlbumSongs } = response.data);
                });
        },
        playMusic(id) {
            this.$emit("transApp", id);
        }
    },
    beforeRouteEnter(to, from, next) {
        // ...
        next(vm => {
            vm.getAlbumNew(to.query.id);
        });
    }
};
</script>

<style lang="less">
.album {
    position: relative;
    .header {
        position: fixed;
        width: 100%;
        height: 25px;
        background: transparent;
        z-index: 99;
        span {
            display: block;
            position: absolute;
            top: 5px;
            left: 5px;
            font-size: 22px;
            color: #ffffff;
        }
    }
    .introduce-pic {
        position: relative;
        img {
            width: 100%;
        }
        p {
            position: absolute;
            display: block;
            color: #ffffff;
            padding-left: 15px;
            &.name {
                bottom: 20%;
                font-size: 20px;
                font-weight: 600;
            }
            &.albumname {
                bottom: 12%;
                font-size: 12px;
            }
        }
    }
    .introduce-word {
        padding: 15px 20px;
        .s-title {
            font-weight: 900;
            font-size: 18px;
            color: #333;
            margin: 10px 0;
        }
        p.brief {
            font-size: 13px;
            color: #666;
            line-height: 1.8em;
            &.active {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
        }
        span {
            display: block;
            width: 100%;
            text-align: center;
            border: 1px solid rgb(241, 240, 240);
            padding: 8px;
            margin: 5px 0;
            i {
                display: block;
            }
        }
    }
    .hot-title {
        font-weight: 900;
        font-size: 18px;
        color: #333;
        padding: 20px 20px 15px;
    }
    ul {
        margin-bottom: 50px;
    }
}
</style>
