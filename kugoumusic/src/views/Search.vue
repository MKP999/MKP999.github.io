<template>
    <div class="search-interface">
        <div class="search">
            <SearchInput @transfer="searchSong($event)" @recover="emptyValue" :value="isValue"></SearchInput>
        </div>
        <div class="search-result" v-if="isShow">
            <p>最佳匹配</p>
            <ul class="album-item">
                <AlbumItem v-for="(item, index) in AlbumItems" :key="index" :item="item" @transAlbum="getAlbum($event)"></AlbumItem>
            </ul>
            <ul class="single-item" v-if="SearchSongs">
                <SearchSongItem v-for="(item, index) in SearchSongs" :key="index" :item="item" @delivery="transLevel($event)"></SearchSongItem>
            </ul>
        </div>
        <ul class="hot-search-list" v-else>
            <p>热门搜索</p>
            <HotSearch v-for="(item, index) in HotSearchWord" :key="index" :item="item" @tranSearch="getSearch($event)"></HotSearch>
        </ul>
        <svg
            v-if="isloading"
            style="margin:auto;background:transparent;display:block;position: absolute;top:50%;left:50%;transform: translate(-50%, -50%);"
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <g transform="rotate(0 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(30 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(60 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(90 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(120 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(150 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(180 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(210 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(240 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(270 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(300 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                </rect>
            </g>
            <g transform="rotate(330 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#5b84f0">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                </rect>
            </g>
        </svg>
    </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import AlbumItem from "@/components/AlbumItem";
import SearchSongItem from "@/components/SearchSongItem";
import HotSearch from "@/components/HotSearch";

export default {
    name: "search",
    components: {
        SearchInput,
        SearchSongItem,
        AlbumItem,
        HotSearch
    },
    data() {
        return {
            isShow: false,
            SearchSongs: null,
            AlbumItems: null,
            HotSearchWord: null,
            isValue: null,
            isloading: false
        };
    },
    methods: {
        emptyValue() {
            // this.$router.push({ path: "/search" });
            this.isShow = !this.isShow;
            this.isValue = null;
        },
        searchSong(text) {
            this.isValue = text;
            this.isShow = true;
            this.isloading = true;
            if (this.isValue !== null) {
                //单曲搜索
                this.axios("https://music.kele8.cn/search", {
                    params: {
                        keywords: text
                    }
                }).then(response => {
                    // window.console.log(response.data);
                    if (response.data.result.songs) {
                        ({ songs: this.SearchSongs } = response.data.result);
                    }
                });
                //专辑搜索
                this.axios("https://music.kele8.cn/search/suggest", {
                    params: {
                        keywords: text
                    }
                })
                    .then(response => {
                        if (response.data.result.songs) {
                            // ({ songs: this.SearchSongs } = response.data.result);
                            ({ albums: this.AlbumItems } = response.data.result);
                            this.$router.push({ path: "/search", query: { keyword: text } });
                        }
                    })
                    .finally(() => {
                        this.isloading = false;
                    });
            }
        },
        getHotSearch() {
            let HotSearchWord = localStorage.getItem("HotSearchWord");
            if (HotSearchWord && Date.now() < JSON.parse(HotSearchWord).time + 60 * 60 * 1000) {
                this.HotSearchWord = JSON.parse(HotSearchWord).data;
            } else {
                this.axios.get("https://music.kele8.cn/search/hot").then(response => {
                    // window.console.log(response.data.result);
                    ({ hots: this.HotSearchWord } = response.data.result);
                    localStorage.setItem(
                        "HotSearchWord",
                        JSON.stringify({
                            time: Date.now(),
                            data: this.HotSearchWord
                        })
                    );
                });
            }
        },
        transLevel(id) {
            this.$emit("transTo", id);
            localStorage.setItem(
                "MusicList",
                JSON.stringify({
                    time: Date.now(),
                    data: this.SearchSongs
                })
            );
        },
        getSearch(text) {
            this.searchSong(text);
        },
        getAlbum(id) {
            this.$router.push({ path: "/albumview", query: { id: id } });
        }
    },
    created() {
        this.getHotSearch();
    }
};
</script>

<style lang="less">
.search-interface {
    .search {
        padding: 10px 10px;
    }
    .search-result {
        p {
            font-size: 10px;
            color: #666;
            padding-left: 10px;
            margin: 5px 0;
        }
        ul.album-item {
        }
        ul.single-item {
            margin-bottom: 40px;
        }
    }
    ul.hot-search-list {
        padding: 25px 10px;
        p {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }
        li {
            display: inline-block;
            border-radius: 15px;
            border: 1px solid lightgray;
            padding: 5px 10px;
            margin: 5px 10px;
            color: #333;
            font-size: 14px;
        }
    }
}
</style>
