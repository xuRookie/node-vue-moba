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

        <m-card icon="menu-circle" title="新闻咨询">
            <div class="nav jc-between">
                <div class="nav-item active">
                    <div class="nav-link">热门</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">新闻</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">公告</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">活动</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">赛事</div>
                </div>
            </div>
            <div class="pt-3">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="n in 5" :key="n">
                            <div class="py-2" v-for="n in 5" :key="n">
                                <span>[新闻]</span>
                                <span>|</span>
                                <span>7月6日抢先服不停机优化公告</span>
                                <span>06/02</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
        <m-card icon="conmap6" title="英雄列表">
            <div class="nav jc-between">
                <div class="nav-item active">
                    <div class="nav-link">热门</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">新闻</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">公告</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">活动</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">赛事</div>
                </div>
            </div>
            <div class="pt-3">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="n in 5" :key="n">
                            <div class="py-2" v-for="n in 5" :key="n">
                                <span>[新闻]</span>
                                <span>|</span>
                                <span>7月6日抢先服不停机优化公告</span>
                                <span>06/02</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>
<script>
import MCard from '@/components/Card.vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

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
            ]
        }
    },
    components: {
        MCard
    },
    computed: {

    },
    mounted () {
        new Swiper ('.swiper-container', {
            loop: true,
            // autoplay: true,
            pagination: {
                el: '.swiper-pagination',
            }
        })
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
