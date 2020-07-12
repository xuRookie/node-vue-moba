<template>
    <div class="list-card">
        <m-card :icon="icon" :title="title">
            <div class="nav jc-between">
                <div class="nav-item" :class="{active: active == index}" v-for="(item, index) of categories"
                    :key="index">
                    <div class="nav-link">{{item.name}}</div>
                </div>
            </div>
            <div class="pt-3">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in categories" :key="index">
                            <slot name="items" :category="item"></slot>
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
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        categories: { type: Array, required: true },
    },
    data () {
        return {
            active: 0
        }
    },
    components: {
        MCard
    },
    mounted () {
        new Swiper ('.swiper-container', {
            loop: true,
            // autoplay: true,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
            }
        })
    },
    methods: {

    }
}
</script>

<style>

</style>
