<template>
    <div class="recommend">
        <HomeTitle>推荐歌单</HomeTitle>
        <ul class="cardlist">
            <SongItemCard v-for="(item, index) in SongCardItems" :key="index" :item="item" @transmitTo="skipToList($event)"></SongItemCard>
        </ul>
        <HomeTitle>最新音乐</HomeTitle>
        <ul class="songlist">
            <SingleSongItem v-for="(item, index) in SingleSongItems" :key="index" :item="item" @delivery="transfer($event)"></SingleSongItem>
        </ul>
        <!-- <HomeTitle>推荐电台</HomeTitle> -->
    </div>
</template>

<script>
import HomeTitle from "@/components/HomeTitle";
import SongItemCard from "@/components/SongItemCard";
import SingleSongItem from "@/components/SingleSongItem";

export default {
    name: "Recommend",
    components: {
        HomeTitle,
        SongItemCard,
        SingleSongItem
    },
    data() {
        return {
            SongCardItems: null,
            SingleSongItems: null
        };
    },
    methods: {
        //封装h5本地缓存功能
        pushlocalStorage(key, times, url) {
            let keys = localStorage.getItem("key");
            if (keys && Date.now() < JSON.parse(keys).time + times * 60 * 1000) {
                this.key = JSON.parse(keys).data;
            } else {
                this.axios.get(url).then(response => {
                    ({ result: this.key } = response.data);
                    localStorage.setItem(
                        "key",
                        JSON.stringify({
                            time: Date.now(),
                            data: this.key
                        })
                    );
                });
            }
        },
        getSongCard() {
            let SongCardItems = localStorage.getItem("SongCardItems");
            if (SongCardItems && Date.now() < JSON.parse(SongCardItems).time + 60 * 60 * 1000) {
                this.SongCardItems = JSON.parse(SongCardItems).data;
            } else {
                this.axios.get("https://music.kele8.cn/personalized?limit=6").then(response => {
                    ({ result: this.SongCardItems } = response.data);
                    localStorage.setItem(
                        "SongCardItems",
                        JSON.stringify({
                            time: Date.now(),
                            data: this.SongCardItems
                        })
                    );
                });
            }
        },
        getSingleSong() {
            let SingleSongItems = localStorage.getItem("SingleSongItems");
            if (SingleSongItems && Date.now() < JSON.parse(SingleSongItems).time + 60 * 60 * 1000) {
                this.SingleSongItems = JSON.parse(SingleSongItems).data;
            } else {
                this.axios.get("https://music.kele8.cn/personalized/newsong").then(response => {
                    ({ result: this.SingleSongItems } = response.data);
                    localStorage.setItem(
                        "SingleSongItems",
                        JSON.stringify({
                            time: Date.now(),
                            data: this.SingleSongItems
                        })
                    );
                });
            }
        },
        skipToList(id) {
            this.$router.push({ path: "/recommendlist", query: { id: id } });
        },
        transfer(id) {
            this.$emit("transTo", id);
            localStorage.setItem(
                "MusicList",
                JSON.stringify({
                    time: Date.now(),
                    data: this.SingleSongItems
                })
            );
        }
    },
    created() {
        this.getSongCard();
        this.getSingleSong();
    }
};
</script>

<style lang="less">
.recommend {
    .recommend-title {
        margin: 20px 0;
        padding-left: 10px;
        border-left: 3px solid #4EB9FE;
        display: block;
    }
    ul.cardlist {
        display: flex;
        flex-wrap: wrap;
        li {
            flex: 1 1 30%;
            margin-bottom: 15px;
            &:nth-child(3n + 2) {
                margin: 0 3px;
            }
            .thumb {
                position: relative;
                img {
                }
                span {
                    position: absolute;
                    top: 3px;
                    right: 3px;
                    color: #fff;
                    font-size: 12px;
                    i.fa-headphones {
                        margin-right: 2px;
                    }
                }
            }
            p {
                font-size: 14px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding: 4px 2px 0 6px;
                min-height: 30px;
                line-height: 1.2;
                font-size: 13px;
            }
        }
    }
    ul.songlist {
        li {
        }
    }
}
</style>
