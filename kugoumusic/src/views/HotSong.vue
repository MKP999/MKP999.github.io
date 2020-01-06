<template>
    <div class="ranking">
        <ul class="ranking-logo">
            <h3>官方榜</h3>
            <li v-for="(listItem, index) in RankingList" :key="index" @click="getRankingDetail(index)">
                <div class="ranking-pic">
                    <img :src="listItem.coverImgUrl" alt="" />
                    <p>{{ listItem.updateFrequency }}</p>
                </div>
                <ul class="ranking-song">
                    <li class="ranking-three" v-for="(item, index) in listItem.tracks" :key="index">
                        <span>{{ index + 1 }} . </span><span>{{ item.first }} -</span><span> {{ item.second }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 排行榜详情 -->
        <div class="ranking-detail" v-if="isActive && RankingListDetail">
            <div class="rangking-detail-header">
                <div class="header">
                    <span @click="Goback"><i class="fa fa-arrow-circle-left"></i></span>
                </div>
                <div class="header-box" :style="{ 'background-image': `url(${RankingListDetail.coverImgUrl})` }">
                    <p>最近更新: {{ new Date().getMonth() + 1 }}月{{ new Date().getDate() }}日</p>
                </div>
            </div>
            <ul class="ranking-detail-songs">
                <RecommendSongItem v-for="(item, index) in RankingListDetail.tracks" :key="index" :item="item" :number="index" @delivery="transLevel($event)"></RecommendSongItem>
            </ul>
        </div>
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
import RecommendSongItem from "@/components/RecommendSongItem";

export default {
    components: {
        RecommendSongItem
    },
    data() {
        return {
            RankingList: null,
            RankingListDetail: null,
            RankingListDetailTracks: null,
            isActive: false,
            isloading: false
        };
    },
    methods: {
        Goback() {
            this.isActive = false;
        },
        getRankingList() {
            // this.axios.get("http://music.kele8.cn/toplist/detail").then(response => {
            //     window.console.log(response);
            // });
            let RankingList = localStorage.getItem("RankingList");
            if (RankingList && Date.now() < JSON.parse(RankingList).time + 60 * 60 * 1000) {
                this.RankingList = JSON.parse(RankingList).data;
            } else {
                this.axios.get("http://music.kele8.cn/toplist/detail").then(response => {
                    // window.console.log(response.data.list);
                    ({ list: this.RankingList } = response.data);
                    localStorage.setItem(
                        "RankingList",
                        JSON.stringify({
                            time: Date.now(),
                            data: this.RankingList
                        })
                    );
                });
            }
        },
        getCorrespondDetail(index) {
            this.isloading = true;
            let RankingListDetail = localStorage.getItem("RankingListDetail" + index);
            if (RankingListDetail && Date.now() < JSON.parse(RankingListDetail).time + 1000) {
                this.RankingListDetail = JSON.parse(RankingListDetail).data;
            } else {
                this.axios
                    .get("http://musicapi.leanapp.cn/top/list", {
                        params: {
                            idx: index
                        }
                    })
                    .then(response => {
                        // window.console.log(response.data.playlist);
                        ({ playlist: this.RankingListDetail } = response.data);
                        ({ tracks: this.RankingListDetailTracks } = response.data.playlist);
                        localStorage.setItem(
                            "RankingListDetail" + index,
                            JSON.stringify({
                                time: Date.now(),
                                data: this.RankingListDetail
                            })
                        );
                    })
                    .finally(() => {
                        this.isloading = false;
                    });
            }
        },
        getRankingDetail(index) {
            this.isActive = true;
            switch (index) {
                case 0:
                    this.getCorrespondDetail(3);
                    break;
                case 1:
                    this.getCorrespondDetail(0);
                    break;
                case 2:
                    this.getCorrespondDetail(2);
                    break;
                case 3:
                    this.getCorrespondDetail(1);
                    break;
                case 4:
                    this.getCorrespondDetail(23);
                    break;
                case 5:
                    this.getCorrespondDetail(24);
                    break;
                case 6:
                    this.getCorrespondDetail(25);
                    break;
                case 7:
                    this.getCorrespondDetail(26);
                    break;
                case 8:
                    this.getCorrespondDetail(27);
                    break;
                case 9:
                    this.getCorrespondDetail(22);
                    break;
                case 10:
                    this.getCorrespondDetail(28);
                    break;
                case 11:
                    this.getCorrespondDetail(40);
                    break;
                case 12:
                    this.getCorrespondDetail(29);
                    break;
                case 13:
                    this.getCorrespondDetail(30);
                    break;
                case 14:
                    this.getCorrespondDetail(5);
                    break;
                case 15:
                    this.getCorrespondDetail(6);
                    break;
                case 16:
                    this.getCorrespondDetail(21);
                    break;
                case 17:
                    this.getCorrespondDetail(7);
                    break;
                case 18:
                    this.getCorrespondDetail(8);
                    break;
                case 19:
                    this.getCorrespondDetail(10);
                    break;
                case 20:
                    this.getCorrespondDetail(9);
                    break;
                case 21:
                    this.getCorrespondDetail(20);
                    break;
                case 22:
                    this.getCorrespondDetail(31);
                    break;
                case 23:
                    this.getCorrespondDetail(32);
                    break;
                case 24:
                    this.getCorrespondDetail(19);
                    break;
                case 25:
                    this.getCorrespondDetail(22);
                    break;
                case 26:
                    this.getCorrespondDetail(22);
                    break;
                case 27:
                    this.getCorrespondDetail(22);
                    break;
                default:
                    break;
            }
        },
        transLevel(id) {
            this.$emit("transTo", id);
            localStorage.setItem(
                "MusicList",
                JSON.stringify({
                    time: Date.now(),
                    data: this.RankingListDetailTracks
                })
            );
        }
    },
    created() {
        this.getRankingList();
    }
};
</script>

<style lang="less">
.ranking {
    padding: 15px 10px;
    ul.ranking-logo {
        margin-bottom: 50px;
        & > h3 {
            font-weight: 600;
            line-height: 1.8em;
        }
        & > li {
            &:last-child{
                margin-bottom: 50px;
            }
            &:nth-child(6),
            &:nth-child(7),
            &:nth-child(8) {
                margin: 60px 0 0;
                position: relative;
            }
            &:nth-child(6) {
                &::before {
                    content: "推荐榜";
                    display: block;
                    font-weight: 600;
                    line-height: 1.8em;
                    position: absolute;
                    top: -35px;
                    left: 0px;
                    width: 100%;
                }
            }

            &:nth-child(n + 6) {
                flex: 1;
                float: left;
                position: relative;
                .ranking-pic {
                    margin-right: 4px;
                    img {
                        width: 30vw;
                    }
                }
            }
            display: flex;
            margin: 5px 0;
            .ranking-pic {
                position: relative;
                margin-right: 15px;
                img {
                    width: 30vw;
                    border-radius: 10px;
                }
                p {
                    position: absolute;
                    left: 5px;
                    bottom: 5px;
                    color: #ffffff;
                    font-size: 10px;
                }
            }
            ul.ranking-song {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding-top: 15px;

                li.ranking-three {
                    color: #333;
                    font-size: 14px;
                    display: flex;
                    padding-top: 5px;
                    span {
                        white-space: nowrap;
                        &:last-child {
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            white-space: normal;
                        }
                    }
                }
            }
        }
    }
    .ranking-detail {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        background: #ffffff;

        .rangking-detail-header {
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
            .header-box {
                width: 100%;
                height: 35vh;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% auto;
                padding: 30px 15px;
                p {
                    position: absolute;
                    left: 15px;
                    bottom: 15px;
                    color: #ffffff;
                }
            }
        }
        ul.ranking-detail-songs {
            height: 65vh;
            overflow: scroll;
        }
    }
}
</style>
