<template>
    <div class="card p-3 mt-3 bg-white">
        <div class="card-header d-flex pb-3">
            <i :class="`iconfont iconcc-${icon}`"></i>
            <div class="flex-1 px-2">{{title}}</div>
            <i class="iconfont iconellipsis"></i>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../style/_variables.scss';

.card {
    border-bottom: 1px solid $border-color;

    .card-header {
        border-bottom: 1px solid $border-color;
    }
}
</style>
