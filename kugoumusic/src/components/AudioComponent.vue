<template>
    <div class="audio-component" :class="{ active: isActive }">
        <audio :src="musicurl" autoplay></audio>

        <div class="audio" v-if="item" @click.prevent="pushControlPage">
            <img :src="itemObj.al.picUrl" alt="" :class="{ rototing: isPlay }" />
            <div class="audio-song">
                <p class="song-name">{{ itemObj.name }}</p>
                <p class="song-artist" v-for="(itemObj, index) in itemObj.ar" :key="index">{{ itemObj.name }}</p>
            </div>
            <div class="control" @click.prevent.stop="controlAudio">
                <span class="progress-canvas">
                    <canvas id="canvas" width="36" height="36"></canvas>
                </span>
                <span class="fa fa-play" v-if="isPlay"></span>
                <span class="fa fa-pause" v-else></span>
            </div>
        </div>
        <div class="full-screen" v-if="item">
            <!-- :style="{ 'background-image': `url(${item.al.picUrl})` }" -->
            <img :src="itemObj.al.picUrl" alt="" class="full-screen-blur" />
            <!-- 返回键 歌名 歌手 -->
            <div class="header">
                <span @click="Goback"><i class="fa fa-arrow-left"></i></span>
                <div class="song-detail">
                    <p class="detail-name">{{ itemObj.name }}</p>
                    <p class="detail-artist" v-for="(itemObj, index) in itemObj.ar" :key="index">{{ itemObj.name }}</p>
                </div>
                <span class="fa fa-share-alt"></span>
            </div>

            <!-- 磁盘 -->
            <div class="magnetic-disk">
                <div class="needle" :class="{ active: isPlay }">
                    <img src="../assets/g-needle.png" alt="" />
                </div>
                <div class="disk">
                    <img :src="itemObj.al.picUrl" alt="" :class="{ rototing: isPlay }" />
                </div>
            </div>

            <!-- 点击该区域进去歌词界面 -->
            <div class="getlyric" @click="showLyric = !showLyric">
                <!-- 歌词界面 -->
                <div class="lrc" v-if="showLyric && lyric">
                    <ul id="ullrc">
                        搜索不到歌词~~
                        <!-- <li v-for="(item, index) in resolveLyric" :key="index">{{ item.text }}</li> -->
                    </ul>
                </div>
            </div>

            <!-- 歌曲控制中心 -->
            <div class="control-song">
                <ul class="operation">
                    <li @click="isLove = !isLove">
                        <span class="fa fa-heart" v-if="isLove" :class="{ active: isLove }"></span>
                        <span class="fa fa-heart-o" v-else></span>
                    </li>
                    <li><span class="fa fa-download"></span></li>
                    <li><span class="fa fa-commenting-o"></span></li>
                    <li><span class="fa fa-ellipsis-h"></span></li>
                </ul>
                <div class="progress">
                    <span class="start">{{ getFormatTime(currentTime / 1000) }}</span>
                    <span class="end">{{ getFormatTime(itemObj.dt / 1000) }}</span>
                    <label for="">
                        <div class="progress-bar">
                            <div class="pass-progress"></div>
                            <div class="dot"></div>
                        </div>
                        <input type="range" id="audio-progress" v-model="currentTime" @input="changeCurrentTime" :max="itemObj.dt" />
                    </label>
                </div>
                <ul class="control-center">
                    <li v-if="isLoop" @click="changeLoop"><img src="../assets/loop.png" alt="" /></li>
                    <li v-else-if="isSinglecycle" @click="changeSinglecycle"><img src="../assets/singlecycle.png" alt="" /></li>
                    <li v-else-if="isRandom" @click="changeRandom"><img src="../assets/random.png" alt="" /></li>

                    <li @click="getPreviousSong"><img src="../assets/previous.png" alt="" /></li>
                    <li v-if="isPlay" @click.prevent.stop="controlAudio"><img src="../assets/play.png" alt="" /></li>
                    <li v-else @click.prevent.stop="controlAudio"><img src="../assets/pause.png" alt="" /></li>

                    <li @click="getNextSong"><img src="../assets/nextsong.png" alt="" /></li>
                    <li><img src="../assets/musiclist.png" alt="" /></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    props: ["item", "musicurl"],
    data() {
        return {
            isPlay: false,
            isActive: false,
            isLove: false,
            currentTime: 0,
            canvasId: null,
            itemObj: null,
            isLoop: true,
            isSinglecycle: false,
            isRandom: false,
            showLyric: false,
            lyric: null,
            audio: null
        };
    },
    computed: {
        resolveLyric() {
            let geciArr = this.lyric.split("\n");
            // window.console.log(geciArr);
            let arr = [];
            geciArr.forEach((element, index) => {
                let t = element.slice(1, element.indexOf("]"));

                // window.console.log(t);
                arr[index] = {
                    //时间处理为秒单位
                    time: Number(t.slice(0, 2)) * 60 + Number(t.slice(3)),
                    text: element.slice(element.indexOf("]") + 1).trim()
                };
            });
            // window.console.log(arr);
            arr.pop();
            return arr;
        }
    },
    watch: {
        item: function() {
            this.itemObj = this.item;
            // this.audio = document.querySelector("audio"); //bug

            this.$nextTick(() => {
                window.clearInterval(this.canvasId);
                this.getCanvasProgress();
                this.judgeFinied();
                this.getlyric();
            });
        },
        musicurl: {},
        $route: function() {
            if (this.$route.name == "controlpage") {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },
        currentTime: function() {
            let dot = document.getElementsByClassName("dot")[0];
            let passprogress = document.getElementsByClassName("pass-progress")[0];
            dot.style.left = (this.currentTime / this.itemObj.dt) * 100 + "%";
            passprogress.style.width = (this.currentTime / this.itemObj.dt) * 100 + "%";
        },
        // audio() {
        //     window.console.log("歌词触发");
        //     this.audio.ontimeupdate = () => {
        //         window.console.log("xxx");
        //         this.currentTime = this.audio.currentTime;
        //         // 根据当前播放的时间得到歌词数组的下标
        //         let index = this.getCurrentIndex();
        //         window.console.log(index);

        //         if (this.showLrc) {
        //             let ul = document.querySelector(".ullrc");
        //             let li = ul.querySelector(".active");

        //             let divHeight = 450; //歌词容器的高度
        //             let liHeight = 30; //每个li的高度
        //             let top = index * liHeight + liHeight / 2 - divHeight / 2;
        //             // if (top < 0) {
        //             //   top = 0;
        //             // }
        //             ul.style.marginTop = -top + "px";

        //             if (li) {
        //                 li.className = "";
        //             }
        //             //设置某个li的类名为active
        //             if (index >= 0) {
        //                 ul.children[index].className = "active";
        //             }
        //         }
        //     };
        // }
    },
    methods: {
        getCurrentIndex() {
            for (let i = this.resolveLyric.length - 1; i >= 0; i--) {
                let lrcObj = this.resolveLyric[i];
                if (lrcObj.time < this.currentTime) {
                    return i;
                }
            }
            return -1;
        },
        changeLoop() {
            let audio = document.querySelector("audio");
            this.isLoop = false;
            this.isSinglecycle = true;
            audio.loop = true;
        },
        changeSinglecycle() {
            let audio = document.querySelector("audio");
            this.isSinglecycle = false;
            this.isRandom = true;
            audio.loop = false;
            audio.onended = () => {
                this.getRandomSong();
            };
        },
        changeRandom() {
            let audio = document.querySelector("audio");
            this.isRandom = false;
            this.isLoop = true;
            audio.onended = () => {
                this.getNextSong();
            };
        },
        changeCurrentTime() {
            let audio = this.$el.querySelector("audio");
            audio.currentTime = this.currentTime / 1000;
        },
        Goback() {
            this.isActive = false;
            this.showLyric = false;
            this.$emit("changeShow");
        },
        controlAudio() {
            this.isPlay = !this.isPlay;

            if (this.isPlay) {
                $("audio")[0].pause();
                window.clearInterval(this.canvasId);
            } else {
                $("audio")[0].play();
                this.getCanvasProgress();
            }
        },
        pushControlPage() {
            this.isActive = true;
            this.$emit("changeShow");
        },
        getCanvasProgress() {
            let audio = this.$el.querySelector("audio");
            //当浏览器开始查找音频/视频时触发。
            // audio.onloadstart = window.console.log("start");
            //提示当前帧的数据是可用
            // audio.loadeddata = window.console.log("can");

            let canvas = this.$el.querySelector("canvas");
            let ctx = canvas.getContext("2d");
            window.clearInterval(this.canvasId);
            this.canvasId = window.setInterval(() => {
                this.currentTime = audio.currentTime * 1000;

                ctx.clearRect(0, 0, 36, 36);

                ctx.beginPath();
                ctx.arc(18, 18, 17, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.strokeStyle = "#ccc";
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(18, 18, 17, -0.5 * Math.PI, 2 * Math.PI * (this.currentTime / this.item.dt) - 0.5 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.stroke();
            }, 1000);
        },
        getFormatTime(time) {
            var minute = parseInt(time / 60);
            minute = minute.toString().length === 1 ? "0" + minute : minute;
            var second = parseInt(time % 60);
            second = second.toString().length === 1 ? "0" + second : second;
            return minute + ":" + second;
        },
        getNextSong() {
            this.showLyric = false;
            this.audio = document.querySelector("audio");
            if (this.isRandom) {
                this.getRandomSong();
            } else {
                let MusicList = localStorage.getItem("MusicList");
                let MusicListString = JSON.parse(MusicList).data;
                let audio = document.querySelector("audio");
                // window.console.log(MusicListString);
                for (let index = 0; index < MusicListString.length; index++) {
                    for (const key in MusicListString[index]) {
                        if (MusicListString[index][key] == this.itemObj.id && index < MusicListString.length - 1) {
                            // window.console.log(MusicListString[index + 1].id);
                            // index = index > MusicListString.length - 1 ? 0 : ++index;
                            this.axios
                                .get("https://music.kele8.cn/song/detail", {
                                    params: {
                                        ids: MusicListString[index + 1].id
                                    }
                                })
                                .then(response => {
                                    this.itemObj = response.data.songs[0];
                                    // window.console.log(audio.src);
                                    audio.src = "https://music.163.com/song/media/outer/url?id=" + MusicListString[index + 1].id + ".mp3";
                                });
                        }
                    }
                }
            }
        },
        getPreviousSong() {
            this.showLyric = false;
            let MusicList = localStorage.getItem("MusicList");
            let MusicListString = JSON.parse(MusicList).data;
            let audio = document.querySelector("audio");
            for (let index = 0; index < MusicListString.length; index++) {
                for (const key in MusicListString[index]) {
                    if (MusicListString[index][key] == this.itemObj.id && index > 0) {
                        // index = index < 0  ? MusicListString.length - 1 : --index;
                        this.axios
                            .get("https://music.kele8.cn/song/detail", {
                                params: {
                                    ids: MusicListString[index - 1].id
                                }
                            })
                            .then(response => {
                                this.itemObj = response.data.songs[0];
                                audio.src = "https://music.163.com/song/media/outer/url?id=" + MusicListString[index - 1].id + ".mp3";
                            });
                    }
                }
            }
        },
        getRandomSong() {
            let MusicList = localStorage.getItem("MusicList");
            let MusicListString = JSON.parse(MusicList).data;
            let audio = document.querySelector("audio");
            let index = Math.floor(Math.random() * (MusicListString.length - 1));
            this.axios
                .get("https://music.kele8.cn/song/detail", {
                    params: {
                        ids: MusicListString[index].id
                    }
                })
                .then(response => {
                    this.itemObj = response.data.songs[0];
                    audio.src = "https://music.163.com/song/media/outer/url?id=" + MusicListString[index].id + ".mp3";
                });
        },
        judgeFinied() {
            let audio = document.querySelector("audio");
            audio.onended = () => {
                this.getNextSong();
            };
        },
        getlyric() {
            let lyric = localStorage.getItem("lyric" + this.itemObj.id);
            if (lyric && Date.now() < JSON.parse(lyric).time + 1000) {
                //30 * 24 * 60 * 60 *
                this.lyric = JSON.parse(lyric).data;
            } else {
                this.axios
                    .get("https://music.kele8.cn/lyric", {
                        params: {
                            id: this.itemObj.id
                        }
                    })
                    .then(response => {
                        window.console.log(response.data.lrc.lyric);
                        ({ lyric: this.lyric } = response.data.lrc);
                        localStorage.setItem(
                            "lyric" + this.itemObj.id,
                            JSON.stringify({
                                time: Date.now(),
                                data: this.lyric
                            })
                        );
                    });
            }
        }
    }
};
</script>

<style lang="less">
@keyframes myrotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
.audio-component {
    overflow: hidden;
    position: fixed;
    .audio {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8vh;
        background: #ffffff;
        display: flex;
        padding-left: 10px;
        padding-top: 7px;
        transition: all 0.5s;
        border-top: 2px solid #333;
        border-radius: 10px 10px 0 0;
        box-sizing: border-box;

        img {
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
            margin-right: 15px;
            animation: myrotate 5s linear infinite;
            &.rototing {
                animation-play-state: paused;
            }
        }
        .audio-song {
            flex: 1;
            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                &.song-name {
                    font-size: 15px;
                    color: #333;
                }
                &.song-artist {
                    display: inline;
                    font-size: 10px;
                    color: #999;

                    &:last-child {
                        &::after {
                            content: "";
                        }
                    }
                    &::after {
                        content: "/";
                    }
                }
            }
        }
        .control {
            position: relative;
            width: 50px;
            span.progress-canvas {
                position: absolute;
                left: 0;
                top: 0;
                #canvas {
                }
            }
            span {
                position: absolute;
                color: lightgray;
                font-size: 20px;
                top: 8px;
                left: 10px;
            }
        }
    }
    .full-screen {
        width: 100%;
        position: relative;
        height: 100vh;
        top: -110vh;
        background-size: cover;
        transition: all 0.3s ease;
        &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            float: left;
            width: 100%;
            height: 100vh;
            z-index: -1;
            background: rgba(0, 0, 0, 0.7);
        }
        img.full-screen-blur {
            position: absolute;
            float: left;
            width: 100%;
            height: 100vh;
            filter: blur(10px);
            z-index: -2;
        }
        .header {
            position: relative;
            width: 100%;
            height: 25px;
            background: transparent;
            display: flex;
            span {
                display: block;
                position: relative;
                top: 10px;
                left: 10px;
                font-size: 25px;
                color: #ffffff;
                z-index: 9;
            }
            .song-detail {
                padding: 10px 20px;
                flex: 1;

                p {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    &.detail-name {
                        font-size: 16px;
                        color: #fff;
                        letter-spacing: 1px;
                    }
                    &.detail-artist {
                        display: inline;
                        font-size: 10px;
                        color: #999;
                        &:last-child {
                            &::after {
                                content: "";
                            }
                        }
                        &::after {
                            content: "/";
                        }
                    }
                }
            }
            span.fa-share-alt {
                width: 50px;
                position: relative;
                top: 15px;
                left: 10px;
            }
        }
        .magnetic-disk {
            position: relative;
            .needle {
                position: relative;
                margin: 0 auto;
                top: 23px;
                left: 20px;
                width: 23vw;
                height: 20vh;
                z-index: 99;
                transform-origin: 15px 15px;
                transform: rotate(0deg);
                transition: all 0.8s;
                &.active {
                    transform: rotate(-30deg);
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .disk {
                position: relative;
                margin: -20px auto 100px;
                width: 75vw;
                height: 75vw;
                background: url("../assets/disc_default.png") no-repeat center;
                background-size: cover;
                border-radius: 50%;
                padding: 12vw;
                box-shadow: 0 0 5px 4px rgba(255, 255, 255, 0.5);
                img {
                    animation: myrotate 8s linear infinite;
                    border-radius: 50%;
                    &.rototing {
                        animation-play-state: paused;
                    }
                }
            }
        }
        .getlyric {
            width: 100%;
            height: 69vh;
            background: transparent;
            position: absolute;
            top: 50px;
            left: 0;
            z-index: 99;
            .lrc {
                background: rgba(0, 0, 0, 0.8);
                color: #ffffff;
                width: 100%;
                height: 100%;
                height: 450px;
                overflow: scroll;
                white-space: pre-wrap;
                text-align: center;

                ul#ullrc {
                    transition: 0.3s;
                    line-height: 70vh;
                    li {
                        height: 35px;
                        line-height: 35px;
                        transition: 0.3s;
                        &:active {
                            color: #fff;
                            font-size: 1.2em;
                            font-weight: bold;
                        }
                    }
                }
            }
        }

        @keyframes myScale {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(1.3);
            }
        }
        .control-song {
            display: flex;
            flex-direction: column;
            color: #ffffff;
            padding: 0 15px;
            text-align: center;
            span {
                font-size: 25px;
            }
            ul.operation {
                display: flex;
                li {
                    flex: 1;
                    span {
                        font-size: 20px;
                        &.fa-heart {
                            &.active {
                                animation: myScale 0.3s ease 2;
                            }
                        }
                    }
                }
            }
            .progress {
                margin: 15px 0 10px;
                span {
                    font-size: 10px;
                    transform: scale(0.8);
                    color: #999;
                    padding: 5px 0;
                    &.start {
                        float: left;
                    }
                    &.end {
                        float: right;
                    }
                }
                label {
                    display: block;
                    width: 90vw;
                    margin: 0 auto;
                    position: relative;
                    .progress-bar {
                        position: relative;
                        background: #999;
                        width: 100%;
                        height: 2px;
                        margin: 3px auto 0;
                        border-radius: 20px;
                        .pass-progress {
                            position: absolute;
                            display: block;
                            width: 0px;
                            height: 2px;
                            background: #fff;
                            border-radius: 20px;
                            transition: all 0.3s;
                        }
                        .dot {
                            position: absolute;
                            display: block;
                            transform: translateY(-2px);
                            left: 0;
                            width: 5px;
                            height: 5px;
                            background: #fff;
                            border-radius: 50%;
                            transition: all 0.3s;
                        }
                    }
                    input {
                        width: 100%;
                        opacity: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }
            .control-center {
                display: flex;
                li {
                    flex: 1;
                    &:nth-child(3) {
                        transform: translateY(-15%) scale(1.2);
                    }
                    img {
                    }
                }
            }
        }
    }

    &.active {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        .audio {
            bottom: -8vh;
        }
        .full-screen {
            top: 0;
        }
    }
}
</style>
