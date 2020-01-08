
<template>
    <div class="music-page">
        <div class="header">
            <span @click="Goback"><i class="fa fa-arrow-circle-left"></i></span>
            <div class="song-detail">
                <p class="detail-name">{{ SingleDetail.name }}</p>
                <p class="detail-">{{ SingleDetail.ar[0].name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SingleDetail: null
        };
    },
    methods: {
        Goback() {
            this.$router.go(-1);
        },
        getSongsDetail(id) {
            let SingleDetail = localStorage.getItem("SingleDetail" + id);
            if (SingleDetail && Date.now() < JSON.parse(SingleDetail).time + 60 * 60 * 1000) {
                this.SingleDetail = JSON.parse(SingleDetail).data;
            } else {
                this.axios
                    .get("https://music.kele8.cn/song/detail", {
                        params: {
                            ids: id
                        }
                    })
                    .then(response => {
                        window.console.log(response.data.songs[0]);
                        // ({ result: this.SingleDetail } = response.data);
                        this.SingleDetail = response.data.songs[0];
                        localStorage.setItem(
                            "SingleDetail" + id,
                            JSON.stringify({
                                time: Date.now(),
                                data: this.SingleDetail
                            })
                        );
                    });
            }
        }
        // https://music.kele8.cn/song/detail?ids=1405283464
    },
    beforeRouteEnter(to, from, next) {
        // ...
        next(vm => {
            vm.getSongsDetail(to.query.id);
        });
    }
};
</script>

<style lang="less">
.music-page {
    width: 100%;
    position: relative;
    height: 100vh;
    background: #333;
    .header {
        position: fixed;
        width: 100%;
        height: 25px;
        background: transparent;
        span {
            display: block;
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 30px;
            color: #ffffff;
        }
    }
}
</style>
