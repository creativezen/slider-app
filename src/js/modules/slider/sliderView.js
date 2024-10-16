import Swiper from 'swiper' // Импортируем библиотеку Swiper
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules' // Импортируем модули Swiper

// Активируем использование необходимых модулей Swiper
Swiper.use([Pagination, Navigation, FreeMode, Autoplay])

// Создаем класс sliderView для управления слайдерами
export default class sliderView {
    sliders = document.querySelectorAll('.js-slider') // Находим все элементы с классом 'js-slider'
    name = ''
    selector = ''
    slider = ''
    type = ''
    marquee = ''
    options = {
        default: {
            direction: 'horizontal',
            spaceBetween: 20, // Расстояние между слайдами на ПК
            slidesPerView: "auto", // Видимое количество слайдов
            centeredSlides: false, // Центрирование слайдов
            loop: false, // Зацикливание слайдов
            autoplay: false,
            speed: 1000,
        },
        vertical: {
            direction: 'vertical',
            centeredSlides: false,
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 2000,
            autoplay: false,
        },
        marquee: {
            direction: 'horizontal',
            slidesPerView: "auto", // Видимое количество слайдов
            spaceBetween: 10, // Пространство между элементами в marquee
            speed: 5000, // Скорость прокрутки элементов в marquee
            autoplay: {
                delay: 0, // Задержка перед автопрокруткой в marquee
            }
        }
    }

    // Метод инициализации с проверкой наличия слайдеров
    init() {
        if (this.sliders.length === 0) return false 
        return true 
    }

    nameError(slider) {
        console.log('------------------------------')
        console.log('Ошибка в названии атрибута имени у:')
        console.log(slider)
        console.log('Проверь правильность основного атрибута [data-slider-name="_уникальное_название_"]')
        console.log('------------------------------')
    }

    typeError(selector) {
        console.log('------------------------------')
        console.log(selector)
        console.log('Отсутствует указание типа слайдера [data-slider-type=" ???? "]')
        console.log('Варианты типа: "default", "vertical", "marquee"')
        console.log('------------------------------')
    }

    // Метод добавления и настройки стандартного слайдера
    addDefault() {
        if (this.slider.dataset.sliderCenter !== undefined) this.options.default.centeredSlides = true
        if (this.slider.dataset.sliderLoop !== undefined) this.options.default.loop = true
        if (this.slider.dataset.sliderAuto !== undefined) this.options.default.autoplay = { delay: 1000 }
        if (this.slider.dataset.sliderItems !== undefined) this.options.default.slidesPerView = Number(element.dataset.sliderItems)

        new Swiper(this.selector, {
            slidesPerView: this.options.default.slidesPerView,
            centeredSlides: this.options.default.centeredSlides,
            loop: this.options.default.loop,
            spaceBetween: this.options.default.spaceBetween,
            autoplay: this.options.default.autoplay,
            speed: this.options.default.speed,

            navigation: {
                nextEl: `.slider-btn.next-${this.name}`,
                prevEl: `.slider-btn.prev-${this.name}`
            },
        })

        this.unsetOptions()
    }

    addVertical() {
        if (this.slider.dataset.sliderCenter !== undefined) this.options.vertical.centeredSlides = true
        if (this.slider.dataset.sliderLoop !== undefined) this.options.vertical.loop = true
        if (this.slider.dataset.sliderAuto !== undefined) this.options.vertical.autoplay = { delay: 1000 }
        if (this.slider.dataset.sliderItems !== undefined) this.options.vertical.slidesPerView = Number(element.dataset.sliderItems)

        new Swiper(this.selector, {
            direction: this.options.vertical.direction,
            loop: this.options.vertical.loop,
            centeredSlides: this.options.vertical.centeredSlides,
            slidesPerView: this.options.vertical.slidesPerView,
            spaceBetween: this.options.vertical.spaceBetween,
            speed: this.options.vertical.speed,
            autoplay: this.options.vertical.autoplay
        })

        this.unsetOptions()
    }

    // Метод для добавления и настройки marquee слайдера
    addMarquee() {
        new Swiper(this.selector, {
            freeMode: true,
            loop: true,
            slidesPerView: this.options.marquee.slidesPerView,
            direction: this.options.marquee.direction,
            spaceBetween: this.options.marquee.spaceBetween,
            speed: this.options.marquee.speed,
            autoplay: this.options.marquee.autoplay
        })
        
        this.unsetOptions()
    }

    unsetOptions() {
        this.options = {
            default: {
                direction: 'horizontal',
                spaceBetween: 20, // Расстояние между слайдами на ПК
                slidesPerView: "auto", // Видимое количество слайдов
                centeredSlides: false, // Центрирование слайдов
                loop: false, // Зацикливание слайдов
                autoplay: false,
                speed: 1000,
            },
            vertical: {
                direction: 'vertical',
                centeredSlides: false,
                loop: false,
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 2000,
                autoplay: false,
            },
            marquee: {
                direction: 'horizontal',
                slidesPerView: "auto", // Видимое количество слайдов
                spaceBetween: 10, // Пространство между элементами в marquee
                speed: 5000, // Скорость прокрутки элементов в marquee
                autoplay: {
                    delay: 0, // Задержка перед автопрокруткой в marquee
                }
            }
        }       
    }
}