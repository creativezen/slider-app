import Swiper from 'swiper'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'

Swiper.use([Pagination, Navigation, FreeMode])

export default class sliderView {
    sliders = document.querySelectorAll('.js-slider')
    name = ''
    selector = ''
    options = {
        space_mobile: 10,
        space_pc: 20,
        items: "auto",
        center: false,
        loop: false
    }

    init() {
        if (this.sliders.length === 0) return false
        return true
    }

    addSlider(slider) {
            
        this.name = slider.dataset.sliderName
        this.selector = `[data-slider-name="${this.name}"]`

        if (document.querySelector(`${this.selector}`).dataset.sliderCenter) this.options.center = true
        if (document.querySelector(`${this.selector}`).dataset.sliderLoop) this.options.loop = true
        if (document.querySelector(`${this.selector}`).dataset.sliderItems) this.options.items = Number(document.querySelector(`${this.selector}`).dataset.sliderItems)

        new Swiper(this.selector, {
            slidesPerView: this.options.items,
            centeredSlides: this.options.center,
            loop: this.options.loop,
            spaceBetween: this.options.space_mobile,

            navigation: {
                nextEl: `.slider-btn.next-${this.name}`,
                prevEl: `.slider-btn.prev-${this.name}`
            },

            breakpoints: {
                1080: {
                    spaceBetween: this.options.space_pc,
                },
            }
        })
    }
}