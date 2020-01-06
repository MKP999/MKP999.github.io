<template>
    <div class="home">
        <HomeLogo></HomeLogo>
        <ul id="nav">
            <li><router-link to="/recommend">推荐音乐</router-link></li>
            <li><router-link to="/hotsong">排行榜</router-link></li>
            <li><router-link to="/search">搜索</router-link></li>
        </ul>
        <keep-alive>
            <router-view @transTo="trans($event)"></router-view>
        </keep-alive>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeLogo from "@/components/HomeLogo.vue";

export default {
    name: "home",
    methods: {
        trans(id) {
            this.$emit("transApp", id);
        }
    },
    components: {
        HomeLogo
    }
};
</script>

<style lang="less">
.home {
    margin-bottom: 50px;
    ul#nav {
        margin-top: 35px;
        display: flex;
        li {
            flex: 1;
            text-align: center;
            border-bottom: 1px solid rgb(238, 238, 238);
            height: 42px;

            a {
                display: inline-block;
                text-decoration: none;
                color: #333;
                line-height: 40px;
                font-weight: 900;
                &.router-link-exact-active {
                    color: #4EB9FE;
                    border-bottom: 3px solid #4EB9FE;
                }
            }
        }
    }
}
</style>
