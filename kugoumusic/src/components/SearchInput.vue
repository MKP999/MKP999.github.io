<template>
    <div class="search-input">
        <span class="fa fa-search"></span>
        <input type="text" v-model="cpyeValue" @change="getSearchSong(cpyeValue)" @input="showSong(cpyeValue)" placeholder="搜索歌曲、歌手、专辑" />
        <span class="fa fa-close" v-if="value" @click="recover"></span>
    </div>
</template>

<script>
export default {
    props: ["value"],
    data() {
        return {
            SingItems: null,
            cpyeValue: null
        };
    },
    components: {},
    watch: {
        value: function() {
            this.cpyeValue = this.value;
            if (this.cpyeValue === "") {
                this.recover();
            }
        },
        cpyeValue: function() {
            if (this.cpyeValue === "") {
                this.recover();
            }
        }
    },
    methods: {
        recover() {
            this.$emit("recover");
        },
        getSearchSong(text) {
            this.$emit("transfer", text);
        },
        showSong() {
            // window.console.log(text);
        }
    }
};
</script>

<style lang="less">
.search-input {
    width: 100%;
    background: #ebecec;
    border-radius: 15px;
    padding: 3px 15px;
    position: relative;
    input {
        width: 80vw;
        border: none;
        outline: none;
        background: #ebecec;
        height: 100%;
        padding: 5px 10px;
    }
    span.fa-search {
        color: #999;
    }
    span.fa-close {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-50%, 50%);
        color: lightgray;
        border-radius: 50%;
        background: rgb(190, 190, 190);
        padding: 2px 4px;
        font-size: 12px;
    }
}
</style>
