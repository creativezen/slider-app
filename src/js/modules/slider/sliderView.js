import Swiper from 'swiper' // Импортируем библиотеку Swiper для создания слайдеров
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules' // Импортируем модули, которые будем использовать

// Активируем использование модулей Swiper, которые нам нужны
Swiper.use([Pagination, Navigation, FreeMode, Autoplay])

// Создаем класс sliderView для управления слайдерами на странице
export default class sliderView {
    // Находим все элементы с классом 'js-slider'
    sliders = document.querySelectorAll('.js-slider')
    selector = '' // Селектор для текущего слайдера
    slider = '' // Переменная для хранения имени текущего слайдера
    marquee = ''
    options = { // Настройки по умолчанию для слайдера
        slider: {
            space_mobile: 10, // Расстояние между слайдами на мобильных устройствах
            space_pc: 20, // Расстояние между слайдами на ПК
            items: "auto", // Количество видимых слайдов
            center: false, // Центрирование слайдов отключено по умолчанию
            loop: false // Зацикливание слайдов отключено по умолчанию
        },
        marquee: {
            space: 10,
            speed: 6500,
            delay: 0,
        }
    }

    // Метод инициализации, проверяет наличие слайдеров на странице
    init() {
        if (this.sliders.length === 0) return false // Если слайдеров нет, возвращаем false
        return true // Если слайдеры найдены, возвращаем true
    }

    // Метод для добавления и настройки каждого слайдера
    addSlider(item) {
        // Получаем имя слайдера из data-атрибута
        this.slider = item.dataset.sliderName

        this.marquee = item.dataset.marqueeName

        if (this.marquee != '') this.addMarquee()

        if (this.slider == '') return

        // Формируем селектор для выборки слайдера по имени
        this.selector = `[data-slider-name="${this.slider}"]`

        // Проверяем, включено ли центрирование слайдов через data-атрибут и обновляем опции
        if (document.querySelector(`${this.selector}`)?.dataset.sliderCenter) this.options.slider.center = true
        // Проверяем, включено ли зацикливание слайдов через data-атрибут и обновляем опции
        if (document.querySelector(`${this.selector}`)?.dataset.sliderLoop) this.options.slider.loop = true
        // Проверяем количество видимых слайдов через data-атрибут и обновляем опции
        if (document.querySelector(`${this.selector}`)?.dataset.sliderItems) this.options.slider.items = Number(document.querySelector(`${this.selector}`).dataset.sliderItems)

        // Создаем новый слайдер с использованием Swiper с настройками
        new Swiper(this.selector, {
            slidesPerView: this.options.slider.items, // Количество видимых слайдов
            centeredSlides: this.options.slider.center, // Центрирование слайдов
            loop: this.options.slider.loop, // Зацикливание слайдов
            spaceBetween: this.options.slider.space_mobile, // Расстояние между слайдами на мобильных устройствах

            // Настройки навигации слайдера
            navigation: {
                nextEl: `.slider-btn.next-${this.slider}`, // Селектор кнопки для следующего слайда
                prevEl: `.slider-btn.prev-${this.slider}` // Селектор кнопки для предыдущего слайда
            },

            // Настройки для различных размеров экрана (брейкпоинты)
            breakpoints: {
                1080: {
                    spaceBetween: this.options.slider.space_pc, // Расстояние между слайдами на ПК
                },
            }
        })
    }

    addMarquee() {
        console.log('hello from marquee')

        // Формируем селектор для выборки слайдера по имени
        this.selector = `[data-marquee-name="${this.marquee}"]`

        new Swiper(this.selector, {
            freeMode: true,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: this.options.marquee.space,
            speed: this.options.marquee.speed,
            autoplay: {
                delay: this.options.marquee.delay,
            }            
        })
    }
}
