<template>
    <div>
        <swiper class="banner" ref="bannerSwiper" :options="swiperOptions">
            <swiper-slide class="banner-slide">
                <img class="w-100" src="../../assets/98a5d406c21e221e1454586ab10d4b93.jpeg" alt="banner">
            </swiper-slide>
            <swiper-slide class="banner-slide">
                <img class="w-100" src="../../assets/ebc889f841b6f2eb45f83036eef4f1b8.jpeg" alt="banner">
            </swiper-slide>
            <swiper-slide class="banner-slide">
                <img class="w-100" src="../../assets/6ec7645d98155a6d4b512c71d09f09e0.jpeg" alt="banner">
            </swiper-slide>
            <swiper-slide class="banner-slide">
                <img class="w-100" src="../../assets/042775682144629c2929744beb3858af.jpeg" alt="banner">
            </swiper-slide>
            <swiper-slide class="banner-slide">
                <img class="w-100" src="../../assets/33f4b463a427fac210ad444b49da03b3.jpeg" alt="banner">
            </swiper-slide>
            <div class="swiper-pagination pagination-banner" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
export default {
    data () {
        return {
            swiperOptions: {
                // spaceBetween: 30,
                loop: true,
                // speed: 500,
                // centeredSlides: true,
                // autoplay: true,
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false,
                },
                // direction: 'horizontal',
                pagination: '.pagination-banner',
                // pagination:{
                //     el: '.pagination-banner',
                //     clickable: true,
                //     dynamicBullets: true
                // }
            }
        }
    },
    computed: {
      swiper() {
        return this.$refs.bannerSwiper.$swiper
      }
    },
    mounted () {
        // console.log(this.$refs)
        // this.swiper.slideTo(3, 1000, false)
    }
}
</script>
<style lang="scss" scoped>
.banner {
    height: 165px;
}
</style>
