<template>
    <div id="app">
        <keep-alive>
            <router-view @transApp="getMusicUrl($event)"></router-view>
        </keep-alive>
        <AudioComponent :item="AudioSong" @changeShow="transform" :musicurl="MUsicurl"></AudioComponent>
        <svg
            v-if="isloading"
            style="margin:auto;background:transparent;display:block;position: fixed;top:50%;left:50%;transform: translate(-50%, -50%);"
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
import AudioComponent from "@/components/AudioComponent";

export default {
    data() {
        return {
            MUsicurl: null,
            AudioSong: null,
            isShow: true,
            isloading: false
        };
    },
    components: {
        AudioComponent
    },
    methods: {
        getMusicUrl(id) {
            this.MUsicurl = "https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
            let AudioSong = localStorage.getItem("AudioSong" + id);
            if (AudioSong && Date.now() < JSON.parse(AudioSong).time + 60 * 60 * 1000) {
                this.AudioSong = JSON.parse(AudioSong).data;
            } else {
                this.isloading = true;
                this.axios
                    .get("http://music.kele8.cn/song/detail", {
                        params: {
                            ids: id
                        }
                    })
                    .then(response => {
                        // window.console.log(response.data.songs[0]);
                        this.AudioSong = response.data.songs[0];
                        localStorage.setItem(
                            "AudioSong" + id,
                            JSON.stringify({
                                time: Date.now(),
                                data: this.AudioSong
                            })
                        );
                        this.isloading = false;
                    });
            }
        },
        transform() {
            this.isShow = !this.isShow;
        }
    }
};
</script>

<style lang="less">
#app {
    audio {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
    }
}
</style>
