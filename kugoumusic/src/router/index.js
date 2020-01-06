import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Recommend from "@/views/Recommend.vue";
import HotSong from "@/views/HotSong";
import Search from "@/views/Search";
import RecommendList from "@/views/RecommendList";
import AlbumView from "@/views/AlbumView";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        redirect: "/recommend",
        children: [
            {
                path: "recommend",
                component: Recommend
            },
            {
                path: "hotsong",
                component: HotSong
            },
            {
                path: "search",
                component: Search,
                props: route => ({ query: route.query.keywords })
            }
        ]
    },
    {
        path: "/recommendlist",
        name: "recommendlist",
        component: RecommendList
    },
    {
        path: "/albumview",
        name: "albumview",
        component: AlbumView
    }
];

const router = new VueRouter({
    routes
});

export default router;
