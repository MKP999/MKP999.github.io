<template>
    <li class="hot-search" @click="getSearch(item.first)">{{ item.first }}</li>
</template>

<script>
export default {
    props: ["item"],
    methods: {
        getSearch(value) {
            this.$emit("tranSearch", value);
        }
    }
};
</script>

<style></style>
