<template>
    <div class="list-header" v-if="item">
        <div class="front">
            <div class="thumb">
                <img :src="item.coverImgUrl" alt="" />
                <span><i class="fa fa-headphones"></i>{{ getUnit(item.playCount) }}</span>
                <span class="songlist">歌单</span>
            </div>
            <div class="writer">
                <div class="al-title">{{ item.name }}</div>
                <div class="writer-pic">
                    <img :src="item.creator.avatarUrl" alt="" />
                    <span></span>
                    <div class="nickname">
                        <p>{{ item.creator.nickname }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="behind">
            <div class="label">
                标签: <span v-for="(item, index) in item.tags" :key="index">{{ item }}</span>
            </div>
            <div :class="{ active: isActive, intro: hasIntro }" @click="isActive = !isActive">
                简介:{{ item.description }}
                <span class="fa fa-chevron-down" v-if="isActive"></span>
                <span class="fa fa-chevron-up" v-else></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["item"],
    data() {
        return {
            isActive: true,
            hasIntro: true
        };
    },
    methods: {
        getUnit(n) {
            if (n > 99999999) {
                let num = n / 100000000;
                return num.toFixed(2) + "亿";
            }
            if (n > 9999) {
                let num = n / 10000;
                return num.toFixed(1) + "万";
            }
        }
    }
};
</script>

<style lang="less">
.list-header {
    .front {
        background-color: #4d4d4d;
        padding: 40px 15px 25px;
        display: flex;
        .thumb {
            width: 35vw;
            margin-right: 15px;
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
            span.songlist {
                position: absolute;
                width: 10vw;
                top: 2vh;
                left: 0;
                font-size: 10px;
                background: red;
                opacity: 0.8;
                padding: 2px 5px;
                border-radius: 0 10px 10px 0;
            }
        }

        .writer {
            flex: 1;
            .al-title {
            }
            .writer-pic {
                margin-top: 30px;
                position: relative;
                display: flex;
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                span {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 15px;
                    height: 15px;
                    display: block;
                    background-image: url("../assets/usericn_3x.png");
                    background-size: 500%;
                    background-position: -42px 0;
                    transform: translate(20px, 5px);
                }
                .nickname {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    p {
                        color: #999;
                        margin-left: 5px;
                        line-height: 30px;
                        font-size: 15px;
                    }
                }
            }
        }
    }
    .behind {
        padding: 15px;
        color: #666666;

        .label {
            span {
                display: inline-block;
                font-size: 12px;
                border: 1px solid rgb(204, 204, 204);
                padding: 0 5px;
                margin: 10px 5px;
                border-radius: 8px;
            }
        }
        .intro {
            position: relative;
            font-size: 14px;
            white-space: pre-line;

            &.active {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                span.fa {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 12px;
                    color: lightgray;
                }
            }
            span.fa {
                position: absolute;
                bottom: 0;
                right: 0;
                font-size: 12px;
                color: lightgray;
            }
        }
    }
}
</style>
