<template>
    <li @click="handleClick(item.id)">
        <div class="thumb">
            <img :src="item.picUrl" alt="" />
            <span><i class="fa fa-headphones"></i>{{ getUnit(item.playCount) }}</span>
        </div>
        <p>{{ item.name }}</p>
    </li>
</template>

<script>
export default {
    name: "songitemcard",
    props: {
        item: Object
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
        },
        handleClick(id) {
            this.$emit("transmitTo", id);
        }
    }
};
</script>

<style lang="less"></style>
