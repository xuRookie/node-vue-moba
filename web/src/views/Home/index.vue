<template>
    <div class="home-container">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img class="w-100 h-100" src="../../assets/images/98a5d406c21e221e1454586ab10d4b93.jpeg" alt="banner">
                </div>
                <div class="swiper-slide">
                    <img class="w-100 h-100" src="../../assets/images/ebc889f841b6f2eb45f83036eef4f1b8.jpeg" alt="banner">
                </div>
                <div class="swiper-slide">
                    <img class="w-100 h-100" src="../../assets/images/6ec7645d98155a6d4b512c71d09f09e0.jpeg" alt="banner">
                </div>
                <div class="swiper-slide">
                    <img class="w-100 h-100" src="../../assets/images/042775682144629c2929744beb3858af.jpeg" alt="banner">
                </div>
                <div class="swiper-slide">
                    <img class="w-100 h-100" src="../../assets/images/33f4b463a427fac210ad444b49da03b3.jpeg" alt="banner">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <!-- swiper end -->
        <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3" v-for="item in navIcons" :key="item.name">
                    <i :class="`sprite sprite-${item.name}`"></i>
                    <div class="py-2">{{item.title}}</div>
                </div>
            </div>
            <div class="bg-light py-2 fs-sm">
                <i class="sprite sprite-arrow mr-1"></i>
                <span>收起</span>
            </div>
        </div>

        <m-list-card icon="iconcc-menu-circle" title="新闻咨询" :categories="newsList">
            <!-- // 父组件拿子组件中slot内容 -->
            <template #items="{category}">
                <router-link tag="div"
                    :to="`/articles/${item._id}`"
                    class="py-2 fs-lg d-flex" v-for="(item, index) in category.newsList" :key="index">
                    <span class="text-info">[{{item.categoryName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
                    <span class="text-grey-1 fs-sm">{{item.createdAt | date}}</span>
                </router-link>
            </template>
        </m-list-card>

        <m-list-card icon="iconcard-hero" title="英雄列表" :categories="heroList">
            <!-- // 父组件拿子组件中slot内容 -->
            <template #items="{category}">
                <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
                    <router-link tag="div"
                        class="p-2 text-center"
                        style="width: 20%"
                        :to="`/heroes/${item._id}`"
                        v-for="(item, index) in category.heroList" :key="index">
                        <img :src="item.avatar" alt="avatar" class="w-100">
                        <div>{{item.name}}</div>
                    </router-link>
                </div>
            </template>
        </m-list-card>

    </div>
</template>
<script>
import dayjs from 'dayjs'
// import MCard from '@/components/Card.vue'
import MListCard from '@/components/ListCard.vue'

export default {
    data () {
        return {
            navIcons: [
                { name: 'news', title: '爆料站' },
                { name: 'story', title: '故事站' },
                { name: 'mall', title: '周边商城' },
                { name: 'experience', title: '体验服' },
                { name: 'newcomer', title: '新人专区' },
                { name: 'glory', title: '荣耀·继承' },
                { name: 'community', title: '模拟战资料库' },
                { name: 'camp', title: '王者营地' },
                { name: 'public', title: '公众号' },
                { name: 'version', title: '版本爆料' }
            ],
            navNews: [
                { name: '热门', value: '1'},
                { name: '新闻', value: '2'},
                { name: '公告', value: '3'},
                { name: '活动', value: '4'},
                { name: '赛事', value: '5'},
            ],
            newsList: [],
            heroList: []
        }
    },
    components: {
        // MCard,
        MListCard
    },
    computed: {

    },
    created () {
        this.handleGetNewsCats()
        this.handleGetHeroCats()
    },
    filters: {
        date(val) {
            return dayjs(val).format('MM/DD')
        }
    },
    mounted () {

    },
    methods: {
        async handleGetNewsCats() {
            try {
                const res = await this.$http.get('news/list')
                this.newsList = res
            } catch (error) {
                console.log('错误信息:', error)
            }
        },
        async handleGetHeroCats() {
            try {
                const res = await this.$http.get('heroes/list')
                this.heroList = res
            } catch (error) {
                console.log('错误信息:', error)
            }
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';

.swiper-container {
    height: 165px;
}
.swiper-pagination {
    text-align: right;
}
.nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .nav-item {
        width: 25%;
        border-right: 1px solid $border-color;

        &:nth-child(4n) {
            border-right: none;
        }
    }
}
</style>
