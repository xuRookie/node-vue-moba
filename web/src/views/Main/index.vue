<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../../assets/images/logo.jpeg" alt="logo" height="30">
            <div class="px-2 flex-1">
                <div class="text-white">英雄联盟</div>
                <div class="text-grey-1 fs-xs">League of Legends</div>
            </div>
            <button type="button" class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary pt-3 py-2">
            <div class="nav nav-inverse pb-1 jc-around">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scoped>
.topbar {
    position: sticky;
    top: 0;
    z-index: 99;
}
</style>
